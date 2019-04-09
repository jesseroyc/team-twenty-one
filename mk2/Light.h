// Developed in collaboration by <patrick@notthat.ca>
#ifndef LIGHTS_H
#define LIGHTS_H

#include "Arduino.h"
#include "Relay.h"
//#include <EEPROM.h>

#define RELAY1 0x18
#define RELAY2 0x19
#define SAFETY_TIME 1000
#define MODE_ADDRESS 0x00

class Light {
    public:
        typedef enum {BLOOM_MODE = 0x9F, VEG_MODE = 0xF9} lightMode;
        typedef enum {LIGHT_ON, LIGHT_OFF, LIGHT_UNKN} lightState;
        Light();
        Light::lightMode getLightMode();
        Light::lightState getLightState();
        void setLightMode(Light::lightMode newLightMode);
        void setLightState(Light::lightState newLightState);
    private:
        Light::lightMode _lightMode;
        Light::lightState _lightState;
        Relay *_relay1;
        Relay *_relay2;
        uint16_t _offMillis;
        uint16_t _onMillis;
        void _turnLightOn();
        void _turnLightOff();
};
#endif
