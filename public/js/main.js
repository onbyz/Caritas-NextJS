/**
* Template Name: BizLand
* Updated: Jul 27 2023 with Bootstrap v5.3.1
* Template URL: https://bootstrapmade.com/bizland-bootstrap-business-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 16
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Header fixed top on scroll
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    let headerOffset = selectHeader.offsetTop
    let nextElement = selectHeader.nextElementSibling
    const headerFixed = () => {
      if ((headerOffset - window.scrollY) <= 0) {
        selectHeader.classList.add('fixed-top')
        nextElement.classList.add('scrolled-offset')
      } else {
        selectHeader.classList.remove('fixed-top')
        nextElement.classList.remove('scrolled-offset')
      }
    }
    window.addEventListener('load', headerFixed)
    onscroll(document, headerFixed)
  }



/**
   * Header fixed top on scroll
   */
  // Vanilla JavaScript for Header Fixing
document.addEventListener('DOMContentLoaded', function () {
    let selectHeader1 = document.querySelector('#deptmenu');
    if (selectHeader1) {
        let headerOffset = selectHeader1.offsetTop;
        let nextElement = selectHeader1.nextElementSibling;

        const headerFixed = () => {
            if ((headerOffset - window.scrollY) <= 0) {
                selectHeader1.classList.add('fixed-topnav');
                if (nextElement) nextElement.classList.add('scrolled-offset');
            } else {
                selectHeader1.classList.remove('fixed-topnav');
                if (nextElement) nextElement.classList.remove('scrolled-offset');
            }
        };

        window.addEventListener('load', headerFixed);
        window.addEventListener('scroll', headerFixed);
    }
});

// jQuery for Active Link Handling
$(document).ready(function () {
    $('#deptmenu .navbar a').click(function () {
        $('#deptmenu .navbar a').removeClass("active");
        $(this).addClass("active");
    });
});

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  /* Preloader hidden by React Preloader component (avoid removeChild conflicts) */

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()

/*Search bar */
const searchForm = document.getElementById('searchForm');
if (searchForm) searchForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    
    const formData = new FormData(this);
    const searchQuery = formData.get('search');
    
    fetch(`/search_doctors/?search=${searchQuery}`, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        const searchResultsContainer = document.getElementById('search-results');
        searchResultsContainer.innerHTML = ''; // Clear previous results
        
        if (data.length > 0) {
            data.forEach(result => {
                const resultElement = document.createElement('div');
                resultElement.classList.add('col-md-6', 'mb-4');
                
                // Doctor's Image
                const imageElement = document.createElement('img');
                //imageElement.src = result.image; // Provide the URL to the doctor's image
               // imageElement.alt = result.name;
                imageElement.className = 'img-fluid';
                
                // Doctor's Details
                const detailsElement = document.createElement('div');
                detailsElement.className = 'ml-4';
                detailsElement.innerHTML = `
                <div class="col doctorbox ">
                <h2>Searched for {{ result }}</h2>
                <div class="d-flex align-items-center">
                        <div class="mr-5">
                            <img src="${result.image}" alt="Doctor 1" class="img-fluid" />
                        </div>
                        <div class="mx-2 mt-2">
                            <h4>${result.name}</h4>
                            <h6>${result.department}</h6>
                            <p>&nbsp;</p>
                            <p><a style="color:#c71782;" href="#">Book An Appointment<i class="bi bi-chevron-right ms-2" ></i></a></p>
                        </div>
                        <div class="ml-auto align-self-start mt-4" style="margin-left: 10%;"><a href="{% url 'doctor_detail' id=result.id %}"><i class='bi bi-arrow-right-circle' style="font-size:40px;color:#C71782;"></i></a>
                        </div>
                        </div>
                    </div>
                    <hr/>
                    
                `;

                resultElement.appendChild(imageElement);
                resultElement.appendChild(detailsElement);
                
                searchResultsContainer.appendChild(resultElement);
            });
        } else {
            const noResultElement = document.createElement('div');
            noResultElement.textContent = 'No matching doctors found.';
            searchResultsContainer.appendChild(noResultElement);
        }
    })
    .catch(error => {
        console.error('Error fetching search results:', error);
    });
});


/* Hero carousel indicators (homepage only) */
const heroCarouselIndicators = document.querySelector("#hero-carousel-indicators");
const heroCarouselItems = document.querySelectorAll("#heroCarousel .carousel-item");

if (heroCarouselIndicators && heroCarouselItems.length) {
  heroCarouselItems.forEach((_, index) => {
    heroCarouselIndicators.innerHTML +=
      index === 0
        ? "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "' class='active'></li>"
        : "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "'></li>";
  });
}

/* Legacy accordions used in health package pages */
function initLegacyAccordions() {
  const accordions = document.querySelectorAll(".accordion-wrapper .accordion");
  accordions.forEach((acc) => {
    if (acc.dataset.accordionBound === "1") return;
    acc.dataset.accordionBound = "1";
    const panel = acc.nextElementSibling;
    if (panel && panel.classList.contains("panel")) {
      panel.style.display = "none";
    }
    acc.addEventListener("click", function (e) {
      e.preventDefault();
      const isActive = this.classList.contains("active");
      this.classList.toggle("active", !isActive);
      const next = this.nextElementSibling;
      if (!next || !next.classList.contains("panel")) return;
      next.style.display = isActive ? "none" : "block";
    });
  });

  if (!window.__legacyAccordionDelegateBound) {
    document.addEventListener("click", function (e) {
      const target = e.target.closest(".accordion-wrapper .accordion");
      if (!target) return;
      e.preventDefault();
      const isActive = target.classList.contains("active");
      target.classList.toggle("active", !isActive);
      const next = target.nextElementSibling;
      if (!next || !next.classList.contains("panel")) return;
      next.style.display = isActive ? "none" : "block";
    });
    window.__legacyAccordionDelegateBound = true;
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initLegacyAccordions);
}
initLegacyAccordions();

