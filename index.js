const hamburgerButton = document.getElementById("hamburger__button");
const hamburgerMenu = document.getElementById("hamburger__menu");
const main = document.getElementById("main");

const overviewButton = document.getElementById("overviewButton");
const structureButton = document.getElementById("structureButton");
const surfaceButton = document.getElementById("surfaceButton");
const sectionsArray = [overviewButton, structureButton, surfaceButton];
const activeSectionClass = "secondaryNav__header--enabled";

const overviewSection = document.getElementById("overviewSection");
const structureSection = document.getElementById("structureSection");
const surfaceSection = document.getElementById("surfaceSection");



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

}


const toggleSections = (el, i) => {

  console.log(el);
  console.log(i);

  switch(i){
    case 0:
      overviewSection.style.display = "block";
      overviewButton.classList.add(activeSectionClass);
      structureSection.style.display = "none";
      structureButton.classList.remove(activeSectionClass);
      surfaceSection.style.display = "none";
      surfaceButton.classList.remove(activeSectionClass);
      break;

    case 1:
      overviewSection.style.display = "none";
      overviewButton.classList.remove(activeSectionClass);
      structureSection.style.display = "block";
      structureButton.classList.add(activeSectionClass);
      surfaceSection.style.display = "none";
      surfaceButton.classList.remove(activeSectionClass);
      break;

    case 2:
      overviewSection.style.display = "none";
      overviewButton.classList.remove(activeSectionClass);
      structureSection.style.display = "none";
      structureButton.classList.remove(activeSectionClass);
      surfaceSection.style.display = "block";
      surfaceButton.classList.add(activeSectionClass);
      break;
  }

}




hamburgerButton.addEventListener("click", toggleHamburgerMenu);

sectionsArray.forEach((el, i) => {

  console.log(sectionsArray);

  el.addEventListener("click", function () {
    toggleSections(el, i);
  });

})
