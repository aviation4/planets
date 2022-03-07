const hamburgerButton = document.getElementById("hamburger__button");
const hamburgerMenu = document.getElementById("hamburger__menu");
const main = document.getElementById("main");
const secondaryNav = document.getElementById("secondaryNav");

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
const colorPlanetsArray = ["#DEF4FC", "#F7CC7F", "#545BFE", "#FF6A45", "#ECAD7A", "#FCCB6B", "#65F0D5", "#497EFA"];
const colorNavArray = ["#419EBB", "#EDA249", "#6D2ED5", "#D14C32", "#D83A34", "#CD5120", "#1EC1A2", "#2D68F0"];
const sectionClass = document.querySelectorAll(".secondaryNav__header");

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
    secondaryNav.style.display = "flex";

  } else {
    hamburgerButton.classList.add("hamburger__buttonClass--enabled");
    hamburgerMenu.style.display = "block";
    main.style.display = "none";
    secondaryNav.style.display = "none";
  }

}


const renderFullData = (jsonResponse) => {

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


  sectionClass.forEach(el => {
    el.style.borderColor = colorNavArray[actualPlanetIndex];
  })
  //sectionClassHover.style.borderColor = colorNavArray[actualPlanetIndex];

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
  fetchData();

}


const toggleNavigationBar = (el, i) => {


  sectionClass.forEach(el => {
    el.style.borderColor = colorNavArray[actualPlanetIndex];
  });

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
