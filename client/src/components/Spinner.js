import React from 'react';
import { Spinner } from 'reactstrap';

const LoadingSpinner = (props) => {
  return (
    <div>
      <Spinner type="grow" color="info" />
    </div>
  );
}

export default LoadingSpinner;