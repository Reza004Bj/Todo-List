const todoForm = document.querySelector('form');
const todoInput = document.getElementById('input-todo');
const todoUL = document.getElementById('todo-list');

let allTodos = getTodos();
update(allTodos)

todoForm.addEventListener('submit',function(params) {
    params.preventDefault();
    const todoText = todoInput.value.trim();
    if(todoText.length > 0){
        const todoInfo = {
            text: todoText,
            finished: false
        }
        allTodos.push(todoInfo);
        update();
        const jsonTodos = JSON.stringify(allTodos);
        localStorage.setItem("todoList", jsonTodos);
        todoInput.value = "";
    }else{
        alert(todoText);
    }
})

function update() {
    todoUL.innerHTML = "";
    allTodos.forEach((todo,todoIndex) => {
        item = createItem(todo,todoIndex);
        todoUL.append(item);
    });
}

function createItem(todo,index) {
    const id = "todo-"+index;
    const todoList = document.createElement("li");
    todoList.className = "ListOfTodos";
    todoList.innerHTML = `
            <input type="checkbox" id="${id}">
            <label class="custumCheckBox" for="${id}">
                <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
                        <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z">
                </svg>
            </label>
            <label for="${id}" class="todo-text">
                    ${todo.text}
            </label>
            <button class="remove-todo">
                <svg fill:"var(--text-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
                    <path d="M200-440v-80h560v80H200Z"/>
                </svg>
            </button>
    `
    const remove = todoList.querySelector(".remove-todo");
    remove.addEventListener("click",()=>{
        allTodos = allTodos.filter((_,i)=> i !== index);
        const jsonTodos = JSON.stringify(allTodos);
        localStorage.setItem("todoList", jsonTodos);
        update(allTodos);
    })
    const checkbox = todoList.querySelector("input");
    checkbox.addEventListener("change",()=>{
        allTodos[index].finished = checkbox.checked;
        const jsonTodos = JSON.stringify(allTodos);
        localStorage.setItem("todoList", jsonTodos);
    })
    checkbox.checked = todo.finished
    return todoList;
}

function getTodos(){
    const todoList = localStorage.getItem("todoList") || "[]";
    return JSON.parse(todoList);
}
