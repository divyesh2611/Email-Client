const makeCreateUserController = require('./create-user');
const useCase = require('../../use-cases');
const makeGetAllUserController = require('./get-all-users');
const makeGetUserByIdController = require('./get-usre-by-id');
const makeDeleteUserController = require('./delete-user');
const makeUpdateUserController = require('./update-user');

const Joi = require('joi');

const createUserController = makeCreateUserController({
    createUser: useCase.users.createUser,
    Joi,
    getUserByEmail:useCase.users.getUserByEmail,
});
const getAllUserController = makeGetAllUserController({
    getAllUser:useCase.users.getAllUser,
    Joi
})
const getUserByIdController = makeGetUserByIdController({
    getUserById:useCase.users.getUserById,
    Joi
})
const deleteUserController = makeDeleteUserController({
    deleteUser:useCase.users.deleteUser,
    Joi
})
const updateUserController = makeUpdateUserController({
    updateUser:useCase.users.updateUser,
    Joi
})
module.exports= Object.freeze({
    createUserController,
    getAllUserController,
    getUserByIdController,
    deleteUserController,
    updateUserController,
})