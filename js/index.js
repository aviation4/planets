const hamburgerButton = document.getElementById("hamburger__button");
const hamburgerMenu = document.getElementById("hamburger__menu");
const main = document.getElementById("main");

let actualPlanetIndex = 0;
let actualSectionName = "overview";

const hamburgerMercury = document.getElementById("hamburgerMercury");
const hamburgerVenus = document.getElementById("hamburgerVenus");
const hamburgerEarth = document.getElementById("hamburgerEarth");
const hamburgerMars = document.getElementById("hamburgerMars");
const hamburgerJupiter = document.getElementById("hamburgerJupiter");
const hamburgerSaturn = document.getElementById("hamburgerSaturn");
const hamburgerUranus = document.getElementById("hamburgerUranus");
const hamburgerNeptune = document.getElementById("hamburgerNeptune");
const hamburgerPlanetsArray = [hamburgerMercury, hamburgerVenus, hamburgerEarth, hamburgerMars, hamburgerJupiter, hamburgerSaturn, hamburgerUranus, hamburgerNeptune];

const overviewButton = document.getElementById("overviewButton");
const structureButton = document.getElementById("structureButton");
const surfaceButton = document.getElementById("surfaceButton");
const sectionsArray = [overviewButton, structureButton, surfaceButton];
const activeSectionClass = "secondaryNav__header--enabled";

const main__iconID = document.getElementById("main__iconID");
const main__iconSurfaceID = document.getElementById("main__icon--surfaceID");
const planet__titleID = document.getElementById("planet__titleID");
const planet__paragraphID = document.getElementById("planet__paragraphID");
const planet__sourceID = document.getElementById("planet__sourceID");

const rotationTime = document.getElementById("rotationTime");
const revolutionTime = document.getElementById("revolutionTime");
const radius = document.getElementById("radius");
const averageTemp = document.getElementById("averageTemp");




const toggleHamburgerMenu = () => {

  if (hamburgerButton.classList.contains("hamburger__buttonClass--enabled")){
    hamburgerButton.classList.remove("hamburger__buttonClass--enabled");
    hamburgerMenu.style.display = "none";
    main.style.display = "block";

  } else {
    hamburgerButton.classList.add("hamburger__buttonClass--enabled");
    hamburgerMenu.style.display = "block";
    main.style.display = "none";
  }

  hamburgerVenus.addEventListener("click", function () {
    hamburgerButton.classList.remove("hamburger__buttonClass--enabled");
    hamburgerMenu.style.display = "none";
    main.style.display = "block";
  })

}


const renderFullData = (jsonResponse) => {

  console.log(actualSectionName);
  console.log(actualPlanetIndex);

  if (actualSectionName == "overview"){

    main__iconID.src= jsonResponse[actualPlanetIndex].images.planet;
    main__iconSurfaceID.src= "";

  } else if (actualSectionName == "structure"){

    main__iconID.src= jsonResponse[actualPlanetIndex].images.internal;
    main__iconSurfaceID.src= "";

  } else if (actualSectionName == "surface"){

    main__iconID.src= jsonResponse[actualPlanetIndex].images.planet;
    main__iconSurfaceID.src= jsonResponse[actualPlanetIndex].images.geology;

  }

  if (actualSectionName == "surface"){
    actualSectionName = "geology";
  }

  console.log(actualPlanetIndex);
  planet__titleID.innerHTML = jsonResponse[actualPlanetIndex].name;
  planet__paragraphID.innerHTML = jsonResponse[actualPlanetIndex][actualSectionName].content;
  planet__sourceID.href = jsonResponse[actualPlanetIndex][actualSectionName].source;

  rotationTime.innerHTML = jsonResponse[actualPlanetIndex].rotation;
  revolutionTime.innerHTML = jsonResponse[actualPlanetIndex].revolution;
  radius.innerHTML = jsonResponse[actualPlanetIndex].radius;
  averageTemp.innerHTML = jsonResponse[actualPlanetIndex].temperature;


  if (actualSectionName == "geology"){
    actualSectionName = "surface";
  }

}





function fetchData () {


  fetch("https://raw.githubusercontent.com/aviation4/planets/main/data.json")
    .then(response => {
      if (response.ok){
          console.log("success");
          return response.json();
      }
      throw new Error ("Request failed!");
  }, networkError => {
    console.log(networkError.message);
  }).then(jsonResponse => {

      renderFullData(jsonResponse);

  })

}



const toggleSections = (el, i) => {


  actualSectionName = el.innerHTML.toLowerCase();
  console.log(actualSectionName);

  fetchData();

}


const toggleNavigationBar = (el, i) => {


  switch(i){
    case 0:

      activeSectionIndex = 0;
      overviewButton.classList.add(activeSectionClass);
      structureButton.classList.remove(activeSectionClass);
      surfaceButton.classList.remove(activeSectionClass);
      break;

    case 1:

      activeSectionIndex = 1;
      overviewButton.classList.remove(activeSectionClass);
      structureButton.classList.add(activeSectionClass);
      surfaceButton.classList.remove(activeSectionClass);
      break;

    case 2:

      activeSectionIndex = 2;
      overviewButton.classList.remove(activeSectionClass);
      structureButton.classList.remove(activeSectionClass);
      surfaceButton.classList.add(activeSectionClass);
      break;
  }

}



hamburgerButton.addEventListener("click", toggleHamburgerMenu);



sectionsArray.forEach((el, i) => {

  el.addEventListener("click", function () {

    toggleNavigationBar(el, i);
    toggleSections(el, i);

  });

})


hamburgerPlanetsArray.forEach((el, i) => {

  el.addEventListener("click", function () {

    toggleHamburgerMenu();
    actualPlanetIndex = i;
    fetchData();

  })

})


fetchData();
