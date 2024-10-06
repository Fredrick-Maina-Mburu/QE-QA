const cart = {};

async function fetchData() {
  const response = await fetch("/data");
  console.log(response);
  const data = await response.json();
  console.log(data);
  renderData(data);
}

function renderData(data) {
  const dataList = document.getElementById("data-list");
  dataList.innerHTML = "";

  data.forEach((infoData) => {
    const infoCard = document.createElement("div");
    infoCard.classList.add("data-card");

    infoCard.innerHTML = `
      <img src="${infoData.imageUrl}" alt="${infoData.title}">
      <h3>${infoData.title}</h3>
      <p>Price: $${infoData.price}</p>
      <p>Date: ${infoData.date}</p>
      <p>${infoData.location}</p>
      <div>
       <button class="cart-btn" data-id="${infoData.id}">Buy now</button>
       <button class="view-btn" data-id="${infoData.id}">View</button>
       <button class="edit-btn" data-id="${infoData.id}">Edit</button>
       <button class="delete-btn" data-id="${infoData.id}">Delete</button>
      </div>
    `;

    dataList.append(infoCard);
  });

  document.querySelectorAll(".cart-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = event.target.getAttribute("data-id");
      handleAddToCart(productId);
    });
  });

  document.querySelectorAll(".view-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = event.target.getAttribute("data-id");
      handleView(productId, data);
    });
  });

  document.querySelectorAll(".edit-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = event.target.getAttribute("data-id");
      openEditModal(productId, data);
    });
  });

  document.querySelectorAll(".delete-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = event.target.getAttribute("data-id");
      handleDelete(productId);
    });
  });
}

async function handleView(id) {
  try {
    const response = await fetch(`/view/${id}`, { method: "GET" });
    const result = await response.json();

    if (response.ok) {
      const viewModal = document.getElementById("view-modal");

      document.getElementById("modal-title").textContent = result[0].title;
      document.getElementById(
        "modal-price"
      ).textContent = `Price: $${result[0].price}`;
      document.getElementById(
        "modal-date"
      ).textContent = `Date: ${result[0].date}`;
      document.getElementById(
        "modal-location"
      ).textContent = `Location: ${result[0].location}`;
      document.getElementById("modal-image").src = result[0].imageUrl;

      viewModal.style.display = "block";
      document.body.style.overflow = "hidden";
    }
  } catch (error) {
    console.log("failed to fetch item", error);
  }

  document.getElementById("close-view-modal").addEventListener("click", () => {
    document.getElementById("view-modal").style.display = "none";
    document.body.style.overflow = "auto";
  });

  window.addEventListener("click", (event) => {
    const viewModal = document.getElementById("view-modal");
    if (event.target === viewModal) {
      viewModal.style.display = "none";
      document.body.style.overflow = "auto"; // Re-enable scrolling
    }
  });
}

function openEditModal(id, data) {
  const item = data.find((item) => item.id === Number(id));
  document.getElementById("item-id").value = item.id;
  document.getElementById("title").value = item.title;
  document.getElementById("price").value = item.price;
  document.getElementById("date").value = item.date;
  document.getElementById("location").value = item.location;
  document.getElementById("company").value = item.company;
  document.getElementById("imageUrl").value = item.imageUrl;

  document.getElementById("modal-title").textContent = "Edit Item";
  document.getElementById("form-modal").style.display = "block";
}

async function handleDelete(id) {
  try {
    const response = await fetch(`/delete/${id}`, { method: "DELETE" });
    const result = await response.json();

    if (response.ok) {
      console.log(result.message);

      const dataList = document.getElementById("data-list");
      const itemToDelete = document.querySelector(
        `.delete-btn[data-id="${id}"]`
      ).parentElement.parentElement;
      dataList.removeChild(itemToDelete);
    } else {
      alert("Failed to delete item. Please try again.");
    }
  } catch (error) {
    console.error("Error deleting item:", error);
    alert("An error occurred while trying to delete the item.");
  }
}

async function handleAddToCart(id) {
  const response = await fetch("/data");
  const data = await response.json();
  const product = data.find((item) => item.id === Number(id));

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

async function handleFormSubmit(event) {
  event.preventDefault();

  const id = document.getElementById("item-id").value;
  const title = document.getElementById("title").value;
  const price = document.getElementById("price").value;
  const date = document.getElementById("date").value;
  const location = document.getElementById("location").value;
  const company = document.getElementById("company").value;
  const imageUrl = document.getElementById("imageUrl").value;

  const method = id ? "PUT" : "POST";
  const url = id ? `/edit/${id}` : "/add";

  const response = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, price, date, location, company, imageUrl }),
  });

  const result = await response.json();
  console.log(result.message);
  closeModal();
  fetchData();
}

function renderCart() {
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";

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

  // Event listeners for cart buttons
  document.querySelectorAll(".increase-quantity").forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = event.target.getAttribute("data-id");
      increaseQuantity(productId);
    });
  });

  document.querySelectorAll(".decrease-quantity").forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = event.target.getAttribute("data-id");
      decreaseQuantity(productId);
    });
  });

  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = event.target.getAttribute("data-id");
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

function closeModal() {
  document.getElementById("form-modal").style.display = "none";
  clearForm();
}

function clearForm() {
  document.getElementById("item-form").reset();
}

document
  .getElementById("item-form")
  .addEventListener("submit", handleFormSubmit);
document.getElementById("add-item-btn").addEventListener("click", () => {
  document.getElementById("form-modal").style.display = "block";
  document.getElementById("modal-title").textContent = "Add Item";
});

fetchData();
