document.addEventListener("DOMContentLoaded", () => {
    const carousels = document.querySelectorAll(".device-card .carousel");

    carousels.forEach((carousel) => {
        const images = carousel.querySelectorAll(".carousel-image");
        const prevButton = carousel.querySelector(".left");
        const nextButton = carousel.querySelector(".right");

        let currentIndex = 0;

        const updateCarousel = () => {
            images.forEach((img, index) => {
                img.classList.toggle("active", index === currentIndex);
            });
        };

        prevButton.addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length; 
            updateCarousel();
        });

        nextButton.addEventListener("click", () => {
            currentIndex = (currentIndex + 1) % images.length;
            updateCarousel();
        });

        updateCarousel();
    });
});
