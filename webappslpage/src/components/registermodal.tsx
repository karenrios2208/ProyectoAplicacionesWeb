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
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import esLocale from 'date-fns/locale/es';
import { format } from 'date-fns';

const RegisterModal = (): JSX.Element => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    nombres: '',
    apellidos: '',
    fecha_nacimiento: new Date(Date.now()),
    password: '',
    confirm_password: '',
  });
  const history = useHistory();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const close = () => history.push('/');
  const onRegister = async () => {
    await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        ...form,
        fecha_nacimiento: format(form.fecha_nacimiento, '%Y-%M-%D'),
      }),
    });
  };
  console.log(form);

  return (
    <Dialog open onClose={close} style={{ fontSize: '16px' }}>
      <DialogTitle>Regístrate</DialogTitle>
      <DialogContent>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <TextField
            autoFocus
            label="Usuario"
            type="text"
            name="username"
            fullWidth
            variant="standard"
            value={form.username}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            label="Correo electrónico"
            type="email"
            name="email"
            fullWidth
            variant="standard"
            value={form.email}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            label="Nombres"
            type="text"
            name="nombres"
            fullWidth
            variant="standard"
            value={form.nombres}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            label="Apellidos"
            name="apellidos"
            type="text"
            fullWidth
            variant="standard"
            value={form.apellidos}
            onChange={handleChange}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={esLocale}>
            <DatePicker
              label="Fecha de nacimiento"
              value={form.fecha_nacimiento}
              onChange={(newValue) =>
                setForm({
                  ...form,
                  fecha_nacimiento: newValue as Date,
                })
              }
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <TextField
            label="Contraseña"
            type="password"
            name="password"
            fullWidth
            variant="standard"
            value={form.password}
            onChange={handleChange}
          />
          <TextField
            label="Confirme la contraseña"
            type="password"
            name="confirm_password"
            fullWidth
            variant="standard"
            value={form.confirm_password}
            onChange={handleChange}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancelar</Button>
        <Button onClick={() => history.push('/login')}>Iniciar sesión</Button>
        <Button onClick={onRegister}>Registrarse</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegisterModal;
