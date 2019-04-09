// Developed in collaboration by <patrick@notthat.ca>
#ifndef SOILSENSOR_H
#define SOILSENSOR_H

#include "Arduino.h"
#include "Adafruit_seesaw.h"

class SoilSensor {
    public:
        SoilSensor(uint8_t address);
        uint16_t getMoisture();
        float getTemp();
    private:
        uint8_t _address;
        Adafruit_seesaw _soilSensor;
};

#endif
