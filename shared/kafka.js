import { Kafka } from 'kafkajs';
export function kafka(clientId){ return new Kafka({clientId,brokers:[process.env.KAFKA_BROKER||'kafka:9092']}); }
export async function publish(producer,topic,event){ await producer.send({topic,messages:[{key:event.shipmentId,value:JSON.stringify(event)}]}); }
export function parse(message){ return JSON.parse(message.value.toString()); }
