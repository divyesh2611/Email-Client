module.exports = function makeSendEmailController({
sendEmail
}){
    return async function sendEmailController(req,res){
       try{
        await sendEmail({emailAddress:req.body.emailAddress,database:req.headers.database})
        res.send("email send successfully")
       }
       catch(e){
         res.send(`error: ${e}`).status(400);
       }
        
    }
}