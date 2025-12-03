'use client';

import React from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardMedia,
  Chip,
  Divider,
} from '@mui/material';
import { useParams } from 'next/navigation';
import Link from 'next/link';

// Mock data - nanti bisa diganti dengan fetch dari Supabase
const mockNews = {
  id: '1',
  created_at: new Date().toISOString(),
  title: 'Dian Sastrowardoyo Raih Penghargaan di Festival Film Asia',
  content: `Aktris senior Indonesia Dian Sastrowardoyo meraih penghargaan Best Actress di ajang Festival Film Asia yang berlangsung di Tokyo, Jepang. 
  
  Penghargaan ini diberikan atas perannya yang memukau dalam film terbarunya yang berjudul "Jalan Yang Jauh, Jangan Lupa Pulang". Film ini menceritakan tentang perjuangan seorang ibu yang mencari anaknya yang hilang.
  
  "Saya sangat terharu dan bangga bisa mewakili Indonesia di ajang bergengsi ini. Ini adalah hasil kerja keras dari seluruh tim film," ujar Dian dalam pidato penerimaannya.
  
  Dian Sastrowardoyo dikenal sebagai salah satu aktris terbaik Indonesia dengan berbagai penghargaan yang telah diraihnya. Karirnya dimulai sejak tahun 2000-an dan terus bersinar hingga kini.
  
  Film "Jalan Yang Jauh, Jangan Lupa Pulang" juga meraih penghargaan sebagai Best Picture di festival yang sama, menunjukkan kualitas perfilman Indonesia yang semakin diakui di kancah internasional.`,
  image_url: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800',
  celebrity_id: '3',
  celebrity_name: 'Dian Sastrowardoyo',
  published_date: '2025-12-01',
};

export default function CelebrityNewsDetailPage() {
  const params = useParams();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Back Link */}
      <Link href="/celebrity" style={{ textDecoration: 'none' }}>
        <Typography
          variant="body2"
          color="primary"
          sx={{ mb: 2, '&:hover': { textDecoration: 'underline' } }}
        >
          ← Kembali ke Celebrity
        </Typography>
      </Link>

      {/* News Image */}
      <Card sx={{ mb: 3 }}>
        <CardMedia
          component="img"
          height="400"
          image={mockNews.image_url}
          alt={mockNews.title}
          sx={{ objectFit: 'cover' }}
        />
      </Card>

      {/* News Title */}
      <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
        {mockNews.title}
      </Typography>

      {/* Celebrity Tag */}
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 2 }}>
        <Link
          href={`/celebrity/${mockNews.celebrity_id}`}
          style={{ textDecoration: 'none' }}
        >
          <Chip
            label={mockNews.celebrity_name}
            color="primary"
            clickable
            sx={{ '&:hover': { backgroundColor: 'primary.dark' } }}
          />
        </Link>

        <Typography variant="caption" color="text.secondary">
          {formatDate(mockNews.published_date)}
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* News Content */}
      <Box sx={{ mb: 4 }}>
        {mockNews.content.split('\n').map((paragraph, index) => (
          <Typography
            key={index}
            variant="body1"
            paragraph
            sx={{ textAlign: 'justify', lineHeight: 1.8 }}
          >
            {paragraph.trim()}
          </Typography>
        ))}
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Related Link */}
      <Box sx={{ bgcolor: 'background.paper', p: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Baca Juga
        </Typography>
        <Link
          href={`/celebrity/${mockNews.celebrity_id}`}
          style={{ textDecoration: 'none' }}
        >
          <Typography
            variant="body1"
            color="primary"
            sx={{ '&:hover': { textDecoration: 'underline' } }}
          >
            Profil lengkap {mockNews.celebrity_name} →
          </Typography>
        </Link>
      </Box>
    </Container>
  );
}
