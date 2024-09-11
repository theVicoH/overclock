#ifndef COMMAND_PROCESSOR_H
#define COMMAND_PROCESSOR_H

#include <ArduinoJson.h>
#include <ESPAsyncWebServer.h>

class CommandProcessor {
public:
    void processCommand(const char* jsonData, AsyncWebSocket& ws, 
                        unsigned long& startTime, bool& timerActive, 
                        int& data_total_0, int& data_total_1, 
                        int& data_total_2, int& data_total_3, 
                        bool& videoFlag, int& race_id, bool& race_change);

private:
    void notifyClients(AsyncWebSocket& ws);
    void handleMotorCommand(JsonArray& data, 
                            unsigned long& startTime, bool& timerActive, 
                            int& data_total_0, int& data_total_1, 
                            int& data_total_2, int& data_total_3);
    void handleEmotionCommand(int mode);
    void handleServoCommand(JsonArray& angles);
    void handleLEDModeCommand(int mode);
    void handleLEDColor1Command(JsonArray& colors);
    void handleLEDColor2Command(JsonArray& colors);
    void handleBuzzerAlarmCommand(bool alarm);
    void handleBuzzerVariableCommand(JsonArray& buzzerData);
    void handleVideoActivationCommand(bool activation, bool& videoFlag);
    void handleRaceCommand(int race_id, bool& race_change);
    void handleTrackModeCommand(int mode);
};

#endif // COMMAND_PROCESSOR_H
