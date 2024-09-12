document.addEventListener("DOMContentLoaded", () => {
  const productsContainer = document.getElementById("products-container");

  
  fetch("http://localhost:3000/products")
    .then((response) => response.json())
    .then((products) => {

      products.forEach((product) => {
        const productElement = document.createElement("div");
        productElement.classList.add("product");

        productElement.innerHTML = `
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <p>Price: $${product.price}</p>
          <p>Category: ${product.category}</p>
          <p>Stock: ${product.stock}</p>
        `;

        productsContainer.appendChild(productElement);
      });
    })
    .catch((error) => console.error("Error fetching products:", error));
});
