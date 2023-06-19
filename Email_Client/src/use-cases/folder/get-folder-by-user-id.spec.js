const {Given, When, Then, After} = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('@hapi/joi');
const makeGetFolderByUserId = require('./get-folder-by-user-id');
const sandbox = sinon.createSandbox();

const folderDb = {
    getFolderByUserId: () => {
    },
  };

  const getFolderByUserIdStub = sandbox.stub(folderDb, 'getFolderByUserId');
  getFolderByUserIdStub.callsFake((args) => {
    expect(args).deep.equal({
        userId: this.userId,
        columns: this.columns
    });
  
    return 'user details';
  });
  
Given('UserId: {string} and columes:{string} to get folder details',(userId,columns)=>{
   console.log(columns,typeof columns)
    this.userId = userId||undefined
    this.columns =columns||undefined
})

When('Try to get folder details',async ()=>{
    if(this.userId)
      this.userId = parseInt(this.userId)
    const getFolderByUserId = makeGetFolderByUserId({
        Joi,
        folderDb:folderDb
    })
    try {

        this.result = await getFolderByUserId({
            userId:this.userId,
            columns:this.columns
        });
        console.log("result",this.result);
        this.error = undefined;
      } catch (e) {
        this.error = {
          message: e.message,
        };
      }
})
Then('It will give message: {string} getting folder details',(message)=>{
  console.log("then",this.error,message)
  if(this.error)
     expect(this.error.message).deep.equal(message)
  else
    expect(this.result).deep.equal(message)
    
})
  