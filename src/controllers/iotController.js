const Telemetry = require('../models/Telemetry');
const axios = require('axios');

exports.saveGpsData = async (req, res) => {
    try {
        const { device_id, temperature, humidity } = req.body;
        
        await Telemetry.create({ device_id, temperature, humidity });
        
        console.log(`Sensor recived [${device_id}]`);
        res.status(201).json({ status: 'saved' });
    } catch (error) {
        console.error("Error guardant Sensor:", error.message);
        res.status(500).json({ error: error.message });
    }
};

exports.controlActuator = async (req, res) => {
    const { action } = req.body; // "ON" o "OFF"
    
    const raspberryUrl = process.env.RASPBERRY_TUNNEL_URL;

    if (!raspberryUrl || raspberryUrl.includes("Not yet")) {
        return res.status(500).json({ error: 'RASPBERRY_TUNNEL_URL needs to be configured in docker-compose' });
    }

    try {
        console.log(`Sending Webhook to: ${raspberryUrl} [Action: ${action}]`);
        
        await axios.post(raspberryUrl, { action });
        
        res.json({ status: 'Sent successfully' });
    } catch (error) {
        console.error("❌ Webhook error:", error.message);
        res.status(502).json({ error: 'The raspberry does not respond to the Webhook' });
    }
};