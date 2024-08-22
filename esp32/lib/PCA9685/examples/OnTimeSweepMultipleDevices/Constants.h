// ----------------------------------------------------------------------------
// Constants.h
//
//
// Authors:
// Peter Polidoro peterpolidoro@gmail.com
// ----------------------------------------------------------------------------
#ifndef CONSTANTS_H
#define CONSTANTS_H
#include <Arduino.h>


namespace constants
{
enum{DEVICE_COUNT=3};
extern const uint8_t device_addresses[DEVICE_COUNT];
extern const uint8_t device_index;

extern const size_t output_enable_pin;

extern const size_t loop_delay;
extern const uint16_t frequency;
extern const uint16_t time_increment;

extern const uint8_t channel;
}
#endif
