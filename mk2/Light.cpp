#include "Light.h"

Light::Light() {
    _lightMode = VEG_MODE;
   //byte lightModeStored = EEPROM.read(MODE_ADDRESS);
//    if(lightModeStored != VEG_MODE | lightModeStored != BLOOM_MODE) {
//        _lightMode = VEG_MODE;
//        //EEPROM.write(VEG_MODE, MODE_ADDRESS);
//    } else {
//        _lightMode = lightModeStored;
//    }
    _lightState = LIGHT_OFF;
    _relay1 = new Relay(RELAY1);
    _relay2 = new Relay(RELAY2);
    _offMillis = millis();
}

/*
 * @brief Sets the light state to ON if the light is OFF. Sets the light state to OFF if the light is ON.
 * 
 * @param newLightState the new light state that the light will be switched to.
 */
void Light::setLightState(Light::lightState newLightState) {
    if(getLightState() == LIGHT_OFF && newLightState == LIGHT_ON) {
        _turnLightOn();
    } else if(getLightState() == LIGHT_ON && newLightState == LIGHT_OFF) {
        _turnLightOff();
    }
}

/*
 * @brief Sets the light mode to veg if the mode is bloom. Sets the light mode to bloom if the mode is veg.
 *          Checks to ensure light is off before switching mode and writes new mode into EEPROM memory so 
 *          it can be recalled after the device is turned off.
 * 
 * @param newLightMode the new light mode that the light will be switched to.
 */
void Light::setLightMode(Light::lightMode newLightMode) {
    if(getLightState() == LIGHT_OFF && _lightMode != newLightMode) {
        _lightMode = newLightMode;
    } else if(getLightState() == LIGHT_ON && _lightMode != newLightMode) {
        setLightState(LIGHT_OFF);
        _lightMode = newLightMode;
        //EEPROM.write(newLightMode, MODE_ADDRESS);
        setLightState(LIGHT_ON);
    }
}

/*
 * @brief Gets the current light state that the light is in.
 * 
 * @return the state that the light is in, either ON or OFF as a lightState
 */
Light::lightState Light::getLightState() {
    if(_relay1->getRelayState() == Relay::RELAY_OFF && _relay2->getRelayState() == Relay::RELAY_OFF) {
        return LIGHT_OFF;
    } else {
        return LIGHT_ON;
    }
}

/*
 * @brief Gets the current light mode that the light is in.
 * 
 * @return the mode that the light is in, either VEG_MODE or BLOOM_MODE as a lightMode
 */
Light::lightMode Light::getLightMode() {
    return _lightMode;
}

/*
 * @brief Turns the light ON. Safety timer is built in so that the light cannot be switched back ON too quickly. 
 *          If there is an attempt to turn the light ON within the SAFETY_TIME period, there will be an imposed 
 *          delay.
 */
void Light::_turnLightOn() {
    uint16_t deltaMillisOff = millis() - _offMillis;
    
    if(deltaMillisOff < SAFETY_TIME) {
        delay(SAFETY_TIME - deltaMillisOff);
    }
    
    if(_lightMode == VEG_MODE) {
        _relay1->setRelayOn();
    } else if (_lightMode == BLOOM_MODE) {
        _relay2->setRelayOn();
    }

    _onMillis = millis();
}

/*
 * @brief Turns the light OFF. Safety timer is built in so that the light cannot be switched back OFF too quickly. 
 *          If there is an attempt to turn the light OFF within the SAFETY_TIME period, there will be an imposed 
 *          delay.
 */
void Light::_turnLightOff() {
    uint16_t deltaMillisOn  = millis() - _onMillis;
    
    if(deltaMillisOn < SAFETY_TIME) {
        delay(SAFETY_TIME - deltaMillisOn);
    }
    
    if(_lightMode == VEG_MODE) {
        _relay1->setRelayOff();
    } else if (_lightMode == BLOOM_MODE) {
        _relay2->setRelayOff();
    }

    _offMillis = millis();
}
