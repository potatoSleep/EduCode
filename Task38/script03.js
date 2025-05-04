function getUserAsync(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: userId, name: "John", age: 30 });
    }, 1000);
  });
}

function getPurchasesAsync(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, userId: userId, product: "Laptop", price: 1000 },
        { id: 2, userId: userId, product: "Phone", price: 2000 },
      ]);
    }, 1000);
  });
}

function getProductDetailsAsync(productId, productName) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: productId, name: productName, price: 1000 });
    }, 1000);
  });
}

async function run() {
  const user = await getUserAsync(1);
  const purchases = await getPurchasesAsync(user.id);
  const productDetails = await Promise.all(
    purchases.map((p) => getProductDetailsAsync(p.id, p.product))
  );
  const total = productDetails.reduce((sum, p) => sum + p.price, 0);
  console.log("Tổng tiền:", total);
}
run();
