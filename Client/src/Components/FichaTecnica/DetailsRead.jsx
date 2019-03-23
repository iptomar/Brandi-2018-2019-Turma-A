import React, { Component } from "react";

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertText: "",
      alertisNotVisible: true,
      alertColor: "",
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
          <div class="modal fade" id="modalApagar" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Apagar Ficha Técnica</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  Tem a certeza que pretende apagar esta ficha técnica?
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-primary" data-dismiss="modal">Não</button>
                  <button type="button" class="btn btn-danger">Sim</button>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default Create;
