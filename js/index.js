const hamburgerButton = document.getElementById("hamburger__button");
const hamburgerMenu = document.getElementById("hamburger__menu");
const main = document.getElementById("main");

const actualPlanetIndex = 0;

const hamburgerVenus = document.getElementById("hamburgerVenus");

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


const renderInitialData = (jsonResponse) => {


  main__iconID.src= jsonResponse[0].images.planet;
  planet__titleID.innerHTML = jsonResponse[0].name;
  planet__paragraphID.innerHTML = jsonResponse[0].overview.content;
  planet__sourceID.href = jsonResponse[0].overview.source;

  rotationTime.innerHTML = jsonResponse[0].rotation;
  revolutionTime.innerHTML = jsonResponse[0].revolution;
  radius.innerHTML = jsonResponse[0].radius;
  averageTemp.innerHTML = jsonResponse[0].temperature;

}


const renderData = (jsonResponse, sectionName) => {

  if (sectionName == "overview"){

    main__iconID.src= jsonResponse[0].images.planet;
    main__iconSurfaceID.src= "";

  } else if (sectionName == "structure"){

    main__iconID.src= jsonResponse[0].images.internal;
    main__iconSurfaceID.src= "";

  } else if (sectionName == "surface"){

    main__iconID.src= jsonResponse[0].images.planet;
    main__iconSurfaceID.src= jsonResponse[0].images.geology;

  }

  if (sectionName == "surface"){
    sectionName = "geology";
  }

  planet__titleID.innerHTML = jsonResponse[actualPlanetIndex].name;
  planet__paragraphID.innerHTML = jsonResponse[actualPlanetIndex][sectionName].content;
  planet__sourceID.href = jsonResponse[actualPlanetIndex][sectionName].source;

}



const fetchInitialData = () => {

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
    renderInitialData(jsonResponse);
  })

}


const fetchData = (sectionName) => {

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
    renderData(jsonResponse, sectionName);
  })

}




const toggleSections = (el, i) => {


  const sectionName = el.innerHTML.toLowerCase();

  fetchData(sectionName);

}


const toggleSectionsNavigation = (el, i) => {


  switch(i){
    case 0:

      overviewButton.classList.add(activeSectionClass);

      structureButton.classList.remove(activeSectionClass);

      surfaceButton.classList.remove(activeSectionClass);
      break;

    case 1:

      overviewButton.classList.remove(activeSectionClass);

      structureButton.classList.add(activeSectionClass);

      surfaceButton.classList.remove(activeSectionClass);
      break;

    case 2:

      overviewButton.classList.remove(activeSectionClass);

      structureButton.classList.remove(activeSectionClass);

      surfaceButton.classList.add(activeSectionClass);
      break;
  }

}



hamburgerButton.addEventListener("click", toggleHamburgerMenu);

sectionsArray.forEach((el, i) => {

  console.log(sectionsArray);

  el.addEventListener("click", function () {
    toggleSectionsNavigation(el, i);
    toggleSections(el, i);
  });

})

fetchInitialData();
