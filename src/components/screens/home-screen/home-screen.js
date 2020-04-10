import React from 'react';
import { name, version } from '../../../../package.json';

export const HomeScreen = () => {
  const greeting = `Welcome to ${name} `;

  return (
    <div>
      <code>
        Version&nbsp;
        {version}
      </code>
      <h2>{greeting}</h2>
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
