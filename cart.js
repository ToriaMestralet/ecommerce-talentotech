<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"/> <!-- SweetAlert -->
  // Función para cargar el carrito desde localStorage
  function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const carritoProductos = document.getElementById('carrito_productos');

    // Limpiar contenido previo
    carritoProductos.innerHTML = '';

    // Mostrar productos del carrito
    cart.forEach((product, index) => {
      const card = document.createElement('div');
      card.classList.add('minicard_carrito');

      card.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <div class="datos_minicard">
          <h4>${product.title}</h4>
        </div>
        <h3>${product.price}</h3>
        <button class="btn_eliminar" data-index="${index}">Eliminar</button>
      `;

      carritoProductos.appendChild(card);
    });

    updateSubtotal(cart);
    updateTotal(cart);
  }

  // Función para calcular el subtotal
  function updateSubtotal(cart) {
    const subtotal = cart.reduce((sum, product) => sum + parseFloat(product.price.replace('$', '')), 0);
    const subtotalElement = document.querySelector('.subtotal_carrito h2');
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
  }

  // Función para calcular el total
  function updateTotal(cart) {
    const subtotal = cart.reduce((sum, product) => sum + parseFloat(product.price.replace('$', '')), 0);
    const envio = 50; // Precio fijo del envío
    const total = subtotal + envio;
    const totalElement = document.querySelector('.total_carrito h1');
    totalElement.textContent = `$${total.toFixed(2)}`;
  }

  // Función para eliminar un producto del carrito
  function deleteFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);

    // Actualizar carrito en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Recargar el carrito
    loadCart();
  }

  // SweetAlert al finalizar compra
  function finalizarCompra() {
    Swal.fire({
      title: '¡Compra realizada!',
      text: 'Gracias por tu compra. Tu pedido está en proceso.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    }).then(() => {
      // Vaciar carrito después de la compra
      localStorage.removeItem('cart');
      loadCart();
    });
  }

  // Agregar evento al botón de finalizar compra
  document.querySelector('.btn_primario').addEventListener('click', finalizarCompra);

  // Agregar evento para eliminar producto
  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn_eliminar')) {
      const index = event.target.dataset.index;
      deleteFromCart(index);
    }
  });

  // Cargar carrito al iniciar
  loadCart();
