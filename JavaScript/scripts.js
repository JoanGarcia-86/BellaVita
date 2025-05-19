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

  // ******** EFECTO CIRCULAR QUE VARÍA CON LA DISTANCIA DESDE EL CENTRO ********
  const tarjetas = document.querySelectorAll('.tarjeta-comparacion');
  
  tarjetas.forEach((tarjeta) => {
    const revelacion = tarjeta.querySelector('.revelacion-despues');
    let isFullyRevealed = false;
    
    function actualizarCirculo(e) {
      if (isFullyRevealed) return;
      
      const rect = tarjeta.getBoundingClientRect();
      
      // Calcular la posición del cursor relativa a la tarjeta (de 0 a 1)
      const mouseX = (e.clientX - rect.left) / rect.width;
      const mouseY = (e.clientY - rect.top) / rect.height;
      
      // Calcular la distancia desde el centro (0.5, 0.5)
      const distanceX = Math.abs(0.5 - mouseX);
      const distanceY = Math.abs(0.5 - mouseY);
      
      // La distancia euclidiana desde el centro
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      
      // Normalizar a un porcentaje (0% a 50%)
      // Cuanto más lejos del centro, más grande es el círculo
      const circleSize = Math.min(distance * 100, 50);
      
      // Convertir a coordenadas de porcentaje para clip-path
      const x = mouseX * 100;
      const y = mouseY * 100;
      
      // Aplicar inmediatamente sin transición para mayor fluidez
      revelacion.style.transition = 'none';
      revelacion.style.clipPath = `circle(${circleSize}% at ${x}% ${y}%)`;
    }
    
    tarjeta.addEventListener('mousemove', (e) => {
      // Usar requestAnimationFrame para optimizar el rendimiento
      requestAnimationFrame(() => actualizarCirculo(e));
    });
    
    tarjeta.addEventListener('mouseleave', () => {
      if (!isFullyRevealed) {
        revelacion.style.transition = 'clip-path 0.3s ease-out';
        revelacion.style.clipPath = 'circle(0% at 50% 50%)';
      }
    });
    
    tarjeta.addEventListener('mouseenter', (e) => {
      if (!isFullyRevealed) {
        actualizarCirculo(e);
      }
    });
    
    tarjeta.addEventListener('click', () => {
      isFullyRevealed = !isFullyRevealed;
      
      if (isFullyRevealed) {
        // Mostrar completamente
        revelacion.style.transition = 'clip-path 0.5s ease-out';
        revelacion.style.clipPath = 'circle(150% at 50% 50%)';
      } else {
        // Volver al estado normal
        revelacion.style.transition = 'clip-path 0.5s ease-out';
        revelacion.style.clipPath = 'circle(0% at 50% 50%)';
      }
    });
    
    // Inicializar en estado oculto
    revelacion.style.clipPath = 'circle(0% at 50% 50%)';
  });

  // ******** MENÚ DESPLEGABLE ********
  const dropdown = document.querySelector('.dropdown');
  if (dropdown) {
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
      if (dropdown && !dropdown.contains(e.target)) {
        dropdownContent.classList.remove('show');
        setTimeout(() => {
          dropdownContent.style.display = 'none';
        }, 200);
      }
    }
    
    // Asignar eventos
    dropdownBtn.addEventListener('click', toggleDropdown);
    document.addEventListener('click', closeDropdown);
  }
});


// Efecto de carrusel rotatorio para productos destacados
function initRotatingProductSlider() {
  const productSlider = document.querySelector('.product-slider');
  const productCards = document.querySelectorAll('.product-card');
  const nextBtn = document.querySelector('.next-btn');
  const prevBtn = document.querySelector('.prev-btn');
  
  if (!productSlider || !nextBtn || !prevBtn || productCards.length === 0) return;
  
  let activeIndex = 0;
  const totalCards = productCards.length;
  const radius = 350; // Radio del círculo
  const theta = 2 * Math.PI / totalCards; // Ángulo entre cada tarjeta
  
  // Función para posicionar las tarjetas en un círculo
function positionCards() {
  productCards.forEach((card, index) => {
    // Calcular ángulo basado en la posición respecto al elemento activo
    const angle = theta * (index - activeIndex);
    
    // Calcular posición 3D basada en el ángulo
    const z = radius * Math.cos(angle);
    const x = radius * Math.sin(angle);
    
    // Aplicar transformaciones
    card.style.transform = `translateX(${x}px) translateZ(${z}px)`;
    
    // Eliminar o comentar esta línea:
    // card.style.opacity = (z < 0) ? 0.3 : 1;
    
    card.style.zIndex = Math.floor(z);
    
    // Determinar elemento activo
    if (index === activeIndex) {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });
}
  
  // Inicializar posiciones
  productSlider.style.perspective = '2650px';
  productSlider.style.transformStyle = 'preserve-3d';
  productCards.forEach(card => {
    card.style.position = 'absolute';
    card.style.transition = 'all 0.5s ease';
  });
  
  // Mostrar la siguiente tarjeta
  function rotateRight() {
    activeIndex = (activeIndex + 1) % totalCards;
    positionCards();
  }
  
  // Mostrar la tarjeta anterior
  function rotateLeft() {
    activeIndex = (activeIndex - 1 + totalCards) % totalCards;
    positionCards();
  }
  
  // Asignar eventos a los botones
  nextBtn.addEventListener('click', rotateRight);
  prevBtn.addEventListener('click', rotateLeft);
  
  // Posicionar las tarjetas inicialmente
  positionCards();
}

// Iniciar el carrusel rotatorio cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', initRotatingProductSlider);

//Scripts para la pagina de Blog 

document.addEventListener('DOMContentLoaded', function() {
  // Variables para la navegación entre páginas del blog
  const nextBtn = document.querySelector('.next-blog');
  const prevBtn = document.querySelector('.prev-blog');
  const blogPages = document.querySelectorAll('.blog-page');
  let currentPageIndex = 0;

  // Función para cambiar a la siguiente página
  function nextPage() {
    // Ocultar página actual
    blogPages[currentPageIndex].classList.remove('active');
    
    // Calcular índice de la siguiente página
    currentPageIndex = (currentPageIndex + 1) % blogPages.length;
    
    // Mostrar siguiente página
    blogPages[currentPageIndex].classList.add('active');
    
    // Actualizar estado de los botones de navegación
    updateNavButtons();
    
    // Desplazar al inicio de la página
    window.scrollTo({
      top: blogPages[currentPageIndex].offsetTop - 100,
      behavior: 'smooth'
    });
  }
  
  // Función para cambiar a la página anterior
  function prevPage() {
    // Ocultar página actual
    blogPages[currentPageIndex].classList.remove('active');
    
    // Calcular índice de la página anterior
    currentPageIndex = (currentPageIndex - 1 + blogPages.length) % blogPages.length;
    
    // Mostrar página anterior
    blogPages[currentPageIndex].classList.add('active');
    
    // Actualizar estado de los botones de navegación
    updateNavButtons();
    
    // Desplazar al inicio de la página
    window.scrollTo({
      top: blogPages[currentPageIndex].offsetTop - 100,
      behavior: 'smooth'
    });
  }
  
  // Función para actualizar el estado de los botones de navegación
  function updateNavButtons() {
    // Deshabilitar botón previo en la primera página
    if (currentPageIndex === 0) {
      prevBtn.classList.add('disabled');
    } else {
      prevBtn.classList.remove('disabled');
    }
    
    // Deshabilitar botón siguiente en la última página
    if (currentPageIndex === blogPages.length - 1) {
      nextBtn.classList.add('disabled');
    } else {
      nextBtn.classList.remove('disabled');
    }
  }

  // Asignar evento al botón de siguiente página
  if (nextBtn) {
    nextBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      // No hacer nada si estamos en la última página o el botón está deshabilitado
      if (currentPageIndex === blogPages.length - 1 || this.classList.contains('disabled')) return;
      
      // Agregar clase de animación
      blogPages[currentPageIndex].classList.add('turning');
      
      // Esperar a que termine la animación antes de cambiar de página
      setTimeout(() => {
        blogPages[currentPageIndex].classList.remove('turning');
        nextPage();
      }, 300);
    });
  }
  
  // Asignar evento al botón de página anterior
  if (prevBtn) {
    prevBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      // No hacer nada si estamos en la primera página o el botón está deshabilitado
      if (currentPageIndex === 0 || this.classList.contains('disabled')) return;
      
      // Agregar clase de animación (en sentido contrario)
      blogPages[currentPageIndex].classList.add('turning-back');
      
      // Esperar a que termine la animación antes de cambiar de página
      setTimeout(() => {
        blogPages[currentPageIndex].classList.remove('turning-back');
        prevPage();
      }, 300);
    });
  }
  
  // Inicializar estado de los botones
  updateNavButtons();
  
  // Inicializar clases para la animación de pasar página
  function initializePageEffects() {
    // Agregar clase para permitir transiciones
    blogPages.forEach(page => {
      page.classList.add('page-transition');
    });
  }
  
  // Inicializar efectos
  initializePageEffects();
  
  // Navegación por teclado (opcional)
  document.addEventListener('keydown', function(e) {
    // Flecha derecha para avanzar
    if (e.key === 'ArrowRight') {
      if (currentPageIndex < blogPages.length - 1) {
        nextBtn.click();
      }
    }
    
    // Flecha izquierda para retroceder
    if (e.key === 'ArrowLeft') {
      if (currentPageIndex > 0) {
        prevBtn.click();
      }
    }
  });
  
  // Función para preinicializar la navegación
  function initNavigation() {
    // Asegurarse de que la primera página esté activa
    blogPages.forEach((page, index) => {
      if (index === 0) {
        page.classList.add('active');
      } else {
        page.classList.remove('active');
      }
    });
    
    // Inicializar estado de botones
    updateNavButtons();
  }
  
  // Inicializar navegación
  initNavigation();
});// Script específico para la página de blog

document.addEventListener('DOMContentLoaded', function() {
  // Variables para la navegación entre páginas del blog
  const nextBtn = document.querySelector('.next-blog');
  const prevBtn = document.querySelector('.prev-blog');
  const blogPages = document.querySelectorAll('.blog-page');
  let currentPageIndex = 0;
  
  // Elementos del indicador de página
  const currentPageElement = document.querySelector('.current-page');
  const totalPagesElement = document.querySelector('.total-pages');
  
  // Establecer el número total de páginas
  if (totalPagesElement) {
    totalPagesElement.textContent = blogPages.length;
  }

  // Función para cambiar a la siguiente página
  function nextPage() {
    // Ocultar página actual
    blogPages[currentPageIndex].classList.remove('active');
    
    // Calcular índice de la siguiente página
    currentPageIndex = (currentPageIndex + 1) % blogPages.length;
    
    // Mostrar siguiente página
    blogPages[currentPageIndex].classList.add('active');
    
    // Actualizar indicador de página
    updatePageIndicator();
    
    // Desplazar al inicio de la página
    window.scrollTo({
      top: blogPages[currentPageIndex].offsetTop - 100,
      behavior: 'smooth'
    });
  }
  
  // Función para cambiar a la página anterior
  function prevPage() {
    // Ocultar página actual
    blogPages[currentPageIndex].classList.remove('active');
    
    // Calcular índice de la página anterior
    currentPageIndex = (currentPageIndex - 1 + blogPages.length) % blogPages.length;
    
    // Mostrar página anterior
    blogPages[currentPageIndex].classList.add('active');
    
    // Actualizar indicador de página
    updatePageIndicator();
    
    // Desplazar al inicio de la página
    window.scrollTo({
      top: blogPages[currentPageIndex].offsetTop - 100,
      behavior: 'smooth'
    });
  }
  
  // Función para actualizar el indicador de página
  function updatePageIndicator() {
    if (currentPageElement) {
      currentPageElement.textContent = currentPageIndex + 1;
    }
    
    // Habilitar/deshabilitar botones según la página
    if (prevBtn) {
      if (currentPageIndex === 0) {
        prevBtn.classList.add('disabled');
      } else {
        prevBtn.classList.remove('disabled');
      }
    }
    
    if (nextBtn) {
      if (currentPageIndex === blogPages.length - 1) {
        nextBtn.classList.add('disabled');
      } else {
        nextBtn.classList.remove('disabled');
      }
    }
  }

  // Asignar evento al botón de siguiente página
  if (nextBtn) {
    nextBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      // No hacer nada si estamos en la última página
      if (currentPageIndex === blogPages.length - 1) return;
      
      // Agregar clase de animación
      blogPages[currentPageIndex].classList.add('turning');
      
      // Esperar a que termine la animación antes de cambiar de página
      setTimeout(() => {
        blogPages[currentPageIndex].classList.remove('turning');
        nextPage();
      }, 300);
    });
  }
  
  // Asignar evento al botón de página anterior
  if (prevBtn) {
    prevBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      // No hacer nada si estamos en la primera página
      if (currentPageIndex === 0) return;
      
      // Agregar clase de animación (en sentido contrario)
      blogPages[currentPageIndex].classList.add('turning-back');
      
      // Esperar a que termine la animación antes de cambiar de página
      setTimeout(() => {
        blogPages[currentPageIndex].classList.remove('turning-back');
        prevPage();
      }, 300);
    });
  }
  
  // Inicializar indicadores visuales
  updatePageIndicator();
  
  // Inicializar clases para la animación de pasar página
  function initializePageEffects() {
    // Agregar clase para permitir transiciones
    blogPages.forEach(page => {
      page.classList.add('page-transition');
    });
  }
  
  // Inicializar efectos
  initializePageEffects();
  
  // Navegación por teclado (opcional)
  document.addEventListener('keydown', function(e) {
    // Flecha derecha para avanzar
    if (e.key === 'ArrowRight') {
      if (currentPageIndex < blogPages.length - 1) {
        nextBtn.click();
      }
    }
    
    // Flecha izquierda para retroceder
    if (e.key === 'ArrowLeft') {
      if (currentPageIndex > 0) {
        prevBtn.click();
      }
    }
  });
});// Script específico para la página de blog

document.addEventListener('DOMContentLoaded', function() {
  // Variables para la navegación entre páginas del blog
  const nextBtn = document.querySelector('.next-blog');
  const paginationDots = document.querySelectorAll('.pagination-dot');
  const blogPages = document.querySelectorAll('.blog-page');
  let currentPageIndex = 0;

  // Función para cambiar a la siguiente página
  function nextPage() {
    // Ocultar página actual
    blogPages[currentPageIndex].classList.remove('active');
    paginationDots[currentPageIndex].classList.remove('active');
    
    // Calcular índice de la siguiente página
    currentPageIndex = (currentPageIndex + 1) % blogPages.length;
    
    // Mostrar siguiente página
    blogPages[currentPageIndex].classList.add('active');
    paginationDots[currentPageIndex].classList.add('active');
    
    // Desplazar al inicio de la página
    window.scrollTo({
      top: blogPages[currentPageIndex].offsetTop - 100,
      behavior: 'smooth'
    });
  }

  // Asignar evento al botón de navegación (flecha)
  if (nextBtn) {
    nextBtn.addEventListener('click', function(e) {
      e.preventDefault();
      // Agregar clase de animación
      blogPages[currentPageIndex].classList.add('turning');
      
      // Esperar a que termine la animación antes de cambiar de página
      setTimeout(() => {
        blogPages[currentPageIndex].classList.remove('turning');
        nextPage();
      }, 300);
    });
  }
  
  // Asignar eventos a los puntos de paginación
  paginationDots.forEach((dot, index) => {
    dot.addEventListener('click', function(e) {
      e.preventDefault();
      
      // No hacer nada si ya estamos en esa página
      if (index === currentPageIndex) return;
      
      // Ocultar página actual
      blogPages[currentPageIndex].classList.remove('active');
      paginationDots[currentPageIndex].classList.remove('active');
      
      // Actualizar índice y mostrar nueva página
      currentPageIndex = index;
      
      // Mostrar página seleccionada
      blogPages[currentPageIndex].classList.add('active');
      paginationDots[currentPageIndex].classList.add('active');
      
      // Desplazar al inicio
      window.scrollTo({
        top: blogPages[currentPageIndex].offsetTop - 100,
        behavior: 'smooth'
      });
    });
  });

  // Inicializar clases para la animación de pasar página
  function initializePageEffects() {
    // Agregar clase para permitir transiciones
    blogPages.forEach(page => {
      page.classList.add('page-transition');
    });
  }
  
  // Inicializar efectos
  initializePageEffects();
});