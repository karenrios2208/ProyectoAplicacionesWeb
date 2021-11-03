import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Dialog,
  TextField,
  Button,
  DialogActions,
  DialogTitle,
  DialogContent,
} from '@mui/material';

const LoginModal = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const close = () => history.push('/');
  const onLogin = () =>
    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: `email=${email}&password=${password}&submit=Log+in`,
    });

  return (
    <Dialog open onClose={close}>
      <DialogTitle>Inicio de sesión</DialogTitle>
      <DialogContent>
        <form>
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
