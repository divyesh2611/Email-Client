const {Given, When, Then, After} = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('@hapi/joi');
const makeGetUserById = require('./get-user-by-id');
const sandbox = sinon.createSandbox();

const userDb = {
    getUserById: () => {
    },
  };

  const deleteUserStub = sandbox.stub(userDb, 'getUserById');
  deleteUserStub.callsFake((args) => {
    expect(args).deep.equal({
      id: this.id,
      columes: this.columes
    });
  
    return 'user details';
  });
  
Given('User Id: {string} and columes:{string} to get user details',(id,columes)=>{
   console.log(columes,typeof columes)
    this.id = id||undefined
    this.columes =(columes)||undefined
})

When('Try to get user details',async ()=>{
  this.id = parseInt(this.id)
    const getUserById = makeGetUserById({
        Joi,
        userDb:userDb
    })
    try {

        this.result = await getUserById({
          id:this.id,
          columes:this.columes
        });
        console.log("result",this.result);
        this.error = undefined;
      } catch (e) {
        this.error = {
          message: e.message,
        };
      }
})
Then('It will give message: {string} getting user details',(message)=>{
  console.log("then",this.error,message)
  if(this.error)
     expect(this.error.message).deep.equal(message)
  else
    expect(this.result).deep.equal(message)
    
})
  