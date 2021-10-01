import React from 'react';
import './Loader.css'

const Loader:React.FC = () => {
  return (
    <div>
      <div className="lds-dual-ring"></div>
    </div>
  );
};

export default Loader;