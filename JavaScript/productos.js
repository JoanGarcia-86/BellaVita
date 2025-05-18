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

  // ******** FUNCIONALIDAD DEL CARRITO ********
  // Elementos del carrito
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
  
  // Estructura de datos del carrito
  let carrito = {
    productos: [],
    total: 0
  };
  
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
    const cantidadTotal = carrito.productos.reduce((total, producto) => total + producto.cantidad, 0);
    cartCount.textContent = cantidadTotal;
  }
  
  // Calcular total del carrito
  function calcularTotal() {
    carrito.total = carrito.productos.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
    cartTotalPrice.textContent = carrito.total.toFixed(2) + '€';
  }
  
  // Renderizar productos en el carrito
  function renderizarCarrito() {
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
  
  // Añadir producto al carrito
  function añadirAlCarrito(event) {
    const btn = event.currentTarget;
    const id = btn.dataset.id;
    const nombre = btn.dataset.nombre;
    const precio = parseFloat(btn.dataset.precio);
    const imagen = btn.dataset.imagen;
    
    // Verificar si el producto ya está en el carrito
    const productoExistente = carrito.productos.find(p => p.id === id);
    
    if (productoExistente) {
      // Si ya existe, incrementar cantidad
      productoExistente.cantidad += 1;
    } else {
      // Si no existe, añadir nuevo producto
      carrito.productos.push({
        id: id,
        nombre: nombre,
        precio: precio,
        imagen: imagen,
        cantidad: 1
      });
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
  
  // Ir a página de detalle de producto
  function irADetalleProducto(event) {
    const card = event.currentTarget.closest('.producto-card');
    const id = card.dataset.id;
    window.location.href = `producto-detalle.html?id=${id}`;
  }

  // Event listeners
  if (cartIconTrigger) {
    cartIconTrigger.addEventListener('click', function(e) {
      e.preventDefault();
      openCart();
    });
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
  
  // Botones añadir al carrito
  document.querySelectorAll('.btn-carrito').forEach(button => {
    button.addEventListener('click', añadirAlCarrito);
  });
  
  // Botones ver detalles
  document.querySelectorAll('.btn-comprar').forEach(button => {
    button.addEventListener('click', irADetalleProducto);
  });
  
  // Inicializar carrito
  cargarCarrito();
});


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

// Asignar la función al botón de checkout
const checkoutBtn = document.getElementById('checkout-btn');
if (checkoutBtn) {
  // Reemplazar el event listener existente con el nuevo
  checkoutBtn.removeEventListener('click', function() {
    alert('¡Finalizar compra! Aquí implementarías el proceso de checkout.');
  });
  
  // Añadir el nuevo event listener
  checkoutBtn.addEventListener('click', procesarCheckout);
}