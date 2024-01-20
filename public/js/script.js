//darkmode
// let darkMode = false;

// function changeDarkMode() {
//   if (darkMode) {
//     darkMode = false;
//     document.documentElement.style.setProperty("--text-color", "black");
//     document.documentElement.style.setProperty("--background-color", "#ececec");
//     document.getElementById("dark-light-mode").innerHTML = "Dark mode";
//   } else {
//     darkMode = true;
//     document.documentElement.style.setProperty("--text-color", "white");
//     document.documentElement.style.setProperty("--background-color", "black");
//     document.getElementById("dark-light-mode").innerHTML = "Light mode";
//   }
// }


//carousel
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const slider = document.querySelector(".slider");

prev.addEventListener("click", () => {
  slider.scrollLeft -= 300;
});

next.addEventListener("click", () => {
  slider.scrollLeft += 300;
});

function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function handleVisibility() {
  var carousel = document.getElementById("projects");

  if (isElementInViewport(carousel)) {
    carousel.classList.add("visible");
    window.removeEventListener("scroll", handleVisibility);
  }
}

window.addEventListener("scroll", handleVisibility);
document.addEventListener("DOMContentLoaded", handleVisibility);
