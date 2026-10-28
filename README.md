# RutaSur - Logística orientada a eventos

Trabajo práctico de Programación Avanzada. La solución simula el seguimiento de envíos de un operador de última milla usando Kafka como log de eventos, servicios Node.js independientes, MongoDB como modelo de lectura y Next.js para la interfaz.

## Ejecutar

Requisitos: Docker y Docker Compose.

```bash
docker compose up --build
```

Servicios disponibles:

- Torre de control: http://localhost:3000
- Kafka UI: http://localhost:8080
- Simulador: http://localhost:3010

## Escenarios

Desde la sección Demo de la torre de control se pueden disparar:

- Envío feliz
- Ausente
- Demorado
- Tercer fallo
- Evento malformado

## Topics

- `envios.estados`
- `envios.promesas`
- `envios.reprogramaciones`
- `alertas.sla`
- `notificaciones.enviadas`
- `envios.estados.dlq`

## Servicios

- `simulator`: genera eventos de origen.
- `projector`: mantiene las vistas de lectura en MongoDB.
- `notifications`: registra avisos ante fallos y alertas.
- `rescheduler`: decide qué hacer después de una entrega fallida.
- `sla-monitor`: detecta riesgo de incumplimiento.
- `analytics`: actualiza métricas agregadas.
- `web`: torre de control, detalle, tracking y analítica.

La comunicación entre servicios se realiza únicamente mediante Kafka.
