#ifndef WIFI_MANAGER_H
#define WIFI_MANAGER_H

#include <WiFi.h>

class WiFiManager {
public:
    bool configureWiFi(IPAddress localIP, IPAddress localGateway, IPAddress localSubnet, 
                       IPAddress primaryDNS, IPAddress secondaryDNS);
    void connectToWiFi(const char* ssid, const char* password);
    void testDNS();
    void testInternetConnectivity();
};

#endif
    