// get todos from local storage
let todos = localStorage.getItem('todos');

// try catch for parse data
try {
    todos = JSON.parse(todos)
    todos = todos.length ? todos : todos = null;
} catch (e) {
    todos = null;
}

// set default if todos is == null
if (!todos){
    todos = [
        {content:"Shopping", status:true},
        {content:"watch tutorial", status:false},
        {content:"gym", status:true},
    ]
    localStorage.setItem('todos',JSON.stringify(todos));
}

// for create or update todo list in UI
function createTodos(todos){
    let todosList =document.querySelector('#todos-list');
    todosList.innerHTML = "";

    // create list tag for each to do
    todos.forEach((todo , index) => {
        let li = document.createElement('li')
        li.className = 'list-group-item';
        let content = document.createElement('span');
        content.textContent = todo.content;
        content.style.textDecoration = todo.status ? "initial" : "line-through";
        let deleteBtn = document.createElement('img');
        deleteBtn.src = './image/delete.png';
        deleteBtn.alt = 'delete icon';
        deleteBtn.className = 'float-right';

        // append them to  UI
        li.append(content);
        li.append(deleteBtn);
        todosList.append(li);

        // add event for delete the todo
        deleteBtn.addEventListener('click', e => {
            todos.splice (index,1);
            localStorage.setItem('todos',JSON.stringify(todos));
            createTodos(todos);
        });

        // add event for complete the todo
        content.addEventListener('click', e => {
            todos[index].status = !todos[index].status;
            localStorage.setItem('todos',JSON.stringify(todos));
            createTodos(todos);
        });
    });
}

// add and search action
let actions = document.querySelector('#actions');
let formWrapper = document.querySelector('#form-wrapper');
Array.from(actions.children).forEach(action =>{

// add todo
    if (action.dataset.action == "add"){
        action.addEventListener('click', e =>{
            formWrapper.innerHTML = `
            <form  id="add">
                <input class="form-control" name="add" placeholder="Add To Do...">
            </form>
            `
            createTodos(todos);
            let add = document.querySelector('#add');

            // add todo if input box is not empty
            add.addEventListener('submit', e => {
                e.preventDefault();
                if (add.add.value){
                    todos.push({content:add.add.value, status:true})
                    localStorage.setItem('todos',JSON.stringify(todos));
                    createTodos(todos);
                    add.innerHTML = "";
                }
            });
        })
    // search to do
    } else if(action.dataset.action == "search") {
        action.addEventListener('click', e =>{
            formWrapper.innerHTML = `
            <form  id="search">
                <input class="form-control" name="search" placeholder="Search To Do...">
            </form>
            `
            let search = document.querySelector('#search');

            // search todos by content
            search.addEventListener('keyup', e => {
                e.preventDefault();
                if (search.search.value) {
                    let filtered_todos = todos.filter(
                        todo => todo.content.toLowerCase().includes(search.search.value.toLowerCase())
                    )
                    createTodos(filtered_todos)  
                    
                // if input box is empty show all todos
                } else{
                    createTodos(todos);
                }
            });
        });
    }
});

createTodos(todos);