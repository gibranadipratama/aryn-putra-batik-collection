# Aryn Putra Batik Collection

**Aryn Putra Batik Collection** adalah platform *e-commerce* dan sistem manajemen toko berbasis web modern yang dirancang khusus untuk memamerkan, mengelola, dan menjual berbagai macam koleksi produk batik berkualitas tinggi. Aplikasi ini dilengkapi dengan antarmuka etalase publik yang elegan serta dasbor admin komprehensif untuk mengelola inventaris, memantau transaksi pesanan, dan mengatur data pelanggan.

---

## 🚀 Fitur Utama

### 1. Etalase & Belanja Publik (Pelanggan)
* **Katalog Produk Interaktif:** Menampilkan koleksi batik secara lengkap beserta detail harga, kategori, dan deskripsi produk.
* **Pencarian & Filter Cerdas:** Memudahkan pengguna untuk mencari produk spesifik sesuai keinginan.
* **Keranjang Belanja & Checkout:** Alur pemesanan yang mulus dan terintegrasi langsung dengan sistem pembayaran *online* otomatis (iPaymu).
* **Profil Pelanggan:** Pengguna dapat mengelola profil mereka (nama, nomor HP, dan alamat pengiriman) secara mandiri.

### 2. Panel Admin & Superadmin (Dasbor Manajemen)
* **Sistem Hak Akses Bertingkat (RBAC):**
  * **Superadmin:** Memiliki kendali penuh, termasuk hak eksklusif untuk mengangkat pengguna menjadi Admin/Superadmin baru, serta mencabut akses (*downgrade*).
  * **Admin:** Dapat memantau dan mengelola operasional toko sehari-hari.
* **Manajemen Produk:** Fasilitas untuk menambah, mengubah, dan menghapus katalog produk batik beserta gambar dan varian stok.
* **Manajemen Pesanan:** Memantau status transaksi masuk, mencetak faktur (*invoice*), dan mengelola riwayat pesanan pelanggan.
* **Manajemen Pelanggan:** Akses cepat untuk melihat daftar pelanggan terdaftar, informasi kontak, serta riwayat belanja masing-masing individu.

---

## 📖 Panduan Penggunaan

Berikut adalah panduan singkat cara menggunakan aplikasi berdasarkan peran (*role*) pengguna:

### 👤 Panduan untuk Pelanggan (User)
1. **Mendaftar & Masuk:** Buat akun baru pada halaman registrasi atau masuk menggunakan email dan kata sandi yang telah didaftarkan.
2. **Melengkapi Profil:** Masuk ke menu **Pengaturan Akun** untuk melengkapi Nama Lengkap, Nomor HP, dan Alamat Pengiriman (dibatasi maksimal 2 kali perubahan per hari untuk keamanan).
3. **Berbelanja:** Jelajahi katalog di beranda, pilih produk, tentukan ukuran (varian), dan klik tombol **Masukkan Keranjang**.
4. **Checkout & Pembayaran:** Buka keranjang belanja, periksa kembali pesanan Anda, lalu lanjutkan ke pembayaran. Sistem akan mengarahkan Anda ke portal pembayaran aman.

### 💼 Panduan untuk Admin Toko
1. **Akses Dasbor:** Masuk menggunakan akun berstatus `ADMIN` lalu navigasikan ke halaman Dasbor (melalui menu profil atau rute `/dashboard`).
2. **Kelola Produk:** Buka menu **Produk** untuk menambah koleksi batik baru. Anda dapat mengisi nama, deskripsi, harga, diskon, gambar, serta varian stok (ukuran).
3. **Pantau Pesanan:** Buka menu **Pesanan** untuk melihat daftar transaksi yang masuk, mengecek status pembayaran, dan memperbarui status pengiriman.
4. **Lihat Pelanggan:** Buka menu **Pelanggan** untuk melihat profil konsumen dan riwayat belanja mereka untuk keperluan layanan pelanggan.

### 👑 Panduan Khusus Superadmin
Selain memiliki semua akses Admin di atas, Superadmin memiliki kontrol penuh atas keamanan sistem:
1. **Mengangkat Admin Baru:** Buka menu **Kelola Admin**, gunakan fitur pencarian untuk mencari email/nama pelanggan biasa, lalu pilih *role* baru (`ADMIN` atau `SUPERADMIN`) untuk mengangkat mereka.
2. **Mengubah Tingkat Akses:** Gunakan **Ikon Pensil** pada daftar admin untuk menaikkan atau menurunkan jabatan antara Admin dan Superadmin.
3. **Mencabut Akses (Revoke):** Gunakan **Ikon Tempat Sampah** untuk mencabut akses admin. Akun tersebut tidak akan dihapus, melainkan dikembalikan menjadi pelanggan biasa (USER).

---

## 🛠️ Teknologi yang Digunakan (Tech Stack)

Proyek ini dibangun menggunakan teknologi *web development* modern untuk memastikan performa yang cepat, aman, dan mudah diskalakan:

* **Framework Utama:** [Next.js](https://nextjs.org/) (Menggunakan App Router & Turbopack)
* **Bahasa Pemrograman:** [TypeScript](https://www.typescriptlang.org/)
* **Database & ORM:** [Supabase](https://supabase.com/) (PostgreSQL) & [Prisma ORM](https://www.prisma.io/)
* **Autentikasi & Keamanan:** [NextAuth.js](https://next-auth.js.org/) (Credentials Provider dengan enkripsi sandi `bcryptjs`)
* **Desain & Antarmuka (UI):** [Tailwind CSS](https://tailwindcss.com/), [Lucide Icons](https://lucide.dev/), & React Hot Toast
* **Payment Gateway:** Terintegrasi dengan iPaymu API

---

## 📁 Struktur Direktori Utama

Arsitektur folder di dalam proyek ini disusun menggunakan pendekatan *Route Groups* Next.js untuk memisahkan logika aplikasi publik dan internal:

```text
aryn-putra-batik/
├── actions/             # Server Actions (Mutasi database Produk, Admin, dll)
├── app/                 # Struktur rute utama Next.js (App Router)
│   ├── (admin)/         # Rute grup khusus internal dasbor toko
│   │   └── dashboard/   # Panel dasbor (kelola-admin, produk, pesanan, pelanggan)
│   ├── (storefront)/    # Rute grup khusus etalase publik
│   │   ├── akun/        # Pengaturan profil pelanggan
│   │   ├── checkout/    # Halaman proses pembayaran
│   │   └── ...          # Keranjang, produk, panduan ukuran, kategori, dll
│   ├── admin/login/     # Halaman portal login khusus Administrator
│   ├── api/             # Endpoint API internal
│   │   ├── auth/        # Rute dinamis NextAuth ([...nextauth])
│   │   └── webhook/     # Penerima notifikasi pembayaran (iPaymu)
│   ├── login/           # Halaman login pelanggan
│   └── register/        # Halaman registrasi pelanggan
├── components/          # Komponen antarmuka (UI) React yang dapat digunakan ulang
├── lib/                 # Konfigurasi inti (Klien Prisma, auth.ts, utilitas)
├── prisma/              # Skema database ORM dan file riwayat migrasi
├── public/              # Aset statis (Favicon, logo, font)
├── types/               # Definisi tipe global TypeScript
└── .env.example         # Templat variabel lingkungan (Environment Variables)
```

---

## 💻 Panduan Instalasi & Integrasi Lokal

Ikuti langkah-langkah di bawah ini untuk menginstal dan menjalankan aplikasi secara lokal pada mesin pengembangan Anda:

1. **Persyaratan Sistem**
Sebelum memulai, pastikan perangkat Anda telah terinstal perangkat lunak berikut:

**Node.js** (Versi 18.x atau yang lebih baru)
**Git** (Untuk mengkloning repositori)
**Manajer Paket Node** (Bisa menggunakan npm, yarn, atau pnpm)

2. **Klon Repositori**
Buka terminal/Command Prompt Anda, arahkan ke direktori tempat Anda ingin menyimpan proyek ini, lalu jalankan perintah klon:

``` bash
git clone [https://github.com/username-anda/aryn-putra-batik-collection.git](https://github.com/username-anda/aryn-putra-batik-collection.git)
   
cd aryn-putra-batik-collection

```

3. **Instalasi Dependensi**
Setelah masuk ke dalam direktori proyek, unduh dan instal semua pustaka (dependencies) yang dibutuhkan oleh sistem dengan perintah:
``` bash
npm install

```
4.  **Konfigurasi Variabel Lingkungan (.env)**
Aplikasi ini membutuhkan integrasi ke layanan eksternal (Supabase, NextAuth, dan iPaymu). Demi keamanan, file .env yang berisi kunci rahasia asli tidak diunggah ke repositori.

   1. Duplikat file .env.example yang ada di direktori utama, lalu ubah namanya menjadi 
   .env:
   ``` bash
   cp .env.example .env

   ```
   2. Buka file .env yang baru dibuat, lalu isi variabel-variabel di bawah ini sesuai dengan akun/kredensial Anda sendiri:
   - Database (Supabase): Isi DATABASE_URL dan DIRECT_URL dari Dashboard Supabase Anda (Project Settings -> Database).
   - Sesi Keamanan (NextAuth): Isi NEXTAUTH_URL (http://localhost:3000 untuk lokal) dan buat string acak panjang untuk NEXTAUTH_SECRET.
   - Payment Gateway (iPaymu): Isi IPAYMU_VA dan IPAYMU_API_KEY dari akun Sandbox/Production iPaymu Anda.

5. Inisialisasi & Migrasi Database
Setelah file .env dikonfigurasi dengan benar, jalankan perintah Prisma untuk membentuk tabel pada database PostgreSQL Anda:
``` bash
npx prisma generate
npx prisma db push

```

6. Menjalankan Server Pengembangan (Development Server)
Setelah semua persiapan selesai, mulai jalankan proyek dalam mode development:
``` bash
npm run dev

```

Buka peramban web (browser) Anda dan akses tautan berikut:
http://localhost:3000

Anda sekarang dapat berinteraksi dengan antarmuka aplikasi secara langsung dari komputer Anda!

---




