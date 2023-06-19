const {Given, When, Then, After} = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('@hapi/joi');
const makeGetAllUser = require('./get-all-users');
const getAllUsers = require('./get-all-users');
const sandbox = sinon.createSandbox();

const userDb = {
    getAllUsers:()=>{

    }
}

const getAllUsersStub = sandbox.stub(userDb,'getAllUsers');

getAllUsersStub.callsFake(()=>{

  if(this.data == "[{}]")
    return "users is not found";
  else
    return "user list";
})

Given('',()=>{
   
})
When('Try to get all users details',async ()=>{
    const getAllUsers = makeGetAllUser({
        userDb: userDb,
    });

    this.result = await getAllUsers();
    console.log("this.result",this.result);
})



Then('It will give data: {string} ',(data)=>{
    this.data=data;
})

Then('give message:{string} getting user details',(message)=>{
    expect(this.result).deep.equal(message)
})










