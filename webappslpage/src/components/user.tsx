import { Card, CardContent, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { authFetch } from '../auth';

const User = (): JSX.Element => {
  const [usr, setusr] = useState({
    username: '',
    email: '',
    balance: '',
    nombre: '',
    apellidos: '',
  });




  useEffect(() => {
    const fetchUserp = () =>
      authFetch('http://localhost:5000/api/profile')
        .then((r) => r.json())
        .then((r) => {
          const updates = Object.fromEntries(
            Object.entries(r).filter((e) => e[1] !== null),
          );
          setusr((form) => ({ ...form, ...updates }));
        });
    fetchUserp();
  }, []);

 
  console.log(usr);
  return (
    <div style={{ margin: '0 auto', width: '100%' }} id="user">
      <Typography variant="h2" component="h1" align="center">
        Bienvenido {usr.username}
      </Typography>
      <br />
      <Card sx={{ minWidth: 275, mb: '8%', mx: '5%' }}>
        0
        <CardContent>
          <Typography variant="h5" component="h2">
            Balance
          </Typography>
          <br />
          <Typography variant="body1" component="h3">
            &emsp;${usr.balance}
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{ minWidth: 275, mb: '2%', mx: '5%' }}>
        <CardContent>
          <Typography variant="h5" component="h2">
            Datos Cuenta
          </Typography>
          <br />
          <Typography variant="body1" component="h3">
            <b>&emsp; Nombre:</b> {usr.nombre}
            <br />
            <b>&emsp; Apellidos:</b> {usr.apellidos}
            <br />
            <b>&emsp; Nombre de usuario:</b> {usr.username}
            <br />
            <b>&emsp; Email:</b> {usr.email}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default User;
