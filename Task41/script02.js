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
function saveData(todo) {
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

function toggleTodo(idToggle) {
  todoUI = getData();
  const todoToggle = todoUI.find((todo) => todo.id === idToggle);
  todoToggle.completed = !todoToggle.completed;
  saveData(todoUI);
  renderUI(getData());
}
function addTodo() {
  todoUI = getData();
  const value = todoInput.value.trim();
  if (value === "") {
    handleErrorMessage("Vui lòng nhập dữ liệu");
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
      completed: false,
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
    actionButton.innerHTML = "Sửa";
    todoInput.value = todoEdit.title;
    todoEditing = todoEdit;
  }
}

// sort theo độ khó của task
// tìm kiếm task
// description  = sửa chỉ sửa description ( không sửa đc title )
