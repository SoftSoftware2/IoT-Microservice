const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const iotRoutes = require('./routes/iotRoutes');

const app = express();

connectDB();

app.use(express.json());
app.use(cors());

app.use('/api', iotRoutes);

const PORT = 3100;
app.listen(PORT, () => console.log(`🚀 Microservice running to port ${PORT}`));