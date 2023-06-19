const {Given, When, Then, After} = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('@hapi/joi');
const makeFetchFolder = require('./fetch-folder');

const sandbox = sinon.createSandbox();

const folderDb = {
    createFolder: () => {

    },
    
  };

  
  const createFolderStub = sandbox.stub(folderDb, 'createFolder');
   createFolderStub.callsFake((args) => {
   expect(args).deep.equal({
    Access_Token:this.Access_Token,
    Refresh_Token:this.Refresh_Token
  });
  return 'folder is created';
});

Given('folder access_token: {string} and refresh_token: {string} to fetch folder',(Id)=>{
    this.Id = Id||undefined
})

When('Try to fetch folder',async ()=>{
    
  if(this.Id){
    this.Id = parseInt(this.Id);
  }
    const fetchFolder = makeFetchFolder({
        Joi,
        folderDb:folderDb
    })
    try {
        
        this.result = await fetchFolder({
          Access_Token:this.Access_Token,
          Refresh_Token:this.Refresh_Token
        });
        console.log(this.result);
        this.error = undefined;
      } catch (e) {
        this.error = {
          message: e.message,
        };
      }
})
Then('It will give message: {string} while fetch folder',(message)=>{
  console.log("then",this.error,message)
  if(this.error)
     expect(this.error.message).deep.equal(message);
  else
    expect(this.result).deep.equal(message);  
})
  