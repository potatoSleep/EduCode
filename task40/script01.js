function getUser(userId, callback) {
  setTimeout(() => {
    callback({ id: userId, name: "John", age: 30 });
  }, 1000);
}

function getPurchases(userId, callback) {
  setTimeout(() => {
    callback([
      { id: 1, userId: userId, product: "Laptop", price: 1000 },
      { id: 2, userId: userId, product: "Phone", price: 2000 },
    ]);
  }, 1000);
}

function getProductDetails(productId, productName, callback) {
  setTimeout(() => {
    callback({ id: productId, name: productName, price: 1000 });
  }, 1000);
}

getUser(1, (user) => {
  console.log("User", user);

  getPurchases(user.id, (purchases) => {
    console.log("Purchases", purchases);

    let sum = 0;

    purchases.forEach((purchase) => {
      getProductDetails(purchase.id, purchase.product, (productDetails) => {
        console.log("Product Details", productDetails);

        sum += productDetails.price;

        console.log("Tổng:", sum);
      });
    });
  });
});
