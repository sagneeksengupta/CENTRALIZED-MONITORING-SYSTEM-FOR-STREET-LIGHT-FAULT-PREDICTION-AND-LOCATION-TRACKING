function updateSensorData() {
    fetch('/api/sensorData')
        .then(response => response.json())
        .then(data => {
            document.getElementById('sensor1').textContent = data.sensor1;
            document.getElementById('sensor2').textContent = data.sensor2;
            document.getElementById('sensor3').textContent = data.sensor3;

            // You can add your ML prediction logic here later
            // For example:
            // const prediction = predictAnomalyDetection(data);
            // if (prediction.isAnomaly) {
            //   showWarning();
            // } else {
            //   hideWarning();
            // }
        })
        .catch(error => console.error('Error fetching sensor data:', error));
}

function showWarning() {
    document.getElementById('warning').style.display = 'block';
}

function hideWarning() {
    document.getElementById('warning').style.display = 'none';
}

// Update sensor data every 5 seconds
setInterval(updateSensorData, 1000);

// Initial update
updateSensorData();