// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// // const { MongoClient } = require('mongodb');
// // const dotenv = require('dotenv');

// // dotenv.config();

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// const port = process.env.PORT || 3000;
// // const mongoUri = process.env.MONGO_URI;

// app.use(express.static('public'));

// app.set('view engine', 'ejs');

// const path = require('path');
// app.set('views', path.join(__dirname, 'public', 'views'));


// // Add this line to parse JSON bodies
// app.use(express.json());

// // let db;

// // async function connectToMongo() {
// //   const client = new MongoClient(mongoUri);
// //   await client.connect();
// //   console.log('Connected to MongoDB');
// //   db = client.db('sensorData');
// // }

// let sensorData = {
//   sensor1: '-',
//   sensor2: '-',
//   sensor3: '-'
// };

// app.get('/', (req, res) => {
//   res.render('index', {sensorData});
// });

// // Add this new route to handle POST requests from ESP8266
// app.post('/sensorData', (req, res) => {
//   const sensorData = req.body;
//   console.log('Received sensor data:', sensorData);
  
//   // Store data in MongoDB
//   //db.collection('sensors').insertOne(sensorData);
  
//   // Emit the data to all connected clients
//   io.emit('updateSensorData', sensorData);
  
//   res.status(200).send('Data received');
// });

// io.on('connection', (socket) => {
//   console.log('New client connected');

//   socket.emit('updateSensorData', sensorData);
  
//   socket.on('disconnect', () => {
//     console.log('Client disconnected');
//   });
// });

// // async function startServer() {
// //   await connectToMongo();
// //   server.listen(port, () => {
// //     console.log(`Server running on port ${port}`);
// //   });
// // }

// // startServer();

// server.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });


const express = require('express');
const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.json());

let sensorData = {
  sensor1: '-',
  sensor2: '-',
  sensor3: '-'
};

app.get('/', (req, res) => {
  res.render('index', {sensorData});
});

app.post('/sensorData', (req, res) => {
  sensorData = req.body;
  console.log('Received sensor data:', sensorData);
  res.status(200).send('Data received');
});

app.get('/api/sensorData', (req, res) => {
  res.json(sensorData);
});

module.exports = app;