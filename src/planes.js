const carousel = document.getElementById("carousel");
  const next = document.getElementById("next");
  const prev = document.getElementById("prev");

  let index = 0;
  const step = 320;

  next.onclick = () => {
    if (index < carousel.children.length - 1) {
      index++;
      carousel.style.transform = `translateX(${-index * step}px)`;
    }
  };

  prev.onclick = () => {
    if (index > 0) {
      index--;
      carousel.style.transform = `translateX(${-index * step}px)`;
    }
  };