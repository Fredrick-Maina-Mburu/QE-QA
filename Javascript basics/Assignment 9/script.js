const api = "http://localhost:3000/data";

let data = []; 
const cart = {}; 


async function addProducts() {
  try {
    const response = await fetch(api);
    data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
}


function renderData(data) {
  const dataList = document.getElementById("data-list");
  dataList.innerHTML = ''; 

  data.forEach((infoData) => {
    const infoCard = document.createElement("div");
    infoCard.classList.add("data-card");

    infoCard.innerHTML = `
      <img src="${infoData.imageUrl}" alt="${infoData.title}">
      <h3>${infoData.title}</h3>
      <p>Price: $${infoData.price}</p>
      <p>Date: ${infoData.date}</p>
      <p>${infoData.location}</p>
      <button class="cart-btn" data-id="${infoData.id}">Buy now</button>
    `;

    dataList.append(infoCard);
  });


  document.querySelectorAll('.cart-btn').forEach(button => {
    button.addEventListener('click', (event) => {
      const productId = event.target.getAttribute('data-id');
      handleAddToCart(productId);
    });
  });
}


function handleAddToCart(id) {
  const product = data.find(item => item.id === id);

  if (!product) {
    console.log("Product not found!");
    return;
  }

 
  if (cart[id]) {
    cart[id].quantity++; 
  } else {
    cart[id] = { ...product, quantity: 1 }; 
  }

  renderCart();
}


function renderCart() {
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = '';

  for (const itemId in cart) {
    const cartItem = cart[itemId];

    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");

    itemDiv.innerHTML = `
      <span>${cartItem.title} (x${cartItem.quantity})</span>
      <span>$${cartItem.price * cartItem.quantity}</span>
      <div style="display: flex; align-items: center; justify-content:center;">
        <button class="decrease-quantity" data-id="${itemId}">-</button>
        <button class="increase-quantity" data-id="${itemId}">+</button>
        <button class="remove-item" data-id="${itemId}">X</button>
      </div>
    `;

    cartItems.appendChild(itemDiv);

  }
  document.querySelectorAll(".increase-quantity").forEach(button => {
    button.addEventListener('click', (event) => {
      const productId = event.target.getAttribute('data-id');
      increaseQuantity(productId);
    });
  });

  document.querySelectorAll(".decrease-quantity").forEach(button => {
    button.addEventListener('click', (event) => {
      const productId = event.target.getAttribute('data-id');
      decreaseQuantity(productId);
    });
  });

  document.querySelectorAll(".remove-item").forEach(button => {
    button.addEventListener('click', (event) => {
      const productId = event.target.getAttribute('data-id');
      removeItemFromCart(productId);
    });
  });
  updateTotal();
}

function updateTotal() {
  const totalAmount = document.getElementById("total");
  let total = 0;

  for (const itemId in cart) {
    total += cart[itemId].price * cart[itemId].quantity;
  }

  totalAmount.textContent = total.toFixed(2);
}

function increaseQuantity(id) {
  if (cart[id]) {
    cart[id].quantity++;
    renderCart();
  }
}

function decreaseQuantity(id) {
  if (cart[id] && cart[id].quantity > 1) {
    cart[id].quantity--;
    renderCart();
  } else if (cart[id] && cart[id].quantity === 1) {
    removeItemFromCart(id);
  }
}

function removeItemFromCart(id) {
  delete cart[id];
  renderCart();
}



async function init() {
  data = await addProducts();
  renderData(data);
}

init();
