int sens = 0;

char phbuf[2];
char mbuf[2];
char abuf[3];
char tbuf[3];
//char sbuf[2];

//PH
unsigned long int avgValue;  //Store the average value of the sensor feedback
float b;
int buf[10],temp;

//MQ3 ALCOHOL
float sensor_volt;
float RS_gas; 
float R0;
float ratio;
float BAC;
int R2 = 1000;
int TIME_UNTIL_WARMUP = 900;
unsigned long time;

//TEMPERATURE
#include <OneWire.h>
#include <DallasTemperature.h>
#define ONE_WIRE_BUS 2
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);
float Celsius = 0;
float Fahrenheit = 0;

void setup() {
  // put your setup code here, to run once:
  sensors.begin();
  pinMode(2,OUTPUT);  
  Serial.begin(9600);  
}

void pHSensor() {
    for(int i=0;i<10;i++)       //Get 10 sample value from the sensor for smooth the value
    { 
      buf[i]=analogRead(A0);
      delay(10);
    }
    for(int i=0;i<9;i++)        //sort the analog from small to large
    {
      for(int j=i+1;j<10;j++)
      {
        if(buf[i]>buf[j])
        {
          temp=buf[i];
          buf[i]=buf[j];
          buf[j]=temp;
        }
      }
    }
    avgValue=0;
    for(int i=2;i<8;i++)                      //take the average value of 6 center sample
      avgValue+=buf[i];
    float phValue=(float)avgValue*5.0/1024/6; //convert the analog into millivolt
    phValue=3.5*phValue;                      //convert the millivolt into pH value
    int v = (int) phValue;
    itoa(v,phbuf,10);
//    dtostrf(phValue, 4, 2, phbuf);
//    Serial.print("pH: ");  
//    Serial.print(phValue);
    Serial.write(phbuf,2);
//    Serial.println(v);
//    Serial.write("\n");
//    Serial.println(" ");
  //      digitalWrite(13, HIGH);       
//    delay(800);
  //      digitalWrite(13, LOW);
}

void moistureSensor() {
    int sensorValueM = analogRead(A1);
    float moisturePercentage = ( 100 - ( (sensorValueM/1023.00) * 100 ) );
    int v = (int) moisturePercentage;
    itoa(v,mbuf,10);
//    Serial.print("Moisture Percentage = ");
//    Serial.print(moisturePercentage);
//    dtostrf(moisturePercentage, 4, 2, mbuf);
    Serial.write(mbuf,2);
//    Serial.write(v);
//    Serial.println(v);
//    Serial.write("\n");
//    delay(1000);
}

void alcoholSensor() {
    time = millis()/1000;
    int sensorValueA = analogRead(A2);
//    if(time>=TIME_UNTIL_WARMUP)
//    { 
     sensor_volt=(float)sensorValueA/1024*5.0;
     RS_gas = ((5.0 * R2)/sensor_volt) - R2; 
     R0 = 8640;
     ratio = RS_gas/R0;// ratio = RS/R0
     double x = 0.4*ratio;   
     BAC = pow(x,-1.431);  //BAC in mg/L
//      Serial.print("Alcohol Percentage = ");
//      Serial.print(BAC);
//      dtostrf(BAC, 4, 2, abuf);
     int v = (int) BAC;
     itoa(v,abuf,10);
     Serial.write(abuf,3);
//      Serial.println(v);
//      Serial.write("\n");

//    }
//    else{
//      Serial.print("Warming");
//    }
}

void temperatureSensor() {
      sensors.requestTemperatures();
      Celsius = sensors.getTempCByIndex(0);
      Fahrenheit = sensors.toFahrenheit(Celsius);
//      Serial.print("Temperature = ");
//      dtostrf(Celsius, 4, 2, tbuf);
      int v = (int) Celsius;
      itoa(v,tbuf,10);
      Serial.write(tbuf,3);
//      Serial.write(v);
//      Serial.println(v);
//      Serial.print(" C  ");
//      Serial.print("\n");
//      Serial.print(Fahrenheit);
//      Serial.println(" F");
      pinMode(2,OUTPUT);
//      delay(1000);
}

void loop() {
  // put your main code here, to run repeatedly:
  int sendc = Serial.parseInt();
//  Serial.println(sendc);
  switch(sendc){
    case 1:
      pHSensor();
      break;
    case 2:
      moistureSensor();
      break;
    case 3:
      alcoholSensor();
      break;
    case 4:
      temperatureSensor();
      break;
  }

}
