#include "SPIFFSManager.h"
#include <Arduino.h>

bool SPIFFSManager::beginSPIFFS() {
    if (!SPIFFS.begin(true)) {
        Serial.println("An error occurred while mounting SPIFFS");
        return false;
    }
    return true;
}

bool SPIFFSManager::readEnvFile(char* ssid_wifi, char* password_wifi, char* mqtt_server, int& mqtt_port, 
                                IPAddress& localIP, IPAddress& localGateway, IPAddress& localSubnet, 
                                IPAddress& primaryDNS, IPAddress& secondaryDNS) {
    File envFile = SPIFFS.open("/.env", "r");
    if (!envFile) {
        Serial.println("Failed to open .env file for reading");
        return false;
    }

    while (envFile.available()) {
        String line = envFile.readStringUntil('\n');
        line.trim(); 

        if (line.startsWith("WIFI_SSID=")) {
            strncpy(ssid_wifi, line.substring(10).c_str(), 32);
        } else if (line.startsWith("WIFI_PASSWORD=")) {
            strncpy(password_wifi, line.substring(14).c_str(), 32);
        } else if (line.startsWith("MQTT_SERVER=")) {
            strncpy(mqtt_server, line.substring(12).c_str(), 32);
        } else if (line.startsWith("MQTT_PORT=")) {
            mqtt_port = line.substring(10).toInt();
        } else if (line.startsWith("LOCAL_IP=")) {
            localIP.fromString(line.substring(9));
        } else if (line.startsWith("LOCAL_GATEWAY=")) {
            localGateway.fromString(line.substring(14));
        } else if (line.startsWith("LOCAL_SUBNET=")) {
            localSubnet.fromString(line.substring(13));
        } else if (line.startsWith("PRIMARY_DNS=")) {
            primaryDNS.fromString(line.substring(12));
        } else if (line.startsWith("SECONDARY_DNS=")) {
            secondaryDNS.fromString(line.substring(14));
        }
    }

    envFile.close();
    return true;
}
