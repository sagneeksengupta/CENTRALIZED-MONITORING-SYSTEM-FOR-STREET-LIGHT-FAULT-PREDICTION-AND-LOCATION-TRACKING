const socket = io();

let model;

async function loadModel() {
    model = await tf.loadLayersModel('/model/model.json');
}

loadModel();

socket.on('updateSensorData', (data) => {
    document.getElementById('sensor1').textContent = data.sensor1;
    document.getElementById('sensor2').textContent = data.sensor2;
    document.getElementById('sensor3').textContent = data.sensor3;

    if (model) {
        const prediction = model.predict(tf.tensor2d([[data.sensor1, data.sensor2, data.sensor3]]));
        const isBad = prediction.dataSync()[0] > 0.5;

        if (isBad) {
            document.getElementById('warning').style.display = 'block';
        } else {
            document.getElementById('warning').style.display = 'none';
        }
    }
});

// Simulating sensor data for testing (remove this in production)
setInterval(() => {
    const sensorData = {
        sensor1: Math.random() * 100,
        sensor2: Math.random() * 100,
        sensor3: Math.random() * 100
    };
    socket.emit('sensorData', sensorData);
}, 5000);