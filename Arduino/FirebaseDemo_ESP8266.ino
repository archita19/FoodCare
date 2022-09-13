#include <ArduinoJson.h>


//
// Copyright 2015 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

// FirebaseDemo_ESP8266 is a sample that demo the different functions
// of the FirebaseArduino API.

#include <FirebaseArduino.h>
#include <ESP8266WiFi.h>
#include <stdlib.h>

// Set these to run example.
#define FIREBASE_HOST "foodcare-aac9d.firebaseio.com"
#define FIREBASE_AUTH "sjldbCjjGcDYf0Urx132bwjhdpv9Lo4Sx806LMw4"
#define WIFI_SSID "Archi_99"
#define WIFI_PASSWORD "foodCare"

char phbuf[2];
char mbuf[2];
char abuf[3];
char tbuf[3];
//char sbuf[2];
//int timepH = 11;

void setup() {
  Serial.begin(9600);

  // connect to wifi.
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("connecting");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.print("connected: ");
  Serial.println(WiFi.localIP());
  
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH); 


}


void sensors(int sendc){
    switch(sendc){
    case 1:
    {
//    int time = millis() / 1000;
    Serial.readBytes(phbuf,2);
//    p = atoi(phbuf);
//    Serial.println(phbuf);
//    Firebase.setString("pH",phbuf);
    StaticJsonBuffer<200> jsonBuffer;
    JsonObject& root = jsonBuffer.createObject();
    root["sensor"] = "pH";
    root["value"] = phbuf;
    Firebase.push("pH",root);
    delay(10000);
    break;
    }
  
    case 2:
    {
//      int time = millis() / 1000;
    Serial.readBytes(mbuf,2);
//    m = atoi(mbuf);
//    Firebase.setString("moisture",mbuf);
    StaticJsonBuffer<200> jsonBuffer;
    JsonObject& root = jsonBuffer.createObject();
    root["sensor"] = "moisture";
    root["value"] = mbuf;
    Firebase.push("moisture",root);
    delay(10000);
    break;
    }
  
    case 3:
    {
//      int time = millis() / 1000;
    Serial.readBytes(abuf,3);
//    a = atoi(abuf);
//    Firebase.setString("alcohol",abuf);
    StaticJsonBuffer<200> jsonBuffer;
    JsonObject& root = jsonBuffer.createObject();
    root["sensor"] = "alcohol";
    root["value"] = abuf;
    Firebase.push("alcohol",root);
    delay(10000);
    break;
    }
  
    case 4:
    {
//      int time = millis() / 1000;
    Serial.readBytes(tbuf,3);
//    t = atoi(tbuf);
//    Firebase.setString("temperature",tbuf);
    StaticJsonBuffer<200> jsonBuffer;
    JsonObject& root = jsonBuffer.createObject();
    root["sensor"] = "temperature";
    root["value"] = tbuf;
    Firebase.push("temperature",root);
    delay(10000);
    break;
    }
  }

}

void loop() { 
  int sendc = Firebase.getInt("sensor");
  Serial.println(sendc);

  sensors(sendc);
  
}


  
    
