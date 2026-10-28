import express from 'express'; import {kafka,publish} from '../../../shared/kafka.js'; import {TOPICS,envelope} from '../../../shared/events.js';
const app=express(); app.use(express.json()); const k=kafka('simulator'); const p=k.producer(); await p.connect();
const seq=new Map(); const next=id=>{const n=(seq.get(id)||0)+1;seq.set(id,n);return n};
async function send(id,tipo,payload={}){const e=envelope({shipmentId:id,tipo,secuencia:next(id),payload});await publish(p,TOPICS.estados,e);return e}
async function happy(id){for(const s of ['CREADO','INGRESADO_HUB','CLASIFICADO','EN_REPARTO','ENTREGADO']){await send(id,s,{hubId:'HUB-1',zonaId:'Z1',repartidorId:'R-12'});await new Promise(r=>setTimeout(r,250));}}
app.post('/scenario/:name',async(req,res)=>{const id=req.body?.shipmentId||`RS-${Date.now()}`;const n=req.params.name;
 if(n==='feliz') await happy(id);
 else if(n==='ausente'){for(const s of ['CREADO','INGRESADO_HUB','CLASIFICADO','EN_REPARTO'])await send(id,s,{hubId:'HUB-1',zonaId:'Z2'});await send(id,'ENTREGA_FALLIDA',{motivo:'AUSENTE',intento:1,franja:'MANANA',hubId:'HUB-1',zonaId:'Z2'});}
 else if(n==='tercer-fallo'){for(const s of ['CREADO','INGRESADO_HUB','CLASIFICADO','EN_REPARTO'])await send(id,s,{zonaId:'Z3'});await send(id,'ENTREGA_FALLIDA',{motivo:'AUSENTE',intento:3,zonaId:'Z3'});}
 else if(n==='demorado'){await send(id,'CREADO',{hubId:'HUB-2',zonaId:'Z1'});await send(id,'INGRESADO_HUB',{hubId:'HUB-2',zonaId:'Z1'});await publish(p,TOPICS.promesas,envelope({shipmentId:id,tipo:'PROMESA_CREADA',payload:{venceEn:new Date(Date.now()+3*3600000).toISOString(),hubId:'HUB-2'}}));}
 else if(n==='malformado'){await p.send({topic:TOPICS.estados,messages:[{key:id,value:JSON.stringify({shipmentId:id,tipo:'???'})}]});}
 else return res.status(404).json({error:'escenario desconocido'}); res.json({shipmentId:id,scenario:n});});
app.listen(3010,()=>console.log('simulator :3010'));
