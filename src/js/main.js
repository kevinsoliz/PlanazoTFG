
// const collapsibles = document.querySelectorAll(".collapsible");

// console.log(collapsibles);

// collapsibles.forEach((elemento) => elemento.addEventListener("click", function () {

//     this.classList.toggle("collapsible--expanded");


//     let navIcon = this.querySelector('.nav__toggler use');
//     console.log(navIcon);
//     if(navIcon) {
//       let icono = navIcon.getAttribute('href');

//       if(icono.includes('menu'))
//         navIcon.setAttribute('href', 'images/iconos.svg#close');
      
//       else
//         navIcon.setAttribute('href', 'images/iconos.svg#menu');
//     }
//   })
// );

const icons = document.querySelectorAll(".collapsible .icon--collapser");

icons.forEach((icono) => icono.addEventListener("click", function(event) {

    const collapsibleDiv = icono.closest(".collapsible");
    collapsibleDiv.classList.toggle("collapsible--expanded");

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
