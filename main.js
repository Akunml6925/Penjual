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

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlahoJjeK0jyO-4tZlAiPRjym6Mxn2P6o",
  authDomain: "insan-cemerlang-59727.firebaseapp.com",
  projectId: "insan-cemerlang-59727",
  storageBucket: "insan-cemerlang-59727.appspot.com",
  messagingSenderId: "839220708273",
  appId: "1:839220708273:web:4d1dde85cf74aebd1d7390",
  measurementId: "G-1VP3D59R0T"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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

export function formatAngka(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export async function tambahPembeli(nama, alamat, email, noTlpn) {
  try {
    const dokRef = await addDoc(collection(db, 'penjual'), {
      nama: nama,
      alamat: alamat,
      email: email,
      noTlpn: noTlpn,
    });
    console.log('berhasil menembah produk ' + dokRef.id);
  } catch (e) {
    console.log('gagal menambah produk ' + e);
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