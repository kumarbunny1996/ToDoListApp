const catalyst = require('zcatalyst-sdk-node');

const deleteTaskFromDb = async(req, res) => {
    let catalystApp = catalyst.initialize(req);
    let rowId = req.query.rowId;
    deleteTodos(catalystApp, rowId)
        .then(resObj => {
            res.status(200).send(resObj);
        })
        .catch(err => {
            res.status(400).send({ msg: "Your request has been failed" });
        });
}

const deleteTodos = async(catalystApp, rowId) => {
    let row_id = Number(rowId);
    let tableName = "ToDoList";
    let datastore = catalystApp.datastore();
    let table = datastore.table(tableName);
    let rowPromise = table.deleteRow(row_id);
    rowPromise.then((row) => {
        console.log(row);
    });
    return {
        isDeleted: true,
        msg: "Todo was deleted"
    }
}


module.exports = deleteTaskFromDb;