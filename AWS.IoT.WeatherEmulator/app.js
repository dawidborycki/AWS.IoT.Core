'use strict';

// Dependencies
const common = require('./common.js');
const telemetryGenerator = require('./telemetryGenerator.js');
const awsIot = require('aws-iot-device-sdk');

// Connect to AWS
const device = awsIot.device(common.awsConnectionInfo);

// Variables
var telemetryIntervalHandle;
var isTelemetryActive = true;

// Device module event handlers
device.on('connect', () => {
    console.log('Connected to AWS IoT');

    device.subscribe(common.topicTelemetryControl);

    telemetryIntervalHandle = setInterval(() => {
        if (isTelemetryActive) {
            // Synthesize telemetry data
            let telemetryEntry = telemetryGenerator.randomTelemetry('WeatherStationEmulator');

            // Convert it to JSON string
            telemetryEntry = JSON.stringify(telemetryEntry);

            // Publish data to the cloud
            device.publish(common.topicSensorReadings, telemetryEntry);

            // Log current data to the console
            console.log(telemetryEntry);
        }
        else {
            console.log('Telemetry is inactive');
        }
    }, common.msDelayTime);
});

device.on('close', () => {
    console.log('Connection closed');
    clearInterval(telemetryIntervalHandle);
});

device.on('error', (err) => {
    console.log('Error', err);
});

device.on('message', (_topic, payload) => {    
    let messageObject = JSON.parse(payload.toString());

    if (messageObject.isTelemetryActive !== undefined) {        
        isTelemetryActive = messageObject.isTelemetryActive;
    } else {
        console.log('Unexpected structure of the control command');
    }
});

