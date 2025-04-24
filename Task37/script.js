let index = document.querySelectorAll("#list .item").length + 1;
console.log(index);

function addItem() {
  const list = document.getElementById("list");
  const newIndex = document.createElement("div");
  newIndex.className = "item";
  newIndex.innerText = `Phần tử ${index}`;
  list.appendChild(newIndex);
  index++;
  console.log(index);
}
function removeItem() {
  const list = document.getElementById("list");
  const lastOne = list.lastElementChild;
  console.log(lastOne);
  if (lastOne) {
    list.removeChild(lastOne);
  } else {
    alert("het roi");
  }
  index--;
}
