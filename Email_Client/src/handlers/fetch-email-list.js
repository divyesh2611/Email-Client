module.exports = function makeFetchEmail({
    Kafka,
    getEmailsListByFolder,
    deleteUserKafkaTopic
})
{
    return async function fetchEmail()
    {
        let data;
      try{
        const kafka=new Kafka({
            clientId:'Email-client',
            brokers:['localhost:9092']
        });
        const consumer = kafka.consumer({ groupId:'fetch-mail' });
        await consumer.connect();
        await consumer.subscribe({ topic:'fetchEmail'});
        await consumer.run({
            eachMessage: async({ topic, partition, message }) => {
                console.log("fetch email list handler")
                data = JSON.parse(message.value.toString()); 
                console.log("data",data)
                if(data?.userId)
                    await deleteUserKafkaTopic({uniqueid:'fetchEmail'+data.userId,tenant:'test1'})
                await getEmailsListByFolder({accessToken:data.accessToken,refToken:data.refToken,userId:data.userId,nextPageToken:data.nextPageToken});
            }
          })
      }
      catch(e){
         console.log(`error:${e}`)
      }
      finally{
        if(data?.userId)
         await deleteUserKafkaTopic({uniqueid:'fetchEmail'+'-'+data.userId,tenant:'test1'})
      }

     }
}

