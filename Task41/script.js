const todoInput = document.getElementById("todoInput");
const actionButton = document.getElementById("actionButton");
const errorMessage = document.getElementById("errorMessage");
const todoList = document.getElementById("todoList");

let todoEditing = null;
let todoUI = getData();
function generateRandomID(length) {
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "todo-";
  for (let i = 0; i < length; i++) {
    let index = Math.floor(Math.random() * characters.length);
    id += characters[index];
  }
  return id;
}
// lấy dữ liệu trong local
function getData() {
  return JSON.parse(localStorage.getItem("todos") || "[]");
}
// lưu dữ liệu vào local
function handleLocal(todo) {
  localStorage.setItem("todos", JSON.stringify(todo));
}

function handleErrorMessage(text) {
  errorMessage.style.display = "block";
  errorMessage.innerHTML = text;
}
function reset() {
  todoInput.value = "";
  errorMessage.style.display = "none";
  actionButton.innerHTML = "Them";
}
function renderUI(dataList) {
  if (dataList.length === 0) {
    todoList.innerHTML = "Khong co du lieu";
  }
  todoList.innerHTML = ``;
  dataList.forEach((todo) => {
    const li = document.createElement("li");
    li.className = `todo-item ${todo.completed ? "completed" : ""}`;
    li.innerHTML = `
         <span class="status ${todo.completed ? "completed" : "active"}" 
                onclick="toggleTodo('${todo.id}')">
            ${todo.completed ? "Hoàn thành" : "Chưa hoàn thành"}
          </span>
            <span class = "task-id">${todo.id}</span>
            <span class = "task-text">${todo.title}</span>
            <button class= "delete" onclick="deleteTodo('${
              todo.id
            }')">Xoa</button>
            <button class= "edit" onclick="editTodo('${todo.id}')">Sua</button>
        `;
    todoList.appendChild(li);
  });
}
function addTodo() {
  todoUI = getData();
  const value = todoInput.value.trim();
  if (value === "") {
    handleErrorMessage("Vui long nhap du lieu");
    return;
  }
  if (todoEditing) {
    const todoElement = todoUI.find((todo) => todo.id === todoEditing.id);
    if (todoElement) {
      todoElement.title = value;
      handleLocal(todoUI);
      reset();
      renderUI(getData());
    }
  } else {
    const todo = {
      id: generateRandomID(3),
      title: value,
      completed: false, // chua hoan thanh
    };
    handleLocal([...todoUI, todo]);
    reset();
    renderUI(getData());
  }
}

function deleteTodo(idTodo) {
  todoUI = getData();
  todoUI = todoUI.filter((todo) => todo.id !== idTodo);
  handleLocal([...todoUI]);
  renderUI(getData());
}
function editTodo(idTodo) {
  todoInput.focus();
  todoUI = getData();
  const todoEdit = todoUI.find((todo) => todo.id === idTodo);
  if (todoEdit) {
    actionButton.innerHTML = "Sua";
    todoInput.value = todoEdit.title;
    todoEditing = todoEdit;
  }
}
function toggleTodo(idToggle) {
  todoUI = getData();
  const todoToggle = todoUI.find((todo) => todo.id === idToggle);
  todoToggle.completed = !todoToggle.completed;
  handleLocal(todoUI);
  renderUI(getData());
}

function filterTodos(status) {
  const todos = getData();
  let filtered = todos;
  if (status === "active") filtered = todos.filter((t) => !t.completed);
  if (status === "completed") filtered = todos.filter((t) => t.completed);

  document
    .querySelectorAll(".filter-section button")
    .forEach((btn) => btn.classList.remove("active"));
  document
    .querySelector(`.filter-section button[onclick="filterTodos('${status}')"]`)
    ?.classList.add("active");

  renderUI(filtered);
}
actionButton.addEventListener("submit", addTodo);
renderUI(getData());

// sort theo độ khó của task
// tìm kiếm task
// description  = sửa chỉ sửa description ( không sửa đc title )
