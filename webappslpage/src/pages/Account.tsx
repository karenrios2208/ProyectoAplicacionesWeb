import React, { useState, useEffect } from 'react';

import { authFetch } from '../auth';
import { API_SERVER_URL } from '../config';

const Account = (): JSX.Element => {
  const [acc, setAcc] = useState('');

  useEffect(() => {
    const fetchAccount = () =>
      authFetch(`${API_SERVER_URL}/account`)
        .then((r) => r.text())
        .then((r) => setAcc(JSON.stringify(r, null, 2)))
        .catch((_) => setAcc('Error'));
    fetchAccount();
  }, []);

  return <div>{acc ? <h1>{acc}</h1> : <h1>Cargando</h1>}</div>;
};

export default Account;
