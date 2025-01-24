const express = require('express');
const app = express();

app.use(express.json());

let tasks = [];

app.post('/tasks', (req, res) => {
    const { title, description } = req.body;
    const task = {
        id: tasks.length + 1,
        title,
        description
    };
    tasks.push(task);
    res.status(201).json(task);
});

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.get('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
});

app.delete('/tasks/:id', (req, res) => {
    tasks = tasks.filter(t => t.id !== parseInt(req.params.id));
    res.json({ message: 'Task deleted' });
});

app.post('/calculate', (req, res) => {
    const { num1, num2 } = req.body;
    const result = num1 / num2;
    res.json({ result });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
