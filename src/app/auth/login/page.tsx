'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { login } from '../actions'; // sesuaikan path actions kamu

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Semua field wajib diisi.');
      return;
    }

    const error = await login(email, password);
    if (error) {
      setShowError(error);
    } else {
      setShowError('');
      // redirect kalau sukses, misalnya:
      // router.push('/dashboard');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" color="text.primary" gutterBottom>
          Login
        </Typography>

        <TextField
          fullWidth
          label="Email"
          margin="normal"
          onChange={(e) => setEmail(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{
            '& label': {
              color: 'primary.main',
            },
            '& label.Mui-focused': {
              color: 'primary.main',
            },
          }}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          onChange={(e) => setPassword(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{
            '& label': {
              color: 'primary.main',
            },
            '& label.Mui-focused': {
              color: 'primary.main',
            },
          }}
        />

        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleLogin}
        >
          Login
        </Button>

        <Typography variant="body2" color="black" sx={{ mt: 2 }}>
          Belum punya akun?{' '}
          <Link href="/auth/register" color="primary">
            Daftar
          </Link>
        </Typography>

        {showError && (
          <Typography
            variant="body1"
            sx={{ fontWeight: 'medium', color: 'red', mt: 2 }}
          >
            {showError}
          </Typography>
        )}
      </Box>
    </Container>
  );
}