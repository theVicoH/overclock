#include "MQTTManager.h"

void MQTTManager::setupMQTTClient(PubSubClient& client, const char* server, int port) {
    client.setServer(server, port);
    // Ajouter d'autres configurations si nécessaires
}
void reconnect(PubSubClient& client){
     // Loop until we're reconnected
        while (!client.connected())
        {
            Serial.print("Attempting MQTT connection...");
            // Attempt to connect
            if (client.connect("ESP32ClientBis"))
            {
                Serial.println("connected");
                // Subscribe
                client.subscribe("esp32bis/ajustments");
            }
            else
            {
                Serial.print("failed, rc=");
                Serial.print(client.state());
                Serial.println(" try again in 5 seconds");
                // Wait 5 seconds before retrying
                delay(5000);
            }
        }
}
