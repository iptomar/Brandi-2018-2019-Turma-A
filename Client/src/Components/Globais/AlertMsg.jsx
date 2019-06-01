import React, { Component } from "react";

class AlertMsg extends Component {

  constructor(props){
    super(props);
    this.hid = this.hid.bind(this);
  }
  
  changeStatus(){
    this.props.status();
  }

  /**
   * Método que apresentada/esconde o alert
   */
  hid(){
    if(this.props.status !== undefined)
      this.changeStatus();
    document.getElementById("adeus").hidden = true;
  }


  render() {
    return (
      <div className={`alert alert-${this.props.alertColor} mt-3`} id="adeus" hidden={this.props.isNotVisible} role="alert">
        <strong>{this.props.text}</strong>
        <button type="button" className="close" aria-label="Close" onClick={this.hid}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    );
  }
}

export default AlertMsg;
