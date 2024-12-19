
  // Función para cargar el carrito desde localStorage
  function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const modalCarrito = document.getElementById('modal_carrito');

    // Limpiar contenido previo
    const existingCards = document.querySelectorAll('.minicard_carrito');
    existingCards.forEach((card) => card.remove());

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

      modalCarrito.insertBefore(card, modalCarrito.querySelector('.subtotal_carrito'));
    });

    updateTotal(cart);
  }

  // Función para calcular el total
  function updateTotal(cart) {
    const total = cart.reduce((sum, product) => sum + parseFloat(product.price.replace('$', '')), 0);
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

  // Agregar evento para eliminar producto
  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn_eliminar')) {
      const index = event.target.dataset.index;
      deleteFromCart(index);
    }
  });

  // Cargar carrito al iniciar
  loadCart();