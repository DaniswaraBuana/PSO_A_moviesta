import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
} from '@mui/material';
import { CelebrityType } from '@/types/Celebrity/CelebrityType';
import Link from 'next/link';
import { calculateAge } from '@/Utilities/Celebrity/ageCalculator';

interface CelebrityCardProps {
  celebrity: CelebrityType;
  showAge?: boolean;
}

const CelebrityCard: React.FC<CelebrityCardProps> = ({
  celebrity,
  showAge = false,
}) => {
  const age = calculateAge(celebrity.birth_date);

  return (
    <Link href={`/celebrity/${celebrity.id}`} style={{ textDecoration: 'none' }}>
      <Card
        sx={{
          maxWidth: 280,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.3s ease',
          boxShadow: 3,
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: 8,
            cursor: 'pointer',
          },
          borderRadius: 2,
        }}
      >
        <CardMedia
          component="img"
          height="350"
          image={celebrity.profile_image}
          alt={celebrity.name}
          sx={{ objectFit: 'cover', height: 350 }}
        />
        <CardContent 
          sx={{ 
            flexGrow: 1,
            bgcolor: 'background.paper',
            p: 2,
          }}
        >
          <Typography 
            gutterBottom 
            variant="h6" 
            component="div" 
            noWrap
            sx={{ 
              fontWeight: 700,
              color: '#000000',
            }}
          >
            {celebrity.name}
          </Typography>

          <Chip
            label={celebrity.known_for}
            size="small"
            color="primary"
            sx={{ 
              mb: 1,
              fontWeight: 600,
            }}
          />

          {showAge && (
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#000000',
                fontWeight: 500,
                mt: 1,
              }}
            >
              Berusia {age} tahun hari ini
            </Typography>
          )}

          <Typography 
            variant="body2" 
            sx={{ 
              mt: 1,
              color: '#424242',
              fontWeight: 500,
            }}
          >
            {celebrity.birth_place}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CelebrityCard;
