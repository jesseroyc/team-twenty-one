#ifndef LIGHTSENSOR_H
#define LIGHTSENSOR_H

#include "Wire.h"
#include "Arduino.h"
#include <Sparkfun_APDS9301_Library.h>

class LightSensor {
    public:
        LightSensor(uint8_t address);
        uint16_t getCH0Level();
        uint16_t getCH1Level();
        float getLux();
    private:
        uint8_t _getID();
        uint8_t _address;
        APDS9301 _lightSensor;
};

#endif
