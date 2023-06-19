const express = require('express');
const controller = require('./controller');
const router = express.Router();


function init(){
    initUserRoutes();
    initEmailFolderRoutes();
    initGoogleAuth();
    initEmail();
}

function initUserRoutes(){
    router.post('/users',(req,res)=>{
        controller.userControllers.createUserController(req,res);
    });
    router.get('/users',(req,res)=>{
        controller.userControllers.getAllUserController(req,res);
    })
    router.get('/users/:id',(req,res)=>{
        controller.userControllers.getUserByIdController(req,res);
    })
    router.delete('/users/:id',(req,res)=>{
        controller.userControllers.deleteUserController(req,res);
    });
    router.put('/users/:id',(req,res)=>{
        controller.userControllers.updateUserController(req,res);
    })
}

function initEmailFolderRoutes(){
    router.post('/folder',(req,res)=>{
        controller.folderControllers.createFolderController(req,res);
    })
    router.get('/folder/user/',(req,res)=>{
        controller.folderControllers.getFolderByUserIdController(req,res);
    })
    router.delete('/folder/:id',(req,res)=>{
        controller.folderControllers.deleteFolderController(req,res);
    })
    router.put('/folder/:id',(req,res)=>{
        controller.folderControllers.updateFolderController(req,res)
    })
}

function initGoogleAuth(){
    router.get('/auth/google/login',(req,res)=>{
        controller.auth.googleAuthLogin(req,res);
    })
    router.get('/auth/google/callback',(req,res)=>{
        controller.auth.googleAuthCallback(req,res);
    })
}

function initEmail(){
    router.post('/sendemail',(req,res)=>{
        controller.email.sendEmailController(req,res);
    })
    router.get('/email/thread',(req,res)=>{
        controller.email.treadEmailsController(req,res);
    })
    router.get('/email/folder/:folderid/thread',(req,res)=>{
        controller.email.getEmailFolderThreadController(req,res);
    })
}
init();
module.exports = router;