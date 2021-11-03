import React from 'react';

import { Mensaje } from '../components/mensaje';

const BotConversation = () => (
  <div>
    <h1>Bot Conversation</h1>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div
        style={{
          backgroundColor: 'red',
          maxWidth: '800px',
          minHeight: '600px',
          flex: '1',
        }}
      >
        <Mensaje cliente text="Buenas tardes" />
        <Mensaje bot text="Buenas tardes" />
        <Mensaje bot text="¿En qué puedo ayudarle?" />
        <textarea></textarea>
      </div>
    </div>
  </div>
);

export default BotConversation;
