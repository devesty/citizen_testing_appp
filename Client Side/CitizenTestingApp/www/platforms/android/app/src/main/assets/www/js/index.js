
// document.addEventListener('deviceready', onDeviceReady, false);

// function onDeviceReady() {
//     // Cordova is now initialized. Have fun!

//     console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
//     document.getElementById('deviceready').classList.add('ready');
// }

// www/js/app.js
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is ready, initialize your app here

    document.getElementById('submitIncident').addEventListener('click', submitIncident);
    document.getElementById('fetchIncidents').addEventListener('click', fetchIncidents);
}

function submitIncident() {
    const incidentType = document.getElementById('incidentType').value;
    const incidentDescription = document.getElementById('incidentDescription').value;

    const newIncident = {
        type: incidentType,
        description: incidentDescription,
    };

    fetch('http://your-server-ip:3000/incidents', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newIncident),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Incident submitted:', data);
    })
    .catch(error => {
        console.error('Error submitting incident:', error);
    });
}

function fetchIncidents() {
    fetch('http://your-server-ip:3000/incidents')
    .then(response => response.json())
    .then(data => {
        // Handle the fetched incidents, e.g., display them on the app
        console.log('Fetched Incidents:', data);
    })
    .catch(error => {
        console.error('Error fetching incidents:', error);
    });
}
