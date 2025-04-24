const students = [
  { id: 1, name: "Nguyễn Văn A", age: 20, city: "Hà Nội" },
  { id: 2, name: "Trần Thị B", age: 19, city: "TP.HCM" },
  { id: 3, name: "Lê Văn C", age: 21, city: "Đà Nẵng" },
];
const tableBody = document.querySelector("#dataTable");

students.forEach((students) => {
  tableBody.innerHTML += `
 
  <tr>
        <td>${students.id}</td>
        <td>${students.age}</td>
         <td>${students.city}</td>
         <td>${students.name}</td>
    </tr>
  `;
});
