#ifndef SPIFFS_MANAGER_H
#define SPIFFS_MANAGER_H

#include <FS.h>
#include <SPIFFS.h>

class SPIFFSManager {
public:
    bool beginSPIFFS();
    bool readEnvFile(char* ssid_wifi, char* password_wifi, char* mqtt_server, int& mqtt_port, 
                 IPAddress& localIP, IPAddress& localGateway, IPAddress& localSubnet, 
                 IPAddress& primaryDNS, IPAddress& secondaryDNS);

};

#endif
