const {Given, When, Then, After} = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('@hapi/joi');
const makeDeleteUser = require('./delete-user');
const sandbox = sinon.createSandbox();

const userDb = {
    deleteUser: () => {
    },
  };

  const deleteUserStub = sandbox.stub(userDb, 'deleteUser');
  deleteUserStub.callsFake((args) => {
    expect(args).deep.equal({
      id: this.id,
    });
  
    return 'user is deleted';
  });
  
Given('User Id: {string} to delete user',(id)=>{
    this.id = id||undefined
})

When('Try to delete user',async ()=>{
  if(this.id){
    this.id = parseInt(this.id)
  }
    const deleteUser = makeDeleteUser({
        Joi,
        userDb:userDb
    })
    try {
        
        this.result = await deleteUser({
          id:this.id
        });
        console.log(this.result);
        this.error = undefined;
      } catch (e) {
        this.error = {
          message: e.message,
        };
      }
})
Then('It will give message: {string} while deleting user',(message)=>{
  console.log("then",this.error,message)
  if(this.error)
     expect(this.error.message).deep.equal(message);
  else
    expect(this.result).deep.equal(message);  
})
  