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
#include "Light.h"
#include "Wire.h"

WiFiClient wifi;

const char pass[] = SECRET_PASS;
const char ssid[] = SECRET_SSID;
const char serv[] = SECRET_SERV;

EnvironmentSensor *enviroSensor;
//LightSensor *lightSensor;
SoilSensor *soilSensor;
//Light *light;

void setup() {
  Serial.begin(9600);
  Wire.begin();
  while(!Serial);

  Log.begin(LOG_LEVEL_VERBOSE, &Serial);

  Log.notice(F("IoT Plantmetric Station v0.1\n\n"));

  enviroSensor = new EnvironmentSensor(ENVIRONMENT);
  //lightSensor = new LightSensor(LIGHT);
  soilSensor = new SoilSensor(SOIL);
  //light->setLightMode(Light::BLOOM_MODE);
  
  connectToWifi();
}

void loop() {

  String temperature = String("/"+String(enviroSensor->getTemp()));
  String brightness = String("/"+String("_"));
  String moisture = String("/"+String(soilSensor->getMoisture()));
  String humidity = String("/"+String(enviroSensor->getHumidity()));
  String pressure = String("/"+String(enviroSensor->getPressure()));
  
  if(wifi.status() == WL_CONNECTION_LOST || wifi.status() == WL_DISCONNECTED)
  {
    Log.verbose(F("Lost connection to Wifi"));
    connectToWifi();  
  }
  
  int httpPort = 80;
  String params = String("/record" + temperature + brightness + moisture + humidity + pressure);
  
  sendRequest(serv, params, httpPort);

  wait(1000);
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

void wait(unsigned long waitTime) {
  unsigned long currentMillis = millis();
  unsigned long previousMillis = currentMillis;
  do {
    currentMillis = millis();
  } while (currentMillis - previousMillis < waitTime);
}