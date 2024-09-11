#include "WiFiManager.h"
#include <Arduino.h>

bool WiFiManager::configureWiFi(IPAddress localIP, IPAddress localGateway, IPAddress localSubnet, 
                                IPAddress primaryDNS, IPAddress secondaryDNS) {
    if (!WiFi.config(localIP, localGateway, localSubnet, primaryDNS, secondaryDNS)) {
        Serial.println("STA Failed to configure");
        return false;
    }
    return true;
}

void WiFiManager::connectToWiFi(const char* ssid, const char* password) {
    WiFi.mode(WIFI_STA);
    WiFi.begin(ssid, password);

    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.println("Connexion WiFi en cours...");
    }

    Serial.println("WiFi connecté");
    Serial.print("Adresse IP: ");
    Serial.println(WiFi.localIP());
}

void WiFiManager::testDNS(){
    Serial.print("Testing DNS resolution: ");
    IPAddress ip;
    if (WiFi.hostByName("google.com", ip))
    {
        Serial.print("DNS OK: ");
        Serial.println(ip);
    }
    else
    {
        Serial.println("DNS Failed");
    }
}

void WiFiManager::testInternetConnectivity(){
    Serial.print("Testing Internet connectivity: ");
    WiFiClient client;
    if (client.connect("93.184.216.34", 80)) 
    {
        Serial.println("Internet connection OK");
        client.stop();
    }
    else
    {
        Serial.println("Internet connection failed");
    }
}

