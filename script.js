document.addEventListener('DOMContentLoaded', () => {
    const cartItems = {};
    const cartItemsContainer = document.getElementById('cart-items');
    const totalElement = document.getElementById('total');
    const checkoutButton = document.getElementById('checkout');

    // Function to update cart display
    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        for (const [name, { price, quantity }] of Object.entries(cartItems)) {
            if (quantity > 0) {
                const li = document.createElement('li');
                li.innerHTML = 
                    `${name} - $${price} x ${quantity}
                    <button class="decrease" data-name="${name}">-</button>
                    <button class="increase" data-name="${name}">+</button>`;
                cartItemsContainer.appendChild(li);
                total += price * quantity;
            }
        }
        totalElement.textContent = `Total: $${total.toFixed(2)}`;
    }

    // Add event listener to all "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            const name = event.target.getAttribute('data-name');
            const price = parseFloat(event.target.getAttribute('data-price'));
            if (cartItems[name]) {
                cartItems[name].quantity += 1;
            } else {
                cartItems[name] = { price, quantity: 1 };
            }
            updateCart();
        });
    });

    // Add event listener to quantity buttons in the cart
    cartItemsContainer.addEventListener('click', (event) => {
        const button = event.target;
        if (button.classList.contains('increase') || button.classList.contains('decrease')) {
            const name = button.getAttribute('data-name');
            if (button.classList.contains('increase')) {
                cartItems[name].quantity += 1;
            } else if (button.classList.contains('decrease')) {
                cartItems[name].quantity -= 1;
                if (cartItems[name].quantity <= 0) {
                    delete cartItems[name];
                }
            }
            updateCart();
        }
    });

    // Checkout button click event
    checkoutButton.addEventListener('click', () => {
        if (Object.keys(cartItems).length > 0) {
            alert('Thank you for your purchase!');
            for (const name in cartItems) {
                delete cartItems[name]; // Clear the cart
            }
            updateCart();
        } else {
            alert('Your cart is empty.');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        alert(`Thank you, ${name}! Your message has been sent.`);

        // Reset the form
        form.reset();
    });
});
