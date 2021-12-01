import React, { useState, useEffect } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import esLocale from 'date-fns/locale/es';
import { format } from 'date-fns';

import { authFetch } from '../auth';
import { API_SERVER_URL } from '../config';

export interface Payment {
  id: number;
  start_date: Date;
  close_date: Date;
  amount: number;
  state: string;
}

const PaymentsList = (): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    const fetchPayments = () =>
      authFetch(`${API_SERVER_URL}/payments`)
        .then((r) => r.json())
        .then((r) => {
          setLoading(false);
          setPayments(
            r.map((p: any) => ({
              ...p,
              start_date: new Date(p.start_date),
              close_date: p.close_date ? new Date(p.close_date) : '',
            })),
          );
          console.log(r);
        });
    fetchPayments();
  }, []);

  if (loading) return <div>Cargando</div>;
  if (payments.length === 0)
    return (
      <div style={{ marginTop: '100px' }}>
        <h2>Aún no has creado anticipos de salario</h2>
      </div>
    );

  return (
    <div style={{ padding: '32px' }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Anticipo</TableCell>
              <TableCell>Monto</TableCell>
              <TableCell align="center">Estado</TableCell>
              <TableCell align="center">Fecha de inicio</TableCell>
              <TableCell align="center">Fecha de cierre</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map((payment) => (
              <TableRow
                key={payment.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {`Anticipo ${payment.id}`}
                </TableCell>
                <TableCell>{`$${payment.amount.toFixed(2)}`}</TableCell>
                <TableCell align="center">{payment.state}</TableCell>
                <TableCell align="center">
                  {format(payment.start_date, 'Y-MM-dd', { locale: esLocale })}
                </TableCell>
                <TableCell align="center">
                  {payment.close_date
                    ? format(payment.close_date, 'Y-MM-dd', {
                        locale: esLocale,
                      })
                    : ''}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PaymentsList;
