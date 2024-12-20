
  //parámetros de la URL
  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  //detalles del producto
  async function fetchProductDetails(productId) {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
      const product = await response.json();

      displayProductDetails(product);
    } catch (error) {
      console.error('Error al obtener los detalles del producto:', error);
    }
  }

  //mostrar detalles del producto
  function displayProductDetails(product) {
    const productImage = document.querySelector('.producto_central img');
    const productTitle = document.querySelector('.producto_datos h2');
    const productPrice = document.querySelector('.producto_datos h1');
    const productDescription = document.querySelector('.producto_datos p');

    productImage.src = product.image;
    productImage.alt = product.title;
    productTitle.textContent = product.title;
    productPrice.textContent = `$${product.price.toFixed(2)}`;
    productDescription.textContent = product.description;
  }

  //obtener ID del producto y cargar detalles
  const productId = getQueryParam('id');
  if (productId) {
    fetchProductDetails(productId);
  } else {
    console.error('No se encontró el ID del producto en la URL.');
  }

  //añadir producto al carrito
  function addToCart(product) {
    //obtener carrito del localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    //agregar el producto al carrito
    cart.push(product);

    //guardar carrito actualizado
    localStorage.setItem('cart', JSON.stringify(cart));

    //redirigir al carrito
    window.location.href = "overlay-carrito.html";
  }

  //evento en los botones "Comprar" y "Añadir al carrito"
  document.querySelector('.btn_primario').addEventListener('click', () => {
    const product = {
      id: getQueryParam('id'),
      image: document.querySelector('.producto_central img').src,
      title: document.querySelector('.producto_datos h2').textContent,
      price: document.querySelector('.producto_datos h1').textContent,
    };

    addToCart(product);
  });

  document.querySelector('.btn_secundario').addEventListener('click', () => {
    const product = {
      id: getQueryParam('id'),
      image: document.querySelector('.producto_central img').src,
      title: document.querySelector('.producto_datos h2').textContent,
      price: document.querySelector('.producto_datos h1').textContent,
    };

    addToCart(product);
  });