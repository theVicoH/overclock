#include "CommandProcessor.h"
#include <Arduino.h>
#include "Freenove_4WD_Car_WiFi.h"
#include "Freenove_4WD_Car_Emotion.h"
#include "Freenove_4WD_Car_WS2812.h"
#include "Freenove_4WD_Car_For_ESP32.h"

void CommandProcessor::processCommand(const char* jsonData, AsyncWebSocket& ws, 
                                      unsigned long& startTime, bool& timerActive, 
                                      int& data_total_0, int& data_total_1, 
                                      int& data_total_2, int& data_total_3, 
                                      bool& videoFlag, int& race_id, bool& race_change , int& mode) 
{
    StaticJsonDocument<200> doc;

    DeserializationError error = deserializeJson(doc, jsonData);
    if (error) {
        Serial.print("deserializeJson() failed: ");
        Serial.println(error.c_str());
        return;
    }

    int cmd = doc["cmd"];

    if (1 == cmd) {
        JsonArray data = doc["data"];
        handleMotorCommand(data, startTime, timerActive, data_total_0, data_total_1, data_total_2, data_total_3);
    } else if (2 == cmd) {
        int data = doc["data"];
        handleEmotionCommand(data);
    } else if (3 == cmd) {
        JsonArray angles = doc["data"];
        handleServoCommand(angles);
    } else if (4 == cmd) {
        int led_mode = doc["data"];
        handleLEDModeCommand(led_mode);
    } else if (5 == cmd) {
        JsonArray led_color = doc["data"];
        handleLEDColor1Command(led_color);
    } else if (6 == cmd) {
        JsonArray led_color_2 = doc["data"];
        handleLEDColor2Command(led_color_2);
    } else if (7 == cmd) {
        bool alarm = doc["data"] == 1;
        handleBuzzerAlarmCommand(alarm);
    } else if (8 == cmd) {
        JsonArray buzzer_data = doc["data"];
        handleBuzzerVariableCommand(buzzer_data);
    } else if (9 == cmd) {
        bool video_activation = doc["data"] == 1;
        handleVideoActivationCommand(video_activation, videoFlag);
    } else if (10 == cmd) {
        race_id = doc["data"];
        handleRaceCommand(race_id, race_change);
    } else if (11 == cmd) {
         mode = doc["data"];
        handleTrackModeCommand(mode);
    }

    notifyClients(ws);
}

void CommandProcessor::notifyClients(AsyncWebSocket& ws) {
    ws.textAll("ok");
}

void CommandProcessor::handleMotorCommand(JsonArray& data, 
                                          unsigned long& startTime, bool& timerActive, 
                                          int& data_total_0, int& data_total_1, 
                                          int& data_total_2, int& data_total_3) 
{
    int data_0 = data[0];
    int data_1 = data[1];
    int data_2 = data[2];
    int data_3 = data[3];

    Motor_Move(data_0, data_1, data_2, data_3);

    if (data_0 == 0 && data_1 == 0 && data_2 == 0 && data_3 == 0) {
        startTime = 0;
        timerActive = false;
    } else {
        startTime = millis();
        timerActive = true;
        data_total_0 = data_0;
        data_total_1 = data_1;
        data_total_2 = data_2;
        data_total_3 = data_3;
    }
}

void CommandProcessor::handleEmotionCommand(int mode) {
    Emotion_SetMode(mode);
}

void CommandProcessor::handleServoCommand(JsonArray& angles) {
    int angle_0 = angles[0];
    int angle_1 = angles[1];
    Servo_1_Angle(angle_0);
    Servo_2_Angle(angle_1);
}

void CommandProcessor::handleLEDModeCommand(int mode) {
    WS2812_SetMode(mode);
}

void CommandProcessor::handleLEDColor1Command(JsonArray& colors) {
    int color_0 = colors[0];
    int color_1 = colors[1];
    int color_2 = colors[2];
    int color_3 = colors[3];
    WS2812_Set_Color_1(color_0, color_1, color_2, color_3);
}

void CommandProcessor::handleLEDColor2Command(JsonArray& colors) {
    int color_0 = colors[0];
    int color_1 = colors[1];
    int color_2 = colors[2];
    int color_3 = colors[3];
    WS2812_Set_Color_2(color_0, color_1, color_2, color_3);
}

void CommandProcessor::handleBuzzerAlarmCommand(bool alarm) {
    Buzzer_Alarm(alarm);
}

void CommandProcessor::handleBuzzerVariableCommand(JsonArray& buzzerData) {
    int alarm_on = buzzerData[0] == 1;
    int frequency_hz = buzzerData[1];
    Buzzer_Variable(alarm_on, frequency_hz);
}

void CommandProcessor::handleVideoActivationCommand(bool activation, bool& videoFlag) {
    videoFlag = activation;
}

void CommandProcessor::handleRaceCommand(int race_id, bool& race_change) {
      if (race_id == 0)
        {
            race_change = false;
        }else{
            race_change = true;
        }   
}

void CommandProcessor::handleTrackModeCommand(int mode) {
    while (mode == 1) {
        Track_Car(1);
        delay(10);
        if (mode == 0) {
            Motor_Move(0, 0, 0, 0);
            break;
        }
    }
}
