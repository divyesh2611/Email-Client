 const mySqlDb = require('./mysql')
const cockroachDb = require('./cockroach');


const dbMethods = {
    mySqlDb,
    cockroachDb,
}
console.log("data");
module.exports = dbMethods;




