function getRandomValue(min, max, digits) {
    randomNumber = Math.random()
        * (max - min) + min;

    return randomNumber.toFixed(digits);
}

exports.randomTelemetry = (deviceId) => {
    return {
        deviceId: deviceId,
        timestamp: new Date(),
        temperature: getRandomValue(20, 40, 2),
        humidity: getRandomValue(50, 60, 0),
        pressure: getRandomValue(1000, 1050, 1)
    };
};