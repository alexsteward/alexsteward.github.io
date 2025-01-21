document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('purchaseForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const quantityInput = document.getElementById('quantity');
    const errorMessage = document.getElementById('error-message');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const quantity = quantityInput.value.trim();
        let error = '';

        if (!name) {
            error = 'Name is required.';
        } else if (!email || !validateEmail(email)) {
            error = 'A valid email is required.';
        } else if (!quantity || isNaN(quantity) || quantity <= 0) {
            error = 'Please enter a valid quantity.';
        }

        if (error) {
            errorMessage.textContent = error;
        } else {
            errorMessage.textContent = '';
            alert('Thank you for your purchase!');
            form.reset();
        }
    });

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});
