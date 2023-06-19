const makeAddUserKafkaTopicUsecase = require('./kafka-user-topic');
const makeCheckUserKafkaTopicUsecase = require('./kafka-user-topic-check');
const makedeleteUserKafkaTopicUsecase  = require('./kafka-user-topic-delete');
const dbMethods = require('../../data-access');
const addUserKafkaTopic= makeAddUserKafkaTopicUsecase({
   addUserKafkaTopic: dbMethods.cockroachDb.kafkaDbMethod.addUserKafkaTopic
})
const checkUserKafkaTopic = makeCheckUserKafkaTopicUsecase({
    checkUserKafkaTopic : dbMethods.cockroachDb.kafkaDbMethod.checkUserKafkaTopic
})
const deleteUserKafkaTopic = makedeleteUserKafkaTopicUsecase({
    deleteUserKafkaTopic: dbMethods.cockroachDb.kafkaDbMethod.deleteKafkaTopic
})

module.exports = Object.freeze({
    addUserKafkaTopic,
    checkUserKafkaTopic,
    deleteUserKafkaTopic
});