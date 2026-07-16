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
    // Hero Slider
    // =========================================
    var slides = document.querySelectorAll('.hero-slide');
    var dots = document.querySelectorAll('.dot');
    var prevBtn = document.querySelector('.slider-prev');
    var nextBtn = document.querySelector('.slider-next');
    var slideCurrentEl = document.querySelector('.slide-current');
    var progressFill = document.querySelector('.slider-progress-fill');
    var currentSlide = 0;
    var slideCount = slides.length;
    var autoplayInterval = null;
    var isTransitioning = false;

    function updateSlideUI() {
        if (slideCurrentEl) {
            slideCurrentEl.textContent = String(currentSlide + 1).padStart(2, '0');
        }
        if (progressFill) {
            progressFill.style.width = ((currentSlide + 1) / slideCount * 100) + '%';
        }
    }

    function animateSlideContent(slide) {
        if (typeof gsap === 'undefined') return;
        var content = slide.querySelector('.hero-content');
        if (!content) return;

        var badge = content.querySelector('.hero-badge');
        var title = content.querySelector('.hero-title');
        var divider = content.querySelector('.hero-divider');
        var subtitle = content.querySelector('.hero-subtitle');
        var tagline = content.querySelector('.hero-tagline');
        var ctaText = content.querySelector('.hero-cta-text');
        var buttons = content.querySelector('.hero-buttons');

        var tl = gsap.timeline();

        if (badge) {
            tl.fromTo(badge,
                { opacity: 0, y: -20, scale: 0.9 },
                { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.5)' },
                0
            );
        }
        if (title) {
            tl.fromTo(title,
                { opacity: 0, y: 40, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out' },
                0.15
            );
        }
        if (divider) {
            tl.fromTo(divider,
                { scaleX: 0 },
                { scaleX: 1, duration: 0.7, ease: 'power2.inOut' },
                0.4
            );
        }
        if (subtitle) {
            tl.fromTo(subtitle,
                { opacity: 0, y: 25 },
                { opacity: 0.92, y: 0, duration: 0.7, ease: 'power2.out' },
                0.55
            );
        }
        if (tagline) {
            tl.fromTo(tagline,
                { opacity: 0, y: 15 },
                { opacity: 0.7, y: 0, duration: 0.6, ease: 'power2.out' },
                0.7
            );
        }
        if (ctaText) {
            tl.fromTo(ctaText,
                { opacity: 0, y: 15 },
                { opacity: 0.9, y: 0, duration: 0.6, ease: 'power2.out' },
                0.8
            );
        }
        if (buttons) {
            var btns = buttons.querySelectorAll('.btn-hero');
            tl.fromTo(btns,
                { opacity: 0, y: 20, scale: 0.9 },
                { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.3)' },
                0.9
            );
        }

        tl.eventCallback('onComplete', function () {
            isTransitioning = false;
        });
    }

    function goToSlide(index) {
        if (isTransitioning || index === currentSlide) return;
        isTransitioning = true;

        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');

        currentSlide = (index + slideCount) % slideCount;

        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
        updateSlideUI();
        animateSlideContent(slides[currentSlide]);
    }

    function nextSlide() { goToSlide(currentSlide + 1); }
    function prevSlide() { goToSlide(currentSlide - 1); }

    function startAutoplay() {
        stopAutoplay();
        autoplayInterval = setInterval(nextSlide, 6000);
    }

    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
            autoplayInterval = null;
        }
    }

    nextBtn.addEventListener('click', function () { nextSlide(); startAutoplay(); });
    prevBtn.addEventListener('click', function () { prevSlide(); startAutoplay(); });

    dots.forEach(function (dot) {
        dot.addEventListener('click', function () {
            goToSlide(parseInt(this.dataset.slide));
            startAutoplay();
        });
    });

    updateSlideUI();
    startAutoplay();

    // =========================================
    // Info Bar Tabs
    // =========================================
    var infoTabs = document.querySelectorAll('.info-tab');
    var infoPanels = document.querySelectorAll('.info-panel');

    infoTabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            var target = this.dataset.tab;
            infoTabs.forEach(function (t) { t.classList.remove('active'); });
            infoPanels.forEach(function (p) { p.classList.remove('active'); });
            this.classList.add('active');
            var targetPanel = document.querySelector('[data-panel="' + target + '"]');
            if (targetPanel) targetPanel.classList.add('active');
        });
    });

    // =========================================
    // GSAP Animations
    // =========================================
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // --- Floating shapes animation ---
        var shapes = document.querySelectorAll('.shape');
        shapes.forEach(function (shape, i) {
            gsap.to(shape, {
                y: (i % 2 === 0 ? 30 : -30),
                x: (i % 2 === 0 ? -15 : 15),
                rotation: (i % 2 === 0 ? 10 : -10),
                duration: 4 + i * 0.8,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: i * 0.3
            });
        });

        // --- Hero parallax on scroll ---
        document.querySelectorAll('.hero-bg').forEach(function (bg) {
            gsap.to(bg, {
                y: 120,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1
                }
            });
        });

        // --- Scroll indicator fade out on scroll ---
        var scrollInd = document.querySelector('.scroll-indicator');
        if (scrollInd) {
            gsap.to(scrollInd, {
                opacity: 0,
                y: 20,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.hero',
                    start: 'top top',
                    end: '15% top',
                    scrub: true
                }
            });
        }

        // --- First slide entrance ---
        animateSlideContent(slides[0]);

        // --- Parallax CTA zoom ---
        var ctaBg = document.querySelector('.parallax-cta-bg');
        if (ctaBg) {
            gsap.fromTo(ctaBg,
                { scale: 1 },
                {
                    scale: 1.15,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: '.parallax-cta',
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1.5
                    }
                }
            );
        }

        // --- Impact section parallax ---
        var impactBg = document.querySelector('.impact-bg');
        if (impactBg) {
            gsap.to(impactBg, {
                y: 140,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.impact-section',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                }
            });
        }

        // --- Info bar reveal ---
        gsap.from('.info-bar-inner', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.info-bar',
                start: 'top 85%',
                once: true
            }
        });

        // --- Section headers ---
        document.querySelectorAll('.section-header').forEach(function (el) {
            gsap.from(el.children, {
                opacity: 0,
                y: 30,
                duration: 0.7,
                stagger: 0.15,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    once: true
                }
            });
        });

        // --- Impact cards ---
        gsap.from('.impact-card', {
            opacity: 0,
            y: 60,
            scale: 0.85,
            rotateY: 15,
            duration: 0.8,
            stagger: 0.2,
            ease: 'back.out(1.4)',
            scrollTrigger: {
                trigger: '.impact-grid',
                start: 'top 85%',
                once: true
            }
        });

        // Card tilt on mouse move
        document.querySelectorAll('.impact-card').forEach(function (card) {
            card.addEventListener('mousemove', function (e) {
                var rect = card.getBoundingClientRect();
                var x = e.clientX - rect.left;
                var y = e.clientY - rect.top;
                var centerX = rect.width / 2;
                var centerY = rect.height / 2;
                var rotX = (y - centerY) / centerY * -6;
                var rotY = (x - centerX) / centerX * 6;
                gsap.to(card, {
                    rotateX: rotX,
                    rotateY: rotY,
                    duration: 0.3,
                    ease: 'power2.out',
                    transformPerspective: 800
                });
            });
            card.addEventListener('mouseleave', function () {
                gsap.to(card, {
                    rotateX: 0,
                    rotateY: 0,
                    duration: 0.5,
                    ease: 'elastic.out(1, 0.5)',
                    transformPerspective: 800
                });
            });
        });

        // --- Parallax CTA content ---
        var ctaContent = document.querySelector('.parallax-cta-content');
        if (ctaContent) {
            gsap.from(ctaContent.children, {
                opacity: 0,
                y: 50,
                scale: 0.95,
                duration: 0.9,
                stagger: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.parallax-cta',
                    start: 'top 65%',
                    once: true
                }
            });
        }

        // --- Stats counter ---
        document.querySelectorAll('.stat-number').forEach(function (num) {
            var target = parseInt(num.dataset.target);
            ScrollTrigger.create({
                trigger: num,
                start: 'top 90%',
                once: true,
                onEnter: function () {
                    gsap.to(num, {
                        textContent: target,
                        duration: 2,
                        ease: 'power1.out',
                        snap: { textContent: 1 },
                        onUpdate: function () {
                            num.textContent = Math.round(parseFloat(num.textContent));
                        }
                    });
                }
            });
        });

        // --- Post cards ---
        gsap.from('.post-card', {
            opacity: 0,
            y: 50,
            scale: 0.9,
            rotateX: 10,
            duration: 0.7,
            stagger: 0.2,
            ease: 'back.out(1.2)',
            scrollTrigger: {
                trigger: '.posts-grid',
                start: 'top 85%',
                once: true
            }
        });

        // --- Footer ---
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

    // =========================================
    // Keyboard support for slider
    // =========================================
    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') { prevSlide(); startAutoplay(); }
        else if (e.key === 'ArrowRight') { nextSlide(); startAutoplay(); }
    });

    // =========================================
    // Touch support for slider
    // =========================================
    var touchStartX = 0;
    var heroEl = document.getElementById('hero');

    heroEl.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    heroEl.addEventListener('touchend', function (e) {
        var diff = touchStartX - e.changedTouches[0].screenX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) { nextSlide(); } else { prevSlide(); }
            startAutoplay();
        }
    }, { passive: true });

});
