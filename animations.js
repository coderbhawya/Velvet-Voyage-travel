document.addEventListener("DOMContentLoaded", (event) => {
  // Register ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // Common UI Elements Animation
  // 1. Header reveal
  gsap.from(".site-header", {
    y: -100,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });

  // 2. Hero or Page Header content reveal
  gsap.from(".hero-inner > div:first-child, .page-header .container", {
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 0.2,
    ease: "power3.out",
  });

  // 3. Hero Visual reveal
  if (document.querySelector(".hero-visual")) {
    gsap.from(".hero-visual", {
      x: 50,
      opacity: 0,
      duration: 1,
      delay: 0.4,
      ease: "power3.out",
    });
  }

  // 4. Staggered reveal for cards (Packages, Features, Stats, Reviews)
  const cardClasses = [
    ".package-card", 
    ".country-card", 
    ".feature-card", 
    ".stat-box", 
    ".review-card",
    ".info-card"
  ];
  
  cardClasses.forEach((cardClass) => {
    const cards = document.querySelectorAll(cardClass);
    if (cards.length > 0) {
      gsap.from(cards, {
        scrollTrigger: {
          trigger: cards[0].parentElement,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
      });
    }
  });

  // 5. Section titles and copy
  const sectionHeaders = document.querySelectorAll(".section-header, .highlight-box, .story-box");
  sectionHeaders.forEach((header) => {
    gsap.from(header, {
      scrollTrigger: {
        trigger: header,
        start: "top 85%",
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    });
  });

  // 6. About page visual
  if (document.querySelector(".about-visual")) {
    gsap.from(".about-visual", {
      scrollTrigger: {
        trigger: ".about-grid",
        start: "top 80%",
      },
      scale: 0.95,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
  }
  
  // 7. Contact Form
  if (document.querySelector(".form-card")) {
    gsap.from(".form-card", {
      scrollTrigger: {
        trigger: ".contact-grid",
        start: "top 80%",
      },
      x: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    });
  }
  // 8. Mobile Menu Toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const navWrapper = document.querySelector(".nav-wrapper");
  
  if (menuToggle && navWrapper) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active");
      navWrapper.classList.toggle("active");
    });
  }
});
