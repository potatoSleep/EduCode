const table = document.getElementById("table");
// const tableProduct1 = document.getElementById('tableProduct1');
// const tableProduct2 = document.getElementById('tableProduct2');
// const tableProduct3 = document.getElementById('tableProduct3');
// const tableProduct4 = document.getElementById('tableProduct4');
// const tableProduct5 = document.getElementById('tableProduct5');
// const tableProduct6 = document.getElementById('tableProduct6');
// const tableProduct7 = document.getElementById('tableProduct7');
// const tableProduct8 = document.getElementById('tableProduct8');
// const tableProduct9 = document.getElementById('tableProduct9');
function renderData(products) {
  table.innerHTML = ""; // reset trước khi render mới
  //console.log(products);
  products.forEach((product, index) => {
    const ul = document.createElement("ul");
    ul.innerHTML = `
            <li>ID: ${product.id}</li>
            <li>title: ${product.title}</li>
            <li>stock: ${product.stock}</li>
            <li>price: ${product.price}</li>
            <li>description: ${product.description}</li>
            <li><img src="${product.thumbnail}" alt="" width="40px"></li>
            <button onclick="chitietSp('${product.id}')">Chi tiết sp</button>
        `;
    table.appendChild(ul);
  });
}

//ct san pham
const detail = document.getElementById("product-detail");
async function chitietSp(id) {
  detail.innerHTML = "";
  try {
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    const detailSp = await res.json();
    console.log(detailSp);
    const ul = document.createElement("ul");
    ul.innerHTML = `
    <div class="detail">
            <li>${detailSp.id}</li>
            <li>${detailSp.title}</li>
            <li>${detailSp.stock}</li>
            <li>${detailSp.price}</li>
            <li>${detailSp.availabilityStatus}</li>
            <li>${detailSp.category}</li>
            <li>${detailSp.discountPercentage}</li>
            <li>${detailSp.minimumOrderQuantity}</li>
            <li>${detailSp.rating}</li>
            <li>${detailSp.returnPolicy}</li>
            <li>${detailSp.description}</li>
            <li><img src="${detailSp.thumbnail}" alt="" width="100px"></li>
            </div>
        `;
    detail.appendChild(ul);
  } catch (error) {
    console.log(error);
  }
}

//paginate
const productElse = document.getElementById("products");
const previewElse = document.getElementById("preview");
const nextElement = document.getElementById("next");
const currentPageEle = document.getElementById("current-page");

let totalProducts = 0;
let page = 1;
let limit = 9;
let skip = (page - 1) * limit;
const fetchProduct = async (limit, skip) => {
  try {
    const res = await fetch(
      `https://dummyjson.com/products/?limit=${limit}&skip=${skip}`
    );
    const data = await res.json();
    const products = data.products;
    //console.log(data);
    //console.log(products);
    totalProducts = data.total;
    allProduct = products;
    renderData(products);
  } catch (error) {
    console.log(error);
  }
};
previewElse.addEventListener("click", function () {
  if (page > 1) {
    page--;
    console.log(page);
    currentPageEle.innerHTML = page.toString();
    let skip = (page - 1) * limit;
    fetchProduct(limit, skip);
  }
});
nextElement.addEventListener("click", function () {
  let pageMax = Math.ceil(totalProducts / limit);
  if (page < pageMax) {
    page++;
    console.log(page);

    currentPageEle.innerText = page.toString();
    skip = (page - 1) * limit;
    fetchProduct(limit, skip);
  }
});

//tim kiem
const keyWord = document.getElementById("keyWord");
function searchSp() {}

//loc sp
let allProduct = [];
const sortOpt = document.getElementById("sortOpt");
sortOpt.addEventListener("change", function sortSp() {
  let sortEd = [...allProduct];
  console.log(sortEd.value);

  switch (sortOpt.value) {
    case "esc":
      sortEd.sort((a, b) => a.price - b.price);
      break;
    case "desc":
      sortEd.sort((a, b) => b.price - a.price);
      break;
    default:
      break;
  }
  renderData(sortEd);
});

fetchProduct(limit, skip);

//renderData();

// const localData = [];
// localData = data;
// console.log(localData);
