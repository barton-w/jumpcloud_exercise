# JumpCloud Programming Exercise

## Overview
This implements a class called ActionMonitor within src/actions.js with 2 key methods:

1. addAction - accepts a single key-value pair of action and time, formatted as JSON
* For example: {"action":"cartwheel", "time":5}
* The addAction method maintains a running count of instance of each action, and a time total so averages can be easily calculated.

2. getStatistics
* Calculates the average time for each action submitted via addAction, and returns JSON
* For example: [{"action":"jump","avg":150},{"action":"run","avg":75}]

## Steps to get started:
1. Make sure you have Node.js version 12 or higher, as the ActionMonitor class uses private fields
* Check your current version via node -v
* For details on updating Node, [click here](https://nodejs.org/en/download/)

2. git clone git@github.com:barton-w/jumpcloud_exercise.git

3. cd jumpcloud_exercise

4. npm install
* [DeAsync.js](https://www.npmjs.com/package/deasync) was used in this project to enable the getStatistics method to compute averages asynchronously and wait to return data without blocking the event loop in Node.
* This was done as a concept, to allow this simple app to better handle concurrency and scale to large amounts of 'action' data.

5. npm run test
* You can view/modify the unit testing file: test/test.js

6. Enjoy!
