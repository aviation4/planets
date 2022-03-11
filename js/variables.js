export const hamburgerButton = document.getElementById("hamburgerButton");
export const hamburgerMenu = document.getElementById("hamburgerMenu");
export const main = document.getElementById("main");
export const secondaryNav = document.getElementById("secondaryNav");


/* Default displayed planet is Mercury */
export let ACTUAL_PLANET_INDEX = 0;

/* Defualt displayed section is Overview */
export let ACTUAL_SECTION_INDEX = 0;



/* For planet bar */
export const colorPlanetsArray = ["#DEF4FC", "#F7CC7F", "#545BFE", "#FF6A45", "#ECAD7A", "#FCCB6B", "#65F0D5", "#497EFA"];

/* For secondary navigation (sections) */
export const colorNavArray = ["#419EBB", "#EDA249", "#6D2ED5", "#D14C32", "#D83A34", "#CD5120", "#1EC1A2", "#2D68F0"];



/* Habmurger menu buttons for screen widths < 768px */
export const hamburgerPlanetsArray = Array.from(document.querySelectorAll(".hamburger__planet"));

/* Section buttons for screen widths < 768px */
export const sectionsArray = Array.from(document.querySelectorAll(".navSecondaryNav__header"));

/* Section buttons for screen widths >= 768px */
export const sectionMainArray = Array.from(document.querySelectorAll(".mainSecondaryNav__button"));

/* Planet buttons for screen widths >= 768px */
export const planetsNavbarArray = Array.from(document.querySelectorAll(".planetBar__planetName"));



export const activeSectionNavbarClass = "navSecondaryNav__header--enabled";
export const activePlanetClass = "planetBar__planetName--enabled";



export const iconID = document.getElementById("iconID");
export const iconSurfaceID = document.getElementById("iconSurfaceID");
export const planetTitleID = document.getElementById("planetTitleID");
export const planetParagraphID = document.getElementById("planetParagraphID");
export const planetSourceID = document.getElementById("planetSourceID");

export const rotationTime = document.getElementById("rotationTime");
export const revolutionTime = document.getElementById("revolutionTime");
export const radius = document.getElementById("radius");
export const averageTemp = document.getElementById("averageTemp");
