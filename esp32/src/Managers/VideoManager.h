#ifndef VIDEO_MANAGER_H
#define VIDEO_MANAGER_H

#include <ESPAsyncWebServer.h>
#include <WebSocketsClient.h>

class VideoManager
{
private:
    /* data */
public:
    static void loopTask_Camera_WS(void *pvParameters);
    static void onVideoEvent(AsyncWebSocket *server, AsyncWebSocketClient *client, AwsEventType type, void *arg, uint8_t *data, size_t len , bool videoFlag, AsyncWebSocket& wsCar);
};

#endif