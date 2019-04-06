import React, { Component } from "react";

class AlertMsg extends Component {
  render() {
    return (
      <div className={`alert alert-${this.props.alertColor} mt-3`} hidden={this.props.isNotVisible} role="alert">
        <strong>{this.props.text}</strong>
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    );
  }
}

export default AlertMsg;
