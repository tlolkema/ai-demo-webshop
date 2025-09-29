const PRODUCTS = {
  apple: { name: "Apple", emoji: "🍏" },
  banana: { name: "Banana", emoji: "🍌" },
  lemon: { name: "Lemon", emoji: "🍋" },
};

function getBasket() {
  const basket = localStorage.getItem("basket");
  return basket ? JSON.parse(basket) : {};
}

function addToBasket(product) {
  const basket = getBasket();
  if (basket[product]) {
    basket[product]++;
  } else {
    basket[product] = 1;
  }
  localStorage.setItem("basket", JSON.stringify(basket));
}

function clearBasket() {
  localStorage.removeItem("basket");
}

function removeFromBasket(product) {
  const basket = getBasket();
  if (basket[product]) {
    if (basket[product] > 1) {
      basket[product]--;
    } else {
      delete basket[product];
    }
    localStorage.setItem("basket", JSON.stringify(basket));
  }
}

function renderBasket() {
  const basket = getBasket();
  const basketList = document.getElementById("basketList");
  const cartButtonsRow = document.querySelector(".cart-buttons-row");
  if (!basketList) return;
  basketList.innerHTML = "";

  const basketEntries = Object.entries(basket);

  if (basketEntries.length === 0) {
    basketList.innerHTML = "<li>No products in basket.</li>";
    if (cartButtonsRow) cartButtonsRow.style.display = "none";
    return;
  }

  basketEntries.forEach(([productKey, quantity]) => {
    const item = PRODUCTS[productKey];
    if (item) {
      const li = document.createElement("li");
      li.className = "basket-item";
      li.innerHTML = `
        <span class='basket-emoji'>${item.emoji}</span> 
        <span class="basket-item-details">
          <span class="basket-item-name">${quantity}x ${item.name}</span>
          <div class="basket-item-actions">
            <button class="remove-item-btn" data-product="${productKey}" aria-label="Remove one ${item.name} from basket">-</button>
            <button class="add-item-btn" data-product="${productKey}" aria-label="Add one more ${item.name} to basket">+</button>
          </div>
        </span>
      `;
      basketList.appendChild(li);
    }
  });

  // Add event listeners for the new buttons
  document.querySelectorAll(".remove-item-btn").forEach((btn) => {
    btn.onclick = function () {
      const product = this.getAttribute("data-product");
      removeFromBasket(product);
      renderBasket();
      renderBasketIndicator();
    };
  });

  document.querySelectorAll(".add-item-btn").forEach((btn) => {
    btn.onclick = function () {
      const product = this.getAttribute("data-product");
      addToBasket(product);
      renderBasket();
      renderBasketIndicator();
    };
  });

  if (cartButtonsRow) cartButtonsRow.style.display = "flex";
}

function getBasketCount() {
  const basket = getBasket();
  return Object.values(basket).reduce((sum, quantity) => sum + quantity, 0);
}

function renderBasketIndicator() {
  const totalItems = getBasketCount();
  let indicator = document.querySelector(".basket-indicator");
  if (!indicator) {
    const basketLink = document.querySelector(".basket-link");
    if (!basketLink) return;
    indicator = document.createElement("span");
    indicator.className = "basket-indicator";
    basketLink.appendChild(indicator);
  }

  if (totalItems > 0) {
    indicator.textContent = totalItems;
    indicator.style.display = "flex";
  } else {
    indicator.style.display = "none";
  }
}

// Call this on page load and after basket changes
if (document.readyState !== "loading") {
  renderBasketIndicator();
} else {
  document.addEventListener("DOMContentLoaded", renderBasketIndicator);
}

// Patch basket functions to update indicator
const origAddToBasket = window.addToBasket;
window.addToBasket = function (product) {
  origAddToBasket(product);
  renderBasketIndicator();
};
const origClearBasket = window.clearBasket;
window.clearBasket = function () {
  origClearBasket();
  renderBasketIndicator();
};
