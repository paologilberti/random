import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, limit } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA7bTcvcTOflPISWGQC7v7YaVATfyBjaao",
  authDomain: "random-olivander.firebaseapp.com",
  projectId: "random-olivander",
  storageBucket: "random-olivander.firebasestorage.app",
  messagingSenderId: "613600896235",
  appId: "1:613600896235:web:3e463be8ea89bbfd300aae",
  measurementId: "G-68GXNRDX22"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// elementi HTML
const startBtn = document.getElementById("startBtn");
const clickBtn = document.getElementById("clickBtn");
const scoreEl = document.getElementById("score");
const scoresList = document.getElementById("scoresList");

let score = 0;
let timer = null;

startBtn.addEventListener("click", () => {
  score = 0;
  scoreEl.textContent = score;
  clickBtn.disabled = false;
  startBtn.disabled = true;

  timer = setTimeout(async () => {
    clickBtn.disabled = true;
    startBtn.disabled = false;

    const nome = prompt("Inserisci il tuo nome:");
    if (nome) {
      await addDoc(collection(db, "punteggi"), {
        nome: nome,
        punteggio: score,
        timestamp: Date.now()
      });
      caricaClassifica();
    }
  }, 10000); // 10 secondi
});

clickBtn.addEventListener("click", () => {
  score++;
  scoreEl.textContent = score;
});

async function caricaClassifica() {
  scoresList.innerHTML = "";
  const q = query(collection(db, "punteggi"), orderBy("punteggio", "desc"), limit(10));
  const snapshot = await getDocs(q);
  snapshot.forEach(doc => {
    const data = doc.data();
    const li = document.createElement("li");
    li.textContent = `${data.nome}: ${data.punteggio}`;
    scoresList.appendChild(li);
  });
}

// carica la classifica appena si apre
caricaClassifica();
