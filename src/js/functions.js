import {
  hamburgerButton,
  hamburgerMenu,
  main,
  secondaryNav,
  colorPlanetsArray,
  colorNavArray,
  hamburgerPlanetsArray,
  sectionsArray,
  sectionMainArray,
  planetsNavbarArray,
  activeSectionNavbarClass,
  activePlanetClass,
  iconID,
  iconSurfaceID,
  planetTitleID,
  planetParagraphID,
  planetSourceID,
  rotationTime,
  revolutionTime,
  radius,
  averageTemp
} from "./variables.js";



/* Default displayed planet is Mercury */
let ACTUAL_PLANET_INDEX = 0;

/* Defualt displayed section is Overview */
let ACTUAL_SECTION_INDEX = 0;



export const renderFullData = (jsonResponse) => {

  sectionsArray.forEach(el => {
    el.style.borderColor = colorNavArray[ACTUAL_PLANET_INDEX];
  })

  let actualSectionName;

  if (ACTUAL_SECTION_INDEX == 0){

    actualSectionName = "overview";
    iconID.src = jsonResponse[ACTUAL_PLANET_INDEX].images.planet;
    iconSurfaceID.src = "";

  } else if (ACTUAL_SECTION_INDEX == 1){

    actualSectionName = "structure";
    iconID.src = jsonResponse[ACTUAL_PLANET_INDEX].images.internal;
    iconSurfaceID.src = "";

  } else if (ACTUAL_SECTION_INDEX == 2){

    actualSectionName = "geology";
    iconID.src = jsonResponse[ACTUAL_PLANET_INDEX].images.planet;
    iconSurfaceID.src = jsonResponse[ACTUAL_PLANET_INDEX].images.geology;

  }

  planetTitleID.innerHTML = jsonResponse[ACTUAL_PLANET_INDEX].name;
  planetParagraphID.innerHTML = jsonResponse[ACTUAL_PLANET_INDEX][actualSectionName].content;
  planetSourceID.href = jsonResponse[ACTUAL_PLANET_INDEX][actualSectionName].source;

  rotationTime.innerHTML = jsonResponse[ACTUAL_PLANET_INDEX].rotation;
  revolutionTime.innerHTML = jsonResponse[ACTUAL_PLANET_INDEX].revolution;
  radius.innerHTML = jsonResponse[ACTUAL_PLANET_INDEX].radius;
  averageTemp.innerHTML = jsonResponse[ACTUAL_PLANET_INDEX].temperature;

}




export const fetchData = () => {

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



export const toggleHamburgerMenu = () => {

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



export const updatePlanetColors = i => {

    planetsNavbarArray[ACTUAL_PLANET_INDEX].classList.remove(activePlanetClass);
    ACTUAL_PLANET_INDEX = i;
    planetsNavbarArray[ACTUAL_PLANET_INDEX].style.borderColor = colorPlanetsArray[ACTUAL_PLANET_INDEX];
    planetsNavbarArray[ACTUAL_PLANET_INDEX].classList.add(activePlanetClass);

}


export const updateSectionState = i => {

  sectionsArray[ACTUAL_SECTION_INDEX].classList.remove(activeSectionNavbarClass);
  sectionMainArray[ACTUAL_SECTION_INDEX].style.backgroundColor = "transparent";
  ACTUAL_SECTION_INDEX = i;
  sectionsArray[ACTUAL_SECTION_INDEX].classList.add(activeSectionNavbarClass);
  sectionMainArray[ACTUAL_SECTION_INDEX].style.backgroundColor = colorNavArray[ACTUAL_PLANET_INDEX];

}



export const updateSectionColor = () => {

  /* For screen widths < 768px */
  sectionsArray.forEach(el => {
    el.style.borderColor = colorNavArray[ACTUAL_PLANET_INDEX];
  });


  /* For screen widths >= 768px */
  sectionMainArray.forEach(el => {
    el.style.backgroundColor = "transparent";
  })
  sectionMainArray[ACTUAL_SECTION_INDEX].style.backgroundColor = colorNavArray[ACTUAL_PLANET_INDEX];

}
