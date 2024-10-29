const slider = document.querySelector(".slider");
firstImg = slider.querySelectorAll("img")[0];
arrowIcons = document.querySelectorAll(".gallery i");

let isDragStart = false;
let prevPageX;
let prevScrollLeft;

const showHideIcons = () => {
    // showing and hiding scroll-to-left and scroll-to-right icons according to slider scroll left value
    let scrollWidth = slider.scrollWidth - slider.clientWidth; // getting max scrollable width
    arrowIcons[0].style.display = slider.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = slider.scrollLeft == scrollWidth ? "none" : "block";
};

arrowIcons.forEach((icon) => {
    // if clicked icon is slider-to-left, slide to left as much as the first image's width and if not slide to right
    icon.addEventListener("click", () => {
    let firstImgWidth = firstImg.clientWidth + 10; // getting first image width and adding 10px margin value. Padding is included by default with clientWidth.
    slider.scrollLeft += icon.id == "slider-to-left" ? -firstImgWidth : firstImgWidth;
    setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
  });
});

const dragStart = (e) => {
  // updating global variables value on mouse down event
  isDragStart = true;
  prevPageX = e.pageX || e.touches[0].pageX;
  prevScrollLeft = slider.scrollLeft;
};

const dragging = (e) => {
  // scrolling slider to left according to mouse pointer
  if (!isDragStart) return;
  e.preventDefault();
  slider.classList.add("dragging");
  let positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
  slider.scrollLeft = prevScrollLeft - positionDiff;
  showHideIcons();
};

const dragStop = () => {
  isDragStart = false;
  slider.classList.remove("dragging");
};

slider.addEventListener("mousedown", dragStart);
slider.addEventListener("touchstart", dragStart);

slider.addEventListener("mousemove", dragging);
slider.addEventListener("touchmove", dragging);

slider.addEventListener("mouseup", dragStop);
slider.addEventListener("mouseleave", dragStop);
slider.addEventListener("touchend", dragStop);
