let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton");

function getTodoListFromLocalStorage() {
    let stringifiedTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);
    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}
let TodoList = getTodoListFromLocalStorage();

saveTodoButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(TodoList));
}

addTodoButton.onclick = function() {
    onAddTodo();
}

function onTodoStatusChange(checkboxId, labelId, todoId) {
    let checkboxElement = document.getElementById(checkboxId);
    console.log(checkboxElement.checked);

    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked"); /* if it there it removes and if not there it adds*/

    let todoObjectIndex = TodoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    })
    let todoObject = TodoList[todoObjectIndex];
    if (todoObject.ischecked === true) {
        todoObject.ischecked = false;
    } else {
        todoObject.ischecked = true;
    }
}

function onDeletetodo(todoId) {
    let todoElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);
    let deleteIndex = TodoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    TodoList.splice(deleteIndex, 1);
    console.log(TodoList);
}

function createAndAppendTodo(todo) {
    let todoId = "todo" + todo.uniqueNo;
    let checkboxId = "checkBox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;
    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flrx-row");
    todoElement.id = todoId;
    todoItemsContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.classList.add("checkbox-input");
    inputElement.checked = todo.ischecked;
    inputElement.onclick = function() {
        onTodoStatusChange(checkboxId, labelId, todoId);
    }
    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);


    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id = labelId;
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;
    if (todo.ischecked === true) {
        labelElement.classList.add("checked");
    }
    labelContainer.appendChild(labelElement);

    let deleteIconCotainerElement = document.createElement("div");

    deleteIconCotainerElement.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconCotainerElement);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIcon.onclick = function() {
        onDeletetodo(todoId);
    }
    deleteIconCotainerElement.appendChild(deleteIcon);
}
for (let eachTodo of TodoList) {
    createAndAppendTodo(eachTodo);
}

function onAddTodo() {
    let todosCount = TodoList.length;
    todosCount = todosCount + 1;
    let userInputElement = document.getElementById("todoUserInput");
    let userInputValue = userInputElement.value;

    if (userInputValue === "") {
        alert("Enter valid Input");
    }
    let newTodo = {
        text: userInputValue,
        uniqueNo: todosCount,
        ischecked: false,
    };
    TodoList.push(newTodo);
    createAndAppendTodo(newTodo);
    userInputElement.value = ""

}