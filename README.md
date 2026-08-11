# 🌟 Aryn Putra Batik Collection

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

> **Proyek ini dikembangkan khusus untuk Lomba Web UMKM guna mendorong digitalisasi bisnis lokal Indonesia.**

Aryn Putra Batik Collection adalah platform _e-commerce_ modern yang dirancang untuk memecahkan masalah operasional UMKM pakaian: **menggabungkan penjualan eceran (B2C) dan grosir/reseller (B2B) di dalam satu pintu.**

Dengan antarmuka yang elegan berbalut warna _Navy, Gold, dan Ivory_, website ini tidak hanya berfungsi sebagai toko online, tetapi juga sebagai etalase digital premium yang mengangkat derajat warisan budaya Batik Nusantara.

---

## ✨ Fitur Unggulan (Core Features)

1. 🛒 **Sistem Harga Dinamis (Ecer & Grosir)**
   Platform ini memiliki logika database yang memisahkan pembeli biasa dan reseller. Harga produk akan otomatis berubah menjadi "Harga Pabrik/Grosir" apabila pengguna _login_ menggunakan akun dengan akses Reseller.
2. 🎨 **Desain UI/UX Premium & Responsif**
   Dibangun dengan Tailwind CSS v4 terbaru, menghadirkan antarmuka yang responsif di segala perangkat (Mobile, Tablet, Desktop) dengan _pixel-perfect design_.
3. ⚡ **Performa & SEO Optimal**
   Memanfaatkan teknologi _Server-Side Rendering_ (SSR) dari Next.js App Router untuk menjamin kecepatan muat halaman dan indeks SEO yang kuat agar UMKM mudah ditemukan di Google.
4. 🛡️ **Arsitektur Database Skalabel & Aman**
   Menggunakan Supabase (PostgreSQL) yang diamankan dengan _Row Level Security_ (RLS) serta Prisma ORM sebagai jembatan _backend_ yang menjamin konsistensi tipe data (_Type-Safe_).

---

## 🛠️ Teknologi yang Digunakan (Tech Stack)

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS v4
- **Database:** PostgreSQL (Hosted on Supabase)
- **ORM:** Prisma Client v7
- **Icons:** Lucide React
- **Language:** TypeScript

---

## 🚀 Cara Menjalankan Proyek di Komputer Lokal (Local Setup)

Untuk para dewan juri atau pengembang yang ingin meninjau proyek ini di komputer lokal, silakan ikuti langkah-langkah berikut:

### 1. Kloning Repositori

```bash
git clone [https://github.com/gibranadipratama/aryn-putra-batik-collection.git](https://github.com/gibranadipratama/aryn-putra-batik-collection.git)
cd aryn-putra-batik-collection
```
### 2. Instalasi Dependensi
```bash
npm install
```
