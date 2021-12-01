import { Card, CardContent, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { authFetch } from '../auth';
import Kommunicate from '@kommunicate/kommunicate-chatbot-plugin';
import { API_SERVER_URL } from '../config';
declare const window: any;
const User = (): JSX.Element => {
  const [usr, setusr] = useState({
    username: '',
    email: '',
    balance: 0,
    nombre: '',
    apellidos: '',
  });

  var blnc = { balance: 15000 };

  const onClientUpdate = async () => {
    const res = await authFetch(`${API_SERVER_URL}/updateBalance`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },

      body: JSON.stringify(blnc),
    });
    const resB = await res.json();

    // TODO: Show a toast to let the user know about a server error
    if (resB.status !== 200) {
      console.log('uwu');
    }
  };

  const createPayment = async (prestamo) => {
    const res = await authFetch(`${API_SERVER_URL}/createPayment`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        monto: prestamo,
      }),
    });

    const resB = await res.json();

    // TODO: Show a toast to let the user know about a server error
    if (resB.status !== 200) {
      console.log('error');
    }
  };

  useEffect(() => {
    const fetchUserp = () =>
      authFetch(`${API_SERVER_URL}/profile`)
        .then((r) => r.json())
        .then((r) => {
          const updates = Object.fromEntries(
            Object.entries(r).filter((e) => e[1] !== null),
          );
          setusr((form) => ({ ...form, ...updates }));
        });
    fetchUserp();
  }, []);

  Kommunicate.init('37023b4d4f03c87771a4422862fc593cd', {
    popupWidget: true,
    automaticChatOpenOnNavigation: false,
    onInit: function () {
      var chatContext = {
        key1: 'value1',
        key2: usr.balance,
      };
      window.Kommunicate.updateChatContext(chatContext);
      var events = {
        onMessageReceived: function (resp) {
          console.log('wwwwwwwwwwwwwwwwww', usr.username);
          if (
            resp['message']['message'].includes(
              'Listo! Tu préstamo de nómina fue completado.',
            )
          ) {
            // reqbal es el balance despues del prestamo, puedes hacer (usr.balance - reqbal) para obtener la cantidad solicitada.
            const reqbal = Number(resp['message']['message'].match(/\d+/));
            blnc.balance = reqbal;
            // Aqui van el post para la tabla "solicitud" con la información del prestamo
            createPayment(usr.balance - reqbal);
            onClientUpdate();
          } else if (
            resp['message']['message'].includes(
              'Listo! Tu préstamo personal fue completado.',
            )
          ) {
            // reqbal es el balance despues del prestamo, puedes hacer (usr.balance - reqbal) para obtener la cantidad solicitada.
            const reqbal = Number(resp['message']['message'].match(/\d+/));
            blnc.balance = reqbal;
            // Aqui van el post para la tabla "solicitud" con la información del prestamo
            createPayment(usr.balance - reqbal);
            onClientUpdate();
          }
        },
        onMessageSent: function (resp) {
          console.log('wwwwwwwwwwwwwwwwww', usr.username);
          console.log(resp);
          //called when the message is sent
        },
        onChatWidgetOpen: function (resp) {
          console.log(resp);
          //called when chat widget gets open
        },
      };
      window.Kommunicate.subscribeToEvents(events);
    },
  });

  console.log(usr);
  return (
    <div
      style={{ margin: '0 auto', width: '100%', height: 'calc(100vh - 100px)' }}
      id="user"
    >
      <Typography variant="h2" component="h1" align="center">
        Bienvenido {usr.username}
      </Typography>
      <br />
      <Card sx={{ minWidth: 275, mb: '8%', mx: '5%' }}>
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
          <Typography variant="body1">
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
