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

  // ******** CARRITO ********
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
  const addToCartBtn = document.getElementById('add-to-cart-btn');
  
  // Estructura de datos del carrito
  let carrito = {
    productos: [],
    total: 0
  };
  
  // Función para abrir el carrito
  function openCart() {
    cartSidebar.classList.add('open');
    cartOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  
  // Función para cerrar el carrito
  function closeCart() {
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('open');
    document.body.style.overflow = '';
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
  function añadirAlCarrito() {
    const id = productoActual.id;
    const nombre = productoActual.nombre;
    const precio = productoActual.precio;
    const imagen = productoActual.imagen;
    
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
  
  if (continueShoppingBtn) {
    continueShoppingBtn.addEventListener('click', closeCart);
  }
  
  if (cartOverlay) {
    cartOverlay.addEventListener('click', closeCart);
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function() {
      alert('¡Finalizar compra! Aquí implementarías el proceso de checkout.');
    });
  }
  
  // Botón añadir al carrito en la página de detalle
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', añadirAlCarrito);
  }

  // ******** FUNCIONALIDAD DE DETALLE DE PRODUCTO ********
  // Obtener parámetros de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  // Elementos de la página
  const productoImagen = document.getElementById('producto-imagen');
  const productoNombre = document.getElementById('producto-nombre');
  const productoPrecio = document.getElementById('producto-precio');
  const productoVolumen = document.getElementById('producto-volumen');
  const productoDescripcion = document.getElementById('producto-descripcion-texto');
  const productoIngredientes = document.getElementById('producto-ingredientes-texto');
  const productoUso = document.getElementById('producto-uso-texto');

  // Variable para almacenar el producto actual
  let productoActual = null;
  
  // Base de datos de productos (utilizando los textos exactos de los PDFs)
  const productos = [
    {
      id: "7",
      nombre: "Mascarilla POR ELLAS",
      precio: 22.90,
      volumen: "250ml",
      imagen: "./Assets/Imagenes/mascarilla-lila.jpg",
      descripcion: "Mascarilla capilar, diseñada para nutrir y proteger las puntas del cabello. Formulada con ingredientes naturales, proporciona hidratación profunda, dejando el pelo suave y radiante durante todo el día. Ideal para todo tipo de cabellos. Ideal para pelo seco o dañado.",
      ingredientes: "Aceite de coco virgen ecológico, manteca de karité orgánica, aloe vera puro aceite de argán bio, extracto de romero, miel ecológica, vitamina E natural.",
      uso: "Aplicar sobre el cabello húmedo, de medios a puntas. Dejar actuar entre 5 y 10 minutos y aclarar con abundante agua. Para una reparación intensiva, dejar actuar 20 minutos con el cabello envuelto en una toalla."
    },
    {
      id: "5",
      nombre: "Sérum POR ELLAS",
      precio: 25.99,
      volumen: "30ml",
      imagen: "./Assets/Imagenes/Botellin 1.png",
      descripcion: "Este sérum capilar orgánico está formulado con ingredientes naturales que revitalizan tu melena desde la raíz hasta las puntas. Aporta hidratación profunda, fortalece la fibra capilar y combate el encrespamiento sin dejar residuos grasos. Ideal para todo tipo de cabello, incluso el más sensible. Notarás un cabello más suave, brillante y saludable desde la primera aplicación.",
      ingredientes: "Aceite de argán orgánico: rico en vitamina E, aceite de jojoba, extracto de aloe vera, vitamina E natural (tocoferol), aceite esencial de romero y aceite de coco fraccionado.",
      uso: "Aplica 2–3 gotas sobre la palma de la mano y frótalas ligeramente, distribuye el sérum de medios a puntas, sobre el cabello limpio y húmedo o seco, no enjuagar, peina como de costumbre, úsalo diariamente o según necesidad, especialmente después del lavado o antes del peinado con calor."
    },
    {
      id: "6",
      nombre: "Champú POR ELLAS",
      precio: 22.99,
      volumen: "250ml",
      imagen: "./Assets/Imagenes/champu-lila.png",
      descripcion: "Formulado con ingredientes de origen vegetal, este champú limpia suavemente el cuero cabelludo sin sulfatos ni parabenos. Su combinación de extractos botánicos fortalece el cabello desde la raíz, aporta brillo natural y mantiene el equilibrio del pH. Ideal para uso diario y apto para todo tipo de cabello, incluso los más sensibles",
      ingredientes: "Aloe vera orgánico, aceite de coco virgen, extracto de romero, manzanilla, proteína de trigo y aceite esencial de lavanda.",
      uso: "Aplicar sobre el cabello mojado, masajear suavemente el cuero cabelludo con la yema de los dedos hasta formar una espuma ligera. Aclarar con abundante agua. Repetir si es necesario. Para mejores resultados, combinar con un acondicionador orgánico de la misma línea."
    },
    {
      id: "4",
      nombre: "Mascarilla BellaVita",
      precio: 20.90,
      volumen: "250ml",
      imagen: "./Assets/Imagenes/mascarilla-verde.jpg",
      descripcion: "Mascarilla capilar, diseñada para nutrir y proteger las puntas del cabello. Formulada con ingredientes naturales, proporciona hidratación profunda, dejando el pelo suave y radiante durante todo el día. Ideal para todo tipo de cabellos. Ideal para pelo seco o dañado.",
      ingredientes: "Aceite de coco virgen ecológico, manteca de karité orgánica, aloe vera puro aceite de argán bio, extracto de romero, miel ecológica, vitamina E natural.",
      uso: "Aplicar sobre el cabello húmedo, de medios a puntas. Dejar actuar entre 5 y 10 minutos y aclarar con abundante agua. Para una reparación intensiva, dejar actuar 20 minutos con el cabello envuelto en una toalla."
    },
    {
      id: "1",
      nombre: "Sérum orgánico BellaVita",
      precio: 22.99,
      volumen: "30ml",
      imagen: "./Assets/Imagenes/serum_verde.png",
      descripcion: "Este sérum capilar orgánico está formulado con ingredientes naturales que revitalizan tu melena desde la raíz hasta las puntas. Aporta hidratación profunda, fortalece la fibra capilar y combate el encrespamiento sin dejar residuos grasos. Ideal para todo tipo de cabello, incluso el más sensible. Notarás un cabello más suave, brillante y saludable desde la primera aplicación.",
      ingredientes: "Aceite de argán orgánico: rico en vitamina E, aceite de jojoba, extracto de aloe vera, vitamina E natural (tocoferol), aceite esencial de romero y aceite de coco fraccionado.",
      uso: "Aplica 2–3 gotas sobre la palma de la mano y frótalas ligeramente, distribuye el sérum de medios a puntas, sobre el cabello limpio y húmedo o seco, no enjuagar, peina como de costumbre, úsalo diariamente o según necesidad, especialmente después del lavado o antes del peinado con calor."
    },
    {
      id: "3",
    nombre: "Champú orgánico BellaVita",
    precio: 17.09,
    precioOriginal: 18.99,
    enPromocion: true,
    descuento: "-10%",
    volumen: "250ml",
    imagen: "./Assets/Imagenes/Champú.png",
      descripcion: "Formulado con ingredientes de origen vegetal, este champú limpia suavemente el cuero cabelludo sin sulfatos ni parabenos. Su combinación de extractos botánicos fortalece el cabello desde la raíz, aporta brillo natural y mantiene el equilibrio del pH. Ideal para uso diario y apto para todo tipo de cabello, incluso los más sensibles",
      ingredientes: "Aloe vera orgánico, aceite de coco virgen, extracto de romero, manzanilla, proteína de trigo y aceite esencial de lavanda.",
      uso: "Aplicar sobre el cabello mojado, masajear suavemente el cuero cabelludo con la yema de los dedos hasta formar una espuma ligera. Aclarar con abundante agua. Repetir si es necesario. Para mejores resultados, combinar con un acondicionador orgánico de la misma línea."
    },
    {
      id: "2",
    nombre: "Acondicionador orgánico BellaVita",
    precio: 16.99,
    precioOriginal: 19.99,
    enPromocion: true,
    descuento: "-15%",
    volumen: "250ml",
      imagen: "./Assets/Imagenes/Crema 1.png",
      descripcion: "Hidrata, suaviza y repara tu cabello con ingredientes 100% naturales. Su fórmula orgánica, libre de sulfatos y siliconas, desenreda fácilmente y deja el cabello sedoso, brillante y protegido. Ideal para todo tipo de cabello, incluso el más sensible.",
      ingredientes: "Aceite de coco orgánico, manteca de karité, aloe vera, extracto de avena, aceites esenciales (lavanda y romero), conservantes naturales como sorbato de potasio y benzoato de sodio.",
      uso: "Después del lavado, aplica una cantidad moderada de medios a puntas sobre el cabello húmedo. Deja actuar de 2 a 5 minutos y aclara con abundante agua. Para un extra de nutrición, déjalo actuar más tiempo como mascarilla."
    },
    {
      id: "8",
      nombre: "Crema selladora orgánica BellaVita",
      precio: 24.00,
      volumen: "50ml",
      imagen: "./Assets/Imagenes/producto-mano.jpeg",
      descripcion: "Repara, protege y sella las puntas abiertas con nuestra crema orgánica elaborada con aceites vegetales y extractos naturales. Su fórmula ligera nutre en profundidad sin apelmazar, aportando suavidad, brillo y un acabado sedoso. Ideal para cabellos secos, dañados o con tendencia al encrespamiento. Sin siliconas, sin sulfatos, 100% vegana.",
      ingredientes: "Aceite de argán orgánico, aceite de jojoba: hidrata y regula el sebo, manteca de karité, extracto de aloe vera y agua de flor de manzanilla.",
      uso: "Aplicar una pequeña cantidad sobre las puntas secas o húmedas, después del lavado y antes de peinar. Repartir uniformemente con las yemas de los dedos para sellar y proteger las puntas abiertas. Se puede usar diariamente o según necesidad."
    }
  ];

  // Buscar el producto por su ID
  function encontrarProducto() {
    return productos.find(p => p.id === productId) || productos[0]; // Por defecto mostrar el primer producto si no se encuentra
  }

  // Cargar los detalles del producto en la página
  function cargarDetallesProducto() {
    productoActual = encontrarProducto();
    
    // Actualizar elementos de la página
    document.title = `${productoActual.nombre} | BellaVita`;
    productoImagen.src = productoActual.imagen;
    productoImagen.alt = productoActual.nombre;
    productoNombre.textContent = productoActual.nombre;
    productoPrecio.textContent = `${productoActual.precio.toFixed(2)}€`;
    productoVolumen.textContent = productoActual.volumen;
    productoDescripcion.textContent = productoActual.descripcion;
    productoIngredientes.textContent = productoActual.ingredientes;
    productoUso.textContent = productoActual.uso;

    aplicarEstilosTipoProducto();
  }

  function aplicarEstilosTipoProducto() {
  const body = document.getElementById('producto-detalle-body');
  
  // Limpiar clases previas
  body.classList.remove('por-ellas-producto', 'promo-producto');
  
  // Verificar si es un producto POR ELLAS
  if (productoActual.nombre.includes('POR ELLAS')) {
    body.classList.add('por-ellas-producto');
  }
  
  // Verificar si es un producto en promoción
  if (productoActual.enPromocion) {
    body.classList.add('promo-producto');
    
    // Añadir elementos de promoción si es necesario
    const precioElement = document.getElementById('producto-precio');
    precioElement.innerHTML = `
      <span class="precio-antiguo">${productoActual.precioOriginal}€</span>
      <span>${productoActual.precio.toFixed(2)}€</span>
      <span class="badge-descuento">${productoActual.descuento}</span>
    `;
  }
}

  // Funcionalidad para compartir
  const compartirBtn = document.querySelector('.compartir-btn');
  if (compartirBtn) {
    compartirBtn.addEventListener('click', function() {
      if (navigator.share) {
        // Web Share API está disponible
        navigator.share({
          title: document.title,
          url: window.location.href
        })
        .catch(error => console.error('Error al compartir:', error));
      } else {
        // Fallback si Web Share API no está disponible
        alert('Enlace copiado: ' + window.location.href);
        // Copiar al portapapeles
        const dummy = document.createElement('input');
        document.body.appendChild(dummy);
        dummy.value = window.location.href;
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);
      }
    });
  }

  // Inicializaciones
  cargarCarrito();
  cargarDetallesProducto();
});