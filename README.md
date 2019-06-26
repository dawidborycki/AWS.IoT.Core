# Description
This is a sample Node.js app that shows how to stream emulated sensor data to the AWS IoT Core. You can also remotely control your device from the cloud to temporarily disable telemetry

# How to use the app
To successfully run the app you will first need to register a device in the AWS IoT Core. Follow this link: https://docs.aws.amazon.com/iot/latest/developerguide/register-device.html

After registering a device download your certificates. In my case they are all stored in the local folder, E:\IoT\Certificates. I used the following files:
* Device certificate: weather-emulator-certificate.pem,
* Public key: weather-emulator-public.key,
* Private key: weather-emulator-private.key,
* CA root: AmazonRootCA1.pem.

You configure full paths to the above files through common.js:
```javascript
const rootCertDir = 'E:\\IoT\\Certificates\\'; // Change it to your directory

exports.awsConnectionInfo = {
    keyPath: rootCertDir + 'weather-emulator-private.key',
    certPath: rootCertDir + 'weather-emulator-certificate.pem',
    caPath: rootCertDir + 'AmazonRootCA1.pem',
    host: 'a31y79ki9u5bv7-ats.iot.eu-west-2.amazonaws.com', // Change it to your host
    clientId: 'WeatherStationEmulator'
};
```
Additionally, you need to specify the endpoint (you get this from AWS IoT Core, Manage/Things/Interact

# Sample results
After configuring device registry, run app.js (e.g. ```node app.js```). The app will display synthesized telemetry, and then send it to the cloud (data is published to Emulators/Weather/SensorReadings MQTT topic). You should then get results shown below:
![Figure](/Figures/Console.PNG)
![Figure](/Figures/AWS.PNG)

# Remote commands
To remotely disable or enable telemetry use web based MQTT client from AWS. Just publish the following message to the Emulators/Weather/Control topic:
```JSON
{
    "isTelemetryActive": false
}
```
![Figure](/Figures/AWSControl.PNG)

