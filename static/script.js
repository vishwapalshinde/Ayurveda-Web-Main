// // Mobile Navbar Toggle
// const hamburger = document.getElementById('hamburger');
// const navLinks = document.getElementById('navLinks');

// hamburger.addEventListener('click', () => {
//   navLinks.classList.toggle('show');
// });

// ===== Gallery Carousel =====
// Gallery Carousel Scroll Logic with Mobile Support
document.addEventListener("DOMContentLoaded", function () {
  const galleryWrapper = document.querySelector(".gallery-wrapper");
  const prevGalleryBtn = document.querySelector(".gallery-btn.prev");
  const nextGalleryBtn = document.querySelector(".gallery-btn.next");
  
  if (galleryWrapper && prevGalleryBtn && nextGalleryBtn) {
    // Calculate scroll amount based on screen size
    function getScrollAmount() {
      const galleryImg = galleryWrapper.querySelector("img");
      if (!galleryImg) return galleryWrapper.offsetWidth / 3;
      
      // Check if mobile view (768px and below)
      if (window.innerWidth <= 768) {
        // On mobile, scroll by exact image width for perfect alignment
        return galleryImg.offsetWidth;
      } else {
        // On desktop, scroll by image width (no margins now)
        return galleryImg.offsetWidth;
      }
    }
    nextGalleryBtn.addEventListener("click", function () {
      galleryWrapper.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
    });
    prevGalleryBtn.addEventListener("click", function () {
      galleryWrapper.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
    });
    // Handle window resize to recalculate scroll amount
    window.addEventListener("resize", function() {
      // Update scroll behavior on resize if needed
    });
    
    // Global functions for onclick handlers (if needed)
    window.nextGallery = function() {
      galleryWrapper.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
    };
    
    window.prevGallery = function() {
      galleryWrapper.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
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

    // Add click event for the "next" button
    nextBtn.addEventListener("click", function () {
      servicesCarousel.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
    });

    // Add click event for the "previous" button
    prevBtn.addEventListener("click", function () {
      servicesCarousel.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
    });
  }
});
