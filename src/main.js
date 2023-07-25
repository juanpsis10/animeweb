import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import { initializeApp } from "firebase/app";
import "bootstrap";

const firebaseConfig = {
  apiKey: "AIzaSyANHTBbCU5RYbzZBFOo9TZk93z6Kgbp7ks",
  authDomain: "proyectoanime-986a8.firebaseapp.com",
  projectId: "proyectoanime-986a8",
  storageBucket: "proyectoanime-986a8.appspot.com",
  messagingSenderId: "281835488208",
  appId: "1:281835488208:web:53d94575a8f6a5fd232fd5",
  measurementId: "G-3WF8H2HZ8X",
};

// Initialize Firebase
initializeApp(firebaseConfig);

createApp(App).mount("#app");
