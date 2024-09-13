#include "VideoManager.h"
#include <Arduino.h>
#include <ESPAsyncWebServer.h>
#include <WebSocketsClient.h>
#include "esp_camera.h"

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