function HomeBTN() {
  document.getElementById("home").addEventListener("click", () => {
    window.location.href = "./index.html";
  });
}

async function fetchCategories() {
  const api = await fetch(
    "https://openapi.programming-hero.com/api/peddy/categories"
  );
  const res = await api.json();

  CategoryButtons(res.categories);
}

function CategoryButtons(data) {
  const BtnDiv = document.getElementById("categoriesBtn");
  data.forEach((data) => {
    const div = document.createElement("div");

    div.innerHTML = `<button class="w-full border-2 font-extrabold text-2xl p-1 rounded-xl hover:bg-green-100 lg:text-2xl lg:p-4 lg:flex lg:gap-2 flex items-center gap-2"; onclick="loadByCategories('${data.category}')"><img src="${data.category_icon}" /> ${data.category}</button>`;

    BtnDiv.appendChild(div);
  });
}

async function loadByCategories(e) {
  const api = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${e}`
  );
  const res = await api.json();
  document.getElementById("spinner").classList.remove("hidden");
  document.getElementById("cards-section").classList.add("hidden");

  setTimeout(() => {
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("cards-section").classList.remove("hidden");

    AllCardsDisplay(res.data);
  }, 2000);

  document.getElementById("sortByPriceBtn").addEventListener("click", () => {
    res.data.sort((a, b) => b.price - a.price);
    AllCardsDisplay(res.data);
    console.log(res.data);
  });
}

// category Buttons ends

async function loadAllCards() {
  const api = await fetch(
    "https://openapi.programming-hero.com/api/peddy/pets"
  );
  const res = await api.json();
  AllCardsDisplay(res.pets);
  onclickBtn(res.pets);
}

// all cards
function onclickBtn(data) {
  document.getElementById("sortByPriceBtn").addEventListener("click", () => {
    data.sort((a, b) => b.price - a.price);
    AllCardsDisplay(data);
    console.log(data.data);
  });
}

function AllCardsDisplay(data) {
  const cardCreate = document.getElementById("cardDiv");
  if (data.length === 0) {
    cardCreate.innerHTML = "";
    const NoResult = document.createElement("div");
    NoResult.className = "col-span-4 mx-auto text-center m-20";
    NoResult.innerHTML = `<img class="mx-auto flex justify-center" src="images/error.webp" 
    <h1 >No Information Available</h1>
    <p class="mt-2  ">Thank you for your interest in our products/services. Unfortunately, we don't have the details you're looking for right now. Please check back with us later, as we are constantly updating our offerings to serve you better.

In the meantime, feel free to explore our website or contact our support team for any specific inquiries. We look forward to assisting you soon!</p>`;

    cardCreate.appendChild(NoResult);
  } else {
    cardCreate.innerHTML = "";
    data.forEach((data) => {
      const createDiv = document.createElement("div");
      createDiv.classList = "card shadow-lg p-2 border-none";
      createDiv.innerHTML = `<img class="object-fill rounded-lg border-2   " src=${data.image}/>`;
      const innerDiv = document.createElement("div");
      createDiv.appendChild(innerDiv);
      innerDiv.classList = "p-3 space-y-4";
      innerDiv.innerHTML = `<h2 class="text-center font-extrabold ">${
        data.pet_name
      }</h2>
    <p class="flex gap-2"><img src="images/Frame.png" alt="" /> <span>${
      data.breed === undefined || data.breed == null
        ? `<span class="text-red-500">Will Be Declare</span>`
        : data.breed
    }</span></p>
   
    <p class="flex gap-2"><img src="images/Frame (1).png" alt="" /> <span>${
      data.date_of_birth === null || data.date_of_birth === undefined
        ? `<span class="text-red-500">Will Be Declare</span>`
        : data.date_of_birth
    }</span></p>
  <p  class="flex gap-2"><img src="images/Frame (2).png" alt="" /> <span>${
    data.gender === null || data.gender === undefined
      ? `<span class="text-red-500">Will Be Declare</span>`
      : data.gender
  }</span></p>
  
  <p  class="flex gap-2"><img src="images/Frame (3).png" alt="" /> <span>${
    data.price === null || data.price === undefined
      ? `<span class="text-red-500">Will Be Declare</span>`
      : data.price
  }</span></p>`;
      const createBtnDiv = document.createElement("div");
      innerDiv.appendChild(createBtnDiv);
      createBtnDiv.classList = "flex gap-1 lg:gap-4";
      createBtnDiv.innerHTML = `  <button class="border-2 border-[#0E7A81] rounded-md">
    <i onclick=imgShow(${data.petId}) class="fa-regular fa-thumbs-up p-2 text-[#000000]  hover:bg-green-100 hover:text-black"></i>
  </button>
  <button onclick=adopt() class="text-[9px] border-2 border-[#0E7A81] px-2 rounded-md text-[#000000]  hover:bg-green-100 hover:text-black">
    Adopt
  </button>
  <button onclick=ModalInfo(${data.petId}) class="text-[9px] border-2 border-[#0E7A81] px-2 rounded-md text-[#000000]  hover:bg-green-100 hover:text-black">
    Details
  </button>`;
      cardCreate.appendChild(createDiv);
    });
  }
}

// side bar img show
async function imgShow(data) {
  const api = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${data}`
  );
  const res = await api.json();

  console.log(res.petData.image);
  ModalInfo(res.petData);

  const ImgDiv = document.getElementById("likebtnimg");
  const createImgDiv = document.createElement("div");
  createImgDiv.classList = "p-2";
  createImgDiv.innerHTML = `<img class="rounded-xl w-full h-full" src="${res.petData.image}">`;
  ImgDiv.appendChild(createImgDiv);
}

function adopt() {
  const Adopt = document.getElementById("counter");

  my_modal_2.showModal();

  let sec = 0;

  let timer = setInterval(() => {
    Adopt.innerText = ` ${++sec}`;

    if (sec >= 4) {
      Adopt.innerHTML = "";

      clearInterval(timer);
      my_modal_2.close();
    }
  }, 1000);
}

async function ModalInfo(data) {
  const api = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${data}`
  );
  const res = await api.json();
  const {
    petId,
    breed,
    category,
    image,
    gender,
    pet_details,
    vaccinated_status,
    pet_name,
    date_of_birth,
    price,
  } = res.petData;

  const modal = document.getElementById("modaldiv");
  modal.innerHTML = `<img class="w-full object-fill rounded-xl border-2 p-3 text-center" src=${image}/>
   <h2 class="">${
     pet_name === null || pet_name == undefined
       ? `<span class="text-red-500">Will Be Declare</span>`
       : pet_name
   }</h2>
        <p class="flex gap-2 ">
          <img src="images/Frame.png" alt="" /> <span>${
            breed === null || breed === undefined
              ? `<span class="text-red-500">Will Be Declare</span>`
              : breed
          }</span>
        </p>
        <p class="flex gap-2">
          <img src="images/Frame (1).png" alt="" />
          <span>${
            date_of_birth === null || date_of_birth === undefined
              ? `<span class="text-red-500">Will Be Declare</span>`
              : date_of_birth
          }</span>
        </p>
        <p class="flex gap-2">
          <img src="images/Frame (2).png" alt="" /> <span>${
            gender == undefined || gender === null
              ? `<span class="text-red-500">Will Be Declare</span>`
              : gender
          }</span>
        </p>
        <p class="flex gap-2">
          <img src="images/Frame (3).png" alt="" /> <span>${
            price == undefined || price === null
              ? `<span class="text-red-500">Will Be Declare</span>`
              : price
          }</span>
        </p>
        <p class="font-semibold bg-gray-50  p-2 rounded-lg">${
          pet_details == undefined || pet_details === undefined
            ? `<span class="text-red-500">Will Be Declare</span>`
            : pet_details
        }</p>
        <form method="dialog">
          
          <button class="border-2 w-full bg-green-500 p-2 rounded-xl">Close</button>
        </form>`;
  my_modal_1.showModal();
}

function loading() {
  setTimeout(() => {
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("cards-section").classList.remove("hidden");
    loadAllCards();
  }, 2000);
}
fetchCategories();
loading();
