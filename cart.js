// Author: Devany Walker
// ID#: 2300064
// Occurence: UM2    
    
    
    
document.addEventListener('DOMContentLoaded', function() {
    const cartItemsContainer = document.getElementById('cart-items');
    const subtotalPriceElement = document.getElementById('subtotal-price');
    const taxPriceElement = document.getElementById('tax-price');
    const totalPriceElement = document.getElementById('total-price');
    const checkoutButton = document.getElementById('checkoutButton');

    function saveCartItems(items) {
        localStorage.setItem('cartItems', JSON.stringify(items));
    }

    function loadCartItems() {
        const items = localStorage.getItem('cartItems');
        return items ? JSON.parse(items) : [];
    }

    function calculateSubtotal(items) {
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
    }

    function calculateTax(subtotal) {
        return subtotal * 0.05;
    }

    function removeCartItem(id) {
        let cartItems = loadCartItems();
        cartItems = cartItems.filter(item => item.id !== id);
        saveCartItems(cartItems);
        updateCartDisplay();
    }

    function updateCartDisplay() {
        const cartItems = loadCartItems();
        
        // Clear current cart items
        cartItemsContainer.innerHTML = '';

        // Display cart items
        cartItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <p>${item.name}</p>
                <p>${item.price} x ${item.quantity}</p>
                <button class="remove-from-cart" data-product-id="${item.id}">Remove</button>
            `;
            cartItemsContainer.appendChild(itemElement);
        });

        const subtotal = calculateSubtotal(cartItems);
        const tax = calculateTax(subtotal);
        const total = subtotal + tax;

        subtotalPriceElement.textContent = `Subtotal: $${subtotal.toFixed(2)}`;
        taxPriceElement.textContent = `Tax (5%): $${tax.toFixed(2)}`;
        totalPriceElement.textContent = `Total: $${total.toFixed(2)}`;

        // Add event listeners for remove buttons
        const removeButtons = document.querySelectorAll('.remove-from-cart');
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.getAttribute('data-product-id');
                removeCartItem(productId);
            });
        });
    }

    // Add event listener for checkout button
    checkoutButton.addEventListener('click', function() {
        const cartItems = loadCartItems();
        const subtotal = calculateSubtotal(cartItems);
        const tax = calculateTax(subtotal);
        const total = subtotal + tax;

        const invoiceDetails = {
            items: cartItems,
            subtotal: subtotal,
            tax: tax,
            total: total,
        };

        localStorage.setItem('invoiceDetails', JSON.stringify(invoiceDetails));
        window.location.href = 'invoice.html';
    });

    updateCartDisplay();
});
