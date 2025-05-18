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

// Funcionalidad del carrito
document.addEventListener('DOMContentLoaded', function() {
  // Elementos del carrito
  const cartIcon = document.querySelector('.header_link img[alt="Cesta de compras"]');
  const cartSidebar = document.getElementById('cart-sidebar');
  const cartOverlay = document.getElementById('cart-overlay');
  const closeCartBtn = document.getElementById('close-cart');
  const continueShopping = document.getElementById('continue-shopping');
  
  // Agregar un contador al icono del carrito
  if (cartIcon) {
    // Envolver el icono en un span para posicionamiento relativo
    const parentLink = cartIcon.parentElement;
    parentLink.style.position = 'relative';
    
    // Agregar clase al icono para posicionamiento
    cartIcon.classList.add('cart-icon');
    
    // Crear el contador
    const cartCount = document.createElement('span');
    cartCount.className = 'cart-count';
    cartCount.textContent = '0'; // Inicialmente en 0
    parentLink.appendChild(cartCount);
  }
  
  // Función para abrir el carrito
  function openCart() {
    cartSidebar.classList.add('open');
    cartOverlay.classList.add('open');
    document.body.style.overflow = 'hidden'; // Prevenir scroll
  }
  
  // Función para cerrar el carrito
  function closeCart() {
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('open');
    document.body.style.overflow = ''; // Restaurar scroll
  }
  
  // Event listeners
  if (cartIcon) {
    cartIcon.parentElement.addEventListener('click', function(e) {
      e.preventDefault();
      openCart();
    });
  }
  
  if (closeCartBtn) {
    closeCartBtn.addEventListener('click', closeCart);
  }
  
  if (continueShopping) {
    continueShopping.addEventListener('click', closeCart);
  }
  
  if (cartOverlay) {
    cartOverlay.addEventListener('click', closeCart);
  }
  
  // Ejemplo de funcionalidad para añadir productos al carrito
  
  function addToCart(product) {
    // Actualizar contador
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
      const currentCount = parseInt(cartCount.textContent);
      cartCount.textContent = currentCount + 1;
    }
    
    // Si es el primer producto, ocultar mensaje de carrito vacío y mostrar contenedor de productos
    const emptyCart = document.getElementById('empty-cart');
    const cartProducts = document.getElementById('cart-products');
    
    if (emptyCart && cartProducts) {
      emptyCart.style.display = 'none';
      cartProducts.style.display = 'block';
    }
    
    // Crear elemento de producto para el carrito
    // Esta función dependerá de cómo quieras mostrar los productos
    
    // Opcional: Abrir automáticamente el carrito cuando se añade un producto
    openCart();
  }
  
  // Para probar la funcionalidad, puedes usar esto en las páginas de productos
  // const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  // if (addToCartButtons.length > 0) {
  //   addToCartButtons.forEach(button => {
  //     button.addEventListener('click', function(e) {
  //       e.preventDefault();
  //       const productInfo = {
  //         id: this.dataset.id,
  //         name: this.dataset.name,
  //         price: this.dataset.price,
  //         image: this.dataset.image
  //       };
  //       addToCart(productInfo);
  //     });
  //   });
  // }
});

// Funcionalidad del carrito para la página de promociones
document.addEventListener('DOMContentLoaded', function() {
  // Elementos del carrito
  const cartIcon = document.querySelector('.header_link img[alt="Cesta de compras"]');
  const cartSidebar = document.getElementById('cart-sidebar');
  const cartOverlay = document.getElementById('cart-overlay');
  const closeCartBtn = document.getElementById('close-cart');
  const continueShopping = document.getElementById('continue-shopping');
  const cartProducts = document.getElementById('cart-products');
  const emptyCart = document.getElementById('empty-cart');
  
  // Agregar un contador al icono del carrito
  if (cartIcon) {
    // Agregar clase al icono para posicionamiento
    cartIcon.classList.add('cart-icon');
    
    // Crear el contador
    const cartCount = document.createElement('span');
    cartCount.className = 'cart-count';
    cartCount.textContent = '0'; // Inicialmente en 0
    cartIcon.parentElement.appendChild(cartCount);
  }
  
  // Función para abrir el carrito
  function openCart() {
    cartSidebar.classList.add('open');
    cartOverlay.classList.add('open');
    document.body.style.overflow = 'hidden'; // Prevenir scroll
  }
  
  // Función para cerrar el carrito
  function closeCart() {
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('open');
    document.body.style.overflow = ''; // Restaurar scroll
  }
  
  // Event listeners para abrir/cerrar carrito
  if (cartIcon) {
    cartIcon.parentElement.addEventListener('click', function(e) {
      e.preventDefault();
      openCart();
    });
  }
  
  if (closeCartBtn) {
    closeCartBtn.addEventListener('click', closeCart);
  }
  
  if (continueShopping) {
    continueShopping.addEventListener('click', closeCart);
  }
  
  if (cartOverlay) {
    cartOverlay.addEventListener('click', closeCart);
  }
  
  // Array para almacenar productos en el carrito
  let cartItems = [];
  
  // Función para añadir productos al carrito
  function addToCart(product) {
    // Buscar si el producto ya está en el carrito
    const existingProductIndex = cartItems.findIndex(item => item.id === product.id);
    
    if (existingProductIndex !== -1) {
      // Si ya existe, aumentar cantidad
      cartItems[existingProductIndex].quantity += 1;
    } else {
      // Si no existe, agregar nuevo producto con cantidad 1
      product.quantity = 1;
      cartItems.push(product);
    }
    
    // Actualizar contador
    updateCartCount();
    
    // Renderizar productos del carrito
    renderCartItems();
    
    // Abrir carrito automáticamente
    openCart();
  }
  
  // Función para actualizar el contador del carrito
  function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
      const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
      cartCount.textContent = totalQuantity;
    }
  }
  
  // Función para renderizar los productos en el carrito
  function renderCartItems() {
    // Si no hay productos, mostrar mensaje de carrito vacío
    if (cartItems.length === 0) {
      emptyCart.style.display = 'flex';
      cartProducts.style.display = 'none';
      return;
    }
    
    // Si hay productos, ocultar mensaje de carrito vacío
    emptyCart.style.display = 'none';
    cartProducts.style.display = 'block';
    
    // Limpiar contenedor de productos
    cartProducts.innerHTML = '';
    
    // Renderizar cada producto
    cartItems.forEach(item => {
      const productElement = document.createElement('div');
      productElement.className = 'cart-product';
      productElement.dataset.id = item.id;
      
      productElement.innerHTML = `
        <div class="cart-product-image">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-product-details">
          <div class="cart-product-title">${item.name}</div>
          <div class="cart-product-price">${item.price}€</div>
          <div class="cart-product-quantity">
            <button class="quantity-btn decrease-btn">-</button>
            <span class="quantity-number">${item.quantity}</span>
            <button class="quantity-btn increase-btn">+</button>
          </div>
          <button class="cart-product-remove">Eliminar</button>
        </div>
      `;
      
      cartProducts.appendChild(productElement);
      
      // Agregar event listeners para los botones de cantidad
      const decreaseBtn = productElement.querySelector('.decrease-btn');
      const increaseBtn = productElement.querySelector('.increase-btn');
      const removeBtn = productElement.querySelector('.cart-product-remove');
      
      decreaseBtn.addEventListener('click', () => {
        decreaseQuantity(item.id);
      });
      
      increaseBtn.addEventListener('click', () => {
        increaseQuantity(item.id);
      });
      
      removeBtn.addEventListener('click', () => {
        removeFromCart(item.id);
      });
    });
  }
  
   // Función para disminuir la cantidad de un producto
  function decreaseQuantity(id) {
    const productIndex = cartItems.findIndex(item => item.id === id);
    
    if (productIndex !== -1) {
      if (cartItems[productIndex].quantity > 1) {
        // Si hay más de 1, reducir la cantidad
        cartItems[productIndex].quantity -= 1;
      } else {
        // Si solo queda 1, eliminar el producto
        cartItems.splice(productIndex, 1);
      }
      
      // Actualizar contador y renderizar
      updateCartCount();
      renderCartItems();
    }
  }
  
  // Función para aumentar la cantidad de un producto
  function increaseQuantity(id) {
    const productIndex = cartItems.findIndex(item => item.id === id);
    
    if (productIndex !== -1) {
      cartItems[productIndex].quantity += 1;
      
      // Actualizar contador y renderizar
      updateCartCount();
      renderCartItems();
    }
  }
  
  // Función para eliminar un producto del carrito
  function removeFromCart(id) {
    const productIndex = cartItems.findIndex(item => item.id === id);
    
    if (productIndex !== -1) {
      cartItems.splice(productIndex, 1);
      
      // Actualizar contador y renderizar
      updateCartCount();
      renderCartItems();
    }
  }
  
  // Event listeners para los botones "Añadir al carrito"
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  
  if (addToCartButtons.length > 0) {
    addToCartButtons.forEach(button => {
      button.addEventListener('click', function() {
        const productInfo = {
          id: this.dataset.id,
          name: this.dataset.name,
          price: this.dataset.price,
          image: this.dataset.image
        };
        
        addToCart(productInfo);
      });
    });
  }
});

document.addEventListener("DOMContentLoaded", function() {
  // ******** SELECCIÓN DEL ENCABEZADO ********
  const header = document.querySelector(".header_container");

  // ******** FUNCIÓN PARA CAMBIAR EL ESTILO DEL ENCABEZADO AL HACER SCROLL ********
  window.addEventListener("scroll", function() {
    if (window.scrollY > 10) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
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

  // ******** NUEVA FUNCIONALIDAD PARA LAS TARJETAS DE PRODUCTOS ********
  // Seleccionar todos los botones de compra
  const buyButtons = document.querySelectorAll('.buy');
  const removeButtons = document.querySelectorAll('.remove');

  // Función para añadir producto al carrito
  buyButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Obtener el contenedor .bottom padre
      const bottomContainer = this.closest('.bottom');
      // Añadir la clase clicked para mostrar la sección de "Añadido"
      bottomContainer.classList.add('clicked');
      
      // Obtener información del producto
      const productId = this.getAttribute('data-id');
      const productName = this.getAttribute('data-name');
      const productPrice = this.getAttribute('data-price');
      const productImage = this.getAttribute('data-image');

      // Añadir producto al carrito
      addToCart({
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage,
        quantity: 1
      });
    });
  });

  // Función para quitar producto del carrito
  removeButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Obtener el contenedor .bottom padre
      const bottomContainer = this.closest('.bottom');
      // Quitar la clase clicked para volver al estado inicial
      bottomContainer.classList.remove('clicked');
      
      // Obtener el ID del producto desde el botón de compra
      const buyButton = bottomContainer.querySelector('.buy');
      const productId = buyButton.getAttribute('data-id');
      
      // Eliminar producto del carrito
      removeFromCart(productId);
    });
  });

  // ******** FUNCIONALIDAD DEL CARRITO ********
  // Elementos del carrito
  const cartIcon = document.querySelector('.cart-icon-link');
  const cartSidebar = document.getElementById('cart-sidebar');
  const cartOverlay = document.getElementById('cart-overlay');
  const closeCartBtn = document.getElementById('close-cart');
  const continueShopping = document.getElementById('continue-shopping');
  const cartProducts = document.getElementById('cart-products');
  const emptyCart = document.getElementById('empty-cart');
  
  // Array para almacenar productos en el carrito
  let cartItems = [];
  
  // Función para abrir el carrito
  function openCart() {
    if (cartSidebar && cartOverlay) {
      cartSidebar.classList.add('open');
      cartOverlay.classList.add('open');
      document.body.style.overflow = 'hidden'; // Prevenir scroll
    }
  }
  
  // Función para cerrar el carrito
  function closeCart() {
    if (cartSidebar && cartOverlay) {
      cartSidebar.classList.remove('open');
      cartOverlay.classList.remove('open');
      document.body.style.overflow = ''; // Restaurar scroll
    }
  }
  
  // Event listeners para abrir/cerrar carrito
  if (cartIcon) {
    cartIcon.addEventListener('click', function(e) {
      e.preventDefault();
      openCart();
    });
  }
  
  if (closeCartBtn) {
    closeCartBtn.addEventListener('click', closeCart);
  }
  
  if (continueShopping) {
    continueShopping.addEventListener('click', closeCart);
  }
  
  if (cartOverlay) {
    cartOverlay.addEventListener('click', closeCart);
  }
  
  // Función para añadir productos al carrito
  function addToCart(product) {
    // Buscar si el producto ya está en el carrito
    const existingProductIndex = cartItems.findIndex(item => item.id === product.id);
    
    if (existingProductIndex !== -1) {
      // Si ya existe, aumentar cantidad
      cartItems[existingProductIndex].quantity += 1;
    } else {
      // Si no existe, agregar nuevo producto
      cartItems.push(product);
    }
    
    // Actualizar contador
    updateCartCount();
    
    // Renderizar productos del carrito
    renderCartItems();
  }
  
  // Función para actualizar el contador del carrito
  function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
      const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
      cartCount.textContent = totalQuantity;
    }
  }
  
  // Función para renderizar los productos en el carrito
  function renderCartItems() {
    if (!cartProducts || !emptyCart) return;
    
    // Si no hay productos, mostrar mensaje de carrito vacío
    if (cartItems.length === 0) {
      emptyCart.style.display = 'flex';
      cartProducts.style.display = 'none';
      return;
    }
    
    // Si hay productos, ocultar mensaje de carrito vacío
    emptyCart.style.display = 'none';
    cartProducts.style.display = 'block';
    
    // Limpiar contenedor de productos
    cartProducts.innerHTML = '';
    
    // Renderizar cada producto
    cartItems.forEach(item => {
      const productElement = document.createElement('div');
      productElement.className = 'cart-product';
      productElement.dataset.id = item.id;
      
      productElement.innerHTML = `
        <div class="cart-product-image">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-product-details">
          <div class="cart-product-title">${item.name}</div>
          <div class="cart-product-price">${item.price}€</div>
          <div class="cart-product-quantity">
            <button class="quantity-btn decrease-btn">-</button>
            <span class="quantity-number">${item.quantity}</span>
            <button class="quantity-btn increase-btn">+</button>
          </div>
          <button class="cart-product-remove">Eliminar</button>
        </div>
      `;
      
      cartProducts.appendChild(productElement);
      
      // Agregar event listeners para los botones de cantidad
      const decreaseBtn = productElement.querySelector('.decrease-btn');
      const increaseBtn = productElement.querySelector('.increase-btn');
      const removeBtn = productElement.querySelector('.cart-product-remove');
      
      decreaseBtn.addEventListener('click', () => {
        decreaseQuantity(item.id);
      });
      
      increaseBtn.addEventListener('click', () => {
        increaseQuantity(item.id);
      });
      
      removeBtn.addEventListener('click', () => {
        removeFromCart(item.id);
      });
    });
  }
  
  // Función para disminuir la cantidad de un producto
  function decreaseQuantity(id) {
    const productIndex = cartItems.findIndex(item => item.id === id);
    
    if (productIndex !== -1) {
      if (cartItems[productIndex].quantity > 1) {
        // Si hay más de 1, reducir la cantidad
        cartItems[productIndex].quantity -= 1;
      } else {
        // Si solo queda 1, eliminar el producto
        cartItems.splice(productIndex, 1);
        
        // Actualizar la visualización del botón en la tarjeta de producto
        const productBottoms = document.querySelectorAll('.bottom');
        productBottoms.forEach(bottom => {
          const buyButton = bottom.querySelector('.buy');
          if (buyButton && buyButton.getAttribute('data-id') === id) {
            bottom.classList.remove('clicked');
          }
        });
      }
      
      // Actualizar contador y renderizar
      updateCartCount();
      renderCartItems();
    }
  }
  
  // Función para aumentar la cantidad de un producto
  function increaseQuantity(id) {
    const productIndex = cartItems.findIndex(item => item.id === id);
    
    if (productIndex !== -1) {
      cartItems[productIndex].quantity += 1;
      
      // Actualizar contador y renderizar
      updateCartCount();
      renderCartItems();
    }
  }
  
  // Función para eliminar un producto del carrito
  function removeFromCart(id) {
    const productIndex = cartItems.findIndex(item => item.id === id);
    
    if (productIndex !== -1) {
      cartItems.splice(productIndex, 1);
      
      // Actualizar la visualización del botón en la tarjeta de producto
      const productBottoms = document.querySelectorAll('.bottom');
      productBottoms.forEach(bottom => {
        const buyButton = bottom.querySelector('.buy');
        if (buyButton && buyButton.getAttribute('data-id') === id) {
          bottom.classList.remove('clicked');
        }
      });
      
      // Actualizar contador y renderizar
      updateCartCount();
      renderCartItems();
    }
  }
});