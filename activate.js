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
        const token = await user.getIdToken();
        const response = await fetch("https://http://192.168.1.189:3000/wristbands/activate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                code
            })
        });
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