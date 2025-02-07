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
//         import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
       
      
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
//         const userName = document.getElementById("userName").value;
//         const userAge = document.getElementById("userAge").value;
//         const authForm = document.getElementById("authForm");
//         const secretContent = document.getElementById("secretContent");
//         const signUpButton = document.getElementById("signUpButton");
//         const signInButton = document.getElementById("signInButton");
//         const signOutButton = document.getElementById("signOutButton");
//         const signInGoogle = document.getElementById("signInGoogle");
//         const signInGithub = document.getElementById("signInGithub");

//         const userSignUp = async() => {
//             const signUpEmail = userEmail.value;
//             const signUpPassword = userPassword.value;
//             createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword)
//             .then((userCredential) => {
//                 const user = userCredential.user;
//                 const uid = userCredential.user.uid;
//                 const userData = {
//                     name: userName,
//                     age: userAge,
//                     email: signUpEmail
//                 }
//                 const docRef = doc(db, "users", uid);
//                 setDoc(docRef, userData)
//                 .then(() => {
//                     console.log("Document written with ID: ", docRef.id);
//                 })
//                 console.log(user, uid, userData);
//             })
//             .catch((error) => {
//                 const errorCode = error.code;
//                 const errorMessage = error.message;
//                 console.log(errorCode + errorMessage)
//             })
//         }

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
//             })
//         }

//         const userSignInGoogle = async() => {
//             signInWithPopup(auth, provider)
//                 .then((result) => {
//                     const user = result.user
//                     console.log(user);
//             }).catch((error) => {
//                     const errorCode = error.code;
//                     const errorMessage = error.message
//                 })
//         }

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
//   });
//         }

//         const checkAuthState = async() => {
//             onAuthStateChanged(auth, async user => {
//                 if(user) {
//                     window.location.replace('authenticated.html');
//                     document.getElementById('credHTML').innerHTML = user.email;
//                     const userDoc = await getDoc(doc(db, "users", user.uid));
//                 if (userDoc.exists()) {
//                     const userData = userDoc.data();
//                     document.getElementById("welcome-message").innerText = `Buongiorno, ${userData.name}!`;
//                 } else {
//                     console.error("Dati utente non trovati.");
//                 }
//                 }
//                 else {
//                     authForm.style.display = 'block';
//                     secretContent.style.display = 'none';
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