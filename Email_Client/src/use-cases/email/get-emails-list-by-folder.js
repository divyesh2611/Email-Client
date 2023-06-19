module.exports = function makeGetEmailsListByFolderUsecase({
    google,
    oauth2Client,
    database,
    kafkaProducer,
    getFolderByPriority,
    updateFolderSyncstatus
}){
    return async function getEmailsListByFolder({accessToken,refToken,userId,nextPageToken}){
      
     console.log("nextpage token form consumer",nextPageToken)
  
        oauth2Client.setCredentials({
          access_token: accessToken,
          refresh_token: refToken,
        });
        
            const gmail = google.gmail({version:'v1',auth:oauth2Client});
        
            const folder  = await getFolderByPriority({userId,database});
            let result =await gmail.users.messages.list({
                    userId: 'me',
                    q: `newer_than:d`,
                    pageToken:nextPageToken,
                    labelIds:`${folder.foldername}`,
                    // maxResults:10
                });

             nextPageToken = result.data.nextPageToken;
             const kafkaMessage = {
                accessToken,refToken,userId,nextPageToken
             }
                for(let i=0;i<result.data.messages?.length;i++){
                    console.log("call kafka for details")
                    const msg = {accessToken,refToken,message:result.data.messages[i],userId,folderid:folder.folderid}
                    await kafkaProducer({msg,topic:'fetchEmailDetails',userId,database})
                }
            
                if(nextPageToken){
                    await updateFolderSyncstatus({foldername:folder.foldername,userId,nextPageToken,syncstatus:"fetching",database})
                } 
                else {
                    await updateFolderSyncstatus({foldername:folder.foldername,userId,nextPageToken,syncstatus:'fetched',database})
                    console.log('no next page token is');
                } 
                await kafkaProducer({msg:kafkaMessage,topic:'fetchEmail',userId,database})
    }
}

