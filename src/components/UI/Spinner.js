import React from "react";
import "./Spinner.css";

const Spinner = () => {
  return (
    <div className="center">
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Spinner;
