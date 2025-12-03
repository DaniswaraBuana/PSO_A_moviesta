import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
} from '@mui/material';
import { CelebrityNewsType } from '@/types/Celebrity/CelebrityType';
import Link from 'next/link';

interface CelebrityNewsCardProps {
  news: CelebrityNewsType;
}

const CelebrityNewsCard: React.FC<CelebrityNewsCardProps> = ({ news }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Link
      href={`/celebrity/news/${news.id}`}
      style={{ textDecoration: 'none' }}
    >
      <Card
        sx={{
          display: 'flex',
          mb: 2,
          transition: 'all 0.3s ease',
          boxShadow: 2,
          borderRadius: 2,
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: 6,
            cursor: 'pointer',
          },
        }}
      >
        <CardMedia
          component="img"
          sx={{ width: 200, objectFit: 'cover' }}
          image={news.image_url}
          alt={news.title}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <CardContent sx={{ bgcolor: 'background.paper' }}>
            <Typography 
              component="div" 
              variant="h6" 
              gutterBottom
              sx={{
                fontWeight: 700,
                color: '#000000',
              }}
            >
              {news.title}
            </Typography>

            <Chip
              label={news.celebrity_name}
              size="small"
              color="secondary"
              sx={{ 
                mb: 1,
                fontWeight: 600,
              }}
            />

            <Typography
              variant="body2"
              sx={{
                mt: 1,
                color: '#424242',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                fontWeight: 500,
              }}
            >
              {news.content}
            </Typography>

            <Typography 
              variant="caption" 
              sx={{ 
                mt: 2,
                display: 'block',
                color: '#666666',
                fontWeight: 600,
              }}
            >
              {formatDate(news.published_date)}
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </Link>
  );
};

export default CelebrityNewsCard;
