import ContainerController from "../../cardinal/controllers/base-controllers/ContainerController.js";
import {getTodoManagerServiceInstance} from "../services/TodoManagerService.js";

export default class TodoListController extends ContainerController {
    constructor(element) {
        super(element);
        this.TodoManagerService = getTodoManagerServiceInstance();

        // Set some default values for the view model
        this.model = this.setModel({
            conditionalExpressions: {
                isLoading: true
            },
            items: [],
            item: {
                name: 'item',
                value: ''
            }
        });

        // Add new item to the list
        this.on('list:newItem', (e) => {
            e.preventDefault();
            e.stopImmediatePropagation();
            this._addNewListItem();
        })

        this._populateItemList((data) => {
            this.setModelObject('items', data);
            this.setLoadingState();
            this.model.items.forEach((item, index) => {
                this._addToDoListener(index);
            })
        });
    }

    setLoadingState(loadingState = false) {
        this.model.setChainValue("conditionalExpressions.isLoading", loadingState);
    }

    setModelObject(key, object) {
        this.model.setChainValue(key, JSON.parse(JSON.stringify(object)));
    }

    _addToDoListener = (index) => {
        console.log('_addToDoListener simple', index)
        this.model.onChange(`items.${index}.checkbox` , (modelChangeObject) => {
            let currentToDo = modelChangeObject.chain.split(".");
            console.log('_addToDoListener checkbox', currentToDo)
            this._editListItem(this.model.getChainValue(currentToDo[0] + "." + currentToDo[1]));
        })
        this.model.onChange(`items.${index}.value` , (modelChangeObject) => {
            let currentToDo = modelChangeObject.chain.split(".");
            console.log('_addToDoListener value', currentToDo)
            this._editListItem(this.model.getChainValue(currentToDo[0] + "." + currentToDo[1]));
        })
        this.element.querySelector('psk-for-each')
            .addEventListener('blur', (event) => {
               console.log('blur', event);
            });
        this.element.querySelector('psk-for-each')
            .addEventListener('focus', (event) => {
               console.log('focus', event);
            });
        this.element.querySelector('psk-for-each')
            .addEventListener('dblClick', (event) => {
               console.log('dblClick', event);
            });
    }

    _populateItemList(callback) {
        this.TodoManagerService.listToDos((err, data) => {
            if (err) {
                console.log(err);
            }
            callback(data)
        })
    }

    _addNewListItem() {
        // Get the value from the "item" view model
        let newItem = {
            value: this.model.item.value,
            readOnly: false,
            checkbox: {
                checkedValue: "yes",
                uncheckedValue: "no",
                value: ""
            }
        };

        this.TodoManagerService.createToDo(newItem, (err, data) => {
            if (err) {
                console.log(err);
            }
            console.log('createToDo', data);
            newItem = {
                ...newItem,
                ...data
            }
            debugger;
            // Appended to the "items" array
            this.model.items.push(newItem);

            this._addToDoListener(this.model.items.length - 1);


            // Clear the "item" view model
            this.model.item.value = '';
        })


    }

    _editListItem(todo) {
        debugger;

        this.TodoManagerService.editToDo(todo, (err, data) => {
            if (err) {
                console.log(err);
            }
            console.log('editToDo', data);
        })
    }
}