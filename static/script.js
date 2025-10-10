// // Mobile Navbar Toggle
// const hamburger = document.getElementById('hamburger');
// const navLinks = document.getElementById('navLinks');

// hamburger.addEventListener('click', () => {
//   navLinks.classList.toggle('show');
// });

// ===== Gallery Carousel =====

/* REPLACE the old gallery script at the top of the file with this one */

// ===== Gallery Carousel =====
document.addEventListener("DOMContentLoaded", function () {
  const galleryWrapper = document.querySelector(".gallery-wrapper");
  const prevGalleryBtn = document.querySelector(".gallery-btn.prev");
  const nextGalleryBtn = document.querySelector(".gallery-btn.next");
  
  if (galleryWrapper && prevGalleryBtn && nextGalleryBtn) {
    const firstImage = galleryWrapper.querySelector("img");
    if (!firstImage) return; // Exit if no images

    // Function to calculate how far to scroll
    function getScrollAmount() {
      // Get the gap value from the CSS (default to 20px if not found)
      const gap = parseInt(window.getComputedStyle(galleryWrapper.querySelector('.gallery-images')).gap) || 20;
      return firstImage.offsetWidth + gap;
    }
    
    nextGalleryBtn.addEventListener("click", function () {
      // Check if near the end
      if (galleryWrapper.scrollLeft + galleryWrapper.clientWidth >= galleryWrapper.scrollWidth - 1) {
          // If at the end, loop to the start
          galleryWrapper.scrollTo({ left: 0, behavior: "smooth" });
      } else {
          // Otherwise, scroll to the next image
          galleryWrapper.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
      }
    });
    
    prevGalleryBtn.addEventListener("click", function () {
       // Check if at the beginning
       if (galleryWrapper.scrollLeft === 0) {
          // If at the start, loop to the end
          galleryWrapper.scrollTo({ left: galleryWrapper.scrollWidth, behavior: "smooth" });
       } else {
          // Otherwise, scroll to the previous image
          galleryWrapper.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
       }
    });
    
    // Global functions for inline onclick handlers (to maintain compatibility)
    window.nextGallery = function() {
      nextGalleryBtn.click();
    };
    
    window.prevGallery = function() {
      prevGalleryBtn.click();
    };
  }
});

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

  document.addEventListener("DOMContentLoaded", () => {
    const accordions = document.querySelectorAll(".accordion-header");

    accordions.forEach(header => {
      header.addEventListener("click", () => {
        const item = header.parentElement;
        const content = item.querySelector(".accordion-content");

        // Close all other accordions
        document.querySelectorAll(".accordion-content").forEach(c => {
          if (c !== content) {
            c.classList.remove("open");
            c.previousElementSibling.classList.remove("active");
          }
        });

        // Toggle clicked accordion
        header.classList.toggle("active");
        content.classList.toggle("open");
      });
    });
  });

/* ================================= */
/* Panchakarma Animation Logic      */
/* ================================= */
document.addEventListener("DOMContentLoaded", () => {
    const panchakarmaSection = document.getElementById('panchakarma');
    if (!panchakarmaSection) return; // Exit if the section isn't on the page

    const circles = panchakarmaSection.querySelectorAll('.outer-circle');
    const infoTitle = panchakarmaSection.querySelector('#info-title');
    const infoDescription = panchakarmaSection.querySelector('#info-description');

    // Data for each therapy
    const panchakarmaData = {
        vamana: {
            title: "Vamana (Therapeutic Emesis)",
            description: "Vamana is a medicated emesis therapy that removes Kapha toxins collected in the body. It is used to treat chronic indigestion, asthma, and skin disorders like psoriasis.",
        },
        virechana: {
            title: "Virechana (Therapeutic Purgation)",
            description: "Virechana is a medicated purgation therapy that cleanses the gastrointestinal tract, liver, and gallbladder of Pitta-related toxins. It effectively treats skin diseases and jaundice.",
        },
        basti: {
            title: "Basti (Medicated Enema)",
            description: "Considered the mother of all Panchakarma treatments, Basti cleanses the colon of accumulated toxins. It balances Vata dosha and is highly effective for chronic constipation and arthritis.",
        },
        nasya: {
            title: "Nasya (Nasal Administration)",
            description: "Nasya involves administering medicated oils through the nasal passage to cleanse Kapha toxins from the head and neck, effective for sinus issues, migraines, and certain eye problems.",
        },
        raktamokshana: {
            title: "Raktamokshana (Bloodletting)",
            description: "An effective blood purification therapy, Raktamokshana involves the controlled removal of small quantities of blood to neutralize accumulated toxins and treat skin disorders like eczema.",
        },
    };

    let currentIndex = 0;
    let intervalId = null;
    let userInteracted = false;
    const cycleDuration = 5000; // 5 seconds

    function updateDisplay(index) {
        circles.forEach(circle => circle.classList.remove('blinking'));
        const activeCircle = circles[index];
        if (activeCircle) {
            activeCircle.classList.add('blinking');
            const key = activeCircle.getAttribute('data-info');
            const data = panchakarmaData[key];
            if (data) {
                infoTitle.textContent = data.title;
                infoDescription.textContent = data.description;
            }
        }
    }

    function startCycle() {
        clearInterval(intervalId); // Clear previous cycle before starting a new one
        userInteracted = false;
        currentIndex = 0;
        
        updateDisplay(currentIndex); // Show the first item immediately

        intervalId = setInterval(() => {
            if (userInteracted) {
                clearInterval(intervalId);
                return;
            }
            currentIndex = (currentIndex + 1) % circles.length;
            updateDisplay(currentIndex);
        }, cycleDuration);
    }
    
    function stopCycle() {
        userInteracted = true;
        clearInterval(intervalId);
    }

    circles.forEach((circle, index) => {
        circle.addEventListener('click', () => {
            stopCycle();
            currentIndex = index;
            updateDisplay(index);
        });
    });

    // --- Intersection Observer to control the animation ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Section is in view: start the animation
                startCycle();
            } else {
                // Section is out of view: stop the animation
                stopCycle();
            }
        });
    }, { threshold: 0.1 }); // Starts when 10% of the section is visible

    // Tell the observer to watch the Panchakarma section
    observer.observe(panchakarmaSection);
});



/* ================================================== */
/* NEW: JavaScript for "Our Services" Carousel Buttons */
/* ================================================== */
document.addEventListener("DOMContentLoaded", function () {
  const servicesCarousel = document.querySelector("#services .carousel");

  // Only run the script if the services carousel exists on the page
  if (servicesCarousel) {
    const prevBtn = document.querySelector("#services .carousel-btn.prev");
    const nextBtn = document.querySelector("#services .carousel-btn.next");
    const firstCard = servicesCarousel.querySelector(".service-card");

    // Exit if there are no cards
    if (!firstCard) return;

    // Function to calculate how far to scroll
    const getScrollAmount = () => {
      const cardWidth = firstCard.offsetWidth;
      // Get the gap value from the CSS
      const gap = parseInt(window.getComputedStyle(servicesCarousel).gap) || 20;
      return cardWidth + gap;
    };

    // Add click event for the "next" button with loop logic
    nextBtn.addEventListener("click", function () {
      // Check if the scroll position is near the end
      // We use a small buffer (-1) to account for potential decimal values
      if (servicesCarousel.scrollLeft + servicesCarousel.clientWidth >= servicesCarousel.scrollWidth - 1) {
        // If at the end, smoothly scroll back to the start
        servicesCarousel.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        // Otherwise, just scroll to the next card
        servicesCarousel.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
      }
    });

    // Add click event for the "previous" button with loop logic
    prevBtn.addEventListener("click", function () {
      // Check if the scroll position is at the start
      if (servicesCarousel.scrollLeft === 0) {
        // If at the start, smoothly scroll to the very end
        servicesCarousel.scrollTo({ left: servicesCarousel.scrollWidth, behavior: 'smooth' });
      } else {
        // Otherwise, just scroll to the previous card
        servicesCarousel.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
      }
    });
  }
});


/* === YouTube Section Carousel Logic === */
document.addEventListener("DOMContentLoaded", function () {
  const youtubeCarousel = document.querySelector(".youtube-section .carousel");

  if (youtubeCarousel) {
    const prevBtn = document.querySelector(".youtube-section .carousel-btn.prev");
    const nextBtn = document.querySelector(".youtube-section .carousel-btn.next");
    const firstCard = youtubeCarousel.querySelector(".youtube-card");

    if (!firstCard) return;

    const getScrollAmount = () => {
      const cardWidth = firstCard.offsetWidth;
      const gap = parseInt(window.getComputedStyle(youtubeCarousel).gap) || 25;
      return cardWidth + gap;
    };

    nextBtn.addEventListener("click", function () {
      youtubeCarousel.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
    });

    prevBtn.addEventListener("click", function () {
      youtubeCarousel.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
    });
  }
});
