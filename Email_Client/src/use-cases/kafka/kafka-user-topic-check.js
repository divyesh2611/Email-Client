module.exports = function makeCheckUserKafkaTopicUsecase({
    checkUserKafkaTopic
    }){
        return async function checkUserKafkaTopicUsecase({
            uniqueid,tenant
        }){
            console.log("*********checkuserkafka************");
            console.log('uniqueid',uniqueid);
            console.log('tenant',tenant);
          return await checkUserKafkaTopic({uniqueid,tenant});
        }
}    