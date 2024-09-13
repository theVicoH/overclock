#include "MQTTManager.h"

void MQTTManager::setupMQTTClient(PubSubClient& client, const char* server, int port) {
    client.setServer(server, port);
    // Ajouter d'autres configurations si nécessaires
}
