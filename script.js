let todoInput = document.getElementById("todoInput");
let addTodoBtn = document.getElementById("addTodoBtn");
let todoList = document.getElementById("todoList");

// Load todos from localStorage
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Render todos on page load
renderTodos();

// Add todo
addTodoBtn.addEventListener("click", function () {
    let task = todoInput.value.trim();

    if (task === "") {
        alert("Please enter a task");
        return;
    }

    let todo = {
        id: Date.now(),
        taskName: task,
        isCompleted: false
    };

    todos.push(todo);
    saveTodos();
    renderTodos();
    todoInput.value = "";
});

// Render function
function renderTodos() {
    todoList.innerHTML = "";

    todos.forEach(todo => {
        let li = document.createElement("li");
        li.className = "list-group-item";

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.isCompleted;
        checkbox.addEventListener("change", function () {
            todo.isCompleted = checkbox.checked;
            saveTodos();
            renderTodos();
        });

        let span = document.createElement("span");
        span.textContent = todo.taskName;
        if (todo.isCompleted) {
            span.classList.add("completed");
        }

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "btn btn-danger btn-sm";
        deleteBtn.addEventListener("click", function () {
            deleteTodo(todo.id);
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);

        todoList.appendChild(li);
    });
}

// Delete todo
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    renderTodos();
}

// Save to localStorage
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}
