

module.exports = function makeFetchEmailDetails({
    Kafka,
    fetchEmailDetails,
    deleteUserKafkaTopic
}){
     return async function fatchEmailDetails(){
       

         let data;
        try{
            const kafka=new Kafka({
                clientId:'Email-client',
                brokers:['localhost:9092']
            });
            const consumer = kafka.consumer({ groupId:'fetch-emails' });
            
            await consumer.connect();
            await consumer.subscribe({ topic:'fetchEmailDetails'});
            await consumer.run({
                eachMessage: async({ topic, partition, message }) => {
                    console.log("fetch email details handler");
                     data = JSON.parse(message.value.toString());
                    console.log("*****handler of details**",data.folderid)
                    if(data?.userId)
                        await deleteUserKafkaTopic({uniqueid:'fetchEmailDetails'+data.userId+data.message.id,tenant:'test1'})
                    await fetchEmailDetails({accessToken:data.accessToken,refToken:data.refToken,message:data.message,userId:data.userId,folderid:data.folderid});
                }
              })
        }
        catch(e){
           console.log(`error:${e}`)
        }
        finally{
            if(data?.userId)
                await deleteUserKafkaTopic({uniqueid:'fetchEmailDetails'+'-'+data.userId+data.message.id,tenant:'test1'})
        }
        
     }
}