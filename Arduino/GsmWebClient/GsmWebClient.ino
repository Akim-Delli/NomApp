/*
  GPS
 
 How it works:
   - The dGPS requires the SoftwareSerial.h library.
   - The GPS is initialized in the setup function.
   - The GPS is updated: values for location, time, etc, are updated using the ".update" function.
   - The values are read using their respective calls.  These values stay the same until "update" is called again. 
-------------------------------------------------------------------------
  GSM Web client

 This sketch connects to a website through a GSM shield. Print the Http response
 to the serial Monitor

 Circuit:
 * GSM shield attached to an Arduino
 * SIM card with a data plan

 Example taken from:
 http://arduino.cc/en/Tutorial/GSMExamplesWebClient

 */

// libraries
#include <GSM.h>

#include <string.h>
#include <ctype.h>
#include "AltSoftSerial.h"
#include "dGPS.h"

// PIN Number
#define PINNUMBER ""

// APN data
#define GPRS_APN       "bluevia.movistar.es" // replace your GPRS APN
#define GPRS_LOGIN     ""    // replace with your GPRS login
#define GPRS_PASSWORD  "" // replace with your GPRS password

// initialize the library instance For GSM
GSMClient client;
GPRS gprs;
GSM gsmAccess;


// Software serial TX & RX Pins for the GPS module
// Initiate the software serial connection
int ledPin = 13;                  // LED test pin
float desLat=0;                   //Destination Latitude filled by user in Serial Monitor Box
float desLon=0;                   //Destination Longitude filled by user in Serial Monitor Box
char fla[2];                      //flag (Y/N) whether to print checksum or not. Filled by user in Serial Monitor Box
dGPS dgps = dGPS();               // Construct dGPS class


// URL, path & port (for example: arduino.cc)
char server[] = "207.237.3.41";
char path[] = "/collect";
int port = 3000; // port 80 is the default for HTTP

void setup()
{
  // initialize serial communications and wait for port to open:
  Serial.begin(9600);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for Leonardo only
  }

  Serial.println("Starting Arduino web client.");
  // connection state
  boolean notConnected = true;

  // After starting the modem with GSM.begin()
  // attach the shield to the GPRS network with the APN, login and password
  while(notConnected)
  {
    if((gsmAccess.begin(PINNUMBER)==GSM_READY) &
      (gprs.attachGPRS(GPRS_APN, GPRS_LOGIN, GPRS_PASSWORD)==GPRS_READY))
      notConnected = false;
    else
    {
      Serial.println("Not connected");
      delay(1000);
    }
  }

  Serial.println("connecting...");

  // if you get a connection, report back via serial:
  if (client.connect(server, port))
  {
    Serial.println("connected");
    char data[] = "deviceId=1&longitude=40.7202866&latitude=-73.8375309";

    // Make a HTTP request:
    client.print("POST ");
    client.print(path);
    client.println(" HTTP/1.1");
    client.print("Host: ");
    client.println(server);
    client.println("Content-Type: application/x-www-form-urlencoded");
    client.println("Content-Length: 52");
    client.println("Connection: close");
    client.println();

    client.println(data);
  }
  else
  {
    // if you didn't get a connection to the server:
    Serial.println("connection failed");
  }
}

void loop()
{
  // if there are incoming bytes available
  // from the server, read them and print them:
  if (client.available())
  {
    char c = client.read();
    Serial.print(c);
  }

  // if the server's disconnected, stop the client:
  if (!client.available() && !client.connected())
  {
    Serial.println();
    Serial.println("disconnecting.");
    client.stop();

    // do nothing forevermore:
    for(;;)
      ;
  }
}
