const carousel = document.getElementById("carousel");
const next = document.getElementById("next");
const prev = document.getElementById("prev");

const step = 340;

next.onclick = () => {
  carousel.style.transition = "transform 0.4s ease";
  carousel.style.transform = `translateX(-${step}px)`;

  setTimeout(() => {
    carousel.style.transition = "none";
    carousel.appendChild(carousel.firstElementChild);
    carousel.style.transform = "translateX(0)";
  }, 400);
};

prev.onclick = () => {
  carousel.style.transition = "none";
  carousel.prepend(carousel.lastElementChild);
  carousel.style.transform = `translateX(-${step}px)`;

  setTimeout(() => {
    carousel.style.transition = "transform 0.4s ease";
    carousel.style.transform = "translateX(0)";
  }, 20);
};
