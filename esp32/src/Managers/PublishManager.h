#ifndef PUBLISH_MANAGER_H
#define PUBLISH_MANAGER_H

#include <PubSubClient.h>

class PublishToTopicManager
{
public:
    // Déclare la méthode avec tous les paramètres nécessaires
    void publish(PubSubClient& client, long& last_message, int sensor_v, char buff[], char ultrasonic_buff[],
                 char distance_buff[], char speed_buff[], char race_id_buffer[], unsigned long startTime,
                 bool timerActive, float& total_Distance, float& total_speed, int race_id, bool race_change, 
                 unsigned long mqtt_interval_ms,  int& data_total_0, int& data_total_1, 
                                                 int& data_total_2, int& data_total_3);
                 
private:

  void updateDistance(int duration ,  int& data_total_0, int& data_total_1, 
                        int& data_total_2, int& data_total_3,float& total_Distance);
};

#endif // PUBLISH_MANAGER_H
