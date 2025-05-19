document.addEventListener('DOMContentLoaded', function() {
  // ******** ELEMENTOS DEL CARRITO ********
  const cartIconTrigger = document.getElementById('cart-icon-trigger');
  const cartSidebar = document.getElementById('cart-sidebar');
  const cartOverlay = document.getElementById('cart-overlay');
  const closeCartBtn = document.getElementById('close-cart');
  const continueShoppingBtn = document.getElementById('continue-shopping');
  const cartProducts = document.getElementById('cart-products');
  const emptyCart = document.getElementById('empty-cart');
  const cartTotalPrice = document.getElementById('cart-total-price');
  const cartCount = document.querySelector('.cart-count');
  const checkoutBtn = document.getElementById('checkout-btn');
  
  // ******** ESTRUCTURA DE DATOS DEL CARRITO ********
  let carrito = {
    productos: [],
    total: 0
  };
  
  // ******** FUNCIONES DEL CARRITO ********
  
  // Función para abrir el carrito
  function openCart() {
    // Obtener referencias a los elementos en caso de que no estuvieran definidos inicialmente
    const cartSidebarElement = cartSidebar || document.getElementById('cart-sidebar');
    const cartOverlayElement = cartOverlay || document.getElementById('cart-overlay');
    
    if (cartSidebarElement) {
      cartSidebarElement.classList.add('open');
      if (cartOverlayElement) {
        cartOverlayElement.classList.add('open');
      }
      document.body.style.overflow = 'hidden'; // Prevenir scroll
    } else {
      console.error('No se encontró el elemento del carrito (cart-sidebar)');
    }
  }
  
  // Función para cerrar el carrito
  function closeCart() {
    // Obtener referencias a los elementos en caso de que no estuvieran definidos inicialmente
    const cartSidebarElement = cartSidebar || document.getElementById('cart-sidebar');
    const cartOverlayElement = cartOverlay || document.getElementById('cart-overlay');
    
    if (cartSidebarElement) {
      cartSidebarElement.classList.remove('open');
      if (cartOverlayElement) {
        cartOverlayElement.classList.remove('open');
      }
      document.body.style.overflow = ''; // Restaurar scroll
    }
  }
  
  // Cargar carrito desde localStorage
  function cargarCarrito() {
    const carritoGuardado = localStorage.getItem('carritoProductos');
    if (carritoGuardado) {
      carrito = JSON.parse(carritoGuardado);
      actualizarIconoCarrito();
      renderizarCarrito();
    }
  }
  
  // Guardar carrito en localStorage
  function guardarCarrito() {
    localStorage.setItem('carritoProductos', JSON.stringify(carrito));
  }
  
  // Actualizar contador del icono de carrito
  function actualizarIconoCarrito() {
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
      const cantidadTotal = carrito.productos.reduce((total, producto) => total + producto.cantidad, 0);
      cartCountElement.textContent = cantidadTotal.toString();
      
      // Hacerlo visible si hay productos
      if (cantidadTotal > 0) {
        cartCountElement.style.display = 'flex';
      } else {
        cartCountElement.style.display = 'none';
      }
    }
  }
  
  // Calcular total del carrito
  function calcularTotal() {
    if (cartTotalPrice) {
      // Usar el precio (que ya tiene el descuento aplicado) para cada producto
      carrito.total = carrito.productos.reduce((total, producto) => {
        return total + (producto.precio * producto.cantidad);
      }, 0);
      
      cartTotalPrice.textContent = carrito.total.toFixed(2) + '€';
    }
  }
  
  // Renderizar productos en el carrito
  function renderizarCarrito() {
    if (!cartProducts || !emptyCart) return;
    
    if (carrito.productos.length === 0) {
      emptyCart.style.display = 'flex';
      cartProducts.style.display = 'none';
      return;
    }
    
    emptyCart.style.display = 'none';
    cartProducts.style.display = 'block';
    cartProducts.innerHTML = '';
    
    carrito.productos.forEach(producto => {
      const productoElement = document.createElement('div');
      productoElement.className = 'cart-product';
      productoElement.dataset.id = producto.id;
      
      // Preparar la visualización del precio según sea un producto con descuento o no
      let precioHTML = '';
      if (producto.esPromocion && producto.precioOriginal) {
        // Producto con descuento - mostrar precio original tachado y el nuevo precio
        precioHTML = `
          <div class="cart-product-price">
            <span class="cart-price-old">${producto.precioOriginal.toFixed(2)}€</span>
            <span class="cart-price-new">${producto.precio.toFixed(2)}€</span>
            ${producto.descuento ? `<span class="cart-discount-badge">${producto.descuento}</span>` : ''}
          </div>
        `;
      } else {
        // Producto normal - mostrar solo el precio
        precioHTML = `<div class="cart-product-price">${producto.precio.toFixed(2)}€</div>`;
      }
      
      productoElement.innerHTML = `
        <div class="cart-product-image">
          <img src="${producto.imagen}" alt="${producto.nombre}">
        </div>
        <div class="cart-product-details">
          <div class="cart-product-title">${producto.nombre}</div>
          ${precioHTML}
          <div class="cart-product-controls">
            <div class="quantity-control">
              <button class="quantity-btn decrease-btn" data-id="${producto.id}">-</button>
              <span class="quantity-number">${producto.cantidad}</span>
              <button class="quantity-btn increase-btn" data-id="${producto.id}">+</button>
            </div>
            <button class="cart-product-remove" data-id="${producto.id}">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      `;
      
      cartProducts.appendChild(productoElement);
    });
    
    // Añadir event listeners a los botones
    document.querySelectorAll('.decrease-btn').forEach(btn => {
      btn.addEventListener('click', decrementarCantidad);
    });
    
    document.querySelectorAll('.increase-btn').forEach(btn => {
      btn.addEventListener('click', incrementarCantidad);
    });
    
    document.querySelectorAll('.cart-product-remove').forEach(btn => {
      btn.addEventListener('click', eliminarProducto);
    });
    
    calcularTotal();
  }
  
  // Añadir producto al carrito desde página de producto detalle
  function añadirAlCarrito() {
    // Esta función se usa en producto-detalle.js
    // Obtener referencia al elemento global productoActual
    if (typeof productoActual !== 'undefined') {
      const id = productoActual.id;
      const nombre = productoActual.nombre;
      const precio = productoActual.precio;
      const imagen = productoActual.imagen;
      
      // Determinar si el producto está en promoción
      const esPromocion = productoActual.enPromocion || false;
      let precioOriginal = null;
      let descuento = null;
      
      if (esPromocion) {
        precioOriginal = productoActual.precioOriginal || null;
        descuento = productoActual.descuento || null;
      }
      
      // Verificar si el producto ya está en el carrito
      const productoExistente = carrito.productos.find(p => p.id === id);
      
      if (productoExistente) {
        // Si ya existe, incrementar cantidad
        productoExistente.cantidad += 1;
      } else {
        // Si no existe, añadir nuevo producto
        const nuevoProducto = {
          id: id,
          nombre: nombre,
          precio: precio,
          imagen: imagen,
          cantidad: 1
        };
        
        // Añadir información de descuento si corresponde
        if (esPromocion) {
          nuevoProducto.esPromocion = true;
          if (precioOriginal) nuevoProducto.precioOriginal = precioOriginal;
          if (descuento) nuevoProducto.descuento = descuento;
        }
        
        carrito.productos.push(nuevoProducto);
      }
      
      // Actualizar carrito
      actualizarIconoCarrito();
      guardarCarrito();
      
      // Mostrar carrito
      openCart();
      renderizarCarrito();
    }
  }
  
  // Añadir producto al carrito desde página de productos
  function añadirProductoDesdeBoton(event) {
    const btn = event.currentTarget;
    const id = btn.dataset.id;
    const nombre = btn.dataset.nombre;
    
    // Buscar si es un producto con descuento
    let precio;
    const productoCard = btn.closest('.producto-card, .promo-card');
    
    if (productoCard && (productoCard.classList.contains('promo-card') || productoCard.classList.contains('promocion'))) {
      // Si es un producto con descuento, buscar el precio con descuento
      const precioNuevoElement = productoCard.querySelector('.price-new, .precio-new, .precio-nuevo');
      if (precioNuevoElement) {
        // Extraer solo los números del texto del precio (eliminando el símbolo €)
        const precioTexto = precioNuevoElement.textContent.trim();
        precio = parseFloat(precioTexto.replace('€', '').replace(',', '.'));
      } else {
        // Si no encuentra el elemento con precio nuevo, usar el precio del dataset
        precio = parseFloat(btn.dataset.precio);
      }
    } else {
      // Si no es un producto con descuento, usar el precio del dataset
      precio = parseFloat(btn.dataset.precio);
    }
    
    const imagen = btn.dataset.imagen;
    
    // Datos adicionales para productos con descuento
    const esPromocion = productoCard ? (productoCard.classList.contains('promo-card') || productoCard.classList.contains('promocion')) : false;
    let precioOriginal = null;
    let descuento = null;
    
    if (esPromocion) {
      const precioAntiguoElement = productoCard.querySelector('.price-old, .precio-old, .precio-antiguo');
      const descuentoElement = productoCard.querySelector('.discount-badge, .descuento-badge');
      
      if (precioAntiguoElement) {
        const precioOriginalTexto = precioAntiguoElement.textContent.trim();
        precioOriginal = parseFloat(precioOriginalTexto.replace('€', '').replace(',', '.'));
      }
      
      if (descuentoElement) {
        descuento = descuentoElement.textContent.trim();
      }
    }
    
    console.log(`Añadiendo producto: ${nombre}, Precio: ${precio}€, Es promoción: ${esPromocion}`);
    if (esPromocion) {
      console.log(`Precio original: ${precioOriginal}€, Descuento: ${descuento}`);
    }
    
    // Verificar si el producto ya está en el carrito
    const productoExistente = carrito.productos.find(p => p.id === id);
    
    if (productoExistente) {
      // Si ya existe, incrementar cantidad
      productoExistente.cantidad += 1;
    } else {
      // Si no existe, añadir nuevo producto
      const nuevoProducto = {
        id: id,
        nombre: nombre,
        precio: precio,
        imagen: imagen,
        cantidad: 1
      };
      
      // Añadir información de descuento si corresponde
      if (esPromocion) {
        nuevoProducto.esPromocion = true;
        if (precioOriginal) nuevoProducto.precioOriginal = precioOriginal;
        if (descuento) nuevoProducto.descuento = descuento;
      }
      
      carrito.productos.push(nuevoProducto);
    }
    
    // Animación de añadir al carrito
    btn.classList.add('add-to-cart-animation');
    setTimeout(() => {
      btn.classList.remove('add-to-cart-animation');
    }, 500);
    
    // Actualizar carrito
    actualizarIconoCarrito();
    guardarCarrito();
    
    // Mostrar carrito
    openCart();
    renderizarCarrito();
  }
  
  // Decrementar cantidad de un producto
  function decrementarCantidad(event) {
    const id = event.currentTarget.dataset.id;
    const producto = carrito.productos.find(p => p.id === id);
    
    if (producto) {
      if (producto.cantidad > 1) {
        // Si hay más de 1, reducir la cantidad
        producto.cantidad -= 1;
      } else {
        // Si solo queda 1, eliminar el producto
        carrito.productos = carrito.productos.filter(p => p.id !== id);
        
        // Actualizar la visualización del botón en la tarjeta de producto si existe
        const productBottoms = document.querySelectorAll('.bottom');
        productBottoms.forEach(bottom => {
          const buyButton = bottom.querySelector('.buy');
          if (buyButton && buyButton.getAttribute('data-id') === id) {
            bottom.classList.remove('clicked');
          }
        });
      }
      
      // Actualizar contador y renderizar
      actualizarIconoCarrito();
      guardarCarrito();
      renderizarCarrito();
    }
  }
  
  // Incrementar cantidad de un producto
  function incrementarCantidad(event) {
    const id = event.currentTarget.dataset.id;
    const producto = carrito.productos.find(p => p.id === id);
    
    if (producto) {
      producto.cantidad += 1;
      
      // Actualizar contador y renderizar
      actualizarIconoCarrito();
      guardarCarrito();
      renderizarCarrito();
    }
  }
  
  // Eliminar producto del carrito
  function eliminarProducto(event) {
    const id = event.currentTarget.dataset.id;
    
    // Eliminar producto del array
    carrito.productos = carrito.productos.filter(p => p.id !== id);
    
    // Actualizar la visualización del botón en la tarjeta de producto si existe
    const productBottoms = document.querySelectorAll('.bottom');
    if (productBottoms.length > 0) {
      productBottoms.forEach(bottom => {
        const buyButton = bottom.querySelector('.buy');
        if (buyButton && buyButton.getAttribute('data-id') === id) {
          bottom.classList.remove('clicked');
        }
      });
    }
    
    // Actualizar contador y renderizar
    actualizarIconoCarrito();
    guardarCarrito();
    renderizarCarrito();
  }
  
  // Función para manejar el proceso de checkout
  function procesarCheckout() {
    // Obtener el carrito actual
    const carritoGuardado = localStorage.getItem('carritoProductos');
    
    if (!carritoGuardado || JSON.parse(carritoGuardado).productos.length === 0) {
      // Si el carrito está vacío, mostrar mensaje
      alert('Tu carrito está vacío. Añade productos antes de finalizar la compra.');
      return;
    }
    
    // Guardar el estado actual del carrito en sessionStorage para recuperarlo en la página de checkout
    sessionStorage.setItem('checkoutCarrito', carritoGuardado);
    
    // Redirigir a la página de checkout
    window.location.href = 'checkout.html';
  }
  
  // Función para ir a página de detalle de producto desde grid de productos
  function irADetalleProducto(event) {
    const card = event.currentTarget.closest('.producto-card');
    const id = card.dataset.id;
    window.location.href = `producto-detalle.html?id=${id}`;
  }
  
  // ******** EVENT LISTENERS ********
  
  // Event listeners para abrir/cerrar carrito
  // Buscar tanto por ID como por clase para asegurar que capturamos el icono del carrito
  if (cartIconTrigger) {
    cartIconTrigger.addEventListener('click', function(e) {
      e.preventDefault();
      openCart();
    });
  } else {
    // Alternativa: buscar por clase cart-icon-link
    const cartIconLinks = document.querySelectorAll('.cart-icon-link');
    if (cartIconLinks && cartIconLinks.length > 0) {
      cartIconLinks.forEach(link => {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          openCart();
        });
      });
    }
  }
  
  if (closeCartBtn) {
    closeCartBtn.addEventListener('click', closeCart);
  }
  
  if (continueShoppingBtn) {
    continueShoppingBtn.addEventListener('click', closeCart);
  }
  
  if (cartOverlay) {
    cartOverlay.addEventListener('click', closeCart);
  }
  
  // Event listener para botón de checkout
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', procesarCheckout);
  }
  
  // Event listeners para botones en páginas de productos
  
  // Botones añadir al carrito en grid de productos
  document.querySelectorAll('.btn-carrito').forEach(button => {
    button.addEventListener('click', añadirProductoDesdeBoton);
  });
  
  // Botones ver detalles en grid de productos
  document.querySelectorAll('.btn-comprar').forEach(button => {
    button.addEventListener('click', irADetalleProducto);
  });
  
  // Botón añadir al carrito en la página de detalle
  const addToCartBtn = document.getElementById('add-to-cart-btn');
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', añadirAlCarrito);
  }
  
  // ******** INICIALIZACIÓN ********
  // Cargar carrito al iniciar
  cargarCarrito();
  
  // Inicialización adicional con un pequeño retraso para asegurar que el DOM está completamente cargado
  setTimeout(function() {
    // Reintentar agregar event listeners a los elementos del carrito
    const delayedCartIconTrigger = document.getElementById('cart-icon-trigger');
    const delayedCartIconLinks = document.querySelectorAll('.cart-icon-link');
    
    if (delayedCartIconTrigger) {
      delayedCartIconTrigger.addEventListener('click', function(e) {
        e.preventDefault();
        openCart();
      });
    }
    
    if (delayedCartIconLinks && delayedCartIconLinks.length > 0) {
      delayedCartIconLinks.forEach(link => {
        if (!link.hasAttribute('data-cart-listener')) {
          link.setAttribute('data-cart-listener', 'true');
          link.addEventListener('click', function(e) {
            e.preventDefault();
            openCart();
          });
        }
      });
    }
    
    // Reintentar agregar event listeners a los botones de cerrar carrito
    const delayedCloseCartBtn = document.getElementById('close-cart');
    if (delayedCloseCartBtn) {
      delayedCloseCartBtn.addEventListener('click', closeCart);
    }
    
    const delayedContinueShoppingBtn = document.getElementById('continue-shopping');
    if (delayedContinueShoppingBtn) {
      delayedContinueShoppingBtn.addEventListener('click', closeCart);
    }
    
    const delayedCartOverlay = document.getElementById('cart-overlay');
    if (delayedCartOverlay) {
      delayedCartOverlay.addEventListener('click', closeCart);
    }
    
  }, 500); // Pequeño retraso de 500ms
});