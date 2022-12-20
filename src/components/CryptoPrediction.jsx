import React, { useState } from "react";
import { Loader } from "../components";

/**
 * @param {object} 
 * Component props
 * @returns {React.Component} returns the iframe component
 *  */
const Iframe = (props) => {
  return (
    <>
      <iframe
        style={{ overflow: 'hidden'}}
        onLoad={props.onLoad}
        src={props.iframe}
        width="100%"
        height="1000px"
        frameBorder="0"
        scrolling="no"
        marginHeight="0"
        marginWidth="0"
        title="Crypto Prediction"
      ></iframe>
    </>
  );
};
/**n
 * Returns the component to be rendered
 * @returns {React.Component}
 */

const CryptoPrediction = () => {
  const [loading, setLoading] = useState(true);

  /**
   * @param {null}   
   * Alter loading state
   * @returns {null}
   */

  const handleOnLoad = () => {
    setLoading(false);
  };

  return (
    <div className="prediction-container">
      {/*  Loading animation */}
      {loading && <Loader />}
      <Iframe
        iframe={process.env.REACT_APP_CRYPTO_PREDICTION_URL}
        onLoad={handleOnLoad}
      ></Iframe>
    </div>
  );
};

export default CryptoPrediction;
