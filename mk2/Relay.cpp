#include "Relay.h"

Relay::Relay(uint8_t address) {
    _address = address;

    _testForConnectivity();
    setRelayOff();
}

/*
 * @brief Sets the relay to ON when it is OFF.
 */
void Relay::setRelayOn() {
    if(getRelayState() == RELAY_OFF) {
        Wire.beginTransmission(_address);
        Wire.write(COMMAND_ON);
        
        if (Wire.endTransmission() != 0) {
            Serial.print("Could not turn ON. No relay attached to address: 0x");
            Serial.println(_address, HEX);
        } else {
            Serial.print("Relay at address: 0x");
            Serial.print(_address, HEX);
            Serial.println(" has been turned ON.");
        }
    } else {
        Serial.print("Relay at address: 0x");
        Serial.print(_address, HEX);
        Serial.println(" is already turned ON.");
    }
}

/*
 * @brief Sets the relay to OFF when it is ON.
 */
void Relay::setRelayOff() {
    if(getRelayState() == RELAY_ON) {
        Wire.beginTransmission(_address);
        Wire.write(COMMAND_OFF);
        
        if (Wire.endTransmission() != 0) {
            Serial.print("Could not turn OFF. No relay attached to address: 0x");
            Serial.println(_address, HEX);
        } else {
            Serial.print("Relay at address: 0x");
            Serial.print(_address, HEX);
            Serial.println(" has been turned OFF.");
        }   
    } else {
        Serial.print("Relay at address: 0x");
        Serial.print(_address, HEX);
        Serial.println(" is already turned OFF.");
    }
}

/*
 * @brief Queries the relay for its current status, either ON or OFF.
 * 
 * @return relayState, either RELAY_ON or RELAY_OFF
 */
Relay::relayState Relay::getRelayState() {
    Wire.beginTransmission(_address);
    Wire.write(COMMAND_STATUS);
    
    if(Wire.endTransmission() != 0) {
        Serial.print("Check connections. No relay attached to address: 0x");
        Serial.println(_address, HEX);
    } else {
        Wire.requestFrom((int)_address, (int)1);

        while(Wire.available()) {
            byte statusBuffer = Wire.read();

            if(statusBuffer == 0x01) {
                return RELAY_ON;
            } else {
                return RELAY_OFF;
            }
        }
    }
}

/*
 * @brief Tests the relay to ensure that it is connected to the I2C bus.
 */
void Relay::_testForConnectivity() {
    Wire.beginTransmission(_address);
    
    if (Wire.endTransmission() != 0) {
        Serial.print("Check connections. No relay attached to address: 0x");
        Serial.println(_address, HEX);
    } else {
      Serial.print("Relay at address: 0x");
      Serial.print(_address, HEX);
      Serial.println(" is connected.");
    }
}
