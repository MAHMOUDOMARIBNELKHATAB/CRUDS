let icon = document.getElementById("sun");
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let temp;
let mood = "create";
let dataPro;
if (localStorage.products != null) {
  dataPro = JSON.parse(localStorage.getItem("products"));
} else {
  dataPro = [];
}
function getTotal() {
  if (price.value !== "") {
    let result =
      Number(price.value) +
      Number(taxes.value) +
      Number(ads.value) -
      Number(discount.value);
    total.innerHTML = result;
    total.style.backgroundColor = "#08a00d";
    total.style.color = "#fff";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "#cacaca";
    total.style.color = "#437EF7";
  }
}
submit.onclick = function () {
  let newProduct = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  if (mood == "create") {
    if (count.value >= 1 && count.value <= 100) {
      if (
        title.value !== "" &&
        price.value !== "" &&
        taxes.value !== ""  ) {
        for (let i = 0; i < count.value; i++) {
          dataPro.push(newProduct);
        }
      } else {
        alert("you must Enter All value");
      }
    } else if (count.value < 1) {
      alert("you must Enter the count value");
    }
  } else {
    if( title.value !== "" &&
    price.value !== "" &&
    taxes.value !== "" ) 
    {
      dataPro[temp] = newProduct;
      mood = "create";
      submit.innerHTML="Create"
      count.style.display='block'

    }
    else{
      alert("you must Enter All value");
      updateData()

    }
  }
  localStorage.setItem("products", JSON.stringify(dataPro));
  clearData();
  showData();
};
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  category.value = "";
  count.value = "";
  total.innerHTML = "";
}
let table = "";
function showData() {
  table = "";
  for (let i = 0; i < dataPro.length; i++) {
    table += `
      <tr>
        <td>${i + 1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateData(${i})" class="update">update</button></td>
        <td><button onclick="deletData(${i})"  class="delete">delete</button></td>
      </tr>
    `;
  }
  document.getElementById("tbody").innerHTML = table;
}
showData();

function deletData(i) {
  dataPro.splice(i, 1);
  localStorage.products = JSON.stringify(dataPro);
  showData();
}

function updateData(i) {
  title.value = dataPro[i].title;
  taxes.value = dataPro[i].taxes;
  price.value = dataPro[i].price;
  category.value = dataPro[i].category;
  count.style.display = "none";
  discount.value = dataPro[i].discount;
  ads.value = dataPro[i].ads;
  getTotal();
  submit.innerHTML = "Update";
  mood = "update";
  temp = i;
}

let searchMood = "title";
function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id == "search-title") {
    searchMood = "title";
    search.placeholder = "search by title";
  } else {
    searchMood = "category";
    search.placeholder = "search by category";
  }
  search.focus();
  search.value = "";
  showData();
}

function searchData(value) {
  table = "";
  if (searchMood == "title") {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].title.includes(value.toLowerCase())) {
        table += `
        <tr>
          <td>${i + 1}</td>
          <td>${dataPro[i].title}</td>
          <td>${dataPro[i].price}</td>
          <td>${dataPro[i].taxes}</td>
          <td>${dataPro[i].ads}</td>
          <td>${dataPro[i].discount}</td>
          <td>${dataPro[i].total}</td>
          <td>${dataPro[i].category}</td>
          <td><button onclick="updateData(${i})" class="update">update</button></td>
          <td><button onclick="deletData(${i})"  class="delete">delete</button></td>
        </tr>
      `;
      }
    }
  } else {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].category.includes(value.toLowerCase())) {
        table += `
        <tr>
          <td>${i + 1}</td>
          <td>${dataPro[i].title}</td>
          <td>${dataPro[i].price}</td>
          <td>${dataPro[i].taxes}</td>
          <td>${dataPro[i].ads}</td>
          <td>${dataPro[i].discount}</td>
          <td>${dataPro[i].total}</td>
          <td>${dataPro[i].category}</td>
          <td><button onclick="updateData(${i})" class="update">update</button></td>
          <td><button onclick="deletData(${i})"  class="delete">delete</button></td>
        </tr>
      `;
      }
    }
  }

  document.getElementById("tbody").innerHTML = table;
}

// dark-mood
icon.onclick = function () {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    icon.src = "./imgs/moon_702471.png";
    console.log('dark true');
  } else  {
    icon.src = "./imgs/sunn.png";
    document.body.classList.toggle("light-mode");
    console.log('light true');


  }
};




