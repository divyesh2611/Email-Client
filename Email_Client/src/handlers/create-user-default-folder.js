function makecreateDefaultFolderHandler({
    Kafka,
    createDefaultFolders,
    deleteUserKafkaTopic
})
{
    return async function defaultFolders()
    {
        let userId;
        try{
            const database = 'test1'
            const kafka=new Kafka({
                clientId:'Email-client',
                brokers:['localhost:9092']
            });
            const consumer = kafka.consumer({ groupId:'myConsumer' });
            await consumer.connect();
            await consumer.subscribe({ topic:'defaultFoldersTopic'});
            await consumer.run({
                eachMessage: async({ topic, partition, message }) => {
                    console.log("resultttttttttttttttt:",{
                        partition,
                        offset: message.offset,
                        value: message.value.toString(),
                    });
                    console.log("User idddddddddddddddddd",message.value.toString(),typeof (message.value));
                     userId =message.value.toString();
                    console.log("userid",userId)
                    if(userId)
                        await deleteUserKafkaTopic({uniqueid:'defaultFoldersTopic'+userId,tenant:"test1"})
                    await createDefaultFolders( { userId:userId,database } );
                }
            })
        }
        catch(e){
           console.log(`error:${e}`)
        }
        finally{
            if(userId)
              await deleteUserKafkaTopic({uniqueid:'defaultFoldersTopic'+'-'+userId,tenant:'test1'})
        }
    }
}
module.exports = makecreateDefaultFolderHandler;