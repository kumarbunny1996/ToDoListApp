const getTodosList = require('./middlewares/getTodosActors');
const addTaskToDb = require('./middlewares/addTaskActors');
const deleteTaskFromDb = require('./middlewares/deleteTaskActors');
const updateTaskInDb = require('./middlewares/updateTaskActors');
const express = require("express");
const path = require("path");
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../client/dist/client')));

app.get('/api/todos', (req, res) => {
    getTodosList(req, res);
});
app.post('/api/addTask', (req, res) => {
    addTaskToDb(req, res);
});
app.delete('/api/deleteTask', (req, res) => {
    deleteTaskFromDb(req, res);
});
app.put('/api/updateTask', (req, res) => {
    updateTaskInDb(req, res);
});


module.exports = app;