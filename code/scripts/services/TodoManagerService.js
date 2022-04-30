const TO_DO_TABLE = "todos";

class TodoManagerService {

    constructor(enclaveDB) {
        this.enclave = enclaveDB;
    }

    createToDo(todo, callback) {
        this.enclave.insertRecord(TO_DO_TABLE, todo.input.name, todo, callback);
    }

    removeToDo(todoPath, callback) {
        this.enclave.deleteRecord(todo.input.name, callback);
    }

    editToDo(todo, callback) {
        this.enclave.updateRecord(TO_DO_TABLE, todo.input.name, todo, callback);
    }

    listToDos(callback) {
        this.enclave.getAllRecords(TO_DO_TABLE, callback);
    }
}

let todoManagerService;
let getTodoManagerServiceInstance = function (controllerInstance, callback) {
    if (!todoManagerService) {
        controllerInstance.getMainEnclaveDB((err, enclave) => {
            if (err) {
                console.log('Could not get main enclave ', err);
                return callback(err);
            }
            todoManagerService = new TodoManagerService(enclave);
            return callback(todoManagerService)
        })

    } else {
        return callback(todoManagerService);
    }
}

export {
    getTodoManagerServiceInstance
};
