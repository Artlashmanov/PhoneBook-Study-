let telefoneBook = {
  Form: null,
  ID: null,
  Name: null,
  Lastname: null,
  Surname: null,
  Tel: null,
  data: [],
  List: null,
  init: () => {

  telefoneBook.ID = document.querySelector("#ID");
  telefoneBook.Form = document.querySelector("#Form");
  telefoneBook.Name = document.querySelector("#Name");
  telefoneBook.Lastname = document.querySelector("#Lastname");
  telefoneBook.Surname = document.querySelector("#Surname");
  telefoneBook.Tel = document.querySelector("#Tel");
  telefoneBook.List = document.querySelector("#List");

  let data = localStorage.getItem("telefoneBook");
  if (data != null) {
    telefoneBook.data = JSON.parse(data);
  }

  telefoneBook.draw();
  },

    toggle: (id) => {

  if (id === false) {
    telefoneBook.ID.value = "";
    telefoneBook.Name.value = "";
    telefoneBook.Lastname.value = "";
    telefoneBook.Surname.value = "";
    telefoneBook.Tel.value = "";
    telefoneBook.Form.classList.remove("show");
  }

  else {

  if (Number.isInteger(id)) {
    telefoneBook.ID.value = id;
    telefoneBook.Name.value = telefoneBook.data[id]["n"];
    telefoneBook.Lastname.value = telefoneBook.data[id]["e"];
    telefoneBook.Surname.value = telefoneBook.data[id]["t"];
    telefoneBook.Tel.value = telefoneBook.data[id]["a"];
  }

  telefoneBook.Form.classList.add("show");
  }
  },

  save : () => {

  let data = {
  n: telefoneBook.Name.value,
  e: telefoneBook.Lastname.value,
  t: telefoneBook.Surname.value,
  a: telefoneBook.Tel.value
  };

  if (telefoneBook.ID.value == "") {
  telefoneBook.data.push(data);
  }
  else {
  telefoneBook.data[telefoneBook.ID.value] = data;
  }

  localStorage.setItem("telefoneBook", JSON.stringify(telefoneBook.data));
  telefoneBook.toggle(false);
  telefoneBook.draw();
  return false;
  },

  del : (id) => { if (confirm("Удаляем ?")) {
  telefoneBook.data.splice(id, 1);
  localStorage.setItem("telefoneBook", JSON.stringify(telefoneBook.data));
  telefoneBook.draw();
  }},

  draw : () => {
  telefoneBook.List.innerHTML = "";
  for (let i in telefoneBook.data) {
  let row = document.createElement("div");
  row.className = "row";
  row.innerHTML = `<div class="info">
  <div>Имя ${telefoneBook.data[i]["n"]}</div>
  <div>Фамилия ${telefoneBook.data[i]["e"]}</div>
  <div>Отчество ${telefoneBook.data[i]["t"]}</div>
  </div>
  <div>Телефон ${telefoneBook.data[i]["a"]}</div>
  </div>
  <input type="button" class="material-icons" value="удалить" onclick="telefoneBook.del(${i})"/>
  <input type="button" class="material-icons" value="редактировать" onclick="telefoneBook.toggle(${i})"/>`;
  telefoneBook.List.appendChild(row);
  }
  }
  };
  window.addEventListener("load", telefoneBook.init);
