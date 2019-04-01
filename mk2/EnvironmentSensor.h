#ifndef ENVIRONMENTSENSOR_H
#define ENVIRONMENTSENSOR_H

#include "Arduino.h"
#include "SparkFunBME280.h"

class EnvironmentSensor {
    public:
        EnvironmentSensor(uint8_t address);
        float getTemp();
        float getPressure();
        float getHumidity();
    private:
        uint8_t _address;
        BME280 _enviroSensor;
};

#endif
