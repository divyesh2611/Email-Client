module.exports = function makeAddUserKafkaTopicUsecase({
    addUserKafkaTopic
}){
    return async function addUserKafkaTopicUsecase({
        uniqueid,tenant
    }){
        console.log("*********adduserkafka************");
            console.log('uniqueid',uniqueid);
            console.log('tenant',tenant)
       await addUserKafkaTopic({uniqueid,tenant});
    }
}
