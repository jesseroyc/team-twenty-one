#include <SPI.h>
#include <WiFiNINA.h>
#include <ArduinoHttpClient.h>
#include <ArduinoJson.h>
#include <ArduinoLog.h>
#include "arduino_secrets.h"

#include "Settings.h"
#include "EnvironmentSensor.h"
#include "LightSensor.h"
#include "SoilSensor.h"
#include "Wire.h"
#include "Light.h"

WiFiClient wifi;

const char pass[] = SECRET_PASS;
const char ssid[] = SECRET_SSID;
const char serv[] = SECRET_SERV;

EnvironmentSensor *enviroSensor;
LightSensor *lightSensor;
SoilSensor *soilSensor;
Light *light;

void setup() {
    Serial.begin(BAUD);
    Wire.begin();

    enviroSensor = new EnvironmentSensor(ENVIRONMENT);
    lightSensor = new LightSensor(LIGHT);
    soilSensor = new SoilSensor(SOIL);
    light = new Light();

    light->setLightMode(Light::BLOOM_MODE);
    light->setLightState(Light::LIGHT_ON);

    connectToWifi();
}

void loop() {
    String temperature = String("/"+String(enviroSensor->getTemp()));
    String moisture = String("/"+String(soilSensor->getMoisture()));
    String humidity = String("/"+String(enviroSensor->getHumidity()));
    String pressure = String("/"+String(enviroSensor->getPressure()));

    if(wifi.status() == WL_CONNECTION_LOST || wifi.status() == WL_DISCONNECTED)
    {
      Log.verbose(F("Lost connection to Wifi"));
      connectToWifi();  
    }

    int httpPort = 80;
    String params = String("/record" + temperature + moisture + humidity + pressure);
    
    sendRequest(serv, params, httpPort);
    displayValues();
    wait(1000);
}

void testRun() {
  int LUX = lightSensor->getLux();

  if(LUX < 50) {
    light->setLightState(Light::LIGHT_ON);
  } else {
    light->setLightState(Light::LIGHT_OFF);
  }
}




void lightTest() {
//    light->setLightState(Light::LIGHT_ON);
//    light->setLightState(Light::LIGHT_OFF);
//    light->setLightState(Light::LIGHT_ON);
//    light->setLightMode(Light::BLOOM_MODE);
//    light->setLightState(Light::LIGHT_OFF);
    light->setLightMode(Light::VEG_MODE);
//    light->setLightState(Light::LIGHT_ON);
    light->setLightMode(Light::BLOOM_MODE);
//    light->setLightState(Light::LIGHT_OFF);
    
}

void displayValues() {
    Serial.print("Temp (Env): "); Serial.print(enviroSensor->getTemp()); Serial.println(" degC");
    Serial.print("Pressure: "); Serial.print(enviroSensor->getPressure()); Serial.println(" hPa");
    Serial.print("Relative Humidity: "); Serial.print(enviroSensor->getHumidity()); Serial.println("%");
    Serial.print("CH0 Level: "); Serial.println(lightSensor->getCH0Level()); 
    Serial.print("CH1 Level: "); Serial.println(lightSensor->getCH1Level());
    Serial.print("Lux: "); Serial.print(lightSensor->getLux()); Serial.println(" Lux");
    Serial.print("Temp (Soil): "); Serial.print(soilSensor->getTemp()); Serial.println("*C");
    Serial.print("Moisture "); Serial.println(soilSensor->getMoisture());
}

void displayValuesCSV() {
    if(!headerPrinted) {
        Serial.println(header);
        headerPrinted = true;
    }

    Serial.print(enviroSensor->getTemp(), 2);
    Serial.print(",");
    Serial.print(enviroSensor->getPressure(), 0);
    Serial.print(",");
    Serial.print(enviroSensor->getHumidity(), 0);
    Serial.print(",");
    Serial.print(lightSensor->getCH0Level(),6);
    Serial.print(",");
    Serial.print(soilSensor->getMoisture());
    Serial.println("");
}
void sendRequest(String server, String uri, int port){
  Log.verbose(F("Making GET request with HTTP basic authentication to %s\n"), server.c_str());
  Serial.println(uri);
  HttpClient client = HttpClient(wifi, server, port);
  client.beginRequest();
  client.get(uri);
  client.endRequest();

  int statusCode = client.responseStatusCode();
  String response = client.responseBody();

  Log.verbose(F("Return Status code: %d\n"), statusCode);
  Log.verbose(F("Return Response: %s\n"), response.c_str());
}
void connectToWifi() {
  int status = WL_IDLE_STATUS;
  while (status != WL_CONNECTED) {
    Log.verbose(F("Attempting to connect to Network named: %s\n"), ssid);
    status = WiFi.begin(ssid, pass);
    Log.verbose(F("You're connected to the network\n"));
    Log.verbose(F("SSID: %s\n"), WiFi.SSID());
    Log.verbose(F("IP Address: %d.%d.%d.%d\n"), WiFi.localIP()[0], WiFi.localIP()[1], WiFi.localIP()[2], WiFi.localIP()[3]);
  }  
}
void wait(unsigned long waitTime) {
  unsigned long currentMillis = millis();
  unsigned long previousMillis = currentMillis;
  do {
    currentMillis = millis();
  } while (currentMillis - previousMillis < waitTime);
}
