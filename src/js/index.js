import {
//  ACTUAL_SECTION_INDEX,
  hamburgerButton,
  sectionsArray,
  sectionMainArray,
  hamburgerPlanetsArray,
  planetsNavbarArray,
  ACTUAL_PLANET_INDEX
} from "./variables.js";


import {
  renderFullData,
  fetchData,
  toggleHamburgerMenu,
  updateSectionColor,
  updateSectionState,
  updatePlanetColors
} from "./functions.js";




/** For screen widths < 768px ***/
hamburgerButton.addEventListener("click", toggleHamburgerMenu);



/*** For screen widths < 768px ***/
hamburgerPlanetsArray.forEach((el, i) => {

  el.addEventListener("click", function () {

    toggleHamburgerMenu();
    updatePlanetColors(i);
    updateSectionColor();
    fetchData();

  })

})



/*** For screen widths < 768px ***/
sectionsArray.forEach((el, i) => {

  el.addEventListener("click", function () {

    updateSectionState(i);
    updateSectionColor();
    fetchData();

  });

})


/*** For screen widths >= 768px ***/
sectionMainArray.forEach((el, i) => {

  el.addEventListener("click", function () {

    updateSectionState(i);
    updateSectionColor();
    fetchData();

  })
})





/*** For screen widths >= 768px */
planetsNavbarArray.forEach((el, i) => {

  el.addEventListener("click", function () {

    updatePlanetColors(i);
    updateSectionColor();
    fetchData();

  })

})


/* Initial fetching */
fetchData();
