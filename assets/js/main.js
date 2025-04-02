
 // //////////////////////////////////////// protect my code ///////////////////////////////////////
 document.addEventListener("DOMContentLoaded", function () {
  // منع النقر بزر الفأرة الأيمن
  document.addEventListener("contextmenu", function (e) {
      e.preventDefault();
  });

  // تعطيل اختصارات F12 و Ctrl+U و Ctrl+Shift+I
  document.addEventListener("keydown", function (e) {
      if (e.key === "F12" || 
          (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J")) || 
          (e.ctrlKey && e.key === "U")) {
          e.preventDefault();
          alert("تم تعطيل الاختصارات لحماية الموقع!");
      }
  });

  // منع فتح Developer Tools + إخفاء جميع الملفات عند فتحه
  function detectDevTools() {
      let before = new Date().getTime();
      debugger;
      let after = new Date().getTime();
      if (after - before > 100) {
          // مسح محتوى الصفحة
          document.documentElement.innerHTML = "";

          // منع تحميل الملفات الجديدة
          let meta = document.createElement("meta");
          meta.httpEquiv = "Content-Security-Policy";
          meta.content = "default-src 'none'; script-src 'none'; style-src 'none'; img-src 'none'";
          document.head.appendChild(meta);

          // إعادة التوجيه إلى صفحة فارغة
          window.location.href = "about:blank";
      }
  }
  setInterval(detectDevTools, 1000);

  // منع تغيير حجم النافذة لفتح DevTools (وضع الموبايل)
  setInterval(function () {
      if (window.outerWidth - window.innerWidth > 160 || window.outerHeight - window.innerHeight > 160) {
          document.documentElement.innerHTML = "";
          window.location.href = "about:blank";
      }
  }, 1000);

  // تعطيل console.log لمنع الفحص عبر Console
  (function() {
      console.log = function() {
          document.documentElement.innerHTML = "";
          window.location.href = "about:blank";
      };
      console.error = console.log;
      console.warn = console.log;
  })();
});
 





(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  document.addEventListener("DOMContentLoaded", function () {
    const preloader = document.querySelector("#preloader");

    window.addEventListener("load", function () {
        preloader.style.opacity = "0";
        setTimeout(() => {
            preloader.style.display = "none";
        }, 600); // نفس مدة الـ transition في CSS
    });
});


  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
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
   * Initiate Pure Counter
   */
  new PureCounter();

})();
 
  // ///////////////////////////////////////////////////  target blanck ////////////////////////////////////
  document.querySelectorAll('a[href]').forEach(function(link) {
    if (!link.href.startsWith(window.location.origin)) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    }
});