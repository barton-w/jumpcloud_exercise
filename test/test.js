const ActionMonitor = require('../src/actions').ActionMonitor

const testCase1 = (expected) => {
  console.log('Test Case 1 - Assigment Requirement')
  console.log(`Expected result: ${expected}`)
  const monitor = new ActionMonitor
  monitor.addAction('{"action":"jump", "time":100}')
  monitor.addAction('{"action":"run", "time":75}')
  monitor.addAction('{"action":"jump", "time":200}')
  const stats = monitor.getStatistics()
  console.log(`Actual result: ${stats}`)
  const status = expected === stats ? 'Passed!' : 'Failed!'
  console.log(`Test case status: ${status}`)
  console.log()
}

const testCase2 = (expected) => {
  console.log('Test Case 2 - JSON validation failure')
  console.log(`Expected result: ${expected}`)
  const monitor = new ActionMonitor
  const action = monitor.addAction('{"action":"jump", "thyme":12}')
  console.log(`Actual result: ${action}`)
  const status = expected === action ? 'Passed!' : 'Failed!'
  console.log(`Test case status: ${status}`)
  console.log()
}

const testCase3 = (expected) => {
  console.log('Test Case 3 - Logging numerous actions')
  const expectedArray = []
  const monitor = new ActionMonitor
  //Establishing 5 actions
  const actions = ['hike', 'swim', 'bike', 'rollerblade', 'dance']

  actions.forEach((item) => {
    //For each action the average should be 10.5 (avg of numbers 1 through 20)
    //Add that to expected
    const expectedObj = {
      "action" : item,
      "avg" : 10.5
    }
    expectedArray.push(expectedObj)

    //Call addAction 20 times for each, with time 1-20
    for (let i = 1; i <= 20 ; i++) {
      const actionObj = {
        "action" : item,
        "time" : i
      }
      monitor.addAction(JSON.stringify(actionObj))
    }
  });
  expected = JSON.stringify(expectedArray)
  console.log(`Expected result: ${expected}`)
  const stats = monitor.getStatistics()
  console.log(`Actual result: ${stats}`)
  const status = expected === stats ? 'Passed!' : 'Failed!'
  console.log(`Test case status: ${status}`)
  console.log()
}

let expectedResult = '[{"action":"jump","avg":150},{"action":"run","avg":75}]'
testCase1(expectedResult)

expectedResult = 'Invalid JSON argument'
testCase2(expectedResult)

expectedResult = ''
testCase3(expectedResult)
