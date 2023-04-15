"use strict";

const themeToggle = document.querySelector("#theme-toggle");
const catPicture = document.querySelector("#cat-picture");
const dogPicture = document.querySelector("#dog-picture");
const factPlaceholder = document.querySelector("#fact-placeholder");

const apiUrl = "https://dog-api.kinduff.com/api/facts?number=5";
const catApiUrl = "https://catfact.ninja/fact";

let theme = localStorage.getItem("theme") || "light";

function setTheme(theme) {
  // Update the value in local storage
  localStorage.setItem("theme", theme);

  // Toggle the "dark" class on the body element
  document.body.classList.toggle("dark", theme === "dark");

  // Toggle the "dark" class on the header and footer elements
  document.querySelector("header").classList.toggle("dark", theme === "dark");
  document.querySelector("footer").classList.toggle("dark", theme === "dark");

  // Set the text and background color of the theme toggle button
  themeToggle.innerHTML = theme === "dark" ? "Light" : "Dark";
  themeToggle.classList.toggle("dark", theme === "dark");

  // Set the text color of the fact placeholder
  factPlaceholder.classList.toggle("dark", theme === "dark");
}

async function getFact(url) {
  factPlaceholder.innerHTML = "Loading...";
  try {
    const response = await fetch(url);
    const data = await response.json();
    const fact = data.facts ? data.facts[0] : data.fact;
    factPlaceholder.innerHTML = fact;
  } catch (error) {
    console.error(error);
    const animal = url.includes("dog") ? "dog" : "cat";
    factPlaceholder.innerHTML = `Failed to fetch ${animal} fact. Please try again later.`;
  }
}

function handleThemeToggleClick() {
  theme = theme === "light" ? "dark" : "light";
  setTheme(theme);
}

function handleAnimalPictureClick(e) {
  if (e.target === catPicture) {
    getFact(catApiUrl);
  } else if (e.target === dogPicture) {
    getFact(apiUrl);
  }
}

themeToggle.addEventListener("click", handleThemeToggleClick);
catPicture.addEventListener("click", handleAnimalPictureClick);
dogPicture.addEventListener("click", handleAnimalPictureClick);

// Initial setup
setTheme(theme);