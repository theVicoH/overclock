#ifndef VIDEO_MANAGER_H
#define VIDEO_MANAGER_H

#include <ESPAsyncWebServer.h>
#include <WebSocketsClient.h>


class VideoManager
{
private:
        
public:
     void start_server_camera();
     void video_stream(AsyncWebServer *server);
     static void loopTask_Camera_WS(void *pvParameters);
     static void loopTask_Camera(void *pvParameters);
     void onVideoEvent(AsyncWebSocket *server, AsyncWebSocketClient *client, AwsEventType type, void *arg, uint8_t *data, size_t len , bool videoFlag, AsyncWebSocket& wsCar);
};

#endif