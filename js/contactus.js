document.addEventListener('DOMContentLoaded', function () {

    // =========================================
    // Header scroll effect
    // =========================================
    var header = document.getElementById('header');

    function handleHeaderScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleHeaderScroll();

    // =========================================
    // Mobile navigation
    // =========================================
    var hamburger = document.getElementById('hamburger');
    var mainNav = document.getElementById('mainNav');
    var overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        mainNav.classList.toggle('open');
        overlay.classList.toggle('active');
        document.body.style.overflow = mainNav.classList.contains('open') ? 'hidden' : '';
    });

    overlay.addEventListener('click', function () {
        hamburger.classList.remove('active');
        mainNav.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    var dropdownParents = document.querySelectorAll('.has-dropdown > a');
    dropdownParents.forEach(function (link) {
        link.addEventListener('click', function (e) {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                var parent = this.parentElement;
                var isOpen = parent.classList.contains('dropdown-open');
                document.querySelectorAll('.has-dropdown').forEach(function (el) {
                    el.classList.remove('dropdown-open');
                });
                if (!isOpen) {
                    parent.classList.add('dropdown-open');
                }
            }
        });
    });

    // =========================================
    // Contact Form Submit
    // =========================================
    var contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Thank you for reaching out! We\'ll get back to you soon.');
            this.reset();
        });
    }

    // =========================================
    // GSAP Animations
    // =========================================
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Page hero parallax
        var heroPageBg = document.querySelector('.page-hero-bg');
        if (heroPageBg) {
            gsap.to(heroPageBg, {
                y: 60,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.page-hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1
                }
            });
        }

        // Page hero content entrance
        var heroContent = document.querySelector('.page-hero-content');
        if (heroContent) {
            gsap.from(heroContent.children, {
                opacity: 0,
                y: 30,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power2.out',
                delay: 0.2
            });
        }

        // Story headings
        document.querySelectorAll('.story-heading').forEach(function (el) {
            gsap.from(el, {
                opacity: 0,
                y: 30,
                duration: 0.7,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    once: true
                }
            });
        });

        // Story text blocks
        document.querySelectorAll('.story-text').forEach(function (el) {
            gsap.from(el, {
                opacity: 0,
                y: 25,
                duration: 0.6,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 88%',
                    once: true
                }
            });
        });

        // Contact info items
        document.querySelectorAll('.contact-info-item').forEach(function (el, i) {
            gsap.from(el, {
                opacity: 0,
                x: -20,
                duration: 0.6,
                delay: i * 0.15,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 88%',
                    once: true
                }
            });
        });

        // Contact form
        var contactFormEl = document.querySelector('.contact-form');
        if (contactFormEl) {
            gsap.from(contactFormEl, {
                opacity: 0,
                y: 30,
                duration: 0.7,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: contactFormEl,
                    start: 'top 85%',
                    once: true
                }
            });
        }

        // Collaborate items
        document.querySelectorAll('.collab-item').forEach(function (item, i) {
            gsap.from(item, {
                opacity: 0,
                y: 40,
                duration: 0.7,
                delay: i * 0.2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.collab-grid',
                    start: 'top 85%',
                    once: true
                }
            });
        });

        // Connect button
        var connectBtn = document.querySelector('.btn-connect');
        if (connectBtn) {
            gsap.from(connectBtn, {
                opacity: 0,
                scale: 0.9,
                duration: 0.6,
                ease: 'back.out(1.5)',
                scrollTrigger: {
                    trigger: connectBtn,
                    start: 'top 90%',
                    once: true
                }
            });
        }

        // Footer columns
        gsap.from('.footer-col', {
            opacity: 0,
            y: 30,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.footer-top',
                start: 'top 90%',
                once: true
            }
        });
    }

    // =========================================
    // Newsletter form
    // =========================================
    var newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Thank you for subscribing!');
            this.reset();
        });
    }

});

// Recompute scroll-trigger positions once all images have loaded
window.addEventListener('load', function () {
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
    }
});
