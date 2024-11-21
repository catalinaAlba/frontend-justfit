// Detectar el scroll y añadir la clase 'sticky' a la navbar
window.onscroll = function() {
    stickyNavbar();
  };

  // Función que añade la clase 'sticky' cuando se hace scroll
  function stickyNavbar() {
    var navbar = document.querySelector('.navbar');
    if (window.pageYOffset > 100) {  // Cuando se haga scroll hacia abajo 100px
      navbar.classList.add('sticky');
    } else {
      navbar.classList.remove('sticky');
    }
  }