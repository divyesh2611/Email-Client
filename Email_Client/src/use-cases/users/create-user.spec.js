// const assert = require('assert');
// const { Given, When, Then } = require('@cucumber/cucumber');
// const makeCreateUserUsecase = require('./create-user');
// const dbMethods = require('../../data-access');
// const joi = require("joi");
// const createUserUsecase = makeCreateUserUsecase({
//     userDb : dbMethods.userDbMethods,joi : joi});
// Given('gmailId:{string} , userName : {string}', (gmailId,userName) => 
// {
// 	this.gmailId = gmailId;
// 	this.userName = userName;
// });
// When('I go to system', async () => {
// 	try{
// 		await createUserUsecase({
// 			gmailId: this.gmailId,
// 			userName: this.userName}); 
// 		this.result = "successful";
// 		return
// 	    }
// 	catch(e){
// 		this.result = "unsuccessful";
// 		 }
// });
// Then('It gives me {string}', (result) => {
// 	assert.equal(result, this.result);
// });


const {Given, When, Then, After} = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('@hapi/joi');

const makeCreateUser = require('./create-user');


const sandbox = sinon.createSandbox();

const usersDb = {
  getUserByEmail: () => {
  },
  createUser: () => {
  },
};

const getUserByEmailStub = sandbox.stub(usersDb, 'getUserByEmail');
getUserByEmailStub.callsFake((args) => {
  expect(args).deep.equal({
    columns: ['id'],
    email: this.email,
  });
  console.log("userDetailsByEmail :  ",this.userDetailsByEmail);
  return this.userDetailsByEmail;
});



const createUserStub = sandbox.stub(usersDb, 'createUser');
createUserStub.callsFake((args) => {
  expect(args).deep.equal({
    name: this.name,
    email: this.email,
  });

  return '{"id": 1}';
});

After(() => {
  this.name = undefined;
  this.email = undefined;
  this.userDetailsByEmail = undefined;
  this.result = undefined;
  this.error = undefined;

  sandbox.resetHistory();
});

Given('User details name: {string}, email: {string} to create new user',
    (name, email) => {
      this.name = name || undefined;
      this.email = email || undefined;
    },
);

Given('Already existed user details: "{string}" with same email', (userDetailsByEmail) => {
  this.userDetailsByEmail = JSON.parse(userDetailsByEmail);
});

When('Try to create new user', async () => {
  const createUser = makeCreateUser({
    Joi,
    userDb: usersDb,
  });

  try {
    console.log(this.name,this.email)
    this.result = await createUser({
      name: this.name,
      email: this.email,
    
    });
    console.log("this.result",this.result);
  } catch (e) {
    this.error = {
      name: e.name,
      message: e.message,
    };
  }
});

Then('It will throw error: {string} with message: {string} while creating new user', (error, message) => {
    console.log(this.error)
    expect(this.error).deep.equal({
    name: error,
    message,
  });
});

Then('It will create new user with details: {string}', (newUserDetails) => {
  expect(JSON.parse(this.result)).deep.equal(JSON.parse(newUserDetails));
});



// Then('getUserByEmail function will call {int} time while creating new user',
//     (getUserByEmailFunctionCallCount) => {
//       sinon.assert.callCount(getUserByEmailStub, getUserByEmailFunctionCallCount);
//     },
// );

// Then('createUser function will call {int} time while creating new user',
//     (createUserFunctionCallCount) => {
//       sinon.assert.callCount(createUserStub, createUserFunctionCallCount);
//     },
// );

