#include "SoilSensor.h"

SoilSensor::SoilSensor(uint8_t address) {
    _address = address;
    
    if (!_soilSensor.begin(_address)) {
        Serial.println("ERROR: Soil sensor not found!");
    } else {
        Serial.print("Soil sensor detected! At address: 0x");
        Serial.print(_address, HEX);
        Serial.print(" Firmware version: 0x");
        Serial.println(_soilSensor.getVersion(), HEX);
    }
}

/*
 * @brief Gets the temperature from the soil moisture sensor.
 * 
 * @return temperature in degrees Celcius as a float.
 */
float SoilSensor::getTemp() {
    return _soilSensor.getTemp();
}

/*
 * @brief Gets the capactive reading that is proportional to soil moisture.
 * 
 * @return analog value between 200(very dry) and 2000 (very wet) as a 16-bit unsigned integer
 */
uint16_t SoilSensor::getMoisture() {
    return _soilSensor.touchRead(0);
}
