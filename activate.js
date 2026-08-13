async function activateWristband() {
    const input = document.getElementById("activationCode");
    const wristbandInput = document.getElementById("wristbandCode");
    const button = document.getElementById("activateCodeButton");

    const activationCode = input.value.trim().toUpperCase();
    const wristbandCode = wristbandInput?.value.trim().toUpperCase();

    if (!activationCode || !wristbandCode) {
        alert("Inserisci il codice di attivazione e il codice del braccialetto.");
        return;
    }

    const user = window.auth?.currentUser;

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

        const response = await fetch(
            "https://infinity-eventos-api.onrender.com/wristbands/activate",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    activationCode,
                    wristbandCode
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

const box=document.getElementById("my-ticket-list");

if(!box)return;

// MOSTRA SKELETON
box.innerHTML=`
<div class="ticket-skeleton">
    <div class="skeleton-line small"></div>
    <div class="skeleton-line big"></div>
    <div class="skeleton-info"></div>
</div>

<div class="ticket-skeleton">
    <div class="skeleton-line small"></div>
    <div class="skeleton-line big"></div>
    <div class="skeleton-info"></div>
</div>

<div class="ticket-skeleton">
    <div class="skeleton-line small"></div>
    <div class="skeleton-line big"></div>
    <div class="skeleton-info"></div>
</div>
`;

try{
const response = await fetch(
"https://infinity-eventos-api.onrender.com/tickets/user/me",
{
method:"GET",
headers:{
"Authorization":`Bearer ${token}`,
"Content-Type":"application/json"
}
});
const tickets=await response.json();
console.log("TICKET:",tickets);
if(!tickets.length){

box.innerHTML=`
<div class="empty-ticket">
    <h2>🎟️</h2>
    <h3>
        Nessun biglietto trovato
    </h3>
    <p>
        Quando acquisterai un biglietto comparirà qui.
    </p>
</div>
`;
return;
}

box.innerHTML="";
tickets.forEach((ticket,index)=>{

setTimeout(()=>{
box.innerHTML+=`
<article class="ticket loaded">
    <div class="ticket-left">
        <div class="ticket-type">
            ${ticket.type}
        </div>
        <h2>
            ${ticket.festival.name}
        </h2>
        <div class="ticket-info">
            <span>
                🎟️ ${ticket.code}
            </span>
            <span>
                💶 €${ticket.price}
            </span>
            <span>
                ${ticket.status}
            </span>
        </div>
    </div>
    <div class="ticket-right">
    <div id="qr-${ticket.id}" class="ticket-qr"></div>
    </div>
</article>
`;

new QRCode(
document.getElementById(`qr-${ticket.id}`),
    {
        text:ticket.code,
        width:120,
        height:120
    }
);

},index*150);

});

}catch(error){
console.error(error);
box.innerHTML=`
<div class="empty-ticket">
<h3>
Errore caricamento biglietti
</h3>
<p>
Riprova tra poco.
</p>
</div>
`;
}
}

const API_URL="https://infinity-eventos-api.onrender.com";

document
.getElementById("saveProfile")
.addEventListener("click",async()=>{
    const user=auth.currentUser;
    const token=await user.getIdToken();
    await fetch("https://infinity-eventos-api.onrender.com/users/update",{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            Authorization:
            `Bearer ${token}`
        },
        body:JSON.stringify({
            firstName: document.getElementById("userName").value,
            lastName: document.getElementById("userSurname").value,
            phone: document.getElementById("userPhone").value
        })
    });
    alert("Profilo aggiornato");
});

onAuthStateChanged(auth, async (user)=>{
    if(!user){
        window.location.href="index.html";
        return;
    }

    if(user){
        console.log("UTENTE LOGGATO:",user);
        await loadProfile();
    }

    const token = await user.getIdToken();
    loadMyTickets(token);
});

async function loadProfile(){
    const user = window.auth.currentUser;

    if(!user){
        return;
    }

    const token = await user.getIdToken();
    const response = await fetch(
    "https://infinity-eventos-api.onrender.com/users/profile",
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    );

    const profile = await response.json();

    console.log("PROFILO UTENTE:",profile);

    document.getElementById("userEmail").value =
    profile.email || "";

    document.getElementById("userName").value =
    profile.firstName || "";

    document.getElementById("userSurname").value =
    profile.lastName || "";

    document.getElementById("userPhone").value =
    profile.phone || "";

}
