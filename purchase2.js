document.addEventListener("DOMContentLoaded", () => {
    const checkoutButton = document.getElementById("checkout-button");

    checkoutButton.addEventListener("click", () => {
        fetch("https://buy.stripe.com/5kAbKaaV87w9fTy8wx", {
            method: "GET",
        })
        .then(response => {
            if (response.ok) {
                window.location.href = "https://buy.stripe.com/5kAbKaaV87w9fTy8wx";
            } else {
                alert("Error initiating payment. Please try again.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An unexpected error occurred. Please try again later.");
        });
    });
});
