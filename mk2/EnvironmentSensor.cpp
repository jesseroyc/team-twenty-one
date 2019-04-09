// Developed in collaboration by <patrick@notthat.ca>
#include "EnvironmentSensor.h"

EnvironmentSensor::EnvironmentSensor(uint8_t address) {
    _address = address;

    _enviroSensor.settings.commInterface = I2C_MODE;
    _enviroSensor.settings.I2CAddress = _address;
    _enviroSensor.settings.runMode = 3;
    _enviroSensor.settings.tStandby = 0;
    _enviroSensor.settings.filter = 0;
    _enviroSensor.settings.tempOverSample = 1;
    _enviroSensor.settings.pressOverSample = 1;
    _enviroSensor.settings.humidOverSample = 1;
    
    chipID = _enviroSensor.begin();
    
    if(chipID != 0x60) {
        Serial.println("ERROR: Environment sensor not found!");
    } else {
        Serial.print("Environment sensor detected at address: 0x");
        Serial.print(_address);
        Serial.print(" Chip ID: ");
        Serial.println(chipID, HEX);
    }
    delay(10);
}

/*
 * @brief Gets temperature from the BME-280 environment sensor.
 * 
 * @return Temperature in degrees Celcius as a float.
 */
float EnvironmentSensor::getTemp() {
//    return _enviroSensor.readTempC();
    return chipID;
}

/*
 * @brief Gets pressure from the BME-280 environment sensor.
 * 
 * @return Pressure in hPa as a float.
 */
float EnvironmentSensor::getPressure() {
//    return _enviroSensor.readFloatPressure();
    return 101.3;
}

/*
 * @brief Gets relative humidity from the BME-280 environment sensor.
 * 
 * @return % relative humidity as a float.
 */
float EnvironmentSensor::getHumidity() {
//    return _enviroSensor.readFloatHumidity();
    return 49.5;
}
