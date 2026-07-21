document.addEventListener('DOMContentLoaded', function () {

    var grid = document.querySelector('.quotes-grid');
    if (!grid) return;

    var cards = grid.querySelectorAll('.quote-card');
    if (cards.length < 2) return;

    grid.classList.add('as-slider');

    var current = 0;
    var timer = null;

    // Dots
    var dots = document.createElement('div');
    dots.className = 'quotes-slider-dots';
    cards.forEach(function (_, i) {
        var dot = document.createElement('button');
        dot.setAttribute('aria-label', 'Go to quote ' + (i + 1));
        dot.addEventListener('click', function () {
            show(i);
            restart();
        });
        dots.appendChild(dot);
    });
    grid.parentNode.appendChild(dots);

    // Arrows
    var prev = document.createElement('button');
    prev.className = 'quotes-slider-arrow prev';
    prev.setAttribute('aria-label', 'Previous quote');
    prev.innerHTML = '&#10094;';
    prev.addEventListener('click', function () {
        show((current - 1 + cards.length) % cards.length);
        restart();
    });

    var next = document.createElement('button');
    next.className = 'quotes-slider-arrow next';
    next.setAttribute('aria-label', 'Next quote');
    next.innerHTML = '&#10095;';
    next.addEventListener('click', function () {
        show((current + 1) % cards.length);
        restart();
    });

    grid.appendChild(prev);
    grid.appendChild(next);

    function show(i) {
        current = i;
        cards.forEach(function (card, idx) {
            card.classList.toggle('active', idx === i);
        });
        dots.querySelectorAll('button').forEach(function (dot, idx) {
            dot.classList.toggle('active', idx === i);
        });
    }

    function restart() {
        clearInterval(timer);
        timer = setInterval(function () {
            show((current + 1) % cards.length);
        }, 6000);
    }

    grid.addEventListener('mouseenter', function () {
        clearInterval(timer);
    });

    grid.addEventListener('mouseleave', restart);

    show(0);
    restart();

});
