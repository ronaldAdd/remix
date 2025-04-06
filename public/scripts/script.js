// public/scripts/script.js
let currentSlide = 0;
const slides = document.querySelectorAll('.slider img');

function showSlide(index) {
  const totalSlides = slides.length;
  if (index >= totalSlides) currentSlide = 0;
  if (index < 0) currentSlide = totalSlides - 1;

  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(-${currentSlide * 100}%)`;
  });
}

setInterval(() => {
  currentSlide++;
  showSlide(currentSlide);
}, 3000); // Ganti setiap 3 detik
