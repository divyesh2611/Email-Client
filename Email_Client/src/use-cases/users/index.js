const makeCreateUserUsecase = require('./create-user');
const makeGetAllUserUseCase = require('./get-all-users');
const makeGetUserByIdUseCase = require('./get-user-by-id');
const makeDeleteUserUseCase = require('./delete-user');
const makeUpdateUserUseCase = require('./update-user');
const makeGetUserByEmailUseCase = require('./get-user-by-email');
const makeUpdateAccessTokenUsecase = require('./update-access-token')
const dbMethods = require('../../data-access');
const Joi = require('joi');
const { Kafka } = require('kafkajs');
const {CLIENT_ID} = require('../../config/handlers.config');
const {CLIENT_SECRET} = require('../../config/handlers.config');
const { OAuth2Client } = require('google-auth-library');
const {database} = require('../../config/database.config')
const {addUserKafkaTopic} = require('../kafka');
const {checkUserKafkaTopic} = require('../kafka');
const createUser = makeCreateUserUsecase({
    userDb : dbMethods.cockroachDb.userDbMethods,
    // KafkaDb:dbMethods.cockroachDb.kafkaDbMethod,
    addUserKafkaTopic,
    checkUserKafkaTopic,
    Joi,
    Kafka 
});
const getAllUser = makeGetAllUserUseCase({
    userDb : dbMethods.cockroachDb.userDbMethods,
    Joi
})
const getUserById = makeGetUserByIdUseCase({
    userDb: dbMethods.cockroachDb.userDbMethods,
    Joi
})
const deleteUser = makeDeleteUserUseCase({
    userDb :dbMethods.cockroachDb.userDbMethods,
    Joi
})
const updateUser = makeUpdateUserUseCase({
    userDb: dbMethods.cockroachDb.userDbMethods,
    Joi
}) 
const getUserByEmail = makeGetUserByEmailUseCase({
    userDb:dbMethods.cockroachDb.userDbMethods,
    Joi
})
const updateAccessToken = makeUpdateAccessTokenUsecase({
    OAuth2Client,
    database,
    dbMethods,
    CLIENT_ID, 
    CLIENT_SECRET
})
// createUser()
module.exports = Object.freeze({
    createUser,
    getAllUser,
    getUserById,
    deleteUser,
    updateUser,
    getUserByEmail,
    updateAccessToken,
});