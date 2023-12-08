const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = 3000;

app.use(bodyParser.json());

let incidents = [];

app.get('/incidents', (req, res) => {
    res.json(incidents);
});

app.get('/incidents/:category', (req, res) => {
    const category = req.params.category;
    const filteredIncidents = incidents.filter(incident => incident.category === category);
    res.json(filteredIncidents);
});

app.post('/incidents', (req, res) => {
    const newIncident = req.body;
    incidents.push(newIncident);

    // Notify all connected users about the new incident
    io.emit('newIncident', newIncident);

    res.json(newIncident);
});

// Socket.IO connection event
io.on('connection', (socket) => {
    console.log('A user connected');
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
