'use client';

import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  Chip,
  Divider,
  IconButton,
  Paper,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useParams, useRouter } from 'next/navigation';
import {
  calculateAge,
  formatBirthDate,
} from '@/Utilities/Celebrity/ageCalculator';

// Mock data - gunakan foto real artis
const mockCelebrity = {
  id: '1',
  created_at: new Date().toISOString(),
  name: 'Leonardo DiCaprio',
  birth_date: '1974-11-11',
  birth_place: 'Los Angeles, California, USA',
  profile_image: 'https://image.tmdb.org/t/p/w500/wo2hJpn04vbtmh0B9utCFdsQhxM.jpg',
  biography:
    'Leonardo Wilhelm DiCaprio is an American actor and film producer. Known for his work in biographical and period films, he is the recipient of numerous accolades, including an Academy Award, a British Academy Film Award, and three Golden Globe Awards. As of 2019, his films have grossed over $7.2 billion worldwide, and he has been placed eight times in annual rankings of the world\'s highest-paid actors.',
  known_for: 'Actor',
  popularity_score: 98,
  movies: ['1', '2', '3'],
};

const mockMovies = [
  {
    id: '1',
    title: 'Inception',
    year: 2010,
    poster_url: 'https://image.tmdb.org/t/p/w500/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg',
    role: 'Dom Cobb',
  },
  {
    id: '2',
    title: 'Titanic',
    year: 1997,
    poster_url: 'https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx49U0C2TXhhJP.jpg',
    role: 'Jack Dawson',
  },
  {
    id: '3',
    title: 'The Wolf of Wall Street',
    year: 2013,
    poster_url: 'https://image.tmdb.org/t/p/w500/34m2tygAYBGqA9MXKhRDtzYd4MR.jpg',
    role: 'Jordan Belfort',
  },
];

export default function CelebrityDetailPage() {
  const params = useParams();
  const router = useRouter();
  const age = calculateAge(mockCelebrity.birth_date);
  const formattedBirthDate = formatBirthDate(mockCelebrity.birth_date);

  const handleBack = () => {
    router.push('/celebrity');
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Back Button */}
      <Box sx={{ mb: 3 }}>
        <IconButton 
          onClick={handleBack}
          sx={{ 
            color: 'primary.main',
            '&:hover': {
              backgroundColor: 'action.hover',
            }
          }}
        >
          <ArrowBack sx={{ mr: 1 }} />
          <Typography variant="body1">Back to Celebrity</Typography>
        </IconButton>
      </Box>

      <Grid container spacing={4}>
        {/* Profile Image */}
        <Grid item xs={12} md={4}>
          <Card 
            elevation={4}
            sx={{ borderRadius: 2, overflow: 'hidden' }}
          >
            <CardMedia
              component="img"
              image={mockCelebrity.profile_image}
              alt={mockCelebrity.name}
              sx={{ height: 500, objectFit: 'cover' }}
            />
          </Card>
        </Grid>

        {/* Celebrity Info */}
        <Grid item xs={12} md={8}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, color: 'text.primary' }}>
            {mockCelebrity.name}
          </Typography>

          <Chip
            label={mockCelebrity.known_for}
            color="primary"
            sx={{ mb: 2, fontWeight: 600 }}
          />

          <Box sx={{ my: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ color: 'text.primary', fontWeight: 700 }}>
              Informasi Personal
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  Tanggal Lahir:
                </Typography>
                <Typography variant="body1" paragraph sx={{ fontWeight: 500, color: 'text.secondary' }}>
                  {formattedBirthDate} ({age} tahun)
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="body1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  Tempat Lahir:
                </Typography>
                <Typography variant="body1" paragraph sx={{ fontWeight: 500, color: 'text.secondary' }}>
                  {mockCelebrity.birth_place}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  Popularitas:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="h5" color="primary" sx={{ fontWeight: 700 }}>
                    {mockCelebrity.popularity_score}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                    / 100
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ my: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ color: 'text.primary', fontWeight: 700 }}>
              Biografi
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body1" paragraph sx={{ color: 'text.secondary', textAlign: 'justify', lineHeight: 1.8, fontWeight: 500 }}>
              {mockCelebrity.biography}
            </Typography>
          </Box>
        </Grid>

        {/* Known For Movies */}
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom sx={{ mt: 4, color: 'text.primary', fontWeight: 700 }}>
            Dikenal Dari
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            {mockMovies.map((movie) => (
              <Grid item xs={12} sm={6} md={3} key={movie.id}>
                <Card
                  elevation={3}
                  sx={{
                    transition: 'all 0.3s ease',
                    borderRadius: 2,
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 8,
                      cursor: 'pointer',
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="300"
                    image={movie.poster_url}
                    alt={movie.title}
                    sx={{ objectFit: 'cover' }}
                  />
                  <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
                    <Typography variant="h6" noWrap sx={{ color: 'text.primary', fontWeight: 700 }}>
                      {movie.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                      {movie.year}
                    </Typography>
                    <Chip
                      label={movie.role}
                      size="small"
                      color="secondary"
                      sx={{ mt: 1, fontWeight: 600 }}
                    />
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
