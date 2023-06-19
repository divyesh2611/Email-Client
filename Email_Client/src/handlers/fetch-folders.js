module.exports = function makeFetchFolder({
    Kafka,
    accessTokenGroupId,
    accessTokenTopic,
    folderFetch,
    deleteUserKafkaTopic
})
{
    return async function fetchFolder()
    {
        
        let data;
       try{
        const kafka=new Kafka({
            clientId:'Email-client',
            brokers:['localhost:9092']
        });
        const consumer = kafka.consumer({ groupId:'fetchFolder' });
        
        await consumer.connect();
        await consumer.subscribe({ topic:'fetchfolder'});
        await consumer.run({
            eachMessage: async({ topic, partition, message }) => {
                console.log("resultttttttttttttttt:",{
                    partition,
                    offset: message.offset,
                    value: message.value.toString(),
                });
                console.log("message",(JSON.parse(message.value.toString())));
                data = JSON.parse(message.value.toString());
                if(data?.id)
                   await deleteUserKafkaTopic({uniqueid:'fetchfolder'+'-'+data.id,tenant:'test1'})
                await folderFetch({userId:data.id,accessToken:data.accessToken,refToken:data.refToken});
                
            }
            
          })

       }
       catch(e){
            console.log(`error${e}`)
       }
       finally{
        if(data?.id)
          await deleteUserKafkaTopic({uniqueid:'fetchfolder'+data.id,tenant})
       } 
    }
}