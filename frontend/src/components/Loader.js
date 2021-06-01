import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <Spinner
      animation='border'
      role='status'
      style={{
        width: '30px',
        height: '30px',
        margin: 'auto',
        display: 'block',
        borderWidth: '1px',
      }}
      variant='info'
    >
      <span className='sr-only'>Loading...</span>
    </Spinner>
  );
};

export default Loader;
