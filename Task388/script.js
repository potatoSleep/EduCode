const q = document.querySelectorAll(".accordion-question");
console.log(q);
q.forEach((q) => {
  q.addEventListener("click", () => {
    const a = q.nextElementSibling;
    a.classList.toggle("active");
  });
});
