import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA-wvBGzlYI9NHjVZBq7wbUHtEWrN3AFI8",
  authDomain: "pasarbarokah-56d6c.firebaseapp.com",
  projectId: "pasarbarokah-56d6c",
  storageBucket: "pasarbarokah-56d6c.appspot.com",
  messagingSenderId: "316348641371",
  appId: "1:316348641371:web:5ad38a561e7d73744acf7e",
  measurementId: "G-W3SBB85TF1"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//ambildatabase
export async function ambilDaftarPenjual() {
  const refDokumen = collection(db, "penjual");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikanKueri = await getDocs(kueri);

  let hasil = [];
  cuplikanKueri.forEach((dok) => {
    hasil.push({
      id: dok.id,
      nama: dok.data().nama,
      alamat: dok.data().alamat,
      email: dok.data().email,
      noTlpn: dok.data().noTlpn,
    });
  });



  return hasil;
}
//#########$$$###$$#####

export function formatAngka(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export async function tambahPenjual(nama, alamat, email, noTlpn) {
  try {
    const dokRef = await addDoc(collection(db, 'penjual'), {
      nama: nama,
      alamat: alamat,
      email: email,
      noTlpn: noTlpn,
    });
    console.log('berhasil menembah penjual ' + dokRef.id);
  } catch (e) {
    console.log('gagal menambah penjual ' + e);
  }
}

export async function hapusPenjual(docId) {
  await deleteDoc(doc(db, "penjual", docId));
}

export async function ubahPenjual(docId, nama, alamat, email, noTlpn) {
  await updateDoc(doc(db, "penjual", docId), {
    nama: nama,
    alamat: alamat,
    email: email,
    noTlpn: noTlpn,
  });
}

export async function ambilPenjual(docId) {
  const docRef = await doc(db, "penjual", docId);
  const docSnap = await getDoc(docRef);

  return await docSnap.data();
}