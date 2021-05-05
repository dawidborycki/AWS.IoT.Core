const rootCertDir = 'E:\\IoT\\Certificates\\'; // Change it to your directory

exports.awsConnectionInfo = {
    keyPath: rootCertDir + 'weather-emulator-private.key',
    certPath: rootCertDir + 'weather-emulator-certificate.pem',
    caPath: rootCertDir + 'AmazonRootCA1.pem',
    host: 'a31y79ki9u5bv7-ats.iot.eu-west-2.amazonaws.com', // Change it to your host
    clientId: 'WeatherStationEmulator'
};

exports.msDelayTime = 1000;
exports.topicSensorReadings = 'Emulators/Weather/SensorReadings';
exports.topicTelemetryControl = 'Emulators/Weather/Control';
