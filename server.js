const express = require('express');
const mongoose = require('mongoose'); // For MongoDB integration
const morgan = require('morgan'); // For logging
const bodyParser = require('body-parser'); // For parsing request bodies
const cors = require('cors'); // For enabling CORS
const PORT = process.env.PORT || 5000;

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(morgan('dev')); // Logging middleware
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Database connection
mongoose.connect('mongodb://localhost/my_database', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Define routes

// Example route for fetching project milestones
app.get('/api/project/milestones', async (req, res) => {
    try {
        // Fetch project milestones from the database
        const milestones = await Milestone.find({ projectId: req.query.projectId });
        res.json(milestones);
    } catch (error) {
        console.error('Error fetching project milestones:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Example route for updating project milestone
app.put('/api/project/milestones/:id', async (req, res) => {
    try {
        // Update project milestone in the database
        const updatedMilestone = await Milestone.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedMilestone);
    } catch (error) {
        console.error('Error updating project milestone:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
