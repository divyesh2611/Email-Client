const {Given, When, Then, After} = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('@hapi/joi');

const makeCreateFolder = require('./create-folder');
const sandbox = sinon.createSandbox();
const folderDb = {
    createFolder:()=>{

    },
    isFolderExists:()=>{

    }
}
const getFolderByUserIdStub = sandbox.stub(folderDb,'isFolderExists');
getFolderByUserIdStub.callsFake((args) =>{
    console.log("isfolderexists args",args)
    expect(args).deep.equal({
        columns:['Id'],
        folderName:this.folderName
    });
    return this.newFolderDetails;
})

const createFolderStub = sandbox.stub(folderDb, 'createFolder');
createFolderStub.callsFake((args) => {
  expect(args).deep.equal({
    userId:this.userId,
    folderName: this.folderName,
  });
  return '{"Id":1}';
});

Given('folder details userId: {string}, folderName: {string} to create new folder',(userId,folderName)=>{
    if(this.userId)
       this.userId = parseInt(userId) || undefined;
    this.userId = userId || undefined;
    this.folderName = folderName;
})


When('Try to create new folder',async ()=>{
    const createFolder = makeCreateFolder({
        Joi,
        folderDb:folderDb,
        isFolderExists:folderDb.isFolderExists
    })

    try{
        this.result = await createFolder({
            userId:this.userId,
            folderName:this.folderName,
        })
    }
    catch(e){
        // console.log("catch error",e)
        this.error = {
            name: e.name,
            message:e.message
        }
    }
    
})

Then('It will throw error: {string} with message: {string} while creating new folder', (error, message) => {
    console.log("this.error",this.error)
    expect(this.error).deep.equal({
    name: error,
    message,
  });
});

Then('It will create new folder with details: "{string}"', (newFolderDetails)=>{
    expect(this.result).deep.equal(newFolderDetails);
})