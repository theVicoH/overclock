#ifndef MQTT_MANAGER_H
#define MQTT_MANAGER_H

#include <PubSubClient.h>

class MQTTManager {
public:
    void setupMQTTClient(PubSubClient& client, const char* server, int port);
};

#endif
