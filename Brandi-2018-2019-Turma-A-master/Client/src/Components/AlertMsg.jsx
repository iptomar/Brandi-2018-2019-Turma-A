import React, { Component } from "react";

class AlertMsg extends Component {
  render() {
    return (
    <div className={`alert alert-${this.props.alertColor}`} hidden={this.props.isNotVisible} role="alert">
      <strong>{this.props.text}</strong>
    </div>
    );
  }
}

export default AlertMsg;
