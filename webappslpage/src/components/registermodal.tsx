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
  const [excep, setExcep] = useState('');
  const [errors, setError] = useState({
    username: '',
    email: '',
    nombres: '',
    apellidos: '',
    password: '',
    confirm_password: '',
  });

  const history = useHistory();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleValidation = () => {
    let fields = form;
    let error = {
      username: '',
      email: '',
      nombres: '',
      apellidos: '',
      password: '',
      confirm_password: '',
    };
    let formIsValid = true;

    //username
    if (!fields['username']) {
      formIsValid = false;

      error['username'] = 'No puede estar vacío';
    }

    //Name
    if (!fields['nombres']) {
      formIsValid = false;

      error['nombres'] = 'No puede estar vacío';
    }

    if (typeof fields['nombres'] !== 'undefined') {
      if (!fields['nombres'].match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        error['nombres'] = 'Solamente se permiten letras';
      }
    }
    //Apellidos

    if (!fields['apellidos']) {
      formIsValid = false;

      error['apellidos'] = 'No puede estar vacío';
    }

    if (typeof fields['apellidos'] !== 'undefined') {
      if (!fields['apellidos'].match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        error['apellidos'] = 'Solamente se permiten letras';
      }
    }

    //Email
    if (!fields['email']) {
      formIsValid = false;
      error['email'] = 'No puede estar vacío';
    }

    if (typeof fields['email'] !== 'undefined') {
      let lastAtPos = fields['email'].lastIndexOf('@');
      let lastDotPos = fields['email'].lastIndexOf('.');

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          fields['email'].indexOf('@@') === -1 &&
          lastDotPos > 2 &&
          fields['email'].length - lastDotPos > 2
        )
      ) {
        formIsValid = false;
        error['email'] = 'Email no es válido';
      }
    }
    //password
    if (!fields['password']) {
      formIsValid = false;

      error['password'] = 'No puede estar vacío';
    }

    if (typeof fields['password'] !== 'undefined') {
      var strongRegex = new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
      );

      if (!strongRegex.test(fields['password'])) {
        error['password'] =
          'min 8 caracteres, una letra minúscula y una mayúscula, un número y un caracter especial';
        formIsValid = false;
      }
    }

    //confirm password

    if (fields['password'] !== fields['confirm_password']) {
      formIsValid = false;

      error['confirm_password'] = 'No coinciden las contraseñas';
    }

    setError({
      username: error['username'],
      email: error['email'],
      nombres: error['nombres'],
      apellidos: error['apellidos'],
      password: error['password'],
      confirm_password: error['confirm_password'],
    });

    return formIsValid;
  };

  const close = () => history.push('/');
  const onRegister = async () => {
    if (!handleValidation()) return;
    const res = await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        ...form,
        fecha_nacimiento: format(form.fecha_nacimiento, 'Y-M-d'),
      }),
    });

    const resB = await res.json();

    // TODO: Show a toast to let the user know about a server error
    if (resB.status != 200) setExcep('Unknown server error');

    history.push('/login');
  };

  return (
    <Dialog open onClose={close} style={{ fontSize: '16px' }}>
      <DialogTitle>Regístrate</DialogTitle>
      <DialogContent>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {excep && <Alert severity="error">{excep}</Alert>}
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
          {errors['username'] && (
            <Alert severity="error">{errors['username']}</Alert>
          )}
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
          {errors['email'] && <Alert severity="error">{errors['email']}</Alert>}
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
          {errors['nombres'] && (
            <Alert severity="error">{errors['nombres']}</Alert>
          )}

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

          {errors['apellidos'] && (
            <Alert severity="error">{errors['apellidos']}</Alert>
          )}
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
          {errors['password'] && (
            <Alert severity="error">{errors['password']}</Alert>
          )}
          <TextField
            label="Confirme la contraseña"
            type="password"
            name="confirm_password"
            fullWidth
            variant="standard"
            value={form.confirm_password}
            onChange={handleChange}
          />
          {errors['confirm_password'] && (
            <Alert severity="error">{errors['confirm_password']}</Alert>
          )}
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
