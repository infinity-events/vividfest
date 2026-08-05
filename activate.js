import { getAuth } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

const auth = getAuth();

async function activateWristband() {
    const input = document.getElementById("activationCode");
    const button = document.getElementById("activateCodeButton");

    const code = input.value.trim().toUpperCase();

    if (!code) {
        alert("Inserisci il codice del braccialetto.");
        return;
    }

    const user = window.auth.currentUser;

    if (!user) {
        alert("Devi effettuare il login.");
        window.location.href = "/auth.html";
        return;
    }

    try {
        button.disabled = true;
        button.textContent = "Attivazione...";

        // Recupera il token Firebase
        const token = await user.getIdToken();

        console.log("TOKEN:", token);
        console.log("USER UID:", user.uid);

        const response = await fetch(
            "https://infinity-eventos-api.onrender.com/wristbands/activate",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    // code: document.getElementById("wristbandCode").value,
                    activationCode: document.getElementById("activationCode").value
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Errore durante l'attivazione.");
        }

        alert("🎉 Braccialetto attivato con successo!");
        window.location.href = "/index.html";

    } catch (err) {
        console.error(err);
        alert(err.message);

    } finally {
        button.disabled = false;
        button.textContent = "Attiva";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document
        .getElementById("activateCodeButton")
        .addEventListener("click", activateWristband);
});

console.log("activate.js caricato");
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM pronto");

    const btn = document.getElementById("activateButton");
    console.log(btn);

    btn?.addEventListener("click", () => {
        console.log("CLICK");
    });
});

//TICKETS
window.loadMyTickets = async function(token){

const response = await fetch(
"https://infinity-eventos-api.onrender.com/tickets/user/me",
{
method:"GET",
headers:{
    "Authorization": `Bearer ${token}`,
    "Content-Type":"application/json"
}
});

console.log(
"RISPOSTA TICKET:",
response.status
);

const tickets = await response.json();

console.log(
"TICKET:",
tickets
);

const box=document.getElementById(
"my-ticket-list"
);

if(!box)return;

box.innerHTML="";
tickets.forEach(ticket=>{
box.innerHTML += `
<article class="ticket-card">
<h3>
${ticket.festival.name}
</h3>
<p>
Codice:
<b>${ticket.code}</b>
</p>
<p>
Prezzo:
€${ticket.price}
</p>
</article>
`;
});
}

const API_URL=
"https://infinity-eventos-api.onrender.com";

onAuthStateChanged(auth, async (user)=>{
    if(!user){
        console.log("utente non loggato");
        return;
    }
    console.log("utente Firebase:", user.email);
    const token = await user.getIdToken();
    console.log("TOKEN:", token);
    loadMyTickets(token);
});