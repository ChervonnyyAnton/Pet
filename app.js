const form = document.getElementById("pet-form");
const petList = document.getElementById("pets");

// Retrieve pets from local storage or initialize an empty array
let pets = JSON.parse(localStorage.getItem("pets")) || [];

// Update the pet list with the current state of the pets array
function updatePetList() {
  petList.innerHTML = "";
  pets.forEach((pet) => {
    const petElement = document.createElement("div");
    petElement.classList.add("pet");
    petElement.innerHTML = `
      <h3>${pet.name}</h3>
      <p><strong>Type:</strong> ${pet.type}</p>
      <p><strong>Age:</strong> ${pet.age}</p>
      <p><strong>Sex:</strong> ${pet.sex}</p>
      <p><strong>Race:</strong> ${pet.race}</p>
      <p><strong>Color:</strong> ${pet.color}</p>
    `;
    petList.appendChild(petElement);
  });
}

// Save the current state of the pets array to local storage
function savePets() {
  localStorage.setItem("pets", JSON.stringify(pets));
}

// Handle form submission
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const type = document.getElementById("type").value;
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const sex = document.getElementById("sex").value;
  const race = document.getElementById("race").value;
  const color = document.getElementById("color").value;
  const pet = { type, name, age, sex, race, color };
  pets.push(pet);
  savePets();
  updatePetList();
  form.reset();
});

// Initialize the pet list with any existing pets in local storage
updatePetList();
