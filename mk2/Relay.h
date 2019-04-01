#ifndef RELAY_H
#define RELAY_H

#include "Arduino.h"
#include "Wire.h"

#define COMMAND_OFF 0x00
#define COMMAND_ON 0x01
#define COMMAND_STATUS 0x05

class Relay {
    public:
        typedef enum {RELAY_OFF, RELAY_ON} relayState;
        Relay(uint8_t address);
        void setRelayOn();
        void setRelayOff();
        Relay::relayState getRelayState();
    private:
        uint8_t _address;
        Relay::relayState _relayState;
        void _testForConnectivity();
};

#endif
