module.exports = function makeAccessTokenGenerate({
  Kafka,
  accessTokenGroupId,
  updateAccessToken,
  accessTokenTopic
}){
  return async function AccessTokenGenerate(){
    const kafka=new Kafka({
      clientId:'Email-client',
      brokers:['localhost:9092']
   });

   console.log("handler",accessTokenGroupId,
   updateAccessToken,
   accessTokenTopic)
      const consumer = kafka.consumer({ groupId:accessTokenGroupId });
    await consumer.connect();
    await consumer.subscribe({ topic:accessTokenTopic});
    try{
      await consumer.run({
        eachMessage: async({ topic, partition, message }) => {
            console.log("resultttttttttttttttt:",{
                partition,
                offset: message.offset,
                value: message.value.toString(),
            });
            console.log("message",(message.value.toString()),);
            await updateAccessToken();
        }
      })

    }
    catch(e){
       console.log(`error:${e}`)
    }
    finally{
       await deleteUserKafkaTopic({uniqueid:accessTokenTopic+userId,tenant})
    }
  }
}























const { OAuth2Client } = require('google-auth-library');
const dbMethods = require('../data-access/cockroach')
const {Kafka} = require('kafkajs');




// const REFRESH_TOKEN = '1//0gd1XWEXigUgWCgYIARAAGBASNwF-L9Irt-UITgfkxxyqgZnYnw8Nkl_9LfhVwvTc2qwSKImEl_xfgJ1SJVM_HnIgW2YHaqrOFys';



// const CRON_INTERVAL = '*/30 * * * *';
// const cron = require('node-cron');
// cron.schedule(CRON_INTERVAL, createAccessToken);
