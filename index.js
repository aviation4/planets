const hamburgerButton = document.getElementById("hamburger__button");
const hamburgerMenu = document.getElementById("hamburger__menu");

const toggleHamburgerMenu = () => {

  if (hamburgerButton.classList.includes("fa-bars--enabled")){
    hamburgerButton.classList.remove("fa-bars--enabled");
    hamburgerMenu.style.display = "none";
  } else {
    hamburgerButton.classList.add("fa-bars--enabled");
    hamburgerMenu.style.display = "block";
  }

}


hamburgerButton.addEventListener("click", toggleHamburgerMenu);
