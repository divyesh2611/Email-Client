const {Given, When, Then, After} = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('@hapi/joi');
const makeUpdateFolder = require('./update-folder');
const sandbox = sinon.createSandbox();

const folderDb = {
    updateFolder: () => {
    },
  };

  const updateFolderStub = sandbox.stub(folderDb, 'updateFolder');
  updateFolderStub.callsFake((args) => {
    console.log("updatefolder",args)
    expect(args).deep.equal({
      folderId: this.folderId,
      folderName: this.folderName
    });
  
    return 'folder is updated';
  });
  
Given('folder Id: {string} and folderName:{string} to update folder',(folderId,folderName)=>{
   console.log(folderName,typeof folderName)
    this.folderId = folderId||undefined
    this.folderName =(folderName)||undefined
})

When('Try to update folder',async ()=>{
  if(this.folderId)
    this.folderId = parseInt(this.folderId)
 console.log("this.folderId",this.folderId,typeof this.folderId)
    const updateFolder = makeUpdateFolder({
        Joi,
        folderDb:folderDb
    })
    try {

        this.result = await updateFolder({
            folderId:this.folderId,
          folderName:this.folderName
        });
        console.log("result",this.result);
        this.error = undefined;
      } catch (e) {
        this.error = {
          message: e.message,
        };
      }
})
Then('It will give message: {string} while updating folder',(message)=>{
  console.log("then",this.error,message)
  if(this.error)
     expect(this.error.message).deep.equal(message)
  else
    expect(this.result).deep.equal(message)
    
})
  