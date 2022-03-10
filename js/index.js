const hamburgerButton = document.getElementById("hamburgerButton");
const hamburgerMenu = document.getElementById("hamburgerMenu");
const main = document.getElementById("main");
const secondaryNav = document.getElementById("secondaryNav");

let actualPlanetIndex = 0;
let actualSectionIndex = 0;
let actualSectionName = "overview";

const colorPlanetsArray = ["#DEF4FC", "#F7CC7F", "#545BFE", "#FF6A45", "#ECAD7A", "#FCCB6B", "#65F0D5", "#497EFA"];
const colorNavArray = ["#419EBB", "#EDA249", "#6D2ED5", "#D14C32", "#D83A34", "#CD5120", "#1EC1A2", "#2D68F0"];

const hamburgerPlanetsArray = Array.from(document.querySelectorAll(".hamburger__planet"));




const sectionsArray = Array.from(document.querySelectorAll(".secondaryNav__header"));

const activeSectionClass = "secondaryNav__header--enabled";
const activePlanetClass = "planetBar__planetName--enabled";
const sectionClass = document.querySelectorAll(".secondaryNav__header");


const topNavPlanetsArray = Array.from(document.querySelectorAll(".planetBar__planetName"));

const overviewButtonTable = document.getElementById("overviewButton--table");
const structureButtonTable = document.getElementById("structureButton--table");
const surfaceButtonTable = document.getElementById("surfaceButton--table");
const sectionsTableArray = [overviewButtonTable, structureButtonTable, surfaceButtonTable];

const activeSectionTableClassName = "table__row--enabled";

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

  /* Unifing section names */
  if (actualSectionName == "internal structure"){
    actualSectionName = "structure";
  } else if (actualSectionName == "surface geology"){
    actualSectionName = "surface";
  }


  if (actualSectionName == "overview"){

    main__iconID.src = jsonResponse[actualPlanetIndex].images.planet;
    main__iconSurfaceID.src = "";

  } else if (actualSectionName == "structure"){

    main__iconID.src = jsonResponse[actualPlanetIndex].images.internal;
    main__iconSurfaceID.src = "";

  } else if (actualSectionName == "surface"){

    main__iconID.src = jsonResponse[actualPlanetIndex].images.planet;
    main__iconSurfaceID.src = jsonResponse[actualPlanetIndex].images.geology;

  }

  if (actualSectionName == "surface"){
    actualSectionName = "geology";
  }


  sectionClass.forEach(el => {
    el.style.borderColor = colorNavArray[actualPlanetIndex];
  })


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


  fetch("https://raw.githubusercontent.com/przem-przem/planets/main/data.json")
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

  fetchData();

}


const toggleNavigationBar = (el, i) => {


  sectionClass.forEach(el => {
    el.style.borderColor = colorNavArray[actualPlanetIndex];
  });


  switch(i){
    case 0:

      actualSectionIndex = 0;
      actualSectionName = "overview";
      overviewButton.classList.add(activeSectionClass);
      structureButton.classList.remove(activeSectionClass);
      surfaceButton.classList.remove(activeSectionClass);
      break;

    case 1:

      actualSectionIndex = 1;
      actualSectionName = "structure";
      overviewButton.classList.remove(activeSectionClass);
      structureButton.classList.add(activeSectionClass);
      surfaceButton.classList.remove(activeSectionClass);
      break;

    case 2:

      actualSectionIndex = 2;
      actualSectionName = "surface";
      overviewButton.classList.remove(activeSectionClass);
      structureButton.classList.remove(activeSectionClass);
      surfaceButton.classList.add(activeSectionClass);
      break;
  }

}



const toggleTopNavMenu = (el, i) => {

  topNavPlanetsArray[actualPlanetIndex].classList.remove(activePlanetClass);
  actualPlanetIndex = i;
  topNavPlanetsArray[actualPlanetIndex].style.borderColor = colorPlanetsArray[actualPlanetIndex];
  topNavPlanetsArray[actualPlanetIndex].classList.add(activePlanetClass);

}


const toggleTable = i => {

  sectionsTableArray[actualSectionIndex].style.backgroundColor = "transparent";
  sectionsTableArray[actualSectionIndex].classList.remove(activeSectionTableClassName);
  actualSectionIndex = i;
  sectionsTableArray[actualSectionIndex].style.backgroundColor = colorNavArray[actualPlanetIndex];


  switch(i){
    case 0:

  /*    actualSectionIndex = 0;
      overviewButtonTable.style.backgroundColor = colorNavArray[actualPlanetIndex];
      structureButtonTable.style.background = "none";
      surfaceButtonTable.style.background = "none";*/
      actualSectionName = "overview";
      break;

    case 1:

    /*  actualSectionIndex = 1;
      overviewButtonTable.style.background = "none";
      structureButtonTable.style.backgroundColor = colorNavArray[actualPlanetIndex];
      surfaceButtonTable.style.background = "none";*/
      actualSectionName = "structure";
      break;

    case 2:

  /*    actualSectionIndex = 2;
      overviewButtonTable.style.background = "none";
      structureButtonTable.style.background = "none";
      surfaceButtonTable.style.backgroundColor = colorNavArray[actualPlanetIndex];*/
      actualSectionName = "surface";
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


sectionsTableArray.forEach((el, i) => {

  el.addEventListener("click", function () {

    toggleTable(i);
    toggleSections(el, i);

  })
})


hamburgerPlanetsArray.forEach((el, i) => {

  el.addEventListener("click", function () {

    toggleHamburgerMenu();
    actualPlanetIndex = i;

    fetchData();

  })

})


topNavPlanetsArray.forEach((el, i) => {

  el.addEventListener("click", function () {

    toggleTopNavMenu(el, i);
    toggleTable(actualSectionIndex);
    fetchData();

  })

})


fetchData();
