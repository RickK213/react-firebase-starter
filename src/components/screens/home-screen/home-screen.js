import React from 'react';
import { name, version } from '../../../../package.json';

export const HomeScreen = () => {
  const greeting = `Welcome to ${name} `;
  const VersionLabel = () => <code>{`(${version})`}</code>;

  return (
    <div>
      <h2>
        {greeting}
        <VersionLabel />
      </h2>
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
