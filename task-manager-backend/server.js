const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const tasksFilePath = './data/tasks.json';

// Helper function to read tasks from the JSON file
const readTasks = () => {
    const tasksData = fs.readFileSync(tasksFilePath);
    return JSON.parse(tasksData);
};

// Helper function to write tasks to the JSON file
const writeTasks = (tasks) => {
    fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
};

// Initialize tasks.json file if it doesn't exist
if (!fs.existsSync(tasksFilePath)) {
    writeTasks([]);
}

// Get all tasks
app.get('/tasks', (req, res) => {
    const tasks = readTasks();
    res.json(tasks);
});

// Add a new task
app.post('/tasks', (req, res) => {
    const tasks = readTasks();
    const newTask = req.body;
    newTask.id = Date.now();
    tasks.push(newTask);
    writeTasks(tasks);
    res.json(newTask);
});

// Update a task
app.put('/tasks/:id', (req, res) => {
    const tasks = readTasks();
    const taskId = parseInt(req.params.id);
    const updatedTask = req.body;

    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
        writeTasks(tasks);
        res.json(tasks[taskIndex]);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
    const tasks = readTasks();
    const taskId = parseInt(req.params.id);

    const updatedTasks = tasks.filter(task => task.id !== taskId);
    writeTasks(updatedTasks);

    res.json({ message: 'Task deleted' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
