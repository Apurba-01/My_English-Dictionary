//script for the dictionary functionality :

const inputE1 = document.getElementById("input");
const infoText = document.getElementById("info-text");
const meaningContainer = document.getElementById("meaning-container");
const titleE1 = document.getElementById("title");
const meaningE1 = document.getElementById("meaning");
const audioE1 = document.getElementById("audio");

async function fetchAPI(word) {
  try {
    infoText.style.display = "block";
    meaningContainer.style.display = "none";
    infoText.innerText = `Searching the meaning of "${word}"`;
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const result = await fetch(url).then((res) => res.json());

    if (result.title) {
      meaningContainer.style.display = "block";
      infoText.style.display = "none";
      titleE1.innerText = word;
      meaningE1.innerText = "N/A";
      audioE1.style.display = "none";
    } else {
      infoText.style.display = "none";
      meaningContainer.style.display = "block";
      audioE1.style.display = "flex-inline";
      console.log(result);
      titleE1.innerText = result[0].word;
      meaningE1.innerText = result[0].meanings[0].definitions[0].definition;
      if (result[0].phonetics[0].audio) {
        audioE1.src = result[0].phonetics[0].audio;
      } else {
        audioE1.style.display = "none";
      }
    }
  } catch (error) {
    console.log(error);
    infoText.innerText = `An error occured, try again later`;
  }
}
inputE1.addEventListener("keyup", (e) => {
  if (e.target.value && e.key === "Enter") {
    fetchAPI(e.target.value);
  }
});

//Script for the toggle button functionality :

const modeE1 = document.querySelector(".mode");
const bodyE1 = document.querySelector("body");
const containerE1 = document.querySelector(".container");


function updateBody() {
  if (modeE1.checked) {
    bodyE1.style.background = " lightgray";
  } else {
    bodyE1.style.background =
      "linear-Gradient(50deg, rgb(6, 6, 6), rgb(54, 52, 52))";
  }
}

function updateContainer() {
  if (modeE1.checked) {
    containerE1.style.background = "white";
    containerE1.style.color = "black";
    containerE1.style.boxShadow = "0px 5px 15px rgba(9, 0, 0, 0.25)";
  } else {
    containerE1.style.background = "rgba(97, 95, 95 )";
    containerE1.style.color = "white";
    containerE1.style.boxShadow = "0px 5px 15px rgba(9, 0, 0, 0.9)";
  }
}

function updateInput() {
  if (modeE1.checked) {
    inputE1.style.background = "lightgray";
    inputE1.style.borderColor = "white";
    inputE1.style.color = "black";
  } else {
    inputE1.style.background = "rgb(54, 52, 52)";
    inputE1.style.borderColor = "rgb(6, 6, 6, .3)";
    inputE1.style.color = " white";
  }
}

modeE1.addEventListener("input", () => {
  updateBody();
  updateContainer();
  updateInput();
});
