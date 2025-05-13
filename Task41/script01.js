/**
 * ? lấy các id từ form của html qua Id
 * ?
 */
const todoInput = document.getElementById("todoInput");
const actionButton = document.getElementById("actionButton");
const errorMessage = document.getElementById("errorMessage");
const todoList = document.getElementById("todoList");

let editingTodo = null;
/**
 * ! B1 tạo hàm random ra id
 * ? tạo ra hàm RandomId(lenght) nhận vào tham số length () (length ở đây là số ký tự của id)
 * ? Vd muốn có 4 ký tự random -> RandomId(4)
 * ? muốn tạo ra id theo dạng : todo + ran số
 * ? tạo ra 1 biến char lưu trữ : chuỗi có đầy đủ từ chữ đến số (đây là phần random)
 * ? tạo ra 1 biế id  lưu trữ : chuỗi "todo-"
 * * phần random xử lý: cần sử dụng đến hàm Math.random để lấy ngãu nhiên ký tứ trong chuỗi của biến char
 * * Vd biến char có 62 kí tự, Math random lấy ngẫu nhiên trong 62 kí tự của biến char
 * * có 1 vấn đề là hàm Math.random có thể lấy được cả số thập phân vậy nên cần làm tròn
 * * Giải pháp để làm tròn: Math.floor
 * ? Vậy làm thế nào để tạo ra số ký tự theo số length nhập vào.
 * ? có bao nhiêu ký tự cần tạo ra -> có bấy nhiêu lần random ra ký tự => có nhiều lặp lại việc random
 * ? Cách để tối ưu việc lặp lại: sự dụng vòng lặp for
 * ? Trong vòng lặp for này tạo ra ký tự random
 */

function RandomId(length) {
  let char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < length; i++) {
    id += char[Math.floor(Math.random() * char.length)]; // ? chars.length là số lượng ký tự trong chuỗi chars
  }
  return id;
}
/**
 * ! B2 lấy ra dữ liệu
 * ? Bài này để lưu trữ được dữ liệu trong bài này cần sử dụng đến localStorage
 * ? để lấy được dữu liệu từ localStorage ta sử dụng localStorage.getItem
 * ? localStorage  sẽ lưu dữ liệu theo kiểu key - value để lấy được dữ liệu từ localStorage cần phải lấy theo key
 * ? Trên localStorage  sẽ trả lại dữ liệu theo chuỗi JSON còn JS sẽ làm việc với sữ liệu của bài theo dạng mảng => bất đồng kiểu dữ liệu
 * ? Giải pháp: sử dụng JSON.parse(...) Chuyển chuỗi JSON thành mảng JavaScript
 * ? Trong trường hợp trên localStorage không có dữ liệu sẽ trả về [] mảng rỗng
 */
function getTodos() {
  return JSON.parse(localStorage.getItem("todo") || "[]");
}

/**
 * ! B3 lưu dữ liệu lên localStorage để không mất dữ liệu khi reload trang
 * ? tạo ra hàm saveTodos(todos) nhận vào tham số todos là dữ liệu dưới dạng mảng
 * ? để lưu dữ liệu lên localStorage cần sử dụng localStorage.setItem(...)
 * ? localStorage.setItem(...) sẽ nhận vào key là "todo" và value dưới dạng chuỗi
 * ? mà khi người dùng nhập vào form thì dữ liệu là dạng mảng nên sẽ cần JSON.stringify()
 *
 */

function saveTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

/**
 * ! B4 render ra màn hình
 * ? tạo ra hàm render(todos) nhận vào tham số todos là mảng công việc nhận vào
 * ? cần lấy ra list sản phẩm trong thẻ có id là todolist
 * ? nếu cứ mỗi lần thêm 1 phần tử mới sẽ bị lặp lại
 * ? vd: danh sách cũ là n , h thêm danh sách mới sẽ là n+1 vậy render ra sẽ là n , n+1 (vậy danh sách cũ sẽ in ra 2 lần)
 * ? Giải pháp : sử dụng innerHTML để làm mới trước khi thêm nội dung => danh sách cũ là n, danh sách mới là 1 vậy render là n+1( không bị lặp)
 * ? Trong trường hợp todolist không có gì cả sẽ cần trả về cho người dùng là "không có dữ liệu" -> sử dụng nếu thì
 * ? nếu độ dài của danh dách (phần tử) = 0 thì return  ko có dữ liệu
 * ? mỗi 1 danh sách thêm vào sẽ cần có 1 thẻ li để chứa =>
 * ? tạo biến li để lưu trữ thẻ li được tạo ra document.createElement("li")
 * ? mỗi công việc (todo-item) đều có 2 trạng thái completed || !completed
 * ? Sử dụng li.class name để gán phần tử cho thẻ li
 * ? in ra giao diện người dùng khi thao tác (sự kiện onclick) chuyển từ !completefd sang completed (gọi đến hàm toggleTodo)
 * ? khi chuyển đổi vậy sẽ liên quan đến id của công việc đó => gọi đến toggleTodo('${todo.id}')"
 * ? còn lại sẽ in nốt những thành phần còn lại của công việc ra: todo.id, todo.title
 * ? mỗi dong sẽ còn có cả 2 nút nữa Xóa và Sửa nên sẽ cần gọi đến hàm onclick="editTodo('${todo.id}'), onclick="deleteTodo('${todo.id}')
 * ? vậy sẽ những phần tử li mới thêm vào thì sẽ thêm vào đâu danh sách?
 * ? câu trả lời là thêm vào cuối danh sách todolist => sử dụng todoList.appendChild(li);
 */
function render(todos) {
  todoList.innerHTML = "";
  if (todos.length === 0) {
    todoList.innerHTML = "<li>Không có công việc</li>";
    return;
  }
  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.className = `todo-item ${todo.completed ? "completed" : ""}`;
    li.innerHTML = `
      <span onclick="toggleTodo('${todo.id}')">${
      todo.completed ? "✅" : "⬜"
    }</span>
      <span class="task-id">${todo.id}</span>
      <span class="task-text">${todo.title}</span>
      <button onclick="editTodo('${todo.id}')">Sửa</button>
      <button onclick="deleteTodo('${todo.id}')">Xóa</button>
    `;
    todoList.appendChild(li);
  });
}

function addTodo() {
  const value = todoInput.value.trim();
  if (!value) return showError("Vui long nhap noi dung");
  const todos = getTodos();
  if (editingTodo) {
    const todo = todo.find((t) => t.id === editingTodo);
    if (todo) todo.title = value;
    editingTodo = null;
    actionButton.innerHTML = "Them";
  } else {
    todos.push({ id: RandomId(5), title: value, completed: false });
  }
  saveTodos(todos);
  render(todos);
}

function showError(msg) {
  errorMessage.innerText = msg;
  errorMessage.style.display = "block";
}
function changeTodo(id) {
  const todos = getTodos();
  const todo = todos.find((t) => t.id === id);
  if (todo) todo.completed = !todo.completed;
  saveTodos(todos);
  renderUI(todos);
}
function deleteTodo(id) {
  const data = getTodos().filter((t) => t.id !== id);
  saveTodos(data);
  render(data);
}
function editTodo(id) {
  const todos = getTodos();
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todoInput.value = todo.title;
    editingTodo = todo;
    actionButton.innerText = "Sửa";
  }
}
function filterTodos(status) {
  const todos = getTodos();
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

actionButton.addEventListener("click", addTodo);
render(getTodos());
