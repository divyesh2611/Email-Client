const userControllers = require('./users');
const folderControllers = require('./folder');
const auth = require('./auth')
const email = require('./email')
module.exports= Object.freeze({
    userControllers, 
    folderControllers,
    auth,
    email
})
