import { Button, Card, CardContent, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { authFetch } from '../auth';
import { Route, useHistory } from 'react-router-dom';
import UpdateClient from '../components/modifyclient';

const Details = (): JSX.Element => {
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
  
  const history = useHistory();
  useEffect(() => {
    const fetchUserp = () =>
      authFetch('http://localhost:5000/api/profileClient')
        .then((r) => r.json())
        .then((r) => {
          const updates = Object.fromEntries(
            Object.entries(r).filter((e) => e[1] !== null),
          );
          setForm((form) => ({ ...form, ...updates }));
        });
    fetchUserp();
  }, []);

  return (
    
    <div style={{ margin: '-8% auto', width: '100%' }} id="user">

      <Card sx={{ minWidth: 275, mx: '5%' }}>
        <CardContent>
          <Typography variant="h5" component="h2">
            Detalles de la cuenta
          </Typography>
          <br />
          <Typography variant="body1" component="h3">
            <b>&emsp; Estado Civil:</b> {form.estado_civil}
            <br />
            {form.dueno_vivienda ? (
              <Typography variant="body1" component="h3">
                <b>&emsp; Dueño de vivienda:</b> si
              </Typography>
            ) : (
              <Typography variant="body1" component="h3">
                <b>&emsp; Dueño de vivienda:</b> no
              </Typography>
            )}
            <b>&emsp; Número de Contacto :</b> {form.num_contacto}
            <br />
            <b>&emsp; Calle:</b> {form.calle}
            <br />
            <b>&emsp; Número Interior :</b> {form.num_interior}
            <br />
            <b>&emsp; Número Exterior:</b> {form.num_exterior}
            <br />
            <b>&emsp; Colonia:</b> {form.colonia}
            <br />
            <b>&emsp; Estado:</b> {form.estado}
            <br />
            <b>&emsp; País:</b> {form.pais}
            <br />
            <b>&emsp; Nivel de Educación:</b> {form.educacion}
          </Typography>
        </CardContent>
      </Card>

      <div style={{ margin: '2% auto auto', width: '100%' }}></div>
      <Button
        sx={{ ml: '2%' }}
        variant="contained"
        color="success"
        component="h2"
        onClick={() => {
          history.push('/updateC');
        }}
      >
        Modifica tus datos
      </Button>
      <Route path="/updateC" component={UpdateClient}/>
    </div>
  );
};

export default Details;
