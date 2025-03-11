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
      "Pelo1.jpeg": "Pelo1.1.jpeg",
      "Pelo1.1.jpeg": "Pelo1.jpeg",
      "Pelo2.jpeg": "Pelo2.1.jpeg",
      "Pelo2.1.jpeg": "Pelo2.jpeg",
      "Pelo3.jpeg": "Pelo3.1.jpeg",
      "Pelo3.1.jpeg": "Pelo3.jpeg",
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
    }, 300);
  }

  // Vincula la función a los artículos
  const articulos = document.querySelectorAll(".articulo");
  articulos.forEach((articulo) => {
    articulo.addEventListener("click", function () {
      rotateAndChange(this);
    });
  });
});