let babCount = 0;

function tambahBab() {
  babCount++;
  const container = document.getElementById("containerBab");
  const div = document.createElement("div");
  div.id = "bab" + babCount;
  div.innerHTML = `
    <h3>Bab ${babCount}</h3>
    Judul Bab: <input type="text" id="judulBab${babCount}" placeholder="Judul Bab ${babCount}"><br/>
    Isi Bab:<br/><textarea id="isiBab${babCount}" rows="4" placeholder="Isi Bab ${babCount}"></textarea><br/>
    Upload Gambar Bab: <input type="file" id="imgBab${babCount}"><br/><br/>
  `;
  container.appendChild(div);
}

async function readImage(file) {
  return new Promise((resolve,reject)=>{
    const reader=new FileReader();
    reader.onload=e=>resolve(e.target.result);
    reader.onerror=e=>reject(e);
    if(file) reader.readAsDataURL(file);
    else resolve(null);
  });
}

async function buatPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const namaFile = document.getElementById("namaFile").value || "makalah.pdf";
  const judulMakalah = document.getElementById("judulMakalah").value || "Makalah Mini";
  const kataPengantar = document.getElementById("kataPengantar").value || "";
  const kesimpulan = document.getElementById("kesimpulan").value || "";
  const saran = document.getElementById("saran").value || "";
  const penutup = document.getElementById("penutup").value || "";

  const logoFile = document.getElementById("logo").files[0];
  const logoImg = await readImage(logoFile);

  const namaSekolah = document.getElementById("namaSekolah").value || "Nama Sekolah";
  const mapel = document.getElementById("mapel").value || "Mata Pelajaran";
  const kelas = document.getElementById("kelas").value || "Kelas";
  const guru = document.getElementById("guru").value || "Guru";
  const penyusun = document.getElementById("penyusun").value || "Penyusun";
  const tahun = document.getElementById("tahun").value || "2025";

  // Halaman Cover
  if(logoImg) doc.addImage(logoImg,'PNG',75,10,60,60);
  doc.setFontSize(14);
  doc.text(`Nama Sekolah: ${namaSekolah}`,105,80,null,null,"center");
  doc.text(`Mata Pelajaran: ${mapel}`,105,90,null,null,"center");
  doc.text(`Kelas: ${kelas}`,105,100,null,null,"center");
  doc.text(`Guru: ${guru}`,105,110,null,null,"center");
  doc.text(`Disusun oleh: ${penyusun}`,105,120,null,null,"center");
  doc.text(`Tahun: ${tahun}`,105,130,null,null,"center");
  doc.setFontSize(16);
  doc.text(`Judul Makalah: ${judulMakalah}`,105,150,null,null,"center");
  doc.addPage();

  // Kata Pengantar
  doc.setFontSize(14); doc.text("KATA PENGANTAR",105,10,null,null,"center");
  doc.setFontSize(12); doc.text("Kata Pengantar: "+kataPengantar,10,30);

  // Daftar Pustaka halaman 2
  doc.addPage();
  doc.setFontSize(14); doc.text("DAFTAR PUSTAKA",105,10,null,null,"center");
  doc.setFontSize(12);
  let pustaka=[];
  for(let i=1;i<=babCount;i++){
    const babJudul=document.getElementById("judulBab"+i).value || "Bab "+i;
    pustaka.push(`${i}. Bab ${i}: ${babJudul}`);
  }
  doc.text("Daftar Pustaka:\n"+pustaka.join("\n"),10,30);

  // Bab Dinamis
  for(let i=1;i<=babCount;i++){
    const babJudul=document.getElementById("judulBab"+i).value || "Bab "+i;
    const babIsi=document.getElementById("isiBab"+i).value || "";
    const babImgFile=document.getElementById("imgBab"+i).files[0];
    const babImg=await readImage(babImgFile);

    doc.addPage();
    doc.setFontSize(14);
    doc.text(`Bab ${i}: ${babJudul}`,10,10);
    doc.setFontSize(12);
    doc.text("Isi Bab: "+babIsi,10,20);
    if(babImg) doc.addImage(babImg,'PNG',10,60,60,60);
  }

  // Kesimpulan, Saran, Penutup
  const sections=[{title:"Kesimpulan", content:kesimpulan},{title:"Saran", content:saran},{title:"Penutup", content:penutup}];
  for(const sec of sections){
    doc.addPage();
    doc.setFontSize(14); doc.text(sec.title,105,10,null,null,"center");
    doc.setFontSize(12); doc.text(sec.title+": "+sec.content,10,30);
  }

  // Save PDF & alert
  doc.save(namaFile);
  alert("PDF berhasil dibuat! Silahkan cek unduhan Anda.");
}

function toggleDarkMode(){ document.body.classList.toggle('dark-mode'); }

function lihatPreview() {
  // Ambil input dan simpan ke localStorage
  localStorage.setItem("namaSekolah", document.getElementById("namaSekolah").value);
  localStorage.setItem("mapel", document.getElementById("mapel").value);
  localStorage.setItem("kelas", document.getElementById("kelas").value);
  localStorage.setItem("guru", document.getElementById("guru").value);
  localStorage.setItem("penyusun", document.getElementById("penyusun").value);
  localStorage.setItem("tahun", document.getElementById("tahun").value);
  localStorage.setItem("judulMakalah", document.getElementById("judulMakalah").value);
  localStorage.setItem("kataPengantar", document.getElementById("kataPengantar").value);
  localStorage.setItem("kesimpulan", document.getElementById("kesimpulan").value);
  localStorage.setItem("saran", document.getElementById("saran").value);
  localStorage.setItem("penutup", document.getElementById("penutup").value);
  localStorage.setItem("babCount", babCount);

  // Simpan setiap bab
  for (let i = 1; i <= babCount; i++) {
    localStorage.setItem(`judulBab${i}`, document.getElementById(`judulBab${i}`).value);
    localStorage.setItem(`isiBab${i}`, document.getElementById(`isiBab${i}`).value);
  }

  // Pindah ke halaman preview
  window.location.href = "preview.html";
}
