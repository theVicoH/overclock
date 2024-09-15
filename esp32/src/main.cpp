    #include <Arduino.h>
    #include <WiFi.h>
    #include <WiFiClient.h>
    #include <WiFiAP.h>
    #include "esp_camera.h"
    #include "Freenove_4WD_Car_WiFi.h"
    #include "Freenove_4WD_Car_Emotion.h"
    #include "Freenove_4WD_Car_WS2812.h"
    #include "Freenove_4WD_Car_For_ESP32.h"
    #include <PubSubClient.h>
    #include <AsyncTCP.h>
    #include <ESPAsyncWebServer.h>
    #include <ArduinoJson.h>
    #include <limits.h>
    #include <SPIFFS.h>
    #include <functional>
    #include <WebSocketsClient.h>
    #include "Managers/SPIFFSManager.h"
    #include "Managers/WiFiManager.h"
    #include "Managers/MQTTManager.h"
    #include "Managers/PublishManager.h"
    #include "Managers/CommandProcessor.h"
    #include "Managers/VideoManager.h"
    

    WebSocketsClient webSocket;
    WiFiClient espClient;
    PubSubClient client(espClient);
    SPIFFSManager spiffsManager;
    WiFiManager wifiManager;
    MQTTManager mqttManager;
    CommandProcessor commandProcessor;
    PublishToTopicManager publishToTopic;
    // VideoManager Video;

    #define STREAM_CONTENT_BOUNDARY "123456789000000000000987654321"

    // Ressources
    // https://randomnerdtutorials.com/esp32-websocket-server-arduino/#1
    // https://randomnerdtutorials.com/esp32-mqtt-publish-subscribe-arduino-ide/
    // https://randomnerdtutorials.com/esp32-static-fixed-ip-address-arduino-ide/
    // https://github.com/Freenove/Freenove_4WD_Car_Kit_for_ESP32/tree/master

    bool videoFlag = 0;
    long last_message = 0;
    int distance[4];          // Storage of ultrasonic data
    int sensor_v;             // Int cast of track sensor data
    char buff[6];             // Buffer to store the battery voltage data
    char ultrasonic_buff[10]; // Buffer to store the Ultrasonic data
    char distance_buff[10];   // Buffer to store the distance
    char speed_buff[10];      // Buffer to store the speed
    char race_id_buffer[10];  // buffer to store the rice_id

    // Variables for the timer
    unsigned long startTime = 0;
    bool timerActive = false;

    // mode variable
    int mode = 0;

    // variable du calcul de distance 
    int data_total_0 = 0;
    int data_total_1 = 0;
    int data_total_2 = 0;
    int data_total_3 = 0;
    float total_Distance = 0.0;

    // Variable vitesse 
    float total_speed = 0.0;

    // race variable
    int race_id = 0;
    bool race_change = false;

    const char* websocket_server_url = "api.clementpnn.com";
    const uint16_t websocket_server_port = 3000; // Port standard HTTP
    const char* websocket_path = "/video";
    
    // Variables pour le WiFi et MQTT
    char ssid_wifi[32];            // Le nom du réseau WiFi
    char password_wifi[32];        // Le password du WiFi
    char mqtt_server[32];          // L'IP de votre broker MQTT
    int mqtt_port;
    int mqtt_interval_ms = 5000;   // L'interval en ms entre deux envois de données

    WiFiServer server_Camera(7000);

    IPAddress localIP;
    IPAddress localGateway;
    IPAddress localSubnet;
    IPAddress primaryDNS;
    IPAddress secondaryDNS;
    AsyncWebServer server(80);
    AsyncWebSocket ws("/ws"); // Changez le nom de ce point d'accès pour "sécuriser" l'accès à votre voiture
    AsyncWebSocket wsCar("/wsCar");;

    // put function declarations here:
    void WiFi_Init();
    void handleWebSocketMessage(void *arg, uint8_t *data, size_t len);
    void onEvent(AsyncWebSocket *server, AsyncWebSocketClient *client, AwsEventType type, void *arg, uint8_t *data, size_t len);
    void initWebSocket();
    void reconnect();
    void loopTask_Camera(void *pvParameters);

    void WiFi_Init()
    {
        ssid_Router = ssid_wifi;         // Modify according to your router name
        password_Router = password_wifi; // Modify according to your router password
        ssid_AP = "Sunshine";            // ESP32 turns on an AP and calls it Sunshine
        password_AP = "Sunshine";        // Set your AP password for ESP32 to Sunshine
        frame_size = FRAMESIZE_CIF;      // 400*296
    }


    void handleMQTTMessage(char* topic, uint8_t* payload, unsigned int length) {
        payload[length] = '\0';  // Assure la terminaison de la chaîne
        commandProcessor.processCommand((char*)payload, ws, startTime, timerActive, 
                                        data_total_0, data_total_1, data_total_2, data_total_3, 
                                        videoFlag, race_id, race_change, mode);
    }

   void handleWebSocketMessage(void *arg, uint8_t *data, size_t len) {
        AwsFrameInfo *info = (AwsFrameInfo *)arg;

        if (info->final && info->index == 0 && info->len == len && info->opcode == WS_TEXT) {
            data[len] = 0;  // Assure la terminaison de la chaîne
            commandProcessor.processCommand((char*)data, ws, startTime, timerActive, 
                                            data_total_0, data_total_1, data_total_2, data_total_3, 
                                            videoFlag, race_id, race_change , mode);
        }
    }

   void setup() {
    
    Serial.begin(115200);
    Serial.setDebugOutput(true);

    // SPIFFS initialization and env file reading
    if (!spiffsManager.beginSPIFFS()) {
        return;
    }
    
    if (!spiffsManager.readEnvFile(ssid_wifi, password_wifi, mqtt_server, mqtt_port, 
                                   localIP, localGateway, localSubnet, primaryDNS, secondaryDNS)) {
        return;
    }

    // WiFi setup
    if (!wifiManager.configureWiFi(localIP, localGateway, localSubnet, primaryDNS, secondaryDNS)) {
        return;
    }
    wifiManager.connectToWiFi(ssid_wifi, password_wifi);

    // MQTT setup
    mqttManager.setupMQTTClient(client, mqtt_server, mqtt_port);
    client.setCallback(handleMQTTMessage);

    // Rest of the initialization
    Buzzer_Setup();
    WiFi_Init();
    server_Camera.begin(7000);
    WiFi_Setup(0);
    cameraSetup();
    camera_vflip(true);
    camera_hmirror(true);
    Emotion_Setup();
    WS2812_Setup();
    PCA9685_Setup();
    Light_Setup();
    Track_Setup();
    Ultrasonic_Setup();
    disableCore0WDT();
    // xTaskCreateUniversal(Video.loopTask_Camera_WS, "loopTask_Camera_WS", 8192, NULL, 0, NULL, 0);
     xTaskCreateUniversal(loopTask_Camera, "loopTask_Camera", 8192, NULL, 0, NULL, 0);
    xTaskCreateUniversal(loopTask_WTD, "loopTask_WTD", 8192, NULL, 0, NULL, 0);
    initWebSocket();

     server.on("/", HTTP_GET, [](AsyncWebServerRequest *request)
              { 
                camera_fb_t *fb = NULL;
                fb = esp_camera_fb_get();
                        if (fb != NULL)
                        {
                            uint8_t slen[4];
                            slen[0] = fb->len >> 0;
                            slen[1] = fb->len >> 8;
                            slen[2] = fb->len >> 16;
                            slen[3] = fb->len >> 24;
                            AsyncResponseStream *response = request->beginResponseStream("image");
                            // response->write(slen, 4);
                            response->write(fb->buf, fb->len);
                            request->send(response);
                            // client.write(slen, 4);
                            // client.write(fb->buf, fb->len);
                            // request->send_P(200, "application/octet-stream", fb->buf, fb->len);
                            // request->send(fb->buf, "application/octet-stream", fb->len);
                            // Serial.println("Camera send");
                            esp_camera_fb_return(fb);
                            fb = NULL;
                        } });
    server.begin();

    Emotion_SetMode(1);
    WS2812_SetMode(1);
    wifiManager.testDNS();
    wifiManager.testInternetConnectivity();
}
   
    void loop()
    {
        // put your main code here, to run repeatedly:
        ws.cleanupClients();
        wsCar.cleanupClients();

        Emotion_Show(emotion_task_mode); // Led matrix display function
        WS2812_Show(ws2812_task_mode);   // Car color lights display function

        // The MQTT part
        if (!client.connected())
        {
            reconnect();
        }
        client.loop();
        publishToTopic.publish(client, last_message, sensor_v, buff, ultrasonic_buff, distance_buff, speed_buff,
                               race_id_buffer, startTime, timerActive, total_Distance, total_speed, race_id,
                               race_change, mqtt_interval_ms, data_total_0 , data_total_1,data_total_2,data_total_3, mode);    
    }
    
    void webSocketEvent(WStype_t type, uint8_t *payload, size_t length) {
        switch (type) {
        case WStype_DISCONNECTED:
            Serial.println("Disconnected!");
            break;
        case WStype_CONNECTED:
            Serial.println("Connected to WebSocket server");
            break;
        case WStype_TEXT:
            Serial.printf("Received text: %s\n", payload);
            break;
        case WStype_BIN:
            Serial.println("Received binary data");
            break;
        }
    }

    void onEvent(AsyncWebSocket *server, AsyncWebSocketClient *client, AwsEventType type, void *arg, uint8_t *data, size_t len)
    {
        switch (type)
        {
        case WS_EVT_CONNECT:
            Serial.printf("WebSocket client #%u connected from %s\n", client->id(), client->remoteIP().toString().c_str());
            break;
        case WS_EVT_DISCONNECT:
            Serial.printf("WebSocket client #%u disconnected\n", client->id());
            break;
        case WS_EVT_DATA:
            handleWebSocketMessage(arg, data, len);
            break;
        case WS_EVT_PONG:
        case WS_EVT_ERROR:
            break;
        }
    }

    void initWebSocket()
    {
        ws.onEvent(onEvent);
        server.addHandler(&ws);
        // wsCar.onEvent([](AsyncWebSocket *server, AsyncWebSocketClient *client, AwsEventType type, void *arg, uint8_t *data, size_t len) {
        //      Video.onVideoEvent(server, client, type, arg, data, len, videoFlag, wsCar);
        // });
        server.addHandler(&wsCar);
        webSocket.begin(websocket_server_url, websocket_server_port, websocket_path);
        webSocket.onEvent(webSocketEvent);
    }

    void loopTask_Camera(void *pvParameters)
{
    while (1)
    {
        char size_buf[12];
        WiFiClient wf_client = server_Camera.available(); // listen for incoming clients
        if (wf_client)
        { // if you get a client
            Serial.println("Camera_Server connected to a client.");
            if (wf_client.connected())
            {
                camera_fb_t *fb = NULL;
                wf_client.write("HTTP/1.1 200 OK\r\nAccess-Control-Allow-Origin: *\r\nContent-Type: multipart/x-mixed-replace; boundary=" STREAM_CONTENT_BOUNDARY "\r\n");
                while (wf_client.connected())
                { // loop while the client's connected
                    if (videoFlag == 1)
                    {
                        fb = esp_camera_fb_get();
                        if (fb != NULL)
                        {
                            wf_client.write("\r\n--" STREAM_CONTENT_BOUNDARY "\r\n");
                            wf_client.write("Content-Type: image/jpeg\r\nContent-Length: ");
                            sprintf(size_buf, "%d\r\n\r\n", fb->len);
                            wf_client.write(size_buf);
                            wf_client.write(fb->buf, fb->len);

                            // uint8_t slen[4];
                            // slen[0] = fb->len >> 0;
                            // slen[1] = fb->len >> 8;
                            // slen[2] = fb->len >> 16;
                            // slen[3] = fb->len >> 24;
                            // wf_client.write(slen, 4);
                            // wf_client.write(fb->buf, fb->len);
                            // Serial.println("Camera send");
                            esp_camera_fb_return(fb);
                        }
                    }
                }
                // close the connection:
                wf_client.stop();
                Serial.println("Camera Client Disconnected.");
                // ESP.restart();
            }
        }
    }
}

    void reconnect()
    {
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
  