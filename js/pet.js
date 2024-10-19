const categories1 = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => display(data.categories));
};

function display(data) {
  const buttonCreate1 = document.getElementById("btn1");
  const buttonCreate2 = document.getElementById("btn2");
  const buttonCreate3 = document.getElementById("btn2");
  const buttonCreate4 = document.getElementById("btn4");

  data.forEach((data) => {
    buttonCreate1.innerHTML = `<img  src="${data.category_icon}" >${data.category}`;
    buttonCreate2.innerHTML = `<img  src="${data.category_icon}" >${data.category}`;
    buttonCreate3.innerHTML = `<img  src="${data.category_icon}" >${data.category}`;
    buttonCreate4.innerHTML = `<img  src="${data.category_icon}" >${data.category}`;
    // categorydata(data);
    // const buttonCreate = document.getElementById("btn1");
    // // const button = document.createElement("button");
    // buttonCreate.innerHTML = `<img  src="${data.category_icon}" >${data.category}`;
    // button.classList =
    //   " border-2 font-extrabold text-2xl p-1 rounded-xl hover:bg-[#0E7A81] lg:text-2xl lg:p-4 lg:flex lg:gap-2 flex items-center gap-2";
    // button.innerHTML = `<img  src="${data.category_icon}" >${data.category}`;
    // button.id = "innerBTNSSS";
    // buttonCreate.appendChild(button);
  });
}

function categorydata(data) {
  document.getElementById("innerBTNSSS").addEventListener("click", function () {
    console.log(data.id);
  });
  console.log(data.id);
}

// categories run korar jonno call
categories1();

// categories section ends

const getAllPets = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => displayAllPets(data.pets));
};
const displayAllPets = (data, data2) => {
  const cardCreate = document.getElementById("cardDiv");

  data.forEach((data) => {
    const createDiv = document.createElement("div");
    createDiv.classList = "card shadow-xl";
    createDiv.innerHTML = `<img class="object-fill rounded-md p-3"
    src=${data.image}
    class="rounded-xl"
  />`;
    const innerDiv = document.createElement("div");
    createDiv.appendChild(innerDiv);
    innerDiv.classList = "p-3 space-y-4";
    innerDiv.innerHTML = `<h2 class="">${data.pet_name}</h2>
    <p class="flex gap-2"><img src="images/Frame.png" alt="" /> <span>${data.breed}</span></p>
    <p class="flex gap-2"><img src="images/Frame (1).png" alt="" /> <span>${data.date_of_birth}</span></p>
  <p  class="flex gap-2"><img src="images/Frame (2).png" alt="" /> <span>${data.gender}</span></p>
  <p  class="flex gap-2"><img src="images/Frame (3).png" alt="" /> <span>${data.price}</span></p>`;
    const createBtndiv = document.createElement("div");
    innerDiv.appendChild(createBtndiv);
    createBtndiv.classList = "flex gap-1 lg:gap-4";
    createBtndiv.innerHTML = `  <button class="border-2 border-[#0E7A81] rounded-md">
    <i class="fa-regular fa-thumbs-up p-2"></i>
  </button>
  <button class="text-[9px] border-2 border-[#0E7A81] px-2 rounded-md text-[#0E7A81]">
    Adopt
  </button>
  <button class="text-[9px] border-2 border-[#0E7A81] px-2 rounded-md text-[#0E7A81]">
    Details
  </button>`;
    cardCreate.appendChild(createDiv);
  });
  //   document.getElementById("sortByPriceBtn").addEventListener("click", () => {
  //     const p = data.price;
  //     p.forEach((data) => {
  //       data.sort((a, b) => a.price + b.price);
  //       console.log(data);
  //     });
  //   });
  // };
};

setTimeout(() => {
  document.getElementById("loader").classList.add("hidden");

  getAllPets();
}, 2000);

// getAllPets();
{
  /* <div class="flex gap-1 lg:gap-4">
  <button class="border-2 border-[#0E7A81] rounded-md">
    <i class="fa-regular fa-thumbs-up p-2"></i>
  </button>
  <button class="text-[9px] border-2 border-[#0E7A81] px-2 rounded-md text-[#0E7A81]">
    Adopt
  </button>
  <button class="text-[9px] border-2 border-[#0E7A81] px-2 rounded-md text-[#0E7A81]">
    Details
  </button>
</div>; */
}
