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

const API_URL="https://infinity-eventos-api.onrender.com";
const FESTIVAL_ID="438e5467-925a-40cd-bfdb-1750795e35a2";
async function loadTickets(){
const res=await fetch(
`${API_URL}/ticket-category/${FESTIVAL_ID}`
);
const categories=await res.json();
console.log("CATEGORIE:", categories);
const container=document.getElementById("ticket-list");

container.innerHTML="";
categories.forEach(category=>{

const available =
category.quantity-category.sold;

container.innerHTML+=`
<article class="ticket-card ${category.type==="VIP" ? "featured" : ""}">

    <div class="ticket-top">

        <h3>${category.name}</h3>

        <span class="price">
            €${category.price}
        </span>

    </div>

    <p>
        Vivi VividFest con il pacchetto ${category.name}.
    </p>

    <ul class="ticket-benefits">

        <li>
            <span class="check-icon">
                <img src="img/check.png">
            </span>
            Accesso agli stage
        </li>


        <li>
            <span class="check-icon">
                <img src="img/check.png">
            </span>
            Bancarelle cibo
        </li>

        ${
        category.type==="VIP" || category.type==="BACKSTAGE"
        ?
        `
        <li>
            <span class="check-icon">
                <img src="img/check.png">
            </span>
            Accesso area dedicata
        </li>
        `
        :
        `
        <li class="removed">
            <span class="check-icon">
                <img src="img/remove.png">
            </span>
            Accesso area dedicata
        </li>
        `
        }

        ${
        category.type==="BACKSTAGE"
        ?
        `
        <li>
            <span class="check-icon">
                <img src="img/check.png">
            </span>
            Tour backstage
        </li>
        `
        :
        `
        <li class="removed">
            <span class="check-icon">
                <img src="img/remove.png">
            </span>
            Tour backstage
        </li>
        `
        }

    </ul>

    <div class="ticket-button-container">

        ${
        available>0
        ?
        `
        <button 
        class="buy-ticket-button"
        onclick="buyTicket('${category.id}')">

            <span>
                Acquista Ora
                <img class="arrow-icon" src="img/arrow.png">
            </span>

        </button>
        `
        :
        `
        <button 
        class="buy-ticket-button"
        disabled>

            Esaurito

        </button>
        `
        }
    </div>
</article>
`;
});
}
loadTickets();