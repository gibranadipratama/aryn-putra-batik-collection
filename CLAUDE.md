# Context Project: Aryn Putra Batik Collection (E-Commerce)

## 1. Tech Stack
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Lucide React (Icons)
- **Database ORM:** Prisma
- **Database Provider:** PostgreSQL (via Supabase)
- **Paradigma Data Fetching:** React Server Components (RSC) & Server Actions (Hindari penggunaan API Routes `/api/...` kecuali untuk webhook/third-party).

## 2. Struktur Direktori Utama
- `/app/(storefront)`: Halaman publik untuk pembeli (Beranda, Katalog, dll).
- `/app/(admin)/dashboard`: Halaman khusus Admin (Dashboard, Produk, Pesanan, dll).
- `/components`: Komponen UI yang dapat digunakan ulang.
- `/prisma/schema.prisma`: Skema database.
- `/actions`: (TOLONG BUATKAN) Folder untuk menyimpan fungsi-fungsi Next.js Server Actions (CRUD logic).

## 3. Database Schema (Prisma)
Proyek ini menggunakan relasi database yang cukup kompleks. Berikut adalah inti dari entitas yang digunakan (Fokus pada Katalog & Produk):
- `Category`: Memiliki `id`, `name`, `slug`.
- `Product`: Memiliki `id`, `name`, `slug`, `images`, harga retail & grosir, serta berelasi dengan `Category`.
- `ProductVariant`: Berelasi dengan `Product`. Menyimpan `sku`, `size`, `color`, dan `stock`.

## 4. Status Proyek Saat Ini
- Desain UI/Frontend untuk halaman Dashboard Admin (Overview, Produk, Pesanan, Pelanggan) **sudah selesai dibuat secara statis**.
- Desain menggunakan Tailwind CSS dengan palet warna khusus: Navy `#172554` (atau `#0B1F33`), Emas `#D4AF37` (atau `#A88A3D`), dan Krem/Slate.
- Prisma sudah diinisialisasi dan terhubung ke Supabase.

---

## 5. INSTRUKSI TUGAS (TASK OBJECTIVE)
Tugas Anda adalah membuatkan logika Backend (CRUDS) dan mengintegrasikannya ke Frontend statis yang sudah ada. Silakan ikuti panduan berikut selangkah demi selangkah:

### Langkah 1: Buat Server Actions untuk Produk & Kategori
Buat file `actions/product.ts` dan `actions/category.ts`. Tulis fungsi *asynchronous* dengan direktif `"use server"` untuk:
- `getCategories()` dan `getProducts()` (Read)
- `createProduct(data)` (Create) -> *Catatan: Saat membuat produk, buat juga variannya (ProductVariant) menggunakan Nested Writes Prisma.*
- `updateProduct(id, data)` (Update)
- `deleteProduct(id)` (Delete)

### Langkah 2: Integrasi Read (Menampilkan Data)
- Ubah file `/app/(admin)/dashboard/produk/page.tsx` menjadi Server Component.
- Panggil fungsi `getProducts()` di dalam komponen tersebut.
- *Render* data produk ke dalam bentuk Tabel HTML/Tailwind yang rapi. Tampilkan Nama Produk, Kategori, Harga, dan Total Stok (agregasi dari tabel varian).

### Langkah 3: Integrasi Create & Update (Form)
- Buat komponen form Client-side (misal: `ProductForm.tsx`) dengan direktif `"use client"`.
- Form ini harus memiliki input untuk data utama produk (Nama, Harga) DAN input dinamis untuk varian (Ukuran S/M/L, Stok).
- Gunakan `useFormState` (atau `useActionState` di React 19) dan `useFormStatus` untuk menangani status *loading* saat tombol "Simpan" ditekan.
- Hubungkan form ini dengan fungsi Server Action `createProduct` atau `updateProduct`.

### Langkah 4: Integrasi Delete
- Buat komponen tombol hapus (`DeleteButton.tsx`) yang membungkus Server Action `deleteProduct(id)`.
- Pastikan ada dialog konfirmasi (misal: `window.confirm`) sebelum data dihapus.

## 6. Aturan Pengodean (Rules)
1. **Validasi:** Gunakan validasi standar sebelum memasukkan data ke Prisma (bisa menggunakan Zod jika memungkinkan, atau validasi manual dasar).
2. **Revalidasi Path:** Setelah operasi Create/Update/Delete berhasil, WAJIB panggil `revalidatePath('/dashboard/produk')` agar tabel di UI langsung ter-update tanpa perlu *refresh* halaman.
3. **Error Handling:** Kembalikan object `{ success: boolean, message: string, data?: any }` dari setiap Server Action agar Frontend bisa menampilkan *Toast* atau pesan error yang sesuai.
4. **Jaga Desain:** JANGAN merusak susunan class Tailwind yang sudah ada. Cukup bungkus UI statis tersebut dengan logika *mapping* data dari database.