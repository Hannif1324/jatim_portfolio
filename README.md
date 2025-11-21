# Jatim Portfolio (JATIMPROF)

Aplikasi profil Jawa Timur berbasis web yang menampilkan kota, wisata, dan kuliner dalam format modern, responsif, dan mudah digunakan.

## 📌 Deskripsi Singkat

Jatim Portfolio adalah aplikasi single-page (SPA) berbasis JavaScript murni yang menyajikan informasi lengkap tentang Jawa Timur. Aplikasi ini dikembangkan oleh Tim **Doa Ibu** untuk Lomba AREK AI Murid Jatim 2025.

Aplikasi ini memadukan desain modern, fitur interaktif seperti modal lokasi, pencarian, statistik, carousel, serta dukungan tema gelap/terang.

---

## 🚀 Fitur Utama

* Navigasi multi-halaman dengan hash routing
* Tema gelap dan terang dengan penyimpanan preferensi user
* Modal lokasi interaktif (Google Maps, harga tiket, harga makanan)
* Filter kota untuk wisata dan kuliner
* Carousels di halaman utama
* Statistik interaktif menggunakan Chart.js
* Desain responsif untuk mobile/tablet/desktop
* Penyimpanan data lokal menggunakan IndexedDB (LocalBase)
* Komponen kartu universal untuk seluruh konten

---

## 🏗️ Arsitektur Project

```
jatim-portfolio-main/
├── index.html
├── style.css
├── README.md
└── js/
    ├── main.js
    ├── components/
    │   ├── card.js
    │   ├── layout/
    │   ├── theme/
    │   └── ui/
    ├── pages/
    ├── services/
    └── utils/
```

### Penjelasan Singkat

* **main.js**: pusat routing dan inisialisasi aplikasi
* **components**: navbar, footer, carousel, modal lokasi, card, tema
* **pages**: halaman seperti kota, wisata, kuliner, statistik, tentang, dan home
* **services/dataService.js**: manajemen data, seeding, CRUD, pencarian
* **LocalBase**: penyimpanan data via IndexedDB

---

## 🧱 Teknologi

* **JavaScript ES6 Modules**
* **Tailwind CSS**
* **LocalBase (IndexedDB)**
* **Chart.js**
* **Google Maps (iframe/static)**
* **SVG Icons**
* **Tanpa build tools** — cukup buka index.html

---

## 📊 Halaman-Halaman Aplikasi

### 1. Home

* Carousel foto
* Statistik cepat: jumlah kota, wisata, kuliner
* Rekomendasi tempat dan makanan pilihan

### 2. Halaman Kota

* Daftar seluruh kota di Jawa Timur
* Klik card untuk ke detail kota

### 3. Halaman Detail Kota

* Profil kota
* Rekomendasi wisata dan kuliner terkait
* Semua rekomendasi bisa dibuka dalam modal

### 4. Halaman Wisata

* Daftar semua wisata di Jawa Timur
* Filter kota
* Card universal

### 5. Halaman Kuliner

* Daftar semua makanan khas
* Filter kota

### 6. Dashboard Statistik

* Grafik komposisi kategori
* Persentase kuliner dan wisata
* Klik grafik untuk navigasi otomatis ke kategori

### 7. Tentang Kami

* Informasi dasar Jawa Timur
* Data umum seperti luas area dan populasi

### 8. Komponen Card & Modal

* Card konsisten di seluruh halaman
* Modal berisi detail lengkap, peta, dan harga

### 9. Footer

* Navigasi tambahan
* Info tim
* Placeholder peta interaktif (coming soon)

---

## 💾 Model Data

### Kota

* id, nama, populasi, deskripsi, gambar, koordinat, mapsUrl, mapsImage

### Wisata

* id, nama, kota, kategori, deskripsi, gambar, hargaTiket, rating, mapsUrl, mapsImage

### Kuliner

* id, nama, kota, kategori, gambar, deskripsi, harga, rating, mapsUrl, mapsImage

### Carousel

* id, src, alt

---

## 🛠️ Cara Menjalankan

1. Download atau clone project
2. Buka `index.html` langsung di browser
3. Semua data otomatis dimuat melalui LocalBase

Tidak perlu server lokal, build, atau compiler.

---

## 🔮 Pengembangan Lanjutan

* Fitur bookmark
* Halaman review pengguna
* Service Worker untuk mode offline
* Detail kota lebih lengkap

---

## 👥 Tim Pengembang

**Tim Doa Ibu**

* Muhammad Taufik Hidayat
* Hannif Risky Sutiyono Putra

SMK PGRI 1 Kota Kediri

UNIVERSITAS NEGERI SURABAYA — Lomba AREK AI Murid Jatim 2025
