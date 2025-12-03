'use client';

import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Tabs,
  Tab,
  Grid,
  CircularProgress,
  IconButton,
  Paper,
} from '@mui/material';
import { Cake, TrendingUp, Newspaper, ArrowBack } from '@mui/icons-material';
import CelebrityCard from '@/components/Celebrity/CelebrityCard';
import CelebrityNewsCard from '@/components/Celebrity/CelebrityNewsCard';
import { CelebrityType, CelebrityNewsType } from '@/types/Celebrity/CelebrityType';
import { useRouter } from 'next/navigation';

// Mock data - gunakan gambar real dari TMDB atau foto artis Indonesia
const mockCelebritiesBornToday: CelebrityType[] = [
  {
    id: '1',
    created_at: new Date().toISOString(),
    name: 'Leonardo DiCaprio',
    birth_date: '1974-11-11',
    birth_place: 'Los Angeles, California, USA',
    profile_image: 'https://image.tmdb.org/t/p/w500/wo2hJpn04vbtmh0B9utCFdsQhxM.jpg',
    biography: 'Leonardo Wilhelm DiCaprio is an American actor and film producer.',
    known_for: 'Actor',
    popularity_score: 98,
    movies: ['1', '5'],
  },
  {
    id: '2',
    created_at: new Date().toISOString(),
    name: 'Tom Hanks',
    birth_date: '1956-07-09',
    birth_place: 'Concord, California, USA',
    profile_image: 'https://image.tmdb.org/t/p/w500/eKF1sGJRrZJbfBG1KirPt1cfNd3.jpg',
    biography: 'Thomas Jeffrey Hanks is an American actor and filmmaker.',
    known_for: 'Actor',
    popularity_score: 99,
    movies: ['12', '24'],
  },
];

const mockPopularCelebrities: CelebrityType[] = [
  {
    id: '3',
    created_at: new Date().toISOString(),
    name: 'Leonardo DiCaprio',
    birth_date: '1974-11-11',
    birth_place: 'Los Angeles, California, USA',
    profile_image: 'https://image.tmdb.org/t/p/w500/wo2hJpn04vbtmh0B9utCFdsQhxM.jpg',
    biography: 'Leonardo Wilhelm DiCaprio is an American actor and film producer.',
    known_for: 'Actor',
    popularity_score: 98,
    movies: ['1', '5'],
  },
  {
    id: '4',
    created_at: new Date().toISOString(),
    name: 'Kate Winslet',
    birth_date: '1975-10-05',
    birth_place: 'Reading, Berkshire, England',
    profile_image: 'https://image.tmdb.org/t/p/w500/e3vNGcL33eKa9e3YN6KJkXYLUWA.jpg',
    biography: 'Kate Elizabeth Winslet is an English actress.',
    known_for: 'Actress',
    popularity_score: 95,
    movies: ['5', '17'],
  },
  {
    id: '5',
    created_at: new Date().toISOString(),
    name: 'Tom Hanks',
    birth_date: '1956-07-09',
    birth_place: 'Concord, California, USA',
    profile_image: 'https://image.tmdb.org/t/p/w500/eKF1sGJRrZJbfBG1KirPt1cfNd3.jpg',
    biography: 'Thomas Jeffrey Hanks is an American actor and filmmaker.',
    known_for: 'Actor',
    popularity_score: 99,
    movies: ['12', '24'],
  },
  {
    id: '6',
    created_at: new Date().toISOString(),
    name: 'Christian Bale',
    birth_date: '1974-01-30',
    birth_place: 'Haverfordwest, Wales',
    profile_image: 'https://image.tmdb.org/t/p/w500/3qx2QFUbG6t6IlzR0F9k3Z6Yhf7.jpg',
    biography: 'Christian Charles Philip Bale is an English actor.',
    known_for: 'Actor',
    popularity_score: 96,
    movies: ['3', '15'],
  },
  {
    id: '7',
    created_at: new Date().toISOString(),
    name: 'Scarlett Johansson',
    birth_date: '1984-11-22',
    birth_place: 'New York City, USA',
    profile_image: 'https://image.tmdb.org/t/p/w500/6NsMbJXRlDZuDzatN2akFdGuTvx.jpg',
    biography: 'Scarlett Ingrid Johansson is an American actress.',
    known_for: 'Actress',
    popularity_score: 97,
    movies: ['16', '18'],
  },
  {
    id: '8',
    created_at: new Date().toISOString(),
    name: 'Robert Downey Jr.',
    birth_date: '1965-04-04',
    birth_place: 'New York City, USA',
    profile_image: 'https://image.tmdb.org/t/p/w500/5qHNjhtjMD4YWH3UP0rm4tKwxCL.jpg',
    biography: 'Robert John Downey Jr. is an American actor and producer.',
    known_for: 'Actor',
    popularity_score: 98,
    movies: ['19', '20'],
  },
];

const mockCelebrityNews: CelebrityNewsType[] = [
  {
    id: '1',
    created_at: new Date().toISOString(),
    title: 'Leonardo DiCaprio Announces New Environmental Documentary',
    content: 'Oscar-winning actor Leonardo DiCaprio has announced his latest environmental documentary project focusing on climate change and ocean conservation...',
    image_url: 'https://image.tmdb.org/t/p/w500/wo2hJpn04vbtmh0B9utCFdsQhxM.jpg',
    celebrity_id: '3',
    celebrity_name: 'Leonardo DiCaprio',
    published_date: '2025-12-01',
  },
  {
    id: '2',
    created_at: new Date().toISOString(),
    title: 'Kate Winslet to Star in New Historical Drama',
    content: 'Academy Award winner Kate Winslet has been cast in the lead role of an upcoming historical drama set in Victorian England...',
    image_url: 'https://image.tmdb.org/t/p/w500/e3vNGcL33eKa9e3YN6KJkXYLUWA.jpg',
    celebrity_id: '4',
    celebrity_name: 'Kate Winslet',
    published_date: '2025-11-30',
  },
  {
    id: '3',
    created_at: new Date().toISOString(),
    title: 'Tom Hanks Receives Lifetime Achievement Award',
    content: 'Legendary actor Tom Hanks was honored with the Lifetime Achievement Award at the American Film Institute annual gala...',
    image_url: 'https://image.tmdb.org/t/p/w500/eKF1sGJRrZJbfBG1KirPt1cfNd3.jpg',
    celebrity_id: '5',
    celebrity_name: 'Tom Hanks',
    published_date: '2025-11-28',
  },
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`celebrity-tabpanel-${index}`}
      aria-labelledby={`celebrity-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function CelebrityPage() {
  const router = useRouter();
  const [tabValue, setTabValue] = useState(0);
  const [loading] = useState(false);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Back Button */}
      <Box sx={{ mb: 3 }}>
        <IconButton 
          onClick={handleBackToHome}
          sx={{ 
            color: 'primary.main',
            '&:hover': {
              backgroundColor: 'action.hover',
            }
          }}
        >
          <ArrowBack sx={{ mr: 1 }} />
          <Typography variant="body1">Back to Home</Typography>
        </IconButton>
      </Box>

      {/* Header Section */}
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          mb: 4, 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          borderRadius: 2
        }}
      >
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom 
          fontWeight="bold"
          sx={{
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          Celebrity
        </Typography>

        <Typography 
          variant="h6" 
          sx={{ 
            opacity: 0.95,
            textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
          }}
        >
          Temukan informasi terbaru tentang selebriti favorit Anda
        </Typography>
      </Paper>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="celebrity tabs"
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTab-root': {
              fontSize: '1rem',
              fontWeight: 600,
              textTransform: 'none',
              color: '#000000',
            },
            '& .Mui-selected': {
              color: '#1976d2 !important',
            }
          }}
        >
          <Tab
            icon={<Cake />}
            label="Born Today"
            iconPosition="start"
            id="celebrity-tab-0"
            aria-controls="celebrity-tabpanel-0"
          />
          <Tab
            icon={<TrendingUp />}
            label="Most Popular"
            iconPosition="start"
            id="celebrity-tab-1"
            aria-controls="celebrity-tabpanel-1"
          />
          <Tab
            icon={<Newspaper />}
            label="Celebrity News"
            iconPosition="start"
            id="celebrity-tab-2"
            aria-controls="celebrity-tabpanel-2"
          />
        </Tabs>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Born Today Tab */}
          <TabPanel value={tabValue} index={0}>
            <Typography variant="h5" gutterBottom sx={{ color: '#000000', fontWeight: 700 }}>
              Selebriti yang Berulang Tahun Hari Ini
            </Typography>
            <Grid container spacing={3} sx={{ mt: 2 }}>
              {mockCelebritiesBornToday.map((celebrity) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={celebrity.id}>
                  <CelebrityCard celebrity={celebrity} showAge={true} />
                </Grid>
              ))}
            </Grid>
          </TabPanel>

          {/* Most Popular Tab */}
          <TabPanel value={tabValue} index={1}>
            <Typography variant="h5" gutterBottom sx={{ color: '#000000', fontWeight: 700 }}>
              Selebriti Paling Populer
            </Typography>
            <Grid container spacing={3} sx={{ mt: 2 }}>
              {mockPopularCelebrities.map((celebrity) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={celebrity.id}>
                  <CelebrityCard celebrity={celebrity} />
                </Grid>
              ))}
            </Grid>
          </TabPanel>

          {/* Celebrity News Tab */}
          <TabPanel value={tabValue} index={2}>
            <Typography variant="h5" gutterBottom sx={{ color: '#000000', fontWeight: 700 }}>
              Berita Selebriti Terkini
            </Typography>
            <Box sx={{ mt: 2 }}>
              {mockCelebrityNews.map((news) => (
                <CelebrityNewsCard key={news.id} news={news} />
              ))}
            </Box>
          </TabPanel>
        </>
      )}
    </Container>
  );
}
