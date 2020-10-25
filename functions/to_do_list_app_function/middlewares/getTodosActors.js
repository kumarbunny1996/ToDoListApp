const catalyst = require('zcatalyst-sdk-node');
const tableName = "ToDoList";
const columnTitle = "title";
const columnCompleted = "completed";
const columnRowId = "ROWID";
const columnCreated = "CREATEDTIME";

const getTodosList = async(req, res) => {
    let catalystApp = catalyst.initialize(req);
    todosList(catalystApp)
        .then(resObj => {
            res.status(200).send(resObj);
        })
        .catch(err => {
            console.log(err);
            res.status(400).send({ msg: "Your request has been failed" });
        });
}

const todosList = async(catalystApp) => {
    let list = await getDataFromCatalystDataStore(catalystApp);
    if (list.length === 0) {
        return {
            message: "No Todos List",
            isThere: true,
        }
    } else {
        let listArr = list.map(item => item.ToDoList);
        return {
            listArr
        }
    }
}

function getDataFromCatalystDataStore(catalystApp) {
    return new Promise((resolve, reject) => {
        // Queries the Catalyst Data Store table
        catalystApp.zcql().executeZCQLQuery(`Select ${columnRowId}, ${columnTitle}, ${columnCompleted} from ${tableName} order by createdtime`).then(queryResponse => {
            resolve(queryResponse);
        }).catch(err => {
            console.log(err);
            reject(err);
        })
    });
}

module.exports = getTodosList;