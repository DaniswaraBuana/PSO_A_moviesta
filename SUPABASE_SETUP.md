# 🔧 Supabase Email Verification Setup Guide

## 📌 Masalah yang Diperbaiki

**Error:** "Safari Can't Connect to the Server" saat klik link verifikasi email dari Supabase

**Penyebab:** Redirect URL masih mengarah ke `http://localhost:3000` padahal aplikasi sudah di-deploy ke Vercel

---

## ✅ Yang Sudah Diperbaiki di Code

### 1. **Environment Variables** (`.env.local`)
```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 2. **Auth Actions** (`src/app/auth/actions.ts`)
Signup function sekarang include `emailRedirectTo`:
```typescript
await supabase.auth.signUp({
  email,
  password,
  options: {
    emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm`,
  },
});
```

### 3. **Callback Route** (`src/app/auth/confirm/route.ts`)
✅ Sudah ada dan berfungsi dengan benar

---

## 🚀 Setup di Supabase Dashboard (WAJIB!)

### **Step 1: Masuk ke Supabase Dashboard**
1. Buka https://supabase.com/dashboard
2. Pilih project: **qpgtzdushzjxvshatbsh**
3. Klik **Authentication** di sidebar kiri
4. Klik **URL Configuration**

---

### **Step 2: Update Redirect URLs**

#### **Site URL**
Ubah dari:
```
http://127.0.0.1:3000
```

Menjadi (untuk production):
```
https://pso-a-moviesta.vercel.app
```

#### **Redirect URLs** (Whitelist)
Tambahkan kedua URL ini:
```
http://localhost:3000/auth/confirm
https://pso-a-moviesta.vercel.app/auth/confirm
```

> ⚠️ **Penting:** Pastikan tidak ada trailing slash `/` di akhir URL!

---

### **Step 3: Update Email Templates (Opsional)**

Jika kamu custom email template:

1. Klik **Email Templates** di sidebar
2. Pilih **Confirm signup**
3. Pastikan link menggunakan:
```
{{ .ConfirmationURL }}
```

BUKAN hardcoded URL seperti `http://localhost:3000/...`

---

## 🔥 Setup di Vercel (Environment Variables)

### **Tambahkan di Vercel Dashboard:**

1. Buka https://vercel.com/dashboard
2. Pilih project **PSO_A_moviesta**
3. Klik **Settings** → **Environment Variables**
4. Tambahkan:

```
NEXT_PUBLIC_SUPABASE_URL = https://qpgtzdushzjxvshatbsh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_SITE_URL = https://pso-a-moviesta.vercel.app
```

> 📝 **Note:** Ganti `https://pso-a-moviesta.vercel.app` dengan URL Vercel kamu yang sebenarnya

### **Cara cek URL Vercel kamu:**
```bash
# Run di terminal
vercel ls
```

Atau lihat di Vercel Dashboard → Project → Domains

---

## ✅ Cara Testing

### **1. Development (Localhost)**
```bash
# Terminal 1
npm run dev

# Terminal 2 - Test signup
# Buka browser: http://localhost:3000/auth/register
# Register dengan email
# Cek email → klik link
# Harus redirect ke: http://localhost:3000/auth/confirm?token_hash=...
```

### **2. Production (Vercel)**
```bash
# Deploy ke Vercel
git add .
git commit -m "fix: add emailRedirectTo for auth"
git push origin main

# Atau manual deploy
vercel --prod
```

Setelah deploy:
1. Buka `https://pso-a-moviesta.vercel.app/auth/register`
2. Register dengan email baru
3. Cek email → klik link
4. **Harus redirect ke:** `https://pso-a-moviesta.vercel.app/auth/confirm?token_hash=...`

---

## 🐛 Troubleshooting

### **❌ Masih redirect ke localhost**
**Fix:**
1. Clear browser cache
2. Pastikan `NEXT_PUBLIC_SITE_URL` sudah di-set di Vercel
3. Redeploy: `vercel --prod --force`

### **❌ "Email not confirmed"**
**Fix:**
1. Supabase Dashboard → Authentication → Settings
2. Matikan **Confirm Email** (untuk testing)
3. Atau gunakan **Auto Confirm Email** untuk domain tertentu

### **❌ "Invalid redirect URL"**
**Fix:**
1. Cek Supabase → URL Configuration → Redirect URLs
2. Pastikan URL exact match dengan yang di code
3. Tidak ada trailing slash

---

## 📋 Checklist Lengkap

- [ ] ✅ Update `.env.local` dengan `NEXT_PUBLIC_SITE_URL`
- [ ] ✅ Update `src/app/auth/actions.ts` dengan `emailRedirectTo`
- [ ] 🔴 Update Supabase Dashboard → Site URL
- [ ] 🔴 Update Supabase Dashboard → Redirect URLs (whitelist)
- [ ] 🔴 Set environment variables di Vercel
- [ ] 🔴 Redeploy ke Vercel
- [ ] 🔴 Test signup di production
- [ ] 🔴 Verify email confirmation works

---

## 🎯 Expected Behavior Setelah Fix

### **Development:**
```
User Register → Email dikirim → Klik Link
→ http://localhost:3000/auth/confirm?token_hash=xxx
→ User terverifikasi → Redirect ke /
```

### **Production:**
```
User Register → Email dikirim → Klik Link
→ https://pso-a-moviesta.vercel.app/auth/confirm?token_hash=xxx
→ User terverifikasi → Redirect ke /
```

---

## 📞 Support

Jika masih ada masalah, cek:
1. Vercel deployment logs
2. Supabase Auth logs (Dashboard → Auth → Users → Events)
3. Browser console untuk error messages

---

**Last Updated:** November 30, 2025
