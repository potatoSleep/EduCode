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
  try {
    const user = await getUserAsync(1);
    console.log("user:", user);

    const purchases = await getPurchasesAsync(user.id);
    console.log("purchases", purchases);

    let total = 0;

    for (const item of purchases) {
      const productDetails = await getProductDetailsAsync(
        item.id,
        item.product
      );
      console.log("Chi tiết:", productDetails);

      total += productDetails.price;
    }

    console.log("Tổng tiền:", total);
  } catch (err) {
    console.log(err);
  }
}

run();
