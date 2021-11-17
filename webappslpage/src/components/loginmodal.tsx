import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Alert,
  Dialog,
  TextField,
  Button,
  DialogActions,
  DialogTitle,
  DialogContent,
} from '@mui/material';

import { login } from '../auth';

const LoginModal = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const close = () => history.push('/');
  const onLogin = () =>
    fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((r) => r.json())
      .then((token: any) => {
        if (token.access_token) {
          login(token);
          history.push('/profile');
        } else {
          setError(token.message);
          console.error(token);
        }
      });

  return (
    <Dialog open onClose={close}>
      <DialogTitle>Inicio de sesión</DialogTitle>
      <DialogContent>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            autoFocus
            label="Correo electrónico"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Contraseña"
            type="password"
            fullWidth
            variant="standard"
            autoComplete="current_password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancelar</Button>
        <Button onClick={() => history.push('/register')}>Registrarse</Button>
        <Button onClick={onLogin}>Iniciar sesión</Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginModal;
