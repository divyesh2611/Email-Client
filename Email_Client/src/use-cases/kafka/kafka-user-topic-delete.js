module.exports = function makedeleteUserKafkaTopicUsecase({
    deleteUserKafkaTopic
    }){
        return async function deleteUserKafkaTopicUsecase({
            uniqueid,tenant
        }){
            console.log('**********delete topic usecase*********');
            console.log('uniqueid',uniqueid);
            console.log('tenant',tenant);
           await deleteUserKafkaTopic({uniqueid,tenant});
        }
}    