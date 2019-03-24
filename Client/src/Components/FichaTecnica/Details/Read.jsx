import React, { Component } from "react";

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {
        height: '300px',
        width: '600px',
        border: '1px solid black'
      }
    };
  }

  render() {
    return (
        <div className="Read container">  
          <div className="form-group" align="center">
            <div className="foto" style={this.state.style}></div>               
          </div>
          <div className="form-group row">
              <label className="font-weight-bold col-md-2">Descrição do objeto:</label>
              <label className="col-md-10">Descrição</label>
          </div>
          <div className="form-group row">
              <label className="font-weight-bold col-md-2">Processo LCRM N.º:</label>
              <label className="col-md-1">255</label>
              <label className="font-weight-bold col-md">Data de entrada:</label>
              <label className="col">20/01/2018</label>
              <label className="font-weight-bold col-md-3">Data de abertura de processo:</label>
              <label className="col-md-2">25/01/2018</label>
          </div>
          <div className="form-group row">
              <label className="font-weight-bold col-md-2">Processo CEARC N.º:</label>
              <label className="col-md-1">25945875</label>
              <label className="font-weight-bold col-md">Data de entrada:</label>
              <label className="col">02/05/2018</label>
              <label className="font-weight-bold col-md-3">Data de abertura de processo:</label>
              <label className="col-md-2">02/05/2018</label>
          </div>
          <div className="form-group row">
            <label className="font-weight-bold col-md-4">Coordenação/Direção Técnica da Intervenção:</label>
            <label className="col-md-8">António Matias</label>
          </div>
        </div>
    );
  }
}

export default Create;
