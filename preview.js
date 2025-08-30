window.onload = function() {
  // Ambil data dari LocalStorage (saat klik 'Lihat Preview' di index.html)
  const namaSekolah = localStorage.getItem("namaSekolah");
  const mapel = localStorage.getItem("mapel");
  const kelas = localStorage.getItem("kelas");
  const guru = localStorage.getItem("guru");
  const penyusun = localStorage.getItem("penyusun");
  const tahun = localStorage.getItem("tahun");
  const judulMakalah = localStorage.getItem("judulMakalah");
  const kataPengantar = localStorage.getItem("kataPengantar");
  const kesimpulan = localStorage.getItem("kesimpulan");
  const saran = localStorage.getItem("saran");
  const penutup = localStorage.getItem("penutup");
  const babCount = parseInt(localStorage.getItem("babCount"));

  // Buat preview
  let previewHTML = `
    <h3>Nama Sekolah: ${namaSekolah}</h3>
    <p>Mata Pelajaran: ${mapel}</p>
    <p>Kelas: ${kelas}</p>
    <p>Guru: ${guru}</p>
    <p>Disusun oleh: ${penyusun}</p>
    <p>Tahun: ${tahun}</p>
    <h2>${judulMakalah}</h2>
    <p><strong>Kata Pengantar:</strong> ${kataPengantar}</p>
  `;

  // Tampilkan bab-bab
  for (let i = 1; i <= babCount; i++) {
    const babJudul = localStorage.getItem(`judulBab${i}`);
    const babIsi = localStorage.getItem(`isiBab${i}`);
    previewHTML += `
      <h3>Bab ${i}: ${babJudul}</h3>
      <p>${babIsi}</p>
    `;
  }

  // Kesimpulan, Saran, Penutup
  previewHTML += `
    <h3>Kesimpulan:</h3>
    <p>${kesimpulan}</p>
    <h3>Saran:</h3>
    <p>${saran}</p>
    <h3>Penutup:</h3>
    <p>${penutup}</p>
  `;

  // Tampilkan preview
  document.getElementById("previewContent").innerHTML = previewHTML;
}
