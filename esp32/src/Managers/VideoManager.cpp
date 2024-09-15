#include "VideoManager.h"
#include <Arduino.h>
#include <ESPAsyncWebServer.h>
#include <WebSocketsClient.h>
#include "esp_camera.h"
#include <WiFi.h>
#include <WiFiClient.h>
#include <WiFiAP.h>
#include <ESPAsyncWebServer.h>

#define STREAM_CONTENT_BOUNDARY "123456789000000000000987654321"


WiFiServer server_Camera(7000);

extern WebSocketsClient webSocket;

void VideoManager::loopTask_Camera_WS(void *pvParameters){
    bool* videoFlag = static_cast<bool*>(pvParameters);  // Conversion du paramètre en bool*

    while (1)
    {
        // Boucle du WebSocket pour gérer les connexions
        webSocket.loop();

        // Si la vidéo est activée et que le WebSocket est connecté
        if (*videoFlag && webSocket.isConnected())
        {
            // Capturer une image de la caméra
            camera_fb_t *fb = esp_camera_fb_get();
            if (fb != NULL)
            {
                // Envoyer l'image binaire au serveur via WebSocket
                webSocket.sendBIN(fb->buf, fb->len);
                esp_camera_fb_return(fb);
            }
            else
            {
                // Si la capture échoue, envoyer un message texte au serveur
                webSocket.sendTXT("Couldn't retrieve video, retrying");
            }

            // Délai pour obtenir environ 2 images par seconde
            vTaskDelay(500 / portTICK_PERIOD_MS);
        }
        else
        {
            // Si la vidéo est désactivée ou que le WebSocket n'est pas connecté
            vTaskDelay(500 / portTICK_PERIOD_MS);
        }
    }
}

void VideoManager::loopTask_Camera(void *pvParameters){
    bool videoFlag = static_cast<bool>(pvParameters);  // Conversion du paramètre en bool*

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

void VideoManager::onVideoEvent(AsyncWebSocket *server, AsyncWebSocketClient *client, AwsEventType type, void *arg, uint8_t *data, size_t len, bool videoFlag, AsyncWebSocket& wsCar){
    switch (type)
    {
        case WS_EVT_CONNECT:
            // If connected to websocket, activation of the cam
            videoFlag = 1;
            break;
        case WS_EVT_DISCONNECT:
            Serial.printf("WebSocket client #%u disconnected\n", client->id());
            break;
        // For the moment
        case WS_EVT_DATA:
            wsCar.textAll("No data can be sent");
            break;
        case WS_EVT_PONG:
        case WS_EVT_ERROR:
            break;
    }
}

void VideoManager::start_server_camera(){
    server_Camera.begin(7000);
}

void VideoManager::video_stream(AsyncWebServer *server){
      server->on("/", HTTP_GET, [](AsyncWebServerRequest *request)
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
    server->begin();
}