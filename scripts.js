// NAVBAR
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
            document.getElementById('bar1').classList.remove('change');
            document.getElementById('bar2').classList.remove('change');
            document.getElementById('bar3').classList.remove('change');
        }
    });
});

//DATE HEADER
let texts = ["21-22 Giugno 2025", "Piazzale Gerani, Matelica"];
let currentIndex = 0;

function changeText() {
    const textElement = document.getElementById("date");

    // Fade out the current text
    textElement.classList.add("hidden");
    textElement.classList.add("animate__animated");
    textElement.classList.add("animate__fadeIn");
    textElement.classList.add("animate__fadeOut");

    // After 1 second, change the text and fade it back in
    setTimeout(() => {
        currentIndex = (currentIndex + 1) % texts.length;
        textElement.textContent = texts[currentIndex];
        textElement.classList.remove("hidden");
        textElement.classList.remove("animate__fadeOut");
    }, 1000);
} 

// Start the text change loop with an initial delay
setInterval(changeText, 3000);

//HERO
document.querySelectorAll('a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        window.scrollTo({
            top: targetSection.offsetTop,
            behavior: 'smooth'
        });
    });
});


//COUNTDOWN
// Set the date of the event
const eventDate = new Date("June 21, 2025 21:00:00").getTime();

const countdownInterval = setInterval(function() {
    const now = new Date().getTime();
    const timeRemaining = eventDate - now;

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = days.toLocaleString('en-US', {minimumIntegerDigits: 2});
    document.getElementById("hours").innerHTML = hours.toLocaleString('en-US', {minimumIntegerDigits: 2});
    document.getElementById("minutes").innerHTML = minutes.toLocaleString('en-US', {minimumIntegerDigits: 2});
    document.getElementById("seconds").innerHTML = seconds.toLocaleString('en-US', {minimumIntegerDigits: 2});

    // Stop the countdown when the time is up
    if (timeRemaining < 0) {
        clearInterval(countdownInterval);
        document.getElementById("days").innerHTML = "00";
        document.getElementById("hours").innerHTML = "00";
        document.getElementById("minutes").innerHTML = "00";
        document.getElementById("seconds").innerHTML = "00";
    }
}, 1000);



// HEADER
const header = document.querySelector("[data-header]");

window.addEventListener('scroll', function() {
  if (window.innerWidth > 768) { // verifica se è un dispositivo con schermo più largo di 768px
      if (window.scrollY > 150) {
          document.querySelector('header').classList.add('active');
      } else {
          document.querySelector('header').classList.remove('active');
      }
  }
});

window.addEventListener('scroll', function() {
  if (window.innerWidth > 768) { // verifica se è un dispositivo con schermo più largo di 768px
      if (window.scrollY > 150) {
          document.querySelector('text').style.display = "none";
      } else {
          document.querySelector('text').style.display = "block"
      }
  }
});


document.getElementById('menu-icon').addEventListener('click', function() {
    this.classList.toggle('change');
    const menu = document.getElementById('menu');
    const bar1 = document.getElementById('bar1');
    const bar2 = document.getElementById('bar2');
    const bar3 = document.getElementById('bar3');
    bar1.classList.toggle('change');
    bar2.classList.toggle('change');
    bar3.classList.toggle('change');
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

        answer.style.animation = 'fadeInOut 0.5s ease-in-out';
    });
});

//ENTRY WORDS
// var words = document.getElementsByClassName('word');
// var wordArray = [];
// var currentWord = 0;

// words[currentWord].style.opacity = 1;
// for (var i = 0; i < words.length; i++) {
//   splitLetters(words[i]);
// }

// function changeWord() {
//   var cw = wordArray[currentWord];
//   var nw = currentWord == words.length-1 ? wordArray[0] : wordArray[currentWord+1];
//   for (var i = 0; i < cw.length; i++) {
//     animateLetterOut(cw, i);
//   }
  
//   for (var i = 0; i < nw.length; i++) {
//     nw[i].className = 'letter behind';
//     nw[0].parentElement.style.opacity = 1;
//     animateLetterIn(nw, i);
//   }
  
//   currentWord = (currentWord == wordArray.length-1) ? 0 : currentWord+1;
// }

// function animateLetterOut(cw, i) {
//   setTimeout(function() {
//     cw[i].className = 'letter out';
//   }, i*80);
// }

// function animateLetterIn(nw, i) {
//   setTimeout(function() {
//     nw[i].className = 'letter in';
//   }, 340+(i*80));
// }

// function splitLetters(word) {
//   var content = word.innerHTML;
//   word.innerHTML = '';
//   var letters = [];
//   for (var i = 0; i < content.length; i++) {
//     var letter = document.createElement('span');
//     letter.className = 'letter';
//     letter.innerHTML = content.charAt(i);
//     word.appendChild(letter);
//     letters.push(letter);
//   }
  
//   wordArray.push(letters);
// }

// changeWord();
// setInterval(changeWord, 4000);

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

// use a script tag or an external JS file

// document.addEventListener("DOMContentLoaded", (event) => {
//     gsap.registerPlugin(ScrollTrigger)
//     gsap.defaults({ease: "none", duration: 4})
    
//     const tl = gsap.timeline();
//         tl.from(".unico", {yPercent: 3000})
//         .from(".coinvolgente", {yPercent: 3000})
//         .from(".fantastico", {yPercent: 3000});
    
//         ScrollTrigger.create({
//             animation: tl,
//             trigger: ".hero",
//             start: "top top",
//             end: () => "+=" + document.querySelector(".hero").offsetWidth,
//             // markers: true,
//             scrub: true,
//             pin: ".hero",
//             anticipatePin: 1,
//             toggleActions: "restart pause reverse pause",
//         })
    
//         // gsap.to('.content', {
//         //     scrollTrigger: {
//         //         trigger: ".hero",
//         //         start: "top top",
//         //         markers: true,
//         //         scrub: true,
//         //         pin: ".title-hero",
//         //         toggleActions: "restart pause reverse pause",
//         //     },
//         //     x: 400,
//         //     rotation: 360,
//         //     duration: 3,
//         //     });
// });

//MARQUEE

let veloce = gsap.to(".marquee__inner", {
    duration: 200, // Durata dell'animazione per un ciclo completo
    xPercent: -100, // Movimento verso sinistra fino al 100% della sua larghezza
    repeat: -1, // Loop infinito
    ease: "linear", // Animazione lineare senza rallentamento
    markers: true,
})

let rallentato = gsap.to(".marquee__inner", {
    duration: 500, // Durata dell'animazione per un ciclo completo
    xPercent: -100, // Movimento verso sinistra fino al 100% della sua larghezza
    repeat: -1, // Loop infinito
    ease: "linear", // Animazione lineare senza rallentamento
    paused: true,
});

let marquee = document.querySelector(".marquee__inner");
  marquee.addEventListener("mouseenter", (e) => {
    veloce.pause()
    rallentato.play()
});
  
marquee.addEventListener("mouseleave", (e) => {
    rallentato.pause()
    veloce.play()
});