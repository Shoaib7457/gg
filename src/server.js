// server.js
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());   
const PORT = 5000;
let currentIndex = 0;

app.use(express.static(path.join(__dirname, 'Assignment-vehicle-mov/build')));

app.get('/api/vehicle/current', (req, res) => {
  const dataPath = path.join(__dirname, 'data', 'vehicleData.json');

  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading vehicle data:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const vehicleData = JSON.parse(data);

    if (currentIndex >= vehicleData.length) {
      currentIndex = 0;
    }
    
    const currentVehiclePosition = vehicleData[currentIndex];
    currentIndex++;

    res.json(currentVehiclePosition);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
