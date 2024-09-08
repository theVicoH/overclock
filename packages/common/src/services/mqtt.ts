// import { type MqttClient } from 'mqtt'

// let mqttClient: MqttClient | null = null

// export async function connectMqttClient(): Promise<MqttClient> {
//   if (!mqttClient) {
//     const mqtt = await import('mqtt/dist/mqtt')

//     const MQTT_BROKER_URL = "ws://ws.groupe1.hetic.arcplex.dev/ws"
//     const options = {
//       clientId: `mqtt_web_${Math.random().toString(16).slice(3)}`,
//       login: 'guest',
//       passcode: 'guest'
//     }
//     mqttClient = mqtt.connect(MQTT_BROKER_URL, options)

//     mqttClient.on('connect', () => {
//       console.log('MQTT connecté')
//     })

//     mqttClient.on('error', (error: Error) => {
//       console.error('Erreur de connexion MQTT :', error)
//     })

//     mqttClient.on('close', () => {
//       console.log('Connexion MQTT fermée')
//     })

//     mqttClient.on('reconnect', () => {
//       console.log('Tentative de reconnexion MQTT')
//     })

//     mqttClient.on('offline', () => {
//       console.log('MQTT est hors ligne')
//     })
//   }
//   return mqttClient
// }

// export async function subscribeToTopic(topic: string, onMessage: (message: string) => void): Promise<void> {
//   const client = await connectMqttClient()

//   client.subscribe(topic, (err: Error | null) => {
//     if (err) {
//       console.error(`Erreur lors de la souscription au topic : ${topic}`, err)
//     }
//   })

//   client.on('message', (receivedTopic: string, message: Buffer) => {
//     if (receivedTopic === topic) {
//       onMessage(message.toString())
//     }
//   })
// }

// export async function publishToTopic(topic: string, message: string): Promise<void> {
//   const client = await connectMqttClient()

//   client.publish(topic, message, (err?: Error) => {
//     if (err) {
//       console.error('Erreur lors de la publication du message', err)
//     }
//   })
// }

export { }