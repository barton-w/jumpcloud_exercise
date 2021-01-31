//export
class ActionMonitor {
  //Private map that tracks the number of instances for a given action
  #actionInstances = new Map()
  //Private map that tracks the total time for a given action
  #actionTimeTotals = new Map()

  //addAction method
  addAction(action) {
    // Validate that the action argument is JSON
    const actionJson = this.validateJson(action)
    if (!actionJson) {
      return 'Invalid JSON argument'
    }
    //Accumulate a count of instances in #actionInstances
    const currentInstanceTotal = this.#actionInstances.get(actionJson.action) || 0
    this.#actionInstances.set(actionJson.action, currentInstanceTotal+1)
    //Accumulate a running-total of time in #actionTimeTotals
    const currentTimeTotal = this.#actionTimeTotals.get(actionJson.action) || 0
    this.#actionTimeTotals.set(actionJson.action, actionJson.time + currentTimeTotal)
  }

  getStatistics() {
    let complete = false
    let averages
    //Call the async function computerAverages()
    this.computeAverages().then((avg) => {
      averages = avg
      complete = true
    })
    //Return once averages are available, without blocking the event loop
    require('deasync').loopWhile(() => {
      return !complete
    })
    return averages
  }

  async computeAverages() {
    const returnArray = new Array()
    this.#actionTimeTotals.forEach((value, key) => {
      //Compute the average time
      const avg = value / this.#actionInstances.get(key)
      const avgData = {
        'action' : key,
        'avg' : avg
      }
      //Add to the returnArray
      returnArray.push(avgData)
    })

    return Promise.resolve(JSON.stringify(returnArray))
  }

  //Method to vaildate JSON
  validateJson(json) {
    try {
      const pJson = JSON.parse(json)
      return this.validateJsonData(pJson)
    } catch (error) {
      return false
    }
  }

  //Method to validate JSON data specifics
  validateJsonData(json) {
    if (!json.action || !json.time || isNaN(json.time)) {
      return false
    }
    return json
  }
}

module.exports = {
  ActionMonitor: ActionMonitor
}
