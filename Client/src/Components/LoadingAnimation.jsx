import React, { Component } from "react";

class LoadingAnimation extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" style={{width: this.props.width , height: this.props.height}} role="status"></div>
      </div>
    );
  }
}

export default LoadingAnimation;
