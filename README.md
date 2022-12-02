
# FoodCare Smart System - Fruit Freshness Detection System

This is a web application that aims to detect the freshness of the fruits given the four parameters **temperature, pH, ethanol, moisture**.

The readings for each of the parameters are taken using an IoT setup. Sensors meant for each parameters take the readings and then send it to the database. From here the data is fetched and displayed on the web.
Visualizations are added for better user comprehension.
## Installation

```bash
ng serve
```
Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
    
## Tech Stack

**Frontend:** Angular (8.3.4), ChartJS, Bootstrap

**Database & Authentication:** Firebase

**Hardware:** Arduino Uno R3, WeMos D1 R1, Sensors *(Moisture, pH, MQ3, DS18B20)*


## Screenshots

**Hardware Setup**
![IoT circuit](https://user-images.githubusercontent.com/47472699/205355657-c87b513b-f85f-4ad7-b637-0a74d0055d61.jpg)

**Web Application**

*Home Page*
![Home page](https://user-images.githubusercontent.com/47472699/205356298-64679760-6ee6-4028-8da0-d7764ccb2e90.png)

*Dashboard*
![Dashboard](https://user-images.githubusercontent.com/47472699/205356634-63501d54-bcaf-4240-b3a3-a4763c338501.png)

![Visualization](https://user-images.githubusercontent.com/47472699/205356816-bab7caee-9fef-4473-ab9e-d74d1a828daf.png)
## Acknowledgements

 - [Angular](https://angular.io/docs)
 - [Firebase](https://firebase.google.com/docs/database/)
 - [IoT prototyping with Firebase](https://www.freecodecamp.org/news/iot-prototyping-with-firebase-doing-more-with-less-2f5c746dac8b/)

