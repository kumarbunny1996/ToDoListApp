const catalyst = require('zcatalyst-sdk-node');
const tableName = "ToDoList";

const addTaskToDb = async(req, res) => {
    let title = req.body.title;
    let catalystApp = catalyst.initialize(req);
    addTodos(catalystApp, title)
        .then(resObj => {
            res.status(200).send(resObj);
        })
        .catch(err => {
            res.status(400).send({ msg: "Your request has been failed" });
        });
}

const addTodos = async(catalystApp, title) => {
    let notesVal = title;
    let rowData = {}
    rowData["title"] = notesVal;
    let rowArr = [];
    rowArr.unshift(rowData);
    let insertedData = await getInsertedData(catalystApp, rowArr);
    if (insertedData) {
        let todoData = {
            ROWID: insertedData[0].ROWID,
            title: insertedData[0].title,
            completed: false,
        }
        console.log(todoData);
        return {
            todoData,
        };
    } else {
        return {
            msg: "failed to add task",
            isAdd: false
        };
    }

}
const getInsertedData = (catalystApp, rowArr) => {
    return new Promise((resolve, reject) => {
        catalystApp.datastore().table(tableName).insertRows(rowArr)
            .then(userInsertResp => {
                console.log(userInsertResp);
                resolve(userInsertResp);
            }).catch(err => {
                console.log(err);
                reject(err);
            });
    });
}




module.exports = addTaskToDb;