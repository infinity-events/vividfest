// NAVBAR
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        const offset = 40;

        const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });

        // Close the menu on mobile after clicking a link
        if (window.innerWidth <= 768) {
            document.getElementById('menu').classList.remove('open');
            document.getElementById('menu-icon').classList.remove('change');
            document.getElementById('bar1').classList.remove('change');
            document.getElementById('bar2').classList.remove('change');
            document.getElementById('bar3').classList.remove('change');
        }
    });
});

//DATE HEADER
let texts = ["22 Giugno 2026", "Polo Urbano Maria F. Conti, Matelica"];
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

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      const offset = 110; // altezza della navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = target.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    });
  });


//COUNTDOWN
// Set the date of the event
const eventDate = new Date("June 21, 202 21:00:00").getTime();

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
        document.getElementById("countdown").style.display = "none";
    }
}, 1000);



// HEADER
const header = document.querySelector("[data-header]");

window.addEventListener('scroll', function() {
  if (window.innerWidth > 768) { // verifica se è un dispositivo con schermo più largo di 768px
      if (window.scrollY > 150) {
          document.querySelector('.vivid-header-inner').classList.add('active');
          document.querySelector('header').classList.add('active');
      } else {
          document.querySelector('.vivid-header-inner').classList.remove('active');
          document.querySelector('header').classList.remove('active');
      }
  }
});

// window.addEventListener('scroll', function() {
//   if (window.innerWidth > 768) { // verifica se è un dispositivo con schermo più largo di 768px
//       if (window.scrollY > 150) {
//           document.querySelector('text').style.display = "none";
//       } else {
//           document.querySelector('text').style.display = "block"
//       }
//   }
// });


document.getElementById('menu-icon').addEventListener('click', function() {
    this.classList.toggle('change');
    const menu = document.getElementById('menu');
    const bar1 = document.getElementById('bar1');
    const bar2 = document.getElementById('bar2');
    const bar3 = document.getElementById('bar3');
    bar1.classList.toggle('change');
    bar2.classList.toggle('change');
    bar3.classList.toggle('change');
    menu.classList.toggle('open');
    menu.style.animation = 'fadeInOut 0.5s ease-in-out';
});

window.addEventListener('resize', function() {
    const menu = document.getElementById('menu');
    const menuIcon = document.getElementById('menu-icon');
    const bar1 = document.getElementById('bar1');
    const bar2 = document.getElementById('bar2');
    const bar3 = document.getElementById('bar3');

    if (window.innerWidth > 768) {
        menu.classList.remove('open');
        menuIcon.classList.remove('change');
        bar1.classList.remove('change');
        bar2.classList.remove('change');
        bar3.classList.remove('change');
    }
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

if(table){
    const tableWrapper = document.createElement('div');
    tableWrapper.classList.add('table-wrapper');
    table.parentNode.insertBefore(
        tableWrapper,
        table
    );
    tableWrapper.appendChild(table);
}

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
    veloce.play()
});

//SIGN IN
const userSignInHome = async() => {
    window.location.href = 'auth.html';
}

document.addEventListener('DOMContentLoaded', () => {
    const signInBtn = document.getElementById('signInBtn');
    if (signInBtn) {
        signInBtn.addEventListener('click', userSignInHome);
    }
});

//DASHBOARD
document.addEventListener("keydown", function(dashE) {
    if ((dashE.ctrlKey || dashE.metaKey) && dashE.key === 'u') {
        window.location.href = "https://infinity-events.github.io/dashboard-vivid";
    }
});


// FIREBASE
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    GoogleAuthProvider, 
    signInWithPopup,
    GithubAuthProvider
//Update the below URL with the appropriate version if necessary.
    } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAreXtr2VRoi9FrPR1PSNhrM1qfWyzpYqw",
    authDomain: "sample-firebase-ai-app-be9db.firebaseapp.com",
    projectId: "sample-firebase-ai-app-be9db",
    storageBucket: "sample-firebase-ai-app-be9db.firebasestorage.app",
    messagingSenderId: "301656458329",
    appId: "1:301656458329:web:fbc1fd553ca2912b9c9d48"
};

        const signOutButton = document.getElementById("signOutButton");
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        const db = getFirestore(app);
        const provider = new GoogleAuthProvider();
        console.log("Firebase pronto:", window.auth);

        const emailSpan = document.getElementById('userEmail');
        const emailFromSession = sessionStorage.getItem('userEmail');

        window.auth = auth; // Rende auth accessibile globalmente
        console.log("AUTH GLOBALE:", window.auth);
        window.db = db; // Rende db accessibile globalmente 
        window.provider = new GoogleAuthProvider(); // Rende provider accessibile globalmente 
        window.signInWithPopup = signInWithPopup; // Rende signIn accessibile globalmente 

        const accountContainer = document.getElementById("account-container");

        onAuthStateChanged(auth, (user)=>{
            if(!accountContainer) return;
            if(user){
                accountContainer.innerHTML = `
                <a href="authenticated.html" class="profile-icon">
                    <img src="${user.photoURL}" class="profile-avatar"></a>
                </a>
                `;
            } else {
                accountContainer.innerHTML = `
                <button id="signInBtn">
                    Registrati
                </button>
                `;
                document.getElementById("signInBtn")
                ?.addEventListener("click",()=>{
                    window.location.href="auth.html";
                });
            }
        });


//         if (emailFromSession) {
//     emailSpan.textContent = emailFromSession;
//     if (nameFromSession && welcome) welcome.innerText = `Buongiorno, ${nameFromSession}!`;
//   } else {
//     // Fallback: se non trovi nulla, recupera via Auth+Firestore
//     onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         emailSpan.textContent = user.email || '';
//         try {
//           const udoc = await getDoc(doc(db, "users", user.uid));
//           if (udoc.exists() && welcome) {
//             welcome.innerText = `Buongiorno, ${udoc.data().name || ''}!`;
//           }
//         } catch (err) {
//           console.error('Errore recupero doc in authenticated.html', err);
//         }
//       } else {
//         // non loggato -> ritorna al login
//         window.location.replace('index.html');
//       }
//     });
//   }

        const userSignOut = async() => {
            await signOut(auth);
            checkAuthState();
        }

        signOutButton.addEventListener('click', userSignOut);

    const API_URL="https://infinity-eventos-api.onrender.com";
    const FESTIVAL_ID="8680b3bb-d661-4759-b918-96918eb3f6bc";

async function loadMyTickets(){
    console.log("CARICAMENTO TICKET");
    const user = window.auth.currentUser;
    console.log("USER:", user);
    if(!user){
        console.log("NESSUN UTENTE");
        return;
    }

    const token = await user.getIdToken();
    console.log("TOKEN:", token);

    const response = await fetch(
    "https://infinity-eventos-api.onrender.com/tickets/user/me",
    {
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    );
    console.log("STATUS API:", response.status);

    const tickets = await response.json();
    console.log("TICKET RICEVUTI:", tickets);

    const container =
    document.getElementById("my-ticket-list");

    if(!container) return;

    container.innerHTML="";

    tickets.forEach(ticket=>{
    container.innerHTML += `
    <article class="ticket-card">
        <div class="ticket-top">
            <h3>${ticket.type}</h3>
            <span class="price">
            €${ticket.price}
            </span>
        </div>
        <p>
        Codice:
        <strong>${ticket.code}</strong>
        </p>
        <p>
        Festival:
        ${ticket.festival.name}
        </p>
        <div class="qr-container" id="qr-${ticket.id}">
        </div>
    </article>
    `;
    new QRCode(
    document.getElementById(`qr-${ticket.id}`),
    {text:ticket.code,width:180,height:180}
    );
    });
}
