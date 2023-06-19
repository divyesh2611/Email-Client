// const {cockroachConnection} = require('../../config/database.config'); \
const {Pool} = require('pg');
const makeFolderDbMethods = require('./folder.db')
const makeUserDbMethods = require('./user.db');
const makeEmailDbMethods = require('./email.db')
const makeAttachmentDbMethods = require('./attachment.db');
const makeRecipientDbMethods = require('./recipient.db');
const makeEmailFolderAssoDbMethods = require('./email-folder-ass.db')
const makeKafkaDbMethods = require('./user-kafka-topic');

const {redisClient} = require('../../config/database.config');

console.log("redisclient",redisClient);

const pool = new Pool({
    host: 'localhost',
    user: 'divyesh',
    password: 'divyesh',
    port: 26257,
    database: 'test1',
    ssl : {
        rejectUnauthorized:false
    }
})
const userDbMethods = makeUserDbMethods({pool,redisClient});
const folderDbMethods = makeFolderDbMethods({pool});
const emailDbMethods = makeEmailDbMethods({pool});
const recipientDbMethods = makeRecipientDbMethods({pool})
const attachmentDbMethods=makeAttachmentDbMethods({pool})
const emailFolderAssoDbMethods = makeEmailFolderAssoDbMethods({pool})
const kafkaDbMethod = makeKafkaDbMethods({pool});
const cockroachDb = {
    userDbMethods,
    folderDbMethods,
    emailDbMethods,
    recipientDbMethods,
    attachmentDbMethods,
    emailFolderAssoDbMethods,
    kafkaDbMethod
}
module.exports = cockroachDb;