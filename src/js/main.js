
const collapsibles = document.querySelectorAll(".collapsible");
collapsibles.forEach((elemento) =>
  elemento.addEventListener("click", function () {
    this.classList.toggle("collapsible--expanded");

    let navIcon = this.querySelector('.nav__toggler use');
    console.log(navIcon);
    if(navIcon) {
      let icono = navIcon.getAttribute('href');

      if(icono.includes('menu'))
        navIcon.setAttribute('href', 'images/iconos.svg#close');
      
      else
        navIcon.setAttribute('href', 'images/iconos.svg#menu');
    }
  })
);