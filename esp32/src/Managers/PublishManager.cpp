#include "PublishManager.h"
#include <Arduino.h> 
#include <cmath>
#include "Freenove_4WD_Car_WiFi.h"
#include "Freenove_4WD_Car_Emotion.h"
#include "Freenove_4WD_Car_WS2812.h"
#include "Freenove_4WD_Car_For_ESP32.h"

void PublishToTopicManager::publish(PubSubClient& client, long& last_message, int sensor_v, char buff[],
                                    char ultrasonic_buff[], char distance_buff[], char speed_buff[], 
                                    char race_id_buffer[], unsigned long startTime, bool timerActive, 
                                    float& total_Distance, float& total_speed, int race_id, bool race_change, 
                                    unsigned long mqtt_interval_ms,  int& data_total_0, int& data_total_1, 
                                    int& data_total_2, int& data_total_3 , int& mode)
{
    long now = millis();
    if (now - last_message > mqtt_interval_ms)
    {
        last_message = now;

        if (mode == 1){
             // Send auto true
            client.publish("esp32bis/mode", "auto");
        } else if (mode == 0)
        {
            client.publish("esp32bis/mode", "manuel");
        }
        

        if (race_change)
        {
            // Send race ID
            dtostrf(race_id, 5, 2, race_id_buffer);
            client.publish("esp32bis/race", race_id_buffer);
            // Battery level
            dtostrf(Get_Battery_Voltage(), 5, 2, buff);
            client.publish("esp32bis/battery", buff);
            // Track Read
            Track_Read();
            const char* n_char = std::to_string(sensor_v).c_str();
            client.publish("esp32bis/track", n_char);

            // Ultrasonic Data
            dtostrf(Get_Sonar(), 5, 2, ultrasonic_buff);
            client.publish("esp32bis/sonar", ultrasonic_buff);

            // Photosensitive Data
            dtostrf(Get_Photosensitive(), 5, 2, ultrasonic_buff);
            client.publish("esp32bis/light", ultrasonic_buff);

            // Send timer data if active
            if (timerActive)
            {
                // Send Time
                unsigned long duration = millis() - startTime;
                float duration_in_seconds = duration / 1000.0; // Convert duration to seconds
                char timer_buff[10];
                dtostrf(duration_in_seconds, 5, 2, timer_buff);
                client.publish("esp32bis/timer", timer_buff);

                // Update distance
                updateDistance(duration ,data_total_0,data_total_1, 
                                data_total_2, data_total_3,total_Distance);

                total_Distance = fabs(total_Distance);
                dtostrf(total_Distance, 5, 2, distance_buff);
                client.publish("esp32bis/distance", distance_buff);

                // Send speed
                total_speed = total_Distance / duration_in_seconds; // Calculate speed
                dtostrf(total_speed, 5, 2, speed_buff);
                client.publish("esp32bis/speed", speed_buff);
            }
      
        }
        else
        {
            // If race_change is false, send only "false" to "esp32bis/race"
            client.publish("esp32bis/race", "false");
            
            // Reset all variables
            total_Distance = 0.0;
            total_speed = 0.0;
            timerActive = false;
            startTime = 0;
            race_id = 0;
            race_change = false;
    
            // Clear buffers 
            memset(buff, 0, sizeof(buff));
            memset(ultrasonic_buff, 0, sizeof(ultrasonic_buff));
            memset(distance_buff, 0, sizeof(distance_buff));
            memset(speed_buff, 0, sizeof(speed_buff));
            memset(race_id_buffer, 0, sizeof(race_id_buffer));
        }
    }
};

void PublishToTopicManager::updateDistance(int duration ,  int& data_total_0, int& data_total_1, 
                            int& data_total_2, int& data_total_3,float& total_Distance){

    // Vérifier si toutes les valeurs des capteurs sont égales
    if (data_total_0 == data_total_1 && data_total_1 == data_total_2 && data_total_2 == data_total_3)
    {
        // Calculer la distance totale avec les valeurs des capteurs égales
        float circonference = 20.42; // Circonférence en cm (ajuster selon votre véhicule)
        float tour_seconde = (data_total_0 * 2.5) / 1000;
        total_Distance = circonference * tour_seconde * (duration / 1000.0);
    }
    else
    {
        // Calculer la distance totale avec les valeurs moyennes des capteurs
        float average = (data_total_0 + data_total_1 + data_total_2 + data_total_3) / 4.0;
        float circonference = 20.42; // Circonférence en cm (ajuster selon votre véhicule)
        float tour_seconde = (average * 2.5) / 1000;
        total_Distance = circonference * tour_seconde * (duration / 1000.0);
    }

}
