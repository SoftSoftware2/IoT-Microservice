const mongoose = require('mongoose');

const TelemetrySchema = new mongoose.Schema({
    device_id: String,
    temperature: Number,
    humidity: Number,
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Telemetry', TelemetrySchema);