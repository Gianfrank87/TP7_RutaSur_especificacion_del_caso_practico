export const TOPICS = {
  estados:'envios.estados', promesas:'envios.promesas', reprogramaciones:'envios.reprogramaciones',
  alertas:'alertas.sla', notificaciones:'notificaciones.enviadas', dlq:'envios.estados.dlq'
};
export const ESTADOS=['CREADO','INGRESADO_HUB','CLASIFICADO','EN_REPARTO','ENTREGADO','ENTREGA_FALLIDA'];
export const MOTIVOS=['AUSENTE','DIRECCION_INCORRECTA','RECHAZADO','ZONA_INACCESIBLE'];
export function envelope({shipmentId,tipo,secuencia=1,payload={}}){
  return {eventId:crypto.randomUUID(),shipmentId,tipo,ocurridoEn:new Date().toISOString(),secuencia,version:1,...payload};
}
