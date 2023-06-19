const {Given, When, Then, After} = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('@hapi/joi');
const makeGetAllUser = require('./get-all-users');
const makeUpdateAccessToken = require('./update-access-token');

const sandbox = sinon.createSandbox();

const userDb = {
    getAllUsers:()=>{

    },
    updateUser:()=>{

    }
}

const getAllUsersStub = sandbox.stub(userDb,'getAllUsers');

getAllUsersStub.callsFake(()=>{

    return "[{'userId':5,'emailAddress':'divyeshparmar112001@gmail.com','accessToken':'jqljwe8398wfjdslkw3223/weq?ewr23','refToken':'jsldkjf987reh3242%33sdf','expiryDate':'20-11-2001'}]";
})
const updateUserStub = sandbox.stub(userDb,"updateUser") ;

updateUserStub.callsFake(()=>{
    return "access token updated successfully"
})

Given('',()=>{
   
})
When('Try to get all users details',async ()=>{
    const updateAccessToken = makeUpdateAccessToken({
        userDb: userDb,
    });

    this.result = await updateAccessToken();
    console.log("this.result",this.result);
})


Then('give message:{string} getting user details',(message)=>{
    expect(this.result).deep.equal(message)
})










