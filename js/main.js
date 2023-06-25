//fetch data from api
const fetechData = async () => {
  try {
    const data = await fetch("https://reqres.in/api/users?page=2");
    const json = await data.json();
    return json;
  } catch (e) {
    console.log(e);
    return null;
  }
};

//add cards to body
const addCard = (cardInfo, index) => {
  const row = document.querySelector(".row");
  const column = document.createElement("div");
  column.className = "col-6 col-md-4 ml-6 mt-3";
  column.innerHTML = `
    <div class="card " style="width: 18rem; position: relative;">
     <div class="badge">
       <span class="custom-span">${index + 1}</span>
     </div>
    <img class="card-img-top equal-size"  src="${
      cardInfo.avatar
    }" alt="Card image cap">
     <div class="card-body d-flex ">
       <b class="card-text">${cardInfo.first_name}</b>
     </div>
    </div>`;
  row.appendChild(column);
  var styleElement = document.createElement("style");
  styleElement.textContent = `
   .badge {
     position: absolute;
     top: -20px;
     right: -20px;
     z-index: 1;
  }
  .badge .custom-span {
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
  }
  .equal-size
  {
    object-fit: cover;
     height: 100%;
      width: 100%;
  }
`;
  document.head.appendChild(styleElement);
};

//insert to card from data from api
const insertData = async () => {
  const cardDetails = await fetechData();
  console.log(cardDetails);
  if (cardDetails == null) {
    document.querySelector(".subheading").innerHTML = ``;
    document.querySelector(
      ".row"
    ).innerHTML = ` <p class="display-4 mt-2" >-:Failed to load:-</p>`;
  }
  console.log(cardDetails);
  cardDetails.data.map((cardInfo, index) => {
    addCard(cardInfo, index);
  });
};

//button functionalites
document.querySelector(".submit").addEventListener("click", async () => {
  const searchName = document.querySelector(".form-control").value;
  const details = await fetechData();
  let counter = 0;
  const rowSpace = document.querySelector(".row");
  details.data.map((info) => {
    if (info.first_name.toLowerCase() == searchName.toLowerCase()) {
      rowSpace.innerHTML = ``;
      addCard(info, 0);
     counter=0;
    }
    counter++;
  });
  console.log(counter, details.data.length);
  if (counter >= details.data.length) {
    rowSpace.innerHTML = `
    <p class="display-4 mt-2" >No Empolyee Found.Please check the name again</p>`;
    setTimeout(() => {
      location.reload();
    }, 3000);
  }
});
document.querySelector(".reload").addEventListener("click", () => {
  location.reload();
});
insertData();
