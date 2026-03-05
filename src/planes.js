const carousel = document.getElementById("carousel");
const next = document.getElementById("next");
const prev = document.getElementById("prev");

const step = 330; 
const OFFSET = 165; 

const SCALE_CENTER = 1.2; 
const SCALE_SIDE = 0.9;   
const SCALE_FAR = 0.75;    

function updateWeights() {
  const items = Array.from(carousel.children);
  
  const centerIndex = 3; 

  items.forEach((item, index) => {
    const distance = index - centerIndex; 
    const absDist = Math.abs(distance);
    
    let scale = 1;
    let opacity = 1;
    let translateX = 0;
    let zIndex = 1;

    if (absDist === 0) {
      scale = SCALE_CENTER;
      opacity = 1;
      zIndex = 10;
      translateX = 0;
    } else if (absDist === 1) {
      scale = SCALE_SIDE;
      opacity = 0.8;
      zIndex = 5;
      translateX = distance < 0 ? 40 : -40;
    } else if (absDist === 2) {
      scale = SCALE_FAR;
      opacity = 0.5;
      zIndex = 2;
      translateX = distance < 0 ? 80 : -80;
    } else {
      scale = 0.5;
      opacity = 0;
      zIndex = 0;
      translateX = distance < 0 ? 100 : -100;
    }

    item.style.transform = `translateX(${translateX}px) scale(${scale})`;
    item.style.opacity = opacity;
    item.style.zIndex = zIndex;
    
    item.style.pointerEvents = opacity === 0 ? "none" : "auto";
  });
}

next.onclick = () => {
  carousel.style.transition = "none";
  carousel.appendChild(carousel.firstElementChild);

  carousel.style.transform = `translateX(${OFFSET + step}px)`;

  updateWeights();

  setTimeout(() => {
    carousel.style.transition = "transform 0.4s ease";
    carousel.style.transform = `translateX(${OFFSET}px)`;
  }, 20);
};

prev.onclick = () => {
  carousel.style.transition = "none";
  carousel.prepend(carousel.lastElementChild);
  carousel.style.transform = `translateX(${OFFSET - step}px)`;
  
  updateWeights(); 

  setTimeout(() => {
    carousel.style.transition = "transform 0.4s ease";
    carousel.style.transform = `translateX(${OFFSET}px)`;
  }, 20);
};

carousel.style.transform = `translateX(${OFFSET}px)`;
updateWeights();