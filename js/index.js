const hamburgerButton = document.getElementById("hamburgerButton");
const hamburgerMenu = document.getElementById("hamburgerMenu");
const main = document.getElementById("main");
const secondaryNav = document.getElementById("secondaryNav");

/* Default displayed planet is Mercury */
let actualPlanetIndex = 0;

/* Defualt displayed section is Overview */
let actualSectionIndex = 0;



/* For planet bar */
const colorPlanetsArray = ["#DEF4FC", "#F7CC7F", "#545BFE", "#FF6A45", "#ECAD7A", "#FCCB6B", "#65F0D5", "#497EFA"];

/* For secondary navigation (sections) */
const colorNavArray = ["#419EBB", "#EDA249", "#6D2ED5", "#D14C32", "#D83A34", "#CD5120", "#1EC1A2", "#2D68F0"];



/* Habmurger menu buttons for screen widths < 768px */
const hamburgerPlanetsArray = Array.from(document.querySelectorAll(".hamburger__planet"));

/* Section buttons for screen widths < 768px */
const sectionsArray = Array.from(document.querySelectorAll(".navSecondaryNav__header"));


const activeSectionClass = "navSecondaryNav__header--enabled";
const activePlanetClass = "planetBar__planetName--enabled";
const planetsNavbarArray = Array.from(document.querySelectorAll(".planetBar__planetName"));

const sectionsTableArray = Array.from(document.querySelectorAll(".mainSecondaryNav__button"));

const activeSectionTableClassName = "mainSecondaryNav__button--enabled";

const main__iconID = document.getElementById("iconID");
const main__iconSurfaceID = document.getElementById("iconSurfaceID");
const planet__titleID = document.getElementById("planetTitleID");
const planet__paragraphID = document.getElementById("planetParagraphID");
const planet__sourceID = document.getElementById("planetSourceID");

const rotationTime = document.getElementById("rotationTime");
const revolutionTime = document.getElementById("revolutionTime");
const radius = document.getElementById("radius");
const averageTemp = document.getElementById("averageTemp");





const renderFullData = (jsonResponse) => {

  sectionsArray.forEach(el => {
    el.style.borderColor = colorNavArray[actualPlanetIndex];
  })

  let actualSectionName;

  if (actualSectionIndex == 0){

    actualSectionName = "overview";
    main__iconID.src = jsonResponse[actualPlanetIndex].images.planet;
    main__iconSurfaceID.src = "";

  } else if (actualSectionIndex == 1){

    actualSectionName = "structure";
    main__iconID.src = jsonResponse[actualPlanetIndex].images.internal;
    main__iconSurfaceID.src = "";

  } else if (actualSectionIndex == 2){

    actualSectionName = "geology";
    main__iconID.src = jsonResponse[actualPlanetIndex].images.planet;
    main__iconSurfaceID.src = jsonResponse[actualPlanetIndex].images.geology;

  }

  planet__titleID.innerHTML = jsonResponse[actualPlanetIndex].name;
  planet__paragraphID.innerHTML = jsonResponse[actualPlanetIndex][actualSectionName].content;
  planet__sourceID.href = jsonResponse[actualPlanetIndex][actualSectionName].source;

  rotationTime.innerHTML = jsonResponse[actualPlanetIndex].rotation;
  revolutionTime.innerHTML = jsonResponse[actualPlanetIndex].revolution;
  radius.innerHTML = jsonResponse[actualPlanetIndex].radius;
  averageTemp.innerHTML = jsonResponse[actualPlanetIndex].temperature;



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



const toggleHamburgerMenu = i => {

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

    actualPlanetIndex = i;

}



/*** For screen widths < 768px **/
const toggleSectionsNavigationBar = (el, i) => {

  /* Assign actual planet color to border */
  sectionsArray.forEach(el => {
    el.style.borderColor = colorNavArray[actualPlanetIndex];
  });

  sectionsArray[actualSectionIndex].classList.remove(activeSectionClass);
  actualSectionIndex = i;
  sectionsArray[actualSectionIndex].classList.add(activeSectionClass);

}



/*** For screen widths >= 768px ***/
const togglePlanetsNavbar = (el, i) => {

  planetsNavbarArray[actualPlanetIndex].classList.remove(activePlanetClass);
  actualPlanetIndex = i;
  planetsNavbarArray[actualPlanetIndex].style.borderColor = colorPlanetsArray[actualPlanetIndex];
  planetsNavbarArray[actualPlanetIndex].classList.add(activePlanetClass);

}



/*** For screen widths >= 768px ***/
const toggleSectionsMain = i => {

  sectionsTableArray[actualSectionIndex].style.backgroundColor = "transparent";
  sectionsTableArray[actualSectionIndex].classList.remove(activeSectionTableClassName);
  actualSectionIndex = i;
  sectionsTableArray[actualSectionIndex].style.backgroundColor = colorNavArray[actualPlanetIndex];


}



/** For screen widths < 768px ***/
hamburgerButton.addEventListener("click", toggleHamburgerMenu);



/*** For screen widths < 768px ***/
sectionsArray.forEach((el, i) => {

  el.addEventListener("click", function () {

    toggleSectionsNavigationBar(el, i);
    fetchData();

  });

})


/*** For screen widths >= 768px ***/
sectionsTableArray.forEach((el, i) => {

  el.addEventListener("click", function () {

    toggleSectionsMain(i);
    fetchData();

  })
})



/*** For screen widths < 768px ***/
hamburgerPlanetsArray.forEach((el, i) => {

  el.addEventListener("click", function () {

    toggleHamburgerMenu(i);
    fetchData();

  })

})



/*** For screen widths >= 768px */
planetsNavbarArray.forEach((el, i) => {

  el.addEventListener("click", function () {

    togglePlanetsNavbar(el, i);
    toggleSectionsMain(actualSectionIndex);
    fetchData();

  })

})


/* Initial fetching */
fetchData();
