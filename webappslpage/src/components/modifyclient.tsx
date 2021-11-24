import { useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import {
  Alert,
  Dialog,
  TextField,
  Button,
  DialogActions,
  DialogTitle,
  DialogContent,
  FormControlLabel,
  Checkbox,
  MenuItem,
} from '@mui/material';
import { authFetch } from '../auth';

const UpdateClient = (): JSX.Element => {
  const [excep, setExcep] = useState('');
  const history = useHistory();

  const [form, setForm] = useState({
    estado_civil: 'Soltero',
    dueno_vivienda: true,
    num_contacto: 0,
    calle: '',
    num_interior: 0,
    num_exterior: 0,
    colonia: '',
    estado: '',
    educacion: '',
    pais: '',
  });

  const estadosCiviles = [
    {
      value: 'Soltero',
      label: 'Soltero',
    },
    {
      value: 'Casado',
      label: 'Casado',
    },
    {
      value: 'Viudo',
      label: 'Viudo',
    },
    {
      value: 'Divorciado',
      label: 'Divorciado',
    },
  ];

  useEffect(() => {
    const fetchUserp = () =>
      authFetch('http://localhost:5000/api/profileClient')
        .then((r) => r.json())
        .then((r) => {
          console.log(r);
          const updates = Object.fromEntries(
            Object.entries(r).filter((e) => e[1] !== null),
          );
          setForm((form) => ({ ...form, ...updates }));
        });
    fetchUserp();
  }, []);

 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleChangebool = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.checked });
  };

  const close = () => history.push('/profile');
  const onClientUpdate = async () => {
    const res = await authFetch('http://localhost:5000/api/updateClient', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        ...form,
      }),
    });
    const resB = await res.json();

    // TODO: Show a toast to let the user know about a server error
    if (resB.status !== 200) setExcep('Unknown server error');

    history.push('/details');
  };

  return (
    <Dialog
      open
      onClose={close}
      fullWidth
      maxWidth="sm"
      style={{ fontSize: '16px' }}
    >
      <DialogTitle>Modificar Datos</DialogTitle>
      <DialogContent>
        <br />
        <form style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {excep && <Alert severity="error">{excep}</Alert>}

          <TextField
            name="estado_civil"
            select
            label="Estado Civil"
            value={form.estado_civil}
            onChange={handleChange}
            helperText="Porfavor selecciona tu estado Civil"
          >
            {estadosCiviles.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <FormControlLabel
            label="¿Eres dueño de una vivienda?"
            control={
              <Checkbox
                name="dueno_vivienda"
                checked={form.dueno_vivienda}
                onChange={handleChangebool}
              />
            }
          />

          <TextField
            autoFocus
            label="Número de contacto"
            type="tel"
            name="num_contacto"
            fullWidth
            variant="standard"
            value={form.num_contacto}
            onChange={handleChange}
          />

          <TextField
            autoFocus
            label="Calle"
            name="calle"
            type="text"
            fullWidth
            variant="standard"
            value={form.calle}
            onChange={handleChange}
          />

          <TextField
            autoFocus
            label="Número exterior"
            name="num_exterior"
            type="text"
            fullWidth
            variant="standard"
            value={form.num_exterior}
            onChange={handleChange}
          />

          <TextField
            autoFocus
            label="Número interior"
            name="num_interior"
            type="text"
            fullWidth
            variant="standard"
            value={form.num_interior}
            onChange={handleChange}
          />

          <TextField
            autoFocus
            label="Colonia"
            name="colonia"
            type="text"
            fullWidth
            variant="standard"
            value={form.colonia}
            onChange={handleChange}
          />

          <TextField
            autoFocus
            label="Estado"
            name="estado"
            type="text"
            fullWidth
            variant="standard"
            value={form.estado}
            onChange={handleChange}
          />

          <TextField
            autoFocus
            label="Educación"
            name="educacion"
            type="text"
            fullWidth
            variant="standard"
            value={form.educacion}
            onChange={handleChange}
          />

          <TextField
            autoFocus
            label="Pais"
            name="pais"
            type="text"
            fullWidth
            variant="standard"
            value={form.pais}
            onChange={handleChange}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancelar</Button>
        <Button onClick={onClientUpdate}>Guardar Cambios</Button>
      </DialogActions>
    </Dialog>
  );
};
export default UpdateClient;
