const { database } = require("../../config/database.config");
const attachment = require("../attachment");


module.exports = function makeFetchEmailDetailsUsecase({
    oauth2Client,
    google,
    addEmail,
    recipientDbMethods,
    fetchAttachment,
    parseEmail,
    insertEmailFolderAsso,
    updateEmailHtmlBody
}) {
    return async function fetchEmailDetails({
        accessToken, refToken, message, userId,folderid
    }) {
        console.log("************folderid********",folderid);
        
        oauth2Client.setCredentials({
            access_token: accessToken,
            refresh_token: refToken,
        });


        const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

        const email = await gmail.users.messages.get({
            userId: 'me',
            id: message.id,
            format: 'full'
        });
        const result = await parseEmail({ email:email.data })

        console.log("********************** Email **********************");
        console.log("result",result)
        console.log("messageid", message.id)
         let emailid;
         emailid = await addEmail({ threadId: result.threadId, fromdata:result.headers.from,
            snippet: result.snippet, userId, msgId: result.id, database: 'test1', bodyHtml: result.textHtml, bodyText: result.textPlain, subject: result.headers.subject,createdat:result.internalDate })

        
        
        if(result.attachments){
            for(let i=0;i<result.attachments.length;i++){
                await fetchAttachment({ messageId: message.id, accessToken, refToken, emailid, attachment:result.attachments[i],type:'attachment' })
            }
        }
        let attachmentPath = [];
        let bodyHtml = result.textHtml;
        if(result.inline){
            
            for(let i=0;i<result.inline.length;i++){
                if(result.inline[i].attachmentId)
                  attachmentPath[i] =  await fetchAttachment({ messageId: message.id, accessToken, refToken, emailid, attachment:result.inline[i],type:'inline' })
            }

            for(let i=0;i<attachmentPath.length;i++){
                let cid = result.inline[i].headers['content-id'].slice(1,result.inline[i].headers['content-id'].length-1)
                console.log("cid",cid,"  ",attachmentPath[i],bodyHtml);
                 bodyHtml=  bodyHtml.replace(cid,attachmentPath[i]);
            }
             await updateEmailHtmlBody({bodyHtml,emailid});
            
        }

        
        await recipient({ emailid, to: result.headers.to, bcc: result.headers.bcc, cc: result.headers.cc, database });

        await insertEmailFolderAsso({folderid,emailid,database});
    }

    // async function insertCid(bodyHtml,attachmentPath,cid){
    //     let result = bodyHtml.replace(cid, attachmentPath);
    //     return result
    // }
      

    async function recipient({ emailid, to, cc, bcc, database }) {
        console.log("recipient obj ", emailid, cc, bcc, to, database)
        if (to) {
            await recipientDbMethods.addRecipientTo({ emailid, emailAddress: to, database })
        }
        if (bcc) {
            await recipientDbMethods.addRecipientBcc({ emailid, emailAddress: bcc, database })
        }
        if (cc) {
            await recipientDbMethods.addRecipientCc({ emailid, emailAddress: cc, database })
        }
    }



}





// part {
//     partId: '1',
//     mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
//     filename: 'InventoryMgmt django.pptx',
//     headers: [
//       {
//         name: 'Content-Type',
//         value: 'application/vnd.openxmlformats-officedocument.presentationml.presentation; name="InventoryMgmt django.pptx"'
//       },
//       {
//         name: 'Content-Disposition',
//         value: 'attachment; filename="InventoryMgmt django.pptx"'
//       },
//       { name: 'Content-Transfer-Encoding', value: 'base64' },
//       { name: 'Content-ID', value: '<f_lgnc8bmv0>' },
//       { name: 'X-Attachment-Id', value: 'f_lgnc8bmv0' }
//     ],
//     body: {
//       attachmentId: 'ANGjdJ9gUiKWJMcuTR1J9mSul9ISBhUXBSWg1JKynexKuHhda4Xvtp1QrgecJeOfD9kuOc7HQT2V75TDaBFsCasK89L3QUJ5Az94bpYuZF_clHGWOf4F7t5XS-rXYdPJyeRHChE3JZxElR2p4y0MU6N7luMaTRvfpIyQYkIwCtREogXKh1w7lHEjsh3kWH1CvjQaukRFYSQjrdFe6qvhj5NuSynKN7QCMtfP3ERHadzQuzavJAUKI-S0g_d5A9Z9DDZ2esyBz0ajYs4XWYJUUs9mpbMLgShdZ1OlkOFKn2W56Oudwo7u6NL8AxW-ftf-i3REfl29I0182jRXNvgMFVK4Wm3rFPwtfTqy_yCTIvYOvKAhgM9SzPo7MoMFYLmz1UBXSeCt2MlSlbnFOoEG',
//       size: 6001455
//     }
//   }