module.exports = function makeFetchAttachmentUsecase({
    oauth2Client,
    google,
    fs,
    insertAttachment
}){
        return async function fetchAttachment({
            attachment,messageId,accessToken,refToken,emailid,type
        }){
          
          console.log("*****************attachment********: ", attachment)
            oauth2Client.setCredentials({
                access_token: accessToken,
                refresh_token: refToken,
            });
    
            const gmail = google.gmail({version:'v1',auth:oauth2Client});
            
            const attachmentData = await gmail.users.messages.attachments?.get({ userId: 'me', messageId:messageId, id: attachment.attachmentId });
            // console.log(`Downloading attachment ${fileName}`);
            // console.log("data",attachmentData)
            const data =attachmentData.data
            const size = attachmentData.data.size
            const buffer = Buffer.from(data.data,'base64');
            const fileName = attachment.filename;
            let  attachmentPath ;
            
            if(type == 'attachment')
               attachmentPath = '/home/ad.rapidops.com/divyesh.parmar/Desktop/clean_code/Email_Client/src/public/attachments/' + fileName;
            else 
              attachmentPath = '/home/ad.rapidops.com/divyesh.parmar/Desktop/clean_code/Email_Client/src/public/inlineAttachments/' + fileName;
            await insertAttachment({path:attachmentPath,emailid,fileName,size})
            fs.writeFile(attachmentPath, buffer, function (err) {
              if (err) {
                console.error(err);
                return;
              }
              console.log(`Attachment stored in ${attachmentPath}`);
            });
            return attachmentPath;
        }
}