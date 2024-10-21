const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3001;

const dataFilePath = path.join(__dirname, 'budgetData.json');

// Middleware to parse JSON request bodies
app.use(express.json());

// Root route to respond to GET requests on "/"
app.get('/', (req, res) => {
    res.send('Welcome to the Budget Tracker API');
});

// GET all budget data
app.get('/api/budget', (req, res) => {
    fs.readFile(dataFilePath, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading data file' });
        }
        res.json(JSON.parse(data));
    });
});

// POST to add a new budget item
app.post('/api/budget', (req, res) => {
    const newEntry = req.body;

    fs.readFile(dataFilePath, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading data file' });
        }
        const budgetData = JSON.parse(data);
        budgetData.push(newEntry);

        fs.writeFile(dataFilePath, JSON.stringify(budgetData, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error writing to data file' });
            }
            res.json(newEntry);
        });
    });
});

// PUT to update a budget item
app.put('/api/budget/:index', (req, res) => {
    const index = parseInt(req.params.index, 10); // Parse index

    const updatedEntry = req.body;

    fs.readFile(dataFilePath, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading data file' });
        }
        const budgetData = JSON.parse(data);

        if (isNaN(index) || index < 0 || index >= budgetData.length) {
            return res.status(400).json({ error: 'Invalid index' });
        }

        budgetData[index] = updatedEntry;

        fs.writeFile(dataFilePath, JSON.stringify(budgetData, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error writing to data file' });
            }
            res.json(updatedEntry);
        });
    });
});

// DELETE a budget item
app.delete('/api/budget/:index', (req, res) => {
    const index = parseInt(req.params.index, 10); // Convert index to an integer

    fs.readFile(dataFilePath, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading data file' });
        }

        const budgetData = JSON.parse(data);

        // Check if the index is valid
        if (isNaN(index) || index < 0 || index >= budgetData.length) {
            return res.status(400).json({ error: 'Invalid index' });
        }

        // Optionally capture the deleted item
        const deletedItem = budgetData[index];

        // Remove the item from the array
        budgetData.splice(index, 1);

        fs.writeFile(dataFilePath, JSON.stringify(budgetData, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error writing to data file' });
            }
            res.json({ message: 'Entry deleted', deletedItem }); // Send a response with the deleted item
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
