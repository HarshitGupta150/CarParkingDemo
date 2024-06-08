const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const carRoutes = require('./routes/carRoute');
const parkingRoute = require('./routes/parkingRoute');
const carEntriesRoute = require('./routes/carEntriesRoute');

const app = express();

app.use(express.json());

app.use('/car', carRoutes);
app.use('/parking', parkingRoute);
app.use('/cars', carEntriesRoute);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});