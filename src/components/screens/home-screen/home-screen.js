import React from 'react';
import { name, version } from '../../../../package.json';

export const HomeScreen = () => {
  const greeting = `Welcome to ${name} `;

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '20px'
        }}
      >
        <h2 style={{ marginTop: 0 }}>{greeting}</h2>
        {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
        <code>v{version}</code>
      </div>
      <h4>
        <span role="img" aria-label="Under Construction">
          ⚠️
        </span>
        Under Construction
      </h4>
      <p>
        This is a starter application implementing React, Redux and Firebase.
      </p>
    </div>
  );
};
