PSO A Moviesta — Deployment Pipeline Documentation
Dokumen ini menjelaskan arsitektur aplikasi, alur kerja CI/CD, konfigurasi lingkungan, serta proses deployment penuh yang digunakan pada proyek PSO A Moviesta. Seluruh proses otomatis dijalankan melalui GitHub Actions, menggunakan GitHub Container Registry (GHCR) sebagai registry image dan Vercel sebagai platform produksi.
1. Arsitektur Aplikasi
Aplikasi ini dibangun menggunakan pendekatan modern web development dengan pemisahan yang jelas antara frontend, backend, dan workflow otomatis pada pipeline.
1.1 Frontend — Next.js
Menggunakan Next.js dengan App Router, mendukung:
Server Components (SSR)
Client Components (CSR)
Incremental Static Regeneration (ISR)
Routing modular berbasis direktori
1.2 Backend — Supabase
Supabase digunakan sebagai Backend-as-a-Service yang menyediakan:
Database PostgreSQL
Supabase Auth untuk otentikasi pengguna
Supabase Storage untuk file dan media
1.3 Styling — Tailwind CSS
Tailwind digunakan untuk desain cepat berbasis utility class yang konsisten dan mudah diatur.
1.4 Testing
Jest: Unit testing untuk fungsi dan komponen.
Cypress: Integration / E2E testing pada flow pengguna.
1.5 Docker
Aplikasi dibangun menjadi Docker image agar konsisten pada seluruh lingkungan, mulai dari lokal, staging, hingga produksi.
2. Arsitektur CI/CD Pipeline
Pipeline otomatis diatur menggunakan GitHub Actions dan terdiri dari beberapa tahapan terpisah:
Lint & Unit Test → Build App & Cypress Test → Build & Push Docker Image → Deploy to Vercel
Pipeline akan berjalan setiap kali terjadi:
push ke branch main
pull_request ke branch main
Pipeline menggunakan artefak build agar proses build dilakukan sekali saja, lalu digunakan pada tahapan berikutnya.
3. Teknologi yang Digunakan
Teknologi	Fungsi
Next.js	Frontend React Framework
Supabase	Backend, database, autentikasi
GitHub Actions	CI/CD pipeline
Jest	Unit testing
Cypress	Integration/E2E testing
Docker	Image kontainer
GitHub Container Registry (GHCR)	Registry penyimpanan image
Vercel	Deployment dan hosting aplikasi production
4. Konfigurasi Lingkungan
4.1 GHCR Authentication
Pipeline menggunakan akses GHCR dengan token berikut (disimpan di GitHub Secrets):
GHCR_TOKEN
GHCR_USERNAME
4.2 Vercel Deployment
Deployment ke Vercel membutuhkan:
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
Environment variables tersedia di Vercel melalui vercel pull.
4.3 Environment Variables Supabase
Disimpan di Vercel dan GitHub Actions:
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
5. Tahapan Pipeline (CI/CD)
Berikut penjelasan lengkap untuk setiap job di pipeline.
5.1 Job 1 — Lint & Unit Tests
Job pertama memastikan kualitas kode melalui linting dan unit testing.
Langkah:
Checkout repository.
Setup Node.js.
Instal dependensi melalui npm ci.
Jalankan linting:
npm run lint
Jalankan unit tests:
npm test
5.2 Job 2 — Build Next.js App & Cypress Tests
Pada tahap ini aplikasi dibuild menjadi artefak dan diuji menggunakan Cypress.
Langkah:
Checkout repository.
Setup Node.js.
Instal dependensi.
Build aplikasi:
npm run build
Jalankan Cypress integration tests.
Upload artefak build (.next, package.json, package-lock.json) ke GitHub.
Artefak digunakan oleh job berikutnya agar build tidak dilakukan berulang.
5.3 Job 3 — Build & Push Docker Image (GHCR)
Tahap ini membuat Docker image dari hasil build.
Langkah:
Download artefak build.
Login ke GHCR menggunakan docker/login-action.
Build Docker image menggunakan docker/build-push-action.
Push image ke GHCR dengan dua tag:
latest
commit SHA
Output:
ghcr.io/<owner>/<image-name>:latest
ghcr.io/<owner>/<image-name>:<sha>
Image ini menjadi sumber deployment untuk job selanjutnya.
5.4 Job 4 — Deploy to Vercel (Production)
Tahap ini melakukan deployment final ke Vercel.
Langkah:
Install Vercel CLI.
vercel pull untuk mengambil environment project.
vercel build untuk build production.
vercel deploy --prebuilt --prod untuk deploy versi final.
Deployment ini menggunakan artefak build yang sudah dibuat sebelumnya, memastikan konsistensi antara hasil build dan hasil yang dijalankan di production.
6. Panduan Instalasi Lokal
6.1 Prasyarat
Node.js v20+
NPM
Akun Supabase
6.2 Instalasi
Clone repository:
git clone https://github.com/DaniswaraBuana/PSO_A_moviesta.git
Masuk ke folder:
cd PSO_A_moviesta
Instal dependensi:
npm install
Buat file .env.local:
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
Jalankan aplikasi:
npm run dev
7. Testing
7.1 Menjalankan Unit Test
npm test
7.2 Menjalankan Cypress
npm run cypress:open
8. Struktur Docker Image
Pipeline menggunakan Dockerfile yang membungkus:
artefak Next.js .next
file konfigurasi
dependensi node production
Image dijalankan pada server berbasis container atau platform seperti Vercel (prebuilt mode).
