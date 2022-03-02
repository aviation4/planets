const hamburgerButton = document.getElementById("hamburger__button");
const hamburgerMenu = document.getElementById("hamburger__menu");
const main = document.getElementById("main");


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


hamburgerButton.addEventListener("click", toggleHamburgerMenu);
