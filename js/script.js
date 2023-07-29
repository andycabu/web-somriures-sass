document.addEventListener("DOMContentLoaded", function () {
  // JavaScript para el carrusel
  const carouselContainer = document.querySelector(".carousel-container");
  if (carouselContainer) {
    // El carrusel está presente en la página, ejecutar el código del carrusel
    const carouselDots = document.querySelector(".carousel-dots");
    const carouselPrev = document.querySelector(".carousel-prev");
    const carouselNext = document.querySelector(".carousel-next");
    let currentPosition = 0;
    const totalImages = carouselContainer.children.length;

    function showImage(index) {
      carouselContainer.style.transform = `translateX(-${
        index * (100 / totalImages)
      }%)`;
      updateDots(index);
    }

    function changePosition(offset) {
      currentPosition = (currentPosition + offset + totalImages) % totalImages;
      showImage(currentPosition);
    }
    function updateDots(index) {
      const dots = Array.from(carouselDots.children);
      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
      });
    }

    function createDotClickHandler(i) {
      return function () {
        showImage(i);
      };
    }

    function createDots() {
      for (let i = 0; i < totalImages; i++) {
        const dot = document.createElement("span");
        dot.classList.add("carousel-dot");
        dot.addEventListener("click", createDotClickHandler(i));
        carouselDots.appendChild(dot);
      }
    }

    // Crear los dots solo si existe el elemento carouselDots
    if (carouselDots) {
      createDots();
      showImage(currentPosition);
    }

    carouselPrev.addEventListener("click", function () {
      changePosition(-1);
    });
    carouselNext.addEventListener("click", function () {
      changePosition(1);
    });
  }
  let isMobile = window.innerWidth <= 1154;
  // JavaScript para alternar el menú desplegable
  var menu = document.querySelector(".menu");
  var menuBtn = document.querySelector(".menu-btn");
  var closeBtn = document.querySelector(".close-btn");

  menuBtn.addEventListener("click", function () {
    menu.classList.add("active");
  });
  closeBtn.addEventListener("click", function () {
    menu.classList.remove("active");
  });

  // JavaScript para rotar el elemento
  let rotacionActual = 0;
  const clickElement = document.querySelector(".sub-btn");
  const elementoARotar = document.querySelector(".sub-btn");

  clickElement.addEventListener("click", alternarRotacion);

  // Función para alternar la rotación del elemento
  function alternarRotacion() {
    if (!isMobile) {
      if (rotacionActual === 0) {
        elementoARotar.style.transform = "rotate(180deg)";
        rotacionActual = 180;
      } else {
        elementoARotar.style.transform = "rotate(0deg)";
        rotacionActual = 0;
      }
    }
  }

  // Función para mostrar u ocultar los submenús
  function toggleSubMenu() {
    if (!isMobile) {
      var targetSelector = this.getAttribute("data-target");
      var targetElements = document.querySelectorAll(targetSelector);

      // Alternar la visibilidad de los elementos objetivo
      targetElements.forEach(function (element) {
        if (window.getComputedStyle(element).display === "flex") {
          element.style.display = "none";
        } else {
          element.style.display = "flex";
        }
      });
    }
  }

  // Controlador de eventos de cambio de tamaño de la ventana
  function handleResize() {
    var newIsMobile = window.innerWidth > 1154;

    // Verificar si el estado de móvil ha cambiado
    if (isMobile !== newIsMobile) {
      isMobile = newIsMobile;

      // Restablecer los estilos y estado de rotación
      elementoARotar.style.transform = "";
      rotacionActual = 0;

      // Obtener todos los elementos con la clase "sub-btn"
      var subBtns = document.querySelectorAll(".sub-btn");

      // Eliminar eventos de clic y restablecer la visualización del submenú
      subBtns.forEach(function (btn) {
        btn.removeEventListener("click", toggleSubMenu);
        var subMenu = btn.nextElementSibling;
        subMenu.style.display = "";
      });

      // Asignar eventos de clic si no es móvil
      if (!isMobile) {
        subBtns.forEach(function (btn) {
          btn.addEventListener("click", toggleSubMenu);
        });
      }
    }
  }

  //efectos navegation
  window.addEventListener("scroll", function () {
    var nav = document.querySelector("nav");
    nav.classList.toggle("sticky", window.scrollY > 0);
  });

  const toggleElements = document.querySelectorAll(".toggle-content");
  const card1 = document.querySelectorAll(".card1");

  toggleElements.forEach((toggleElement, index) => {
    toggleElement.addEventListener("click", function (event) {
      event.preventDefault();
      const contentElement = this.previousElementSibling;
      const cardElement = card1[index];

      // Calculamos la altura actual del párrafo (el contenido completo) y lo almacenamos en una variable
      const fullHeight = contentElement.scrollHeight + "px";

      if (contentElement.classList.contains("show-less")) {
        contentElement.style.height = fullHeight; // Expandimos el párrafo estableciendo la altura completa
        card1[index].style.height = "100%";
        toggleElement.textContent = "Llámanos";
        toggleElement.href = "#";
      } else {
        contentElement.style.height = "100px"; // Contraemos el párrafo estableciendo la altura inicial
        const cardTopPosition = cardElement.getBoundingClientRect().top;

        toggleElement.textContent = "Leer más";
        card1[index].style.height = "";
        toggleElement.href = "tel:999999999";
        cardElement.scrollIntoView({ behavior: "auto" });
        // Obtener el valor del atributo data-href
        const dataHref = toggleElement.getAttribute("data-href");

        // Redireccionar si el atributo data-href tiene un valor
        if (dataHref) {
          window.location.href = dataHref;
        }

        window.scrollBy(0, cardTopPosition - 20);
      }

      contentElement.classList.toggle("show-less"); // Usamos toggle para alternar la clase show-less
    });
  });

// funcionalidad drop tratamientos
  const menuItems = document.querySelectorAll('.menu-item-tractaments');

menuItems.forEach((menuItem) => {
    menuItem.addEventListener('click', () => {
        menuItem.classList.toggle('open');

        menuItems.forEach((otherMenuItem) => {
            if (otherMenuItem !== menuItem) {
                otherMenuItem.classList.remove('open');
            }
        });
    });
});


  // Agregar el controlador de eventos de cambio de tamaño de la ventana
  window.addEventListener("resize", handleResize);

  // Ejecutar el controlador de eventos al cargar la página inicialmente
  handleResize();
});
