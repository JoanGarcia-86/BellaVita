//Script para cargar el carrito en todas las páginas

document.addEventListener('DOMContentLoaded', function() {
  // Elementos del carrito
  const cartIconTrigger = document.getElementById('cart-icon-trigger');
  const cartSidebar = document.getElementById('cart-sidebar');
  const cartOverlay = document.getElementById('cart-overlay');
  const closeCartBtn = document.getElementById('close-cart');
  const continueShopping = document.getElementById('continue-shopping');
  const cartProducts = document.getElementById('cart-products');
  const emptyCart = document.getElementById('empty-cart');
  const cartTotalPrice = document.getElementById('cart-total-price');
  const cartCount = document.querySelector('.cart-count');
  const checkoutBtn = document.getElementById('checkout-btn');
  
  // Estructura de datos del carrito
  let carrito = {
    productos: [],
    total: 0
  };
  
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
  // Seleccionar el elemento del contador cada vez
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
      carrito.total = carrito.productos.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
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
      
      productoElement.innerHTML = `
        <div class="cart-product-image">
          <img src="${producto.imagen}" alt="${producto.nombre}">
        </div>
        <div class="cart-product-details">
          <div class="cart-product-title">${producto.nombre}</div>
          <div class="cart-product-price">${producto.precio}€</div>
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
  
  // Decrementar cantidad de un producto
  function decrementarCantidad(event) {
    const id = event.currentTarget.dataset.id;
    const producto = carrito.productos.find(p => p.id === id);
    
    if (producto && producto.cantidad > 1) {
      producto.cantidad -= 1;
    } else {
      // Si la cantidad es 1, eliminar el producto
      carrito.productos = carrito.productos.filter(p => p.id !== id);
    }
    
    actualizarIconoCarrito();
    guardarCarrito();
    renderizarCarrito();
  }
  
  // Incrementar cantidad de un producto
  function incrementarCantidad(event) {
    const id = event.currentTarget.dataset.id;
    const producto = carrito.productos.find(p => p.id === id);
    
    if (producto) {
      producto.cantidad += 1;
    }
    
    actualizarIconoCarrito();
    guardarCarrito();
    renderizarCarrito();
  }
  
  // Eliminar producto del carrito
  function eliminarProducto(event) {
    const id = event.currentTarget.dataset.id;
    carrito.productos = carrito.productos.filter(p => p.id !== id);
    
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
  
  // Iniciar carga del carrito
  cargarCarrito();
  
  // Event listeners para el carrito
  if (cartIconTrigger) {
    cartIconTrigger.addEventListener('click', function(e) {
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
  
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', procesarCheckout);
  }
});