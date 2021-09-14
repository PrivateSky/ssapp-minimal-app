

class TodoManagerService {

    constructor(storage) {
        const HostBootScript = require("boot-host").HostBootScript;
        new HostBootScript("category-manager-service");
        this.DSUStorage = storage;
    }

    createToDo(todo, callback) {
        $$.interaction.startSwarmAs("test/agent/007", "toDoSwarm", "createToDo", todo).onReturn(callback);
    }

    removeToDo(todoPath, callback) {
        $$.interaction.startSwarmAs("test/agent/007", "toDoSwarm", "removeToDo", todoPath).onReturn(callback);
    }

    editToDo(todo, callback) {
        $$.interaction.startSwarmAs("test/agent/007", "toDoSwarm", "editToDo", todo).onReturn(callback);
    }

    listToDos(callback) {
        $$.interaction.startSwarmAs("test/agent/007", "toDoSwarm", "listToDos").onReturn(callback);
    }
}

let todoManagerService;
let getTodoManagerServiceInstance = function (controllerInstance) {
    if(!todoManagerService){
        todoManagerService = new TodoManagerService(controllerInstance.getWalletStorage());
    }
    return todoManagerService;
}

export {
    getTodoManagerServiceInstance
};