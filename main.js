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
  apiKey: "AIzaSyB8g6kCR8laDnH1YCF9cYVy10lF1y7s2i0",
  authDomain: "bakwan-jagung.firebaseapp.com",
  projectId: "bakwan-jagung",
  storageBucket: "bakwan-jagung.appspot.com",
  messagingSenderId: "710653450064",
  appId: "1:710653450064:web:5cbf9ff4240922b03ffe55",
  measurementId: "G-VBHD7G08PJ"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
//fungsi untuk menampilkan data
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
      gmail: dok.data().gmail,
      noTlpn: dok.data().noTlpn,
    });
  });



  return hasil;
}

export function formatAngka(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
//fungsi untuk menambahkan data
export async function tambahPenjual(nama, alamat, gmail, noTlpn) {
  try {
    const dokRef = await addDoc(collection(db, 'penjual'), {
      nama: nama,
      alamat: alamat,
      gmail: gmail,
      noTlpn: noTlpn
    });
    console.log('berhasil menembah produk ' + dokRef.id);
  } catch (e) {
    console.log('gagal menambah produk ' + e);
  }
}
//fungsi untuk hapus data
export async function hapusPenjual(docId) {
  await deleteDoc(doc(db, "penjual", docId));
}
//fungsi untuk ubah data
export async function ubahPenjual(docId, nama, alamat, gmail, noTlpn) {
  await updateDoc(doc(db, "penjual", docId), {
    nama: nama,
    alamat: alamat,
    gmail: gmail,
    noTlpn: noTlpn
  });
}
//fungsi untuk ambil data dan untuk diubah
export async function ambilPenjual(docId) {
  const docRef = await doc(db, "penjual", docId);
  const docSnap = await getDoc(docRef);

  return await docSnap.data();
}