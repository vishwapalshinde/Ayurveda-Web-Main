// // Mobile Navbar Toggle
// const hamburger = document.getElementById('hamburger');
// const navLinks = document.getElementById('navLinks');

// hamburger.addEventListener('click', () => {
//   navLinks.classList.toggle('show');
// });

// ===== Gallery Carousel =====
// Gallery Carousel Scroll Logic (like Services Carousel)
document.addEventListener("DOMContentLoaded", function () {
  const galleryWrapper = document.querySelector(".gallery-wrapper");
  const prevGalleryBtn = document.querySelector(".gallery-btn.prev");
  const nextGalleryBtn = document.querySelector(".gallery-btn.next");
  if (galleryWrapper && prevGalleryBtn && nextGalleryBtn) {
    // Calculate scroll amount: width of one image (all images are same width)
    const galleryImg = galleryWrapper.querySelector("img");
    function getScrollAmount() {
      if (!galleryImg) return galleryWrapper.offsetWidth / 3;
      return galleryImg.offsetWidth + 10; // 10px margin (5px each side)
    }
    nextGalleryBtn.addEventListener("click", function () {
      galleryWrapper.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
    });
    prevGalleryBtn.addEventListener("click", function () {
      galleryWrapper.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
    });
  }
});

// Ensure gallery is correct on window resize
window.addEventListener('resize', updateGallery);
// Initial update
updateGallery();


// Accordion Functionality
document.querySelectorAll(".accordion-header").forEach(button => {
  button.addEventListener("click", () => {
    const content = button.nextElementSibling;
    content.style.display = content.style.display === "block" ? "none" : "block";
  });
});



document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".elementor-counter-number");

  counters.forEach(counter => {
    const target = +counter.getAttribute("data-to-value");
    const duration = +counter.getAttribute("data-duration") || 2000;
    const step = target / (duration / 30);

    let count = 0;
    const updateCounter = () => {
      count += step;
      if (count < target) {
        counter.innerText = Math.floor(count);
        requestAnimationFrame(updateCounter);
      } else {
        counter.innerText = target.toLocaleString();
      }
    };

    updateCounter();
  });
});



    document.addEventListener('DOMContentLoaded', function () {
        const carousel = document.querySelector('.testimonial-carousel');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');

        nextBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: carousel.offsetWidth, behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: -carousel.offsetWidth, behavior: 'smooth' });
        });
    });

