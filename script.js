// Configura Firebase (SOSTITUISCI QUESTI DATI con i tuoi da Firebase)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_DOMAIN.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET.appspot.com",
  messagingSenderId: "YOUR_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const startBtn = document.getElementById("startBtn");
const clickBtn = document.getElementById("clickBtn");
const scoreEl = document.getElementById("score");
const scoresList = document.getElementById("scoresList");

let score = 0;
let timer;

startBtn.onclick = () => {
  score = 0;
  scoreEl.textContent = score;
  clickBtn.disabled = false;
  startBtn.disabled = true;

  timer = setTimeout(() => {
    clickBtn.disabled = true;
    startBtn.disabled = false;
    salvaPunteggio(score);
  }, 10000);
};

clickBtn.onclick = () => {
  score++;
  scoreEl.textContent = score;
};

function salvaPunteggio(punti) {
  const nome = prompt("Inserisci il tuo nome:");
  if (!nome) return;

  db.collection("punteggi").add({
    nome: nome,
    punteggio: punti,
    timestamp: Date.now()
  }).then(() => {
    caricaClassifica();
  });
}

function caricaClassifica() {
  scoresList.innerHTML = "";

  db.collection("punteggi")
    .orderBy("punteggio", "desc")
    .limit(10)
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        const dati = doc.data();
        const li = document.createElement("li");
        li.textContent = `${dati.nome}: ${dati.punteggio}`;
        scoresList.appendChild(li);
      });
    });
}

// carica classifica al caricamento
caricaClassifica();
