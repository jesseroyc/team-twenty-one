// Developed in collaboration by <patrick@notthat.ca>
#include "LightSensor.h"

LightSensor::LightSensor(uint8_t address) {
    _address = address;

    if(_lightSensor.begin(_address)) {
        Serial.println("ERROR: Light sensor not found!");
    } else {
        Serial.print("Light sensor detected at address: 0x");
        Serial.print(_address);
        Serial.print(" Chip ID: ");
        Serial.println(_lightSensor.getIDReg(), HEX);

        _lightSensor.setGain(APDS9301::LOW_GAIN);
        _lightSensor.setIntegrationTime(APDS9301::INT_TIME_13_7_MS);
        _lightSensor.enableInterrupt(APDS9301::INT_OFF);
        _lightSensor.clearIntFlag();
    }
    delay(10);
}

/*
 * @brief Gets visible + infrared light levels from APDS-9301 sensor.
 * 
 * @return Illuminance of visible + infrared light levels as a 16-bit unsigned integer.
 */
uint16_t LightSensor::getCH0Level() {
    return _lightSensor.readCH0Level();
}

/*
 * @brief Gets infrared light level from APDS-9301 sensor.
 * 
 * @return Illuminance of infrared light levels as a 16-bit unsigned integer.
 */
uint16_t LightSensor::getCH1Level() {
    return _lightSensor.readCH1Level();
}

/*
 * @brief Gets calculated Lux level from CH0 and CH1.
 * 
 * @return Illuminance as a float, within +/-40%
 */
float LightSensor::getLux() {
    return _lightSensor.readLuxLevel();
}
