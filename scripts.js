document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        window.scrollTo({
            top: targetSection.offsetTop,
            behavior: 'smooth'
        });

        // Close the menu on mobile after clicking a link
        if (window.innerWidth <= 768) {
            document.getElementById('menu').style.display = 'none';
            document.getElementById('menu-icon').classList.remove('change');
        }
    });
});

document.getElementById('menu-icon').addEventListener('click', function() {
    this.classList.toggle('change');
    const menu = document.getElementById('menu');
    if (menu.style.display === 'block') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'block';
    }
    menu.style.animation = 'fadeInOut 0.5s ease-in-out';
});

// FAQ section toggle
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    item.querySelector('.faq-question').addEventListener('click', () => {
        const answer = item.querySelector('.faq-answer');
        const span = item.querySelector('span');

        if (answer.style.display === 'block') {
            answer.style.display = 'none';
            span.style.transform = 'rotate(0deg)';
        } else {
            answer.style.display = 'block';
            span.style.transform = 'rotate(180deg)';
        }
    });
});

// Responsive table for the schedule section
const table = document.querySelector('table');
const tableWrapper = document.createElement('div');
tableWrapper.classList.add('table-wrapper');
table.parentNode.insertBefore(tableWrapper, table);
tableWrapper.appendChild(table);

// Adjust FAQ answer display on page load
document.addEventListener('DOMContentLoaded', () => {
    faqItems.forEach(item => {
        const answer = item.querySelector('.faq-answer');
        answer.style.display = 'none';
    });
});

