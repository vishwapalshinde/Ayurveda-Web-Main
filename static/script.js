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



    // document.addEventListener('DOMContentLoaded', function () {
    //     const carousel = document.querySelector('.testimonial-carousel');
    //     const prevBtn = document.querySelector('.prev-btn');
    //     const nextBtn = document.querySelector('.next-btn');

    //     nextBtn.addEventListener('click', () => {
    //         carousel.scrollBy({ left: carousel.offsetWidth, behavior: 'smooth' });
    //     });

    //     prevBtn.addEventListener('click', () => {
    //         carousel.scrollBy({ left: -carousel.offsetWidth, behavior: 'smooth' });
    //     });
    // });

    
  // const testimonials = [
  //   {
  //     name: "Meghna Patil",
  //     role: "Patient",
  //     text: "Excellent results for weight loss management by medicines and panchakarma therapy... will recommend to all. Do visit the clinic for all types of diseases. Polite staff and proper cleanliness in clinic..."
  //   },
  //   {
  //     name: "Jay S. Singh",
  //     role: "Patient",
  //     text: "Excellent medications to all the treatments... Very good nadi parikshan and prakruti parikshan by doctor. Must visit who needs ayurveda treatments."
  //   },
  //   {
  //     name: "Ankita Sharma",
  //     role: "Patient",
  //     text: "I had an amazing experience with panchakarma therapy. Feeling more energetic and balanced in life. Highly recommended!"
  //   }
  // ];

  // let index = 0;
  // const nameEl = document.getElementById("testimonial-name");
  // const roleEl = document.querySelector(".role");
  // const textEl = document.getElementById("testimonial-text");
  // const nextBtn = document.getElementById("nextTestimonial");

  // function setTestimonial(idx) {
  //   nameEl.textContent = testimonials[idx].name;
  //   roleEl.textContent = testimonials[idx].role;
  //   textEl.textContent = testimonials[idx].text;
  // }

  // // Set initial testimonial on page load
  // setTestimonial(index);

  // nextBtn.addEventListener("click", () => {
  //   index = (index + 1) % testimonials.length;
  //   setTestimonial(index);
  // });


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

