const {Given, When, Then, After} = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('@hapi/joi');
const makeDeleteFolder = require('./delete-folder');
const { folderName } = require('./create-folder.spec');
const sandbox = sinon.createSandbox();

const folderDb = {
    deleteFolder: () => {
    },
  };

  const deleteFolderStub = sandbox.stub(folderDb, 'deleteFolder');
  deleteFolderStub.callsFake((args) => {
    expect(args).deep.equal({
      Id: this.Id,
    });
  
    return 'folder is deleted';
  });
  
Given('folder Id: {string} to delete folder',(Id)=>{
    this.Id = Id||undefined
})

When('Try to delete folder',async ()=>{
    
  if(this.Id){
    this.Id = parseInt(this.Id);
  }
    const deleteFolder = makeDeleteFolder({
        Joi,
        folderDb:folderDb
    })
    try {
        
        this.result = await deleteFolder({
          Id:this.Id,
        });
        console.log(this.result);
        this.error = undefined;
      } catch (e) {
        this.error = {
          message: e.message,
        };
      }
})
Then('It will give message: {string} while deleting folder',(message)=>{
  console.log("then",this.error,message)
  if(this.error)
     expect(this.error.message).deep.equal(message);
  else
    expect(this.result).deep.equal(message);  
})
  