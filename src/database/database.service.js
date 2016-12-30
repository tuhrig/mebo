/**
 * This module encapsulates the database access. Use this module in order to
 * save and load data.
 *
 * Note: This module has different profiles. Depending a process environment
 *       variable called, a profile is selected. This enables use to run against
 *       a MongoDB during production, but to run against an in-memory database
 *       during our tests (so we don't need to have any external environment for
 *       our tests to run).
 */

// Process environment variable which selects the production or  the test profile
// to use for the database implementation. Pass this variable when starting the tests.
// The the package.json for an example.
var testMode = process.env.TEST;

if(testMode) {

    // If the test mode is activated, we use a simple in-memory implementation of
    // our database service. All data will be stored in a JavaScript object and
    // will vanish after execution. This is useful to run unit tests or for local
    // development.

    var inmemoryDb = require('./inmemory.database.service.js');

    module.exports = {
        saveBoard: inmemoryDb.saveBoard,
        findBoard: inmemoryDb.findBoard
    };

} else {

    // If the test mode is not activated, we run in our normal production mode. We
    // use a MongoDB in this case.

    var mongoDb = require('./mongodb.database.service.js');

    module.exports = {
        saveBoard: mongoDb.saveBoard,
        findBoard: mongoDb.findBoard
    };
}

