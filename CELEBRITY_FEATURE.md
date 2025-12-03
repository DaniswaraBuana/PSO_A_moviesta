# 🌟 Celebrity Feature Documentation

## 📌 Overview

Fitur Celebrity terinspirasi dari IMDb dengan 3 tab utama:
1. **Born Today** - Selebriti yang berulang tahun hari ini
2. **Most Popular** - Selebriti paling populer
3. **Celebrity News** - Berita terkini tentang selebriti

---

## 🎯 Fitur yang Sudah Dibuat

### ✅ 1. **Navigation**
- Icon bintang (⭐) di Navbar untuk akses Celebrity
- Link ke `/celebrity`

### ✅ 2. **Halaman Celebrity** (`/celebrity`)
- Tab Navigation dengan 3 kategori
- Grid layout untuk card selebriti
- Responsive design

### ✅ 3. **Celebrity Card Component**
- Menampilkan foto profil
- Nama selebriti
- Profession (Aktor/Aktris/Sutradara/dll)
- Tempat lahir
- Usia (khusus untuk Born Today)
- Hover effect untuk interaktivitas

### ✅ 4. **Celebrity News Card Component**
- Gambar berita
- Judul berita
- Excerpt/preview content
- Tag celebrity name
- Tanggal publikasi

### ✅ 5. **Celebrity Detail Page** (`/celebrity/[celebrityId]`)
- Foto profil besar
- Informasi lengkap (nama, tanggal lahir, tempat lahir, usia)
- Popularity score
- Biografi lengkap
- Daftar film/karya yang terkenal

### ✅ 6. **Celebrity News Detail Page** (`/celebrity/news/[newsId]`)
- Banner image
- Judul berita lengkap
- Tag celebrity (clickable ke profil)
- Konten berita lengkap
- Link related ke profil celebrity

### ✅ 7. **Utilities**
- `calculateAge()` - Hitung umur dari tanggal lahir
- `isBirthdayToday()` - Cek apakah hari ini ulang tahun
- `formatBirthDate()` - Format tanggal lahir ke Bahasa Indonesia

---

## 📂 File Structure

```
src/
├── app/
│   └── celebrity/
│       ├── page.tsx                    # Main celebrity page with tabs
│       ├── [celebrityId]/
│       │   └── page.tsx               # Celebrity detail page
│       └── news/
│           └── [newsId]/
│               └── page.tsx           # Celebrity news detail page
├── components/
│   ├── Celebrity/
│   │   ├── CelebrityCard.tsx         # Celebrity card component
│   │   └── CelebrityNewsCard.tsx     # News card component
│   └── layouts/
│       └── Navbar/
│           └── Navbar.tsx            # Updated with Stars icon
├── types/
│   └── Celebrity/
│       └── CelebrityType.ts          # Celebrity & News types
└── Utilities/
    └── Celebrity/
        └── ageCalculator.ts          # Age calculation utilities
```

---

## 🎨 UI Components

### Icons Used:
- `Stars` - Celebrity icon di navbar
- `Cake` - Born Today tab
- `TrendingUp` - Most Popular tab
- `Newspaper` - Celebrity News tab

### Material-UI Components:
- `Card`, `CardMedia`, `CardContent`
- `Tabs`, `Tab`, `TabPanel`
- `Grid`, `Container`, `Box`
- `Typography`, `Chip`, `Divider`

---

## 📊 Data Structure

### CelebrityType
```typescript
{
  id: string;
  created_at: string;
  name: string;
  birth_date: string;          // Format: YYYY-MM-DD
  birth_place: string;
  profile_image: string;        // URL
  biography: string;
  known_for: string;           // Actor, Director, etc.
  popularity_score: number;    // 0-100
  movies: string[];            // Array of movie IDs
}
```

### CelebrityNewsType
```typescript
{
  id: string;
  created_at: string;
  title: string;
  content: string;
  image_url: string;
  celebrity_id: string;
  celebrity_name: string;
  published_date: string;
}
```

---

## 🔄 Current Implementation

Saat ini menggunakan **mock data** untuk demo. Data hardcoded di:
- `/app/celebrity/page.tsx` - Mock celebrities & news
- `/app/celebrity/[celebrityId]/page.tsx` - Mock celebrity detail
- `/app/celebrity/news/[newsId]/page.tsx` - Mock news detail

---

## 🚀 Next Steps (Integration dengan Supabase)

### 1. **Buat Tabel di Supabase**

#### Table: `celebrities`
```sql
CREATE TABLE celebrities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT NOT NULL,
  birth_date DATE NOT NULL,
  birth_place TEXT,
  profile_image TEXT,
  biography TEXT,
  known_for TEXT,
  popularity_score INTEGER DEFAULT 0,
  movies TEXT[] DEFAULT '{}'
);
```

#### Table: `celebrity_news`
```sql
CREATE TABLE celebrity_news (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  celebrity_id UUID REFERENCES celebrities(id),
  celebrity_name TEXT,
  published_date TIMESTAMPTZ DEFAULT NOW()
);
```

### 2. **Buat Query Functions**

File: `src/Utilities/Celebrity/celebrityQueries.ts`

```typescript
import { createClient } from '@/Utilities/supabase/client';

// Get celebrities born today
export async function getCelebritiesBornToday() {
  const supabase = createClient();
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  const { data, error } = await supabase
    .from('celebrities')
    .select('*')
    .filter('birth_date', 'like', `%-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`)
    .order('popularity_score', { ascending: false });

  return { data, error };
}

// Get most popular celebrities
export async function getMostPopularCelebrities(limit = 12) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('celebrities')
    .select('*')
    .order('popularity_score', { ascending: false })
    .limit(limit);

  return { data, error };
}

// Get celebrity by ID
export async function getCelebrityById(id: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('celebrities')
    .select('*')
    .eq('id', id)
    .single();

  return { data, error };
}

// Get latest celebrity news
export async function getLatestCelebrityNews(limit = 10) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('celebrity_news')
    .select('*')
    .order('published_date', { ascending: false })
    .limit(limit);

  return { data, error };
}

// Get news by ID
export async function getCelebrityNewsById(id: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('celebrity_news')
    .select('*')
    .eq('id', id)
    .single();

  return { data, error };
}
```

### 3. **Update Components untuk Fetch Real Data**

Ganti mock data dengan:

```typescript
'use client';

import { useEffect, useState } from 'react';
import { getCelebritiesBornToday, getMostPopularCelebrities, getLatestCelebrityNews } from '@/Utilities/Celebrity/celebrityQueries';

export default function CelebrityPage() {
  const [bornToday, setBornToday] = useState([]);
  const [popular, setPopular] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      
      const [bornTodayResult, popularResult, newsResult] = await Promise.all([
        getCelebritiesBornToday(),
        getMostPopularCelebrities(),
        getLatestCelebrityNews(),
      ]);

      if (bornTodayResult.data) setBornToday(bornTodayResult.data);
      if (popularResult.data) setPopular(popularResult.data);
      if (newsResult.data) setNews(newsResult.data);

      setLoading(false);
    }

    fetchData();
  }, []);

  // ... rest of component
}
```

---

## 🎨 Customization

### Menambah Tab Baru
Edit `/app/celebrity/page.tsx`:
```typescript
<Tab icon={<YourIcon />} label="Tab Baru" iconPosition="start" />
<TabPanel value={tabValue} index={3}>
  {/* Content tab baru */}
</TabPanel>
```

### Mengubah Tema Warna
Edit Material-UI theme di `/components/theme/theme.ts`

### Menambah Field Celebrity
1. Update `CelebrityType` di `/types/Celebrity/CelebrityType.ts`
2. Update Supabase table schema
3. Update component untuk display field baru

---

## 📱 Responsive Design

- ✅ Mobile: 1 card per row
- ✅ Tablet: 2-3 cards per row
- ✅ Desktop: 4 cards per row
- ✅ Tabs: Scrollable on mobile

---

## 🎯 Testing

### Manual Testing Checklist:
- [ ] Klik icon Stars di navbar → redirect ke `/celebrity`
- [ ] Switch antar tabs (Born Today, Most Popular, Celebrity News)
- [ ] Klik celebrity card → redirect ke detail page
- [ ] Klik news card → redirect ke news detail page
- [ ] Klik celebrity name di news → redirect ke celebrity profile
- [ ] Test responsive di berbagai screen sizes
- [ ] Test hover effects pada cards

---

## 🔗 Routes

| Route | Description |
|-------|-------------|
| `/celebrity` | Main celebrity page dengan tabs |
| `/celebrity/[celebrityId]` | Celebrity profile detail |
| `/celebrity/news/[newsId]` | Celebrity news article detail |

---

## 📝 Notes

- Data saat ini masih **mock/hardcoded**
- Gambar menggunakan **Unsplash** sebagai placeholder
- Siap untuk integrasi dengan **Supabase**
- Design mengikuti **Material Design Guidelines**

---

**Created:** December 3, 2025  
**Status:** ✅ Ready for Testing (Mock Data)  
**Next:** 🔄 Integrate with Supabase Database
