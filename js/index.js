import {
  ACTUAL_SECTION_INDEX,
  hamburgerButton,
  sectionsArray,
  sectionMainArray,
  hamburgerPlanetsArray,
  planetsNavbarArray
} from "./variables.js";


import {
  renderFullData,
  fetchData,
  toggleHamburgerMenu,
  toggleSectionsNavigationBar,
  togglePlanetsNavbar,
  toggleSectionsMain
} from "./functions.js";




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
sectionMainArray.forEach((el, i) => {

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
    toggleSectionsMain(ACTUAL_SECTION_INDEX);
    fetchData();

  })

})


/* Initial fetching */
fetchData();
