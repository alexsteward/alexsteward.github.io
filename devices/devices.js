document.addEventListener('DOMContentLoaded', () => {
    let currentIndex = 0;
    const images = document.querySelectorAll('.carousel-image');
    const totalImages = images.length;

    document.querySelectorAll('.prev').forEach(button => {
        button.addEventListener('click', () => {
            images[currentIndex].classList.remove('active');
            currentIndex = (currentIndex - 1 + totalImages) % totalImages;
            images[currentIndex].classList.add('active');
        });
    });

    document.querySelectorAll('.next').forEach(button => {
        button.addEventListener('click', () => {
            images[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % totalImages;
            images[currentIndex].classList.add('active');
        });
    });
});
