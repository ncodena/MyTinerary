import React from 'react';
import { Spinner } from 'reactstrap';
import '../style/Cities.css'

const LoadingSpinner = (props) => {
  return (
    <div className="spinnerContainer">
      <Spinner type="grow" color="info" />
    </div>
  );
}

export default LoadingSpinner;