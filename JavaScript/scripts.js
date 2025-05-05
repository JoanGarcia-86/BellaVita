document.addEventListener("DOMContentLoaded", function () {
  // ******** SELECCIÓN DE ELEMENTOS DEL CARRUSEL ********
  const images = document.querySelectorAll(".carrusel_imagen");
  const productInfos = document.querySelectorAll(".info_producto");
  const indicadores = document.querySelectorAll(".indicador");
  let currentIndex = 0;

  // ******** FUNCIÓN PARA MOSTRAR LA SIGUIENTE IMAGEN ********
  function showNextImage() {
    images[currentIndex].classList.remove("active");
    productInfos[currentIndex].classList.remove("active");
    indicadores[currentIndex].classList.remove("active");

    currentIndex = (currentIndex + 1) % images.length;

    images[currentIndex].classList.add("active");
    productInfos[currentIndex].classList.add("active");
    indicadores[currentIndex].classList.add("active");
  }

  // ******** INTERVALO PARA CAMBIAR LA IMAGEN CADA 8 SEGUNDOS ********
  setInterval(showNextImage, 8000);

  // ******** FUNCIÓN PARA CAMBIAR DE IMAGEN AL CLICAR EN UN INDICADOR ********
  indicadores.forEach((indicador, index) => {
    indicador.addEventListener("click", function () {
      images[currentIndex].classList.remove("active");
      productInfos[currentIndex].classList.remove("active");
      indicadores[currentIndex].classList.remove("active");

      currentIndex = index;

      images[currentIndex].classList.add("active");
      productInfos[currentIndex].classList.add("active");
      indicadores[currentIndex].classList.add("active");
    });
  });

  // ******** SELECCIÓN DEL ENCABEZADO ********
  const header = document.querySelector(".header_container");

  // ******** FUNCIÓN PARA CAMBIAR EL ESTILO DEL ENCABEZADO AL HACER SCROLL ********
  window.addEventListener("scroll", function () {
    if (window.scrollY > 10) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // ******** SELECCIÓN DE SECCIONES ********
  const sections = document.querySelectorAll(".historia_section");

  // ******** FUNCIÓN PARA MOSTRAR SECCIONES AL HACER SCROLL ********
  function showSectionsOnScroll() {
    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      const triggerHeight = window.innerHeight * 0.8; // 80% de la pantalla

      if (sectionTop < triggerHeight) {
        section.classList.add("show");
      }
    });
  }

  window.addEventListener("scroll", showSectionsOnScroll);
  showSectionsOnScroll(); // Para mostrar las secciones ya visibles al cargar

  function rotateAndChange(element) {
    let img = element.querySelector("img"); // Encuentra la imagen dentro del artículo
    let imageMap = {
      "Pelo1.png": "Pelo1.1.png",
      "Pelo1.1.png": "Pelo1.png",
      "Pelo2.png": "Pelo2.1.png",
      "Pelo2.1.png": "Pelo2.png",
      "Pelo3.png": "Pelo3.1.png",
      "Pelo3.1.png": "Pelo3.png",
    };

    // Obtiene el nombre del archivo actual sin la ruta completa
    let currentImage = img.src.split("/").pop();

    // Verifica si la imagen actual está en el mapa
    if (!imageMap[currentImage]) return;

    // Agrega la rotación
    img.classList.toggle("rotate");

    // Espera 300ms para cambiar la imagen mientras gira
    setTimeout(() => {
      // Cambia la imagen
      img.src = img.src.replace(currentImage, imageMap[currentImage]);
    }, 150);
  }
  
  // Vincula la función a los artículos
  const articulos = document.querySelectorAll(".articulo");
  articulos.forEach((articulo) => {
    articulo.addEventListener("click", function () {
      rotateAndChange(this);
    });
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const dropdown = document.querySelector('.dropdown');
  const dropdownBtn = dropdown.querySelector('.header_link');
  const dropdownContent = dropdown.querySelector('.dropdown-content');
  
  // Función para mostrar/ocultar el menú al hacer clic
  function toggleDropdown(e) {
      e.preventDefault(); // Prevenir navegación al hacer clic
      
      if (dropdownContent.classList.contains('show')) {
          // Si está visible, ocultarlo
          dropdownContent.classList.remove('show');
          setTimeout(() => {
              dropdownContent.style.display = 'none';
          }, 200);
      } else {
          // Si está oculto, mostrarlo
          dropdownContent.style.display = 'block';
          setTimeout(() => {
              dropdownContent.classList.add('show');
          }, 10);
      }
  }
  
  // Cerrar el menú si se hace clic fuera de él
  function closeDropdown(e) {
      if (!dropdown.contains(e.target)) {
          dropdownContent.classList.remove('show');
          setTimeout(() => {
              dropdownContent.style.display = 'none';
          }, 200);
      }
  }
  
  // Asignar eventos
  dropdownBtn.addEventListener('click', toggleDropdown);
  document.addEventListener('click', closeDropdown);
});