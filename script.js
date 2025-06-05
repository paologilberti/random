<script type="module">
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

  // Esempio: salva punteggio
  async function salvaPunteggio(nome, punteggio) {
    try {
      await addDoc(collection(db, "punteggi"), {
        nome: nome,
        punteggio: punteggio,
        timestamp: Date.now()
      });
      console.log("Punteggio salvato!");
    } catch (e) {
      console.error("Errore nel salvataggio:", e);
    }
  }

  // Esempio: carica classifica
  async function caricaClassifica() {
    const q = query(collection(db, "punteggi"), orderBy("punteggio", "desc"), limit(10));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      console.log(doc.data()); // qui puoi aggiornare il DOM
    });
  }

  // Chiamate di esempio:
  salvaPunteggio("Mario", 42);
  caricaClassifica();
</script>
