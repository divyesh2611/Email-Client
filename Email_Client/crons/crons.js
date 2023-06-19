const {Kafka} = require('kafkajs');

async function runProducer(userId)
{
    const kafka = new Kafka({
        clientId:'Email-client',
        brokers:['localhost:9092']
    })
    const producer = kafka.producer();
    
    await producer.connect();
    await producer.send({
        topic: 'updateAccessToken',
        messages: [
            {
                value:"produser publised"
            }
        ]
    })
    console.log("producer send the message");
}

runProducer();