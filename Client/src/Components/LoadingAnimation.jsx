import React, { Component } from "react";

class LoadingAnimation extends Component {

  render() {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" style={{width: '6rem' , height: '6rem'}} role="status"></div>
      </div>
    );
  }
}

export default LoadingAnimation;
