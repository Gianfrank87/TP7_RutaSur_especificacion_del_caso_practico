import { MongoClient } from 'mongodb';
export async function db(){ const c=new MongoClient(process.env.MONGO_URI||'mongodb://mongo:27017/?replicaSet=rs0'); await c.connect(); return c.db('rutasur'); }
export async function once(col,consumer,eventId){ try{await col.insertOne({consumer,eventId,at:new Date()});return true;}catch(e){if(e.code===11000)return false;throw e;} }
