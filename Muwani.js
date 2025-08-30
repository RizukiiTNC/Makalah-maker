let babCount = 0;

// Tambah bab dinamis
function tambahBab() {
  babCount++;
  const container = document.getElementById("containerBab");
  const div = document.createElement("div");
  div.id = "bab" + babCount;
  div.innerHTML = `
    <h3>Bab ${babCount}</h3>
    Judul Bab: <input type="text" id="judulBab${babCount}" placeholder="Bab ${babCount}"><br/>
    Isi Bab:<br/>
    <textarea id="isiBab${babCount}" rows="4" cols="50"></textarea><br/>
    Upload Gambar Bab: <input type="file" id="imgBab${babCount}"><br/><br/>
  `;
  container.appendChild(div);
}

// Fungsi read image base64
async function readImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => resolve(e.target.result);
    reader.onerror = e => reject(e);
    if (file) reader.readAsDataURL(file);
    else resolve(null);
  });
}

// Generate PDF
async function buatPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Ambil input cover
  const namaFile = document.getElementById("namaFile").value || "makalah.pdf";
  const judulMakalah = document.getElementById("judulMakalah").value || "Makalah Mini";
  const kataPengantar = document.getElementById("kataPengantar").value || "";
  const logoFile = document.getElementById("logo").files[0];
  const logoImg = await readImage(logoFile);

  const namaSekolah = document.getElementById("namaSekolah").value || "Nama Sekolah";
  const mapel = document.getElementById("mapel").value || "Mata Pelajaran";
  const kelas = document.getElementById("kelas").value || "Kelas";
  const guru = document.getElementById("guru").value || "Guru";
  const penyusun = document.getElementById("penyusun").value || "Penyusun";
  const tahun = document.getElementById("tahun").value || "2025";

  // Halaman Cover
  if (logoImg) doc.addImage(logoImg, 'PNG', 75, 10, 60, 60);
  doc.setFontSize(14);
  doc.text(namaSekolah, 105, 80, null, null, "center");
  doc.text(mapel, 105, 90, null, null, "center");
  doc.text(kelas, 105, 100, null, null, "center");
  doc.text("Guru: " + guru, 105, 110, null, null, "center");
  doc.text("Disusun oleh: " + penyusun, 105, 120, null, null, "center");
  doc.text("Tahun: " + tahun, 105, 130, null, null, "center");
  doc.setFontSize(16);
  doc.text(judulMakalah, 105, 150, null, null, "center");
  doc.addPage();

  // Kata Pengantar
  doc.setFontSize(14);
  doc.text("KATA PENGANTAR", 105, 10, null, null, "center");
  doc.setFontSize(12);
  doc.text(doc.splitTextToSize(kataPengantar, 180), 10, 30);
  doc.addPage();

  // Bab
  for (let i = 1; i <= babCount; i++) {
    const babJudul = document.getElementById("judulBab" + i).value || "Bab " + i;
    const babIsi = document.getElementById("isiBab" + i).value || "";
    const babImgFile = document.getElementById("imgBab" + i).files[0];
    const babImg = await readImage(babImgFile);

    doc.addPage();
    doc.setFontSize(14);
    doc.text(babJudul, 10, 10);
    doc.setFontSize(12);
    doc.text(doc.splitTextToSize(babIsi, 180), 10, 20);
    if (babImg) doc.addImage(babImg, 'PNG', 10, 60, 60, 60);
  }

  // Daftar Pustaka otomatis (dummy contoh)
  doc.addPage();
  doc.setFontSize(14);
  doc.text("DAFTAR PUSTAKA", 105, 10, null, null, "center");
  doc.setFontSize(12);
  let pustaka = [];
  for (let i = 1; i <= babCount; i++) {
    pustaka.push(`${i}. Sumber materi Bab ${i}`);
  }
  doc.text(pustaka.join("\n"), 10, 30);

  // Save PDF dan show alert
  doc.save(namaFile);
  alert("PDF berhasil dibuat! Silahkan cek unduhan Sia.");
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}
