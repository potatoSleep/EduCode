setInterval(() => {
  const time = new Date();
  const h = time.getHours();
  const m = time.getMinutes();
  const s = time.getSeconds();
  const timer = `${h} : ${m} : ${s}`;
  document.querySelector("#clock").innerHTML = timer;
}, 1000);
