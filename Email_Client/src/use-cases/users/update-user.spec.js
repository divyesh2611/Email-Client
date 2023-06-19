const {Given, When, Then, After} = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('@hapi/joi');
const makeUpdateUser = require('./update-user');
const sandbox = sinon.createSandbox();

const userDb = {
    updateUser: () => {
    },
  };

  const updateUserStub = sandbox.stub(userDb, 'updateUser');
  updateUserStub.callsFake((args) => {
    expect(args).deep.equal({
      id: this.id,
      name: this.name
    });
  
    return 'user is updated';
  });
  
Given('User Id: {string} and name:{string} to update user',(id,name)=>{
   console.log(name,typeof name)
    this.id = id||undefined
    this.name =(name)||undefined
})

When('Try to update user',async ()=>{
  if(this.id)
    this.id = parseInt(this.id)
    const updateUser = makeUpdateUser({
        Joi,
        userDb:userDb
    })
    try {

        this.result = await updateUser({
          id:this.id,
          name:this.name
        });
        console.log("result",this.result);
        this.error = undefined;
      } catch (e) {
        this.error = {
          message: e.message,
        };
      }
})
Then('It will give message: {string} while updating user',(message)=>{
  console.log("then",this.error,message)
  if(this.error)
     expect(this.error.message).deep.equal(message)
  else
    expect(this.result).deep.equal(message)
    
})
  