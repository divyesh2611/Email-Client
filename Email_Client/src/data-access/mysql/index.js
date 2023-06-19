const {connection} =  require('../../config/database.config'); 
const makeFolderDbMethods = require('./folder.db')
const makeUserDbMethods = require('./user.db');
const userDbMethods = makeUserDbMethods({connection});
const folderDbMethods = makeFolderDbMethods({connection});

console.log("mysql dataaccess")

const mySqlDb = {
    userDbMethods,
    folderDbMethods,
}
module.exports = mySqlDb;