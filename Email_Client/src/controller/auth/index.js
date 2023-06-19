const useCase = require('../../use-cases');
const makeAuthController=require("./auth");
const { OAuth2Client } = require("google-auth-library");

const CLIENT_ID = "574397757533-2ocl7bjgcfno99juute1ml8836345qgh.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "http://localhost:3000/auth/google/callback";

const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
// const Joi = require('joi');
const authController=makeAuthController({createUser: useCase.users.createUser,client:client});
console.log(authController)
module.exports=authController;