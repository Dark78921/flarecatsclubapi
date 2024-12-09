const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

// Middleware
app.use(cors({ origin: true }));

// Endpoint to get JSON data by file name
app.get('/api/metadata/flarecatsgang/:id', (req, res) => {
    const id = req.params.id; // Get the filename from the request parameters
    const filePath = path.join(__dirname, 'assets/flarecatsgang/json', `${id}.json`); // Construct the full path to the file

    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).json({ error: 'File not found' });
        }

        // Read and return the contents of the JSON file
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to read file' });
            }

            try {
                const jsonData = JSON.parse(data); // Parse the file contents as JSON
                res.json(jsonData); // Send the data in the response
            } catch (parseError) {
                res.status(500).json({ error: 'Error parsing JSON' });
            }
        });
    });
});

app.get('/api/metadata/flarecutecats/:id', (req, res) => {
    const id = req.params.id; // Get the filename from the request parameters
    const filePath = path.join(__dirname, 'assets/flarecutecats/json', `${id}.json`); // Construct the full path to the file

    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).json({ error: 'File not found' });
        }

        // Read and return the contents of the JSON file
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to read file' });
            }

            try {
                const jsonData = JSON.parse(data); // Parse the file contents as JSON
                res.json(jsonData); // Send the data in the response
            } catch (parseError) {
                res.status(500).json({ error: 'Error parsing JSON' });
            }
        });
    });
});

app.get('/api/image/flarecatsgang/:id', (req, res) => {
    const id = req.params.id; // Get the filename from the request parameters
    const filePath = path.join(__dirname, 'assets/flarecatsgang/image', `${id}.png`); // Construct the full path to the file

    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).json({ error: 'File not found' });
        }

        // Read and return the contents of the JSON file
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to read file' });
            }

            try {
                res.sendFile(filePath);
            } catch (parseError) {
                res.status(500).json({ error: 'Error parsing JSON' });
            }
        });
    });
});

// Export the Express app as a Cloud Function
exports.api = functions.https.onRequest(app);