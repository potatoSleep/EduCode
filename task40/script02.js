function getUserPromise(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: userId, name: "John" });
    }, 1000);
  });
}

function getPurchasesPromise(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, product: "Laptop", price: 1000 },
        { id: 2, product: "Phone", price: 2000 },
      ]);
    }, 1000);
  });
}

function getProductDetailsPromise(productId, productName) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: productId, name: productName, price: 1000 });
    }, 1000);
  });
}
getUserPromise(1)
  .then((user) => {
    console.log("User:", user);

    return getPurchasesPromise(user.id);
  })
  .then((purchases) => {
    console.log("Purchases:", purchases);

    let promiseList = purchases.map((item) =>
      getProductDetailsPromise(item.id, item.product)
    );

    return Promise.all(promiseList);
  })
  .then((productDetailsList) => {
    console.log("Product Details:", productDetailsList);

    let total = 0;
    productDetailsList.forEach((product) => {
      total += product.price;
    });

    console.log("Tổng tiền:", total);
  });
