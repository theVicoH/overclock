import mqtt from "mqtt"

// url in .env for delete the url in the code
const MQTT_BROKER_URL = process.env.BROCKER_URL || "ws://176.132.246.222:5702"
const options = {
  clientId: `mqtt_web_${Math.random().toString(16).slice(3)}`,
}

export const mqttClient = mqtt.connect(MQTT_BROKER_URL, options)

// console log for teste, remove it (my english is perfect)
export function mptt(topic: string, onMessage: (message: string) => void) {
  mqttClient.on('connect', () => {
    console.log('MQTT connected')
    mqttClient.subscribe(topic, (err) => {
      if (!err) {
        console.log(`Subscribed to topic: ${topic}`)
      } else {
        console.error(`Failed to subscribe to topic: ${topic}`, err)
      }
    })
  })

  mqttClient.on('message', (receivedTopic, message) => {
    if (receivedTopic === topic) {
      onMessage(message.toString())
    }
  })

  mqttClient.on('error', (error) => {
    console.error('MQTT error', error)
  })

  mqttClient.on('close', () => {
    console.log('MQTT connection closed')
  })
}