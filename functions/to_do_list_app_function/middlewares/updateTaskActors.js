const catalyst = require('zcatalyst-sdk-node');

const updateTaskInDb = async(req, res) => {
    let catalystApp = catalyst.initialize(req);
    let rowId = req.query.rowId;
    let isCompleted = req.body.completed;
    updateTodos(catalystApp, rowId, isCompleted)
        .then(resObj => {
            res.status(200).send(resObj);
        })
        .catch(err => {
            console.log(err);
            res.status(400).send({ msg: "Your request has been failed" });
        });
}

const updateTodos = async(catalystApp, rowId, isCompleted) => {
    let updatedRowData = {
        completed: isCompleted,
        ROWID: rowId
    }
    console.log(updatedRowData);

    //Use Table Meta Object to update a multiple rows using ROWIDs which returns a promise
    let datastore = catalystApp.datastore();
    let table = datastore.table('ToDoList');
    let rowPromise = table.updateRow(updatedRowData);
    rowPromise.then((row) => {
        console.log(row);
    });

    return {
        isUpdated: true,
        msg: 'Your task has been updated'
    }
}

module.exports = updateTaskInDb;