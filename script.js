(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector("body");
    const selectHeader = document.querySelector("#header");
    if (
      !selectHeader.classList.contains("scroll-up-sticky") &&
      !selectHeader.classList.contains("sticky-top") &&
      !selectHeader.classList.contains("fixed-top")
    )
      return;
    window.scrollY > 100
      ? selectBody.classList.add("scrolled")
      : selectBody.classList.remove("scrolled");
  }

  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

  function mobileNavToogle() {
    document.querySelector("body").classList.toggle("mobile-nav-active");
    mobileNavToggleBtn.classList.toggle("bi-list");
    mobileNavToggleBtn.classList.toggle("bi-x");
  }
  mobileNavToggleBtn.addEventListener("click", mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".mobile-nav-active")) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll(".navmenu .toggle-dropdown").forEach((navmenu) => {
    navmenu.addEventListener("click", function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle("active");
      this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
  }
  scrollTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", aosInit);

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll(".skills-animation");
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: "80%",
      handler: function (direction) {
        let progress = item.querySelectorAll(".progress .progress-bar");
        progress.forEach((el) => {
          el.style.width = el.getAttribute("aria-valuenow") + "%";
        });
      },
    });
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll(".isotope-layout").forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute("data-layout") ?? "masonry";
    let filter = isotopeItem.getAttribute("data-default-filter") ?? "*";
    let sort = isotopeItem.getAttribute("data-sort") ?? "original-order";

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector(".isotope-container"), function () {
      initIsotope = new Isotope(
        isotopeItem.querySelector(".isotope-container"),
        {
          itemSelector: ".isotope-item",
          layoutMode: layout,
          filter: filter,
          sortBy: sort,
        }
      );
    });

    isotopeItem
      .querySelectorAll(".isotope-filters li")
      .forEach(function (filters) {
        filters.addEventListener(
          "click",
          function () {
            isotopeItem
              .querySelector(".isotope-filters .filter-active")
              .classList.remove("filter-active");
            this.classList.add("filter-active");
            initIsotope.arrange({
              filter: this.getAttribute("data-filter"),
            });
            if (typeof aosInit === "function") {
              aosInit();
            }
          },
          false
        );
      });
  });

  document
    .getElementById("surprise-btn")
    .addEventListener("click", function () {
      const root = document.documentElement;
      const rand = Math.floor(Math.random() * 1);
      if (rand == 0) {
        root.style.setProperty("--background-color", "#022B3A");
        root.style.setProperty("--default-color", "white");
        root.style.setProperty("--heading-color", "white");
        root.style.setProperty("--accent-color", "#0c3d57");
        root.style.setProperty("--surface-color", "#3d697c");
        root.style.setProperty("--contrast-color", "white");
        root.style.setProperty("--nav-hover-color", "black");
        root.style.setProperty("--nav-dropdown-hover-color", "white");
        root.style.setProperty("--footer-background-color", "#bfdbf7");
        root.style.setProperty("--footer-text-color", "white");
        document
          .querySelector(".light-background")
          .style.setProperty("--background-color", "#BFDBF7");
        document
          .querySelector(".light-background")
          .style.setProperty("--surface-color", "#E1E5F2");
        document
          .querySelector(".progress-bar-wrap")
          .style.setProperty("#676772");
        document.getElementById("#footer").style.backgroundColor = "red";
      } else {
        root.style.setProperty("--background-color", "");
        root.style.setProperty("--default-color", "");
        root.style.setProperty("--heading-color", "");
        root.style.setProperty("--accent-color", "");
        root.style.setProperty("--surface-color", "");
        root.style.setProperty("--contrast-color", "");
        root.style.setProperty("--nav-hover-color", "");
        root.style.setProperty("--nav-dropdown-hover-color", "");
        document
          .querySelector(".light-background")
          .style.setProperty("--background-color", "#BFDBF7");
        document
          .querySelector(".light-background")
          .style.setProperty("--surface-color", "#E1E5F2");
      }
    });

    document.getElementById('language-en').addEventListener('click', function() {
      // Exemplo de mudança de conteúdo
      document.getElementById('header-title').textContent = 'Título em Português';
      document.getElementById('header-description').textContent = 'Descrição em Português';
      // Adicione mais mudanças conforme necessário
    });

  document
    .querySelector(".php-email-form")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent the default form submission
      grecaptcha.ready(function () {
        grecaptcha
          .execute("6Ldw84UqAAAAAE8K9A6YhcQChxn-M6OYYBTlcj3n", {
            action: "submit",
          })
          .then(function (token) {
            // Add the token to the form
            const form = event.target;
            const recaptchaResponse = document.createElement("input");
            recaptchaResponse.type = "hidden";
            recaptchaResponse.name = "g-recaptcha-response";
            recaptchaResponse.value = token;
            form.appendChild(recaptchaResponse);

            // Submit the form
            form.submit();
          });
      });
    });
})();
