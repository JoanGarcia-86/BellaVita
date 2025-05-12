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
      card.style.opacity = (z < 0) ? 0.3 : 1; // Mayor opacidad para elementos frontales
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
  productSlider.style.perspective = '1800px';
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