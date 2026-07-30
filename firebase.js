//         //Update the below URL with the appropriate version if necessary.
//         import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
//         import {
//             getAuth,
//             createUserWithEmailAndPassword,
//             signInWithEmailAndPassword,
//             onAuthStateChanged,
//             signOut,
//             GoogleAuthProvider, 
//             signInWithPopup,
//             GithubAuthProvider
//         //Update the below URL with the appropriate version if necessary.
//         } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
//         import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
       
      
//         // INSERT YOUR FIREBASE CONFIG OBJECT HERE
//     const firebaseConfig = {
//         apiKey: "AIzaSyAreXtr2VRoi9FrPR1PSNhrM1qfWyzpYqw",
//         authDomain: "sample-firebase-ai-app-be9db.firebaseapp.com",
//         projectId: "sample-firebase-ai-app-be9db",
//         storageBucket: "sample-firebase-ai-app-be9db.firebasestorage.app",
//         messagingSenderId: "301656458329",
//         appId: "1:301656458329:web:fbc1fd553ca2912b9c9d48"
//     };
      
    
//         const app = initializeApp(firebaseConfig);
//         const auth = getAuth(app);
//         const db = getFirestore();
//         const provider = new GoogleAuthProvider()
//         const providerGithub = new GithubAuthProvider();

//         const userEmail = document.getElementById("userEmail");
//         const userPassword = document.getElementById("userPassword");
//         const userName = document.getElementById("userName");
//         const userAge = document.getElementById("userAge");
//         const userWhy = document.getElementById("userWhy");
//         const showPassword = document.getElementById("showPassword");
//         const authForm = document.getElementById("authForm");
//         const secretContent = document.getElementById("secretContent");
//         const signUpButton = document.getElementById("signUpButton");
//         const signInButton = document.getElementById("signInButton");
//         const signOutButton = document.getElementById("signOutButton");
//         const signInGoogle = document.getElementById("signInGoogle");
//         const signInGithub = document.getElementById("signInGithub");
//         const allowedDomains = ["gmail.com", "yahoo.com", "yahoo.it", "libero.it", "icloud.com", "outlook.com", "hotmail.com", "alice.it"];
//         const emailSpan = document.getElementById('userEmail');
//         const emailFromSession = sessionStorage.getItem('userEmail');

//         secretContent.style.display = 'none';
// const userSignUp = async () => {

//     const signUpEmail = userEmail.value;
//     const signUpPassword = userPassword.value;
//     const signUpName = userName.value;
//     const signUpAge = userAge.value;
//     const signUpWhy = userWhy.value;

//     try {
//         const userCredential = await createUserWithEmailAndPassword(
//             auth,
//             signUpEmail,
//             signUpPassword
//         );
//         const user = userCredential.user;
//         const uid = user.uid;
//         console.log("Firebase user:", user);

//         // Sincronizzazione con PostgreSQL tramite backend NestJS
//         const response = await fetch(
//             "https://infinity-eventos-api.onrender.com/users/sync",
//             {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({
//                     firebaseUid: uid,
//                     email: signUpEmail,
//                     firstName: signUpName,
//                     lastName: ""
//                 })
//             }
//         );
//         if (!response.ok) {
//             throw new Error("Errore sincronizzazione utente nel database");
//         }
//         console.log("Utente sincronizzato nel backend");


//         // Salvataggio dati aggiuntivi su Firestore
//         const userData = {
//             name: signUpName,
//             age: signUpAge,
//             email: signUpEmail,
//             why: signUpWhy
//         };
//         const docRef = doc(db, "users", uid);
//         await setDoc(docRef, userData);
//         console.log("Documento Firestore creato:", docRef.id);
//         console.log(user, uid, userData);
//     } catch (error) {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         console.log(errorCode + " " + errorMessage);
//         if (errorMessage.includes("auth/email-already-in-use")) {
//             notification.innerText =
//                 "Questa email è già in uso. Prova con un'altra.";
//             document.getElementById("userEmail").style.border =
//                 "1px solid red";
//         } else if (errorMessage.includes("auth/invalid-email")) {
//             notification.innerText =
//                 "L'email inserita non è valida. Controlla e riprova.";
//         } else if (errorMessage.includes("auth/weak-password")) {
//             notification.innerText =
//                 "La password è troppo debole. Usa almeno 6 caratteri.";
//         } else if (
//             !allowedDomains.includes(
//                 signUpEmail.split('@')[1]?.toLowerCase()
//             )
//         ) {
//             notification.innerText =
//                 "Usa un'email valida (es. gmail.com, yahoo.com, libero.it, outlook.com, icloud.com).";
//         } else {
//             notification.innerText =
//                 "Si è verificato un errore imprevisto. Riprova più tardi.";
//         }
//         showNotification(notification.innerText);
//     }
// };

//         const userSignIn = async() => {
//             const signInEmail = userEmail.value;
//             const signInPassword = userPassword.value;
//             signInWithEmailAndPassword(auth, signInEmail, signInPassword)
//             .then((userCredential) => {
//                 const user = userCredential.user;
//             })
//             .catch((error) => {
//                 const errorCode = error.code;
//                 const errorMessage = error.message;
//                 console.log(errorCode + errorMessage)
//                                // Mostra un messaggio personalizzato in base al contenuto del messaggio di errore
//     if (errorMessage.includes("email-already-in-use")) {
//       notification.innerText = "Questa email è già in uso. Accedi o prova con un'altra.";
//     } else if (errorMessage.includes("invalid-email")) {
//         notification.innerText = "L'email inserita non è valida. Controlla e riprova.";
//     } else if (errorMessage.includes("weak-password")) {
//         notification.innerText = "La password è troppo debole. Usa almeno 6 caratteri e includi numeri e simboli (_,!,-,?,*).";
//     } else {
//         notification.innerText = "Credenziali non valide. Riprova.";
//     }
//     showNotification(notification.innerText);
//                 showNotification(notification.innerText);
//             })
//         }

//         const userSignInGoogle = async () => {
//             try {
//                 const result = await signInWithPopup(auth, provider);
//                 const user = result.user;
//                 console.log("Google user:", user);
//                 const response = await fetch(
//                     "https://infinity-eventos-api.onrender.com/users/sync",
//                     {
//                         method: "POST",
//                         headers: {
//                             "Content-Type": "application/json"
//                         },
//                         body: JSON.stringify({
//                             firebaseUid: user.uid,
//                             email: user.email,
//                             firstName: user.displayName || "",
//                             lastName: ""
//                         })
//                     }
//                 );
//                 if (!response.ok) {
//                     throw new Error("Errore sincronizzazione utente Google");
//                 }
//                 console.log("Utente Google sincronizzato nel backend");
//             } catch (error) {
//                 const errorCode = error.code;
//                 const errorMessage = error.message;
//                 console.log(errorCode, errorMessage);
//                 showNotification(errorMessage);
//             }
//         };

//         const userSignInGithub = async() => {
//             signInWithPopup(auth, providerGithub)
//                 .then((result) => {
//                     const credential = GithubAuthProvider.credentialFromResult(result);
//                     const token = credential.accessToken;
//                     const user = result.user;
//                     console.log(user);
//                 }).catch((error) => {
//                     const errorCode = error.code;
//                     const errorMessage = error.message;
//                     const email = error.customData.email;
//                     const credential = GithubAuthProvider.credentialFromError(error);
//                     // ...
//                 });
//         }

//         const checkAuthState = async() => {
            
//             onAuthStateChanged(auth, async user => {
//                 if(user) {
//                     secretContent.style.display = 'block';
//                     authForm.style.display = 'none';
//                     body.style.backgroundColor = '#fff';
//                     const userDoc = await getDoc(doc(db, "users", user.uid));
//                     setTimeout(() => {
//                         window.location.replace('authenticated.html');
//                         body.style.backgroundColor = '#FAF3F0';
//                     }, "3000");
//                 if (userDoc.exists()) {
//                     const userData = userDoc.data();
//                     document.getElementById("welcome-message").innerText = `Buongiorno, ${userData.name}!`;
//                 } else {
//                     console.error("Dati utente non trovati.");
//                 }
//                 }
//                 else {
//                     secretContent.style.display = 'none';
//                     authForm.style.display = 'block';
//                 }
//             })
//         }

//         const userSignOut = async() => {
//             await signOut(auth);
            
//         }
//         checkAuthState();
        

//         signUpButton.addEventListener('click', userSignUp);
//         signInButton.addEventListener('click', userSignIn);
//         signInGoogle.addEventListener('click', userSignInGoogle);
//         signInGithub.addEventListener('click', userSignInGithub);
//         signOutButton.addEventListener('click', userSignOut);

//         userPassword.addEventListener("keydown", function(event) {
//             if (event.key === "Enter") {
//                 event.preventDefault();
//                 if (signInButton.style.display === 'block') {
//                     userSignIn();
//                 } else {
//                     userSignUp();
//                 }
//             }
//         });

//         userWhy.addEventListener("keydown", function(event) {
//             if (event.key === "Enter") {
//                 event.preventDefault();
//                 if (signInButton.style.display === 'block') {
//                     userSignIn();
//                 } else {
//                     userSignUp();
//                 }
//             }
//         });

//         //Notification
//         const notification = document.querySelector('.notification');

//         const showNotification = (message) => {
//             notification.textContent = message;
//             notification.classList.add('active');
//             setTimeout(() => {
//                 notification.classList.remove('active');
//                 notification.textContent = '';
//             }, 4000)
//         }

//         const signTabIn = document.getElementById('signTabIn');
//         const signTabUp = document.getElementById('signTabUp');
//         const userNameField = document.querySelector('.nameField');
//         const userAgeField = document.querySelector('.ageField');
//         const userWhyField = document.querySelector('.whyField');
//         const form = document.getElementById('form');
//         const terms = document.getElementById('terms');
//         const button = document.querySelector('.button');
//         const termsT = document.getElementById('terms-t');
//         const body = document.querySelector('body');

//         signUpButton.style.display = 'none';
//         userNameField.style.display = 'none';
//         userAgeField.style.display = 'none';
//         userWhyField.style.display = 'none';
//         form.style.height = '290px';
//         // terms.style.display = 'none';
        

//         const changeTabIn = () => {
//             signTabIn.classList.add('active');
//             signTabUp.classList.remove('active');
//             signInButton.style.display = 'block';
//             signUpButton.style.display = 'none';
//             userNameField.style.display = 'none';
//             userAgeField.style.display = 'none';
//             userWhyField.style.display = 'none';
//             form.style.height = '290px';
//             // terms.style.display = 'none';
//         }

//         const changeTabUp = () => {
//             signTabUp.classList.add('active');
//             signTabIn.classList.remove('active');
//             userNameField.style.display = 'block';
//             userAgeField.style.display = 'block';
//             userWhyField.style.display = 'block';
//             signUpButton.style.display = 'block';
//             signInButton.style.display = 'none';
//             form.style.height = '425px';
//             button.style.marginTop = '25px';
//             termsT.style.marginB = '2px';
//         }

//         signTabIn.addEventListener('click', changeTabIn);
//         signTabUp.addEventListener('click', changeTabUp);
//         showPassword.addEventListener('click', () => {
//             if(userPassword.type === 'password') {
//                 userPassword.type = 'text';
//                 showPassword.innerHTML = '<i class="fi fi-rr-eye-crossed"></i>';
//             } else {
//                 userPassword.type = 'password';
//                 showPassword.innerHTML = '<i class="fi fi-rr-eye"></i>';
//             }
//         })
        

//         window.auth = auth; // Rende auth accessibile globalmente
//         window.db = db; // Rende db accessibile globalmente 

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

//         const userSignOut = async() => {
//             await signOut(auth);
//             checkAuthState();
//         }

//         signOutButton.addEventListener('click', userSignOut);