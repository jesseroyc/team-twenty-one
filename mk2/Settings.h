#ifndef SETTINGS_H
#define SETTINGS_H
//Status
bool headerPrinted = false;

//Contants
#define UPDATE_INTERVAL 1000 //Update interval in milliseconds
#define BAUD 115200
String header = "T(deg C),P(hPa),%RH,Lux,Moisture";

//I2C Addresses
//#define RELAY1 0x19
//#define RELAY2 0x18
#define SOIL 0x36
#define LIGHT 0x39
#define ENVIRONMENT 0x77

#endif
