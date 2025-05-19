// Asegurarse de que el contador del carrito se inicialice correctamente
document.addEventListener('DOMContentLoaded', function() {
  // Estructura de datos del carrito
  let carrito = {
    productos: [],
    total: 0
  };
  
  // Cargar carrito desde localStorage
  function cargarCarrito() {
    const carritoGuardado = localStorage.getItem('carritoProductos');
    if (carritoGuardado) {
      carrito = JSON.parse(carritoGuardado);
      actualizarIconoCarrito();
    }
  }
  
  // Actualizar contador del icono de carrito
  function actualizarIconoCarrito() {
    // Buscar todos los posibles contadores de carrito
    const cartCountElements = document.querySelectorAll('.cart-count');
    if (cartCountElements && cartCountElements.length > 0) {
      const cantidadTotal = carrito.productos.reduce((total, producto) => total + producto.cantidad, 0);
      
      // Actualizar todos los contadores encontrados
      cartCountElements.forEach(element => {
        element.textContent = cantidadTotal.toString();
        
        // Hacerlo visible si hay productos
        if (cantidadTotal > 0) {
          element.style.display = 'flex';
        } else {
          element.style.display = 'none';
        }
      });
    }
  }
  
  // Verificar si los iconos del carrito tienen los event listeners correctos
  function verificarEventListeners() {
    // Buscar los iconos del carrito
    const cartIcons = document.querySelectorAll('.cart-icon-link, #cart-icon-trigger');
    
    cartIcons.forEach(icon => {
      if (!icon.hasAttribute('data-cart-init-listener')) {
        icon.setAttribute('data-cart-init-listener', 'true');
        
        // Añadir un event listener temporal que muestre un mensaje en la consola
        // Esto nos ayudará a depurar si los event listeners no están funcionando
        icon.addEventListener('click', function(e) {
          console.log('Clic en icono de carrito detectado por carrito-init.js');
        });
      }
    });
  }
  
  // Inicializar carrito
  cargarCarrito();
  
  // Verificar event listeners
  verificarEventListeners();
  
  // Crear un MutationObserver para asegurar que el contador se actualice
  // incluso si se modifica el DOM después de cargarse la página
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes && mutation.addedNodes.length > 0) {
        // Buscar nuevos elementos del contador
        const newCartCountElements = document.querySelectorAll('.cart-count:not([data-initialized])');
        if (newCartCountElements.length > 0) {
          actualizarIconoCarrito();
          newCartCountElements.forEach(el => el.setAttribute('data-initialized', 'true'));
        }
        
        // Verificar si hay nuevos iconos de carrito añadidos
        verificarEventListeners();
      }
    });
  });
  
  // Configurar el observador para vigilar cambios en todo el documento
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
});