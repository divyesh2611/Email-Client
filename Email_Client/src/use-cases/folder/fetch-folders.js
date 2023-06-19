

module.exports = function makeFetchFolder({
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI,
    google,
    OAuth2Client,
    createFolder,
    database,
    Joi,
    Kafka,
    addUserKafkaTopic,
    checkUserKafkaTopic
}){
    return async function fetchFolder({accessToken,refToken,userId}){
       
        console.log("fetch folder","databse",database)
        const messageObject = {
            userId:userId,
            accessToken: accessToken,
            refToken: refToken,
            nextPageToken:null
        }
        const messageValue = JSON.stringify(messageObject)
        const {error} = validateFetchFolder({accessToken,refToken});
        if(error){
            throw new Error(error.message);
        }

        const oauth2Client = new OAuth2Client(
          CLIENT_ID,
          CLIENT_SECRET,
          REDIRECT_URI
        );
        
        oauth2Client.setCredentials({
          access_token: accessToken,
          refresh_token: refToken,
        });
        
        const gmail = google.gmail({version:'v1',auth:oauth2Client});
        const result =await gmail.users.labels.list({
            userId: 'me',});
            // console.log("folder is fetch",result.data.labels)
        const folder_priority = {
            INBOX:1,
            CHAT:2,
            SENT:2,
            IMPORTANT:2,
            STARRED:3,
            UNREAD:3,
            ARCHIVED:4
        } 

       const folders = result.data.labels;
       let priority;
       let folderId;
       for(const folder of folders){
        // console.log("folder",folder.name)
        
           if(folder_priority[folder.name]){
             priority = folder_priority[folder.name];
           }
           else
             priority = 7;
             let syncstatus = 'standby'
             folderId =  await createFolder({userId,folderName:folder.name,database,providerId:folder.id,priority,syncstatus})
       }
       await runProducer(messageValue);
       function validateFetchFolder({accessToken,refToken}){
        const schema = Joi.object({
            accessToken:Joi.string().required(),
            refToken:Joi.string().required(),
        });
        return schema.validate({accessToken,refToken});
       }

       async function runProducer(messageValue)
    {
        const kafka = new Kafka({
            clientId:'Email-client1',
            brokers:['localhost:9092']
        })
        const producer = kafka.producer();
        
        await producer.connect();

        const fetchEmailTopicResult = await checkUserKafkaTopic({ uniqueid:'fetchEmail'+'-'+userId,tenant:database})
        if(!fetchEmailTopicResult[0]){
            await producer.send({
                topic: 'fetchEmail',
                messages: [
                    {
                        value:messageValue
                    }
                ]
            })
            await addUserKafkaTopic({
                uniqueid:'fetchEmail'+'-'+userId,tenant:database
            })
        
        }
        
           
        
       
    }
    }
}