

module.exports = function makeKafkaProducerUsecase({
Kafka,
addUserKafkaTopic,
checkUserKafkaTopic
}){
    return async function kafkaProducer({
     topic,
     msg,
     userId,
     database
    }){
        
        // console.log("in kafka producer dalkjflkdssssssssssssssssssssssssssss")
        const kafka = new Kafka({
            clientId:'Email-client',
            brokers:['localhost:9092']
        })
        const producer = kafka.producer();
        let result;
        if(topic == 'fetchEmailDetails'){
            result = await checkUserKafkaTopic({uniqueid:topic+'-'+userId+msg.message.id,tenant:database})
        }
             
        else
            result = await checkUserKafkaTopic({uniqueid:topic+'-'+userId,tenant:database})

        await producer.connect();
        
        if(!result[0]){
            await producer.send({
                topic: topic,
                messages: [
                    
                    { value:JSON.stringify(msg) }
                ]
            })
            if(topic == 'fetchEmailDetails')
                await addUserKafkaTopic({uniqueid:topic+'-'+userId+msg.message.id,tenant:database});
            else
                await addUserKafkaTopic({uniqueid:topic+'-'+userId,tenant:database});
        }
        
    }
}