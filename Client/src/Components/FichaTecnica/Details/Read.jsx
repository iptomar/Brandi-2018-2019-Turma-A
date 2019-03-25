import React, { Component } from "react";

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {
        height: '300px',
        width: '600px',
        border: '1px solid black'
      },
      responseAPI: "",
      loading: true
    };
  }

  componentDidMount(){
   this.getAPI();
  }

  getAPI = async e => {
    const request = await fetch('/api/fichatecnica/7', {
      headers: {
        'x-auth-token': sessionStorage.getItem('token')
      }
    });
    request.json().then( resp => {
      // Guardar a resposta no state
      this.setState({
        responseAPI: resp.resposta,
        loading: false
      });
    });
  }

  render() {
    return (
        this.state.loading?

          // Animação Loading
          <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status" style={{width: '5rem', height: '5rem'}}>
              <span class="sr-only">Loading...</span>
            </div>
          </div>
          
        : // else

          // Conteudo do Read
          <div className="Read container">  
            <div className="form-group" align="center">
              <div className="foto" style={{height: '300px', width: '600px', border: '1px solid black'}}></div>               
            </div>
            <div className="form-group row">
                <label className="font-weight-bold col-md-2">Descrição do objeto:</label>
                <label className="col-md-10">{this.state.responseAPI.designacao}</label>
            </div>
            <div className="form-group row">
                <label className="font-weight-bold col-md-2">Processo LCRM N.º:</label>
                <label className="col-md-2">{this.state.responseAPI.processoLCRM}</label>
                <label className="font-weight-bold col-md-2">Data de entrada:</label>
                <label className="col-md-2">20/01/2018</label>
                <label className="font-weight-bold col-md-2">Data de abertura de processo:</label>
                <label className="col-md-2">25/01/2018</label>
            </div>
            <div className="form-group row">
                <label className="font-weight-bold col-md-2">Processo CEARC N.º:</label>
                <label className="col-md-2">{this.state.responseAPI.processoCEARC}</label>
                <label className="font-weight-bold col-md-2">Data de entrada:</label>
                <label className="col-md-2">02/05/2018</label>
                <label className="font-weight-bold col-md-2">Data de abertura de processo:</label>
                <label className="col-md-2">{this.state.responseAPI.coordenacao}</label>
            </div>
            <div className="form-group row">
              <label className="font-weight-bold col-md-4">Coordenação/Direção Técnica da Intervenção:</label>
              <label className="col-md-8">{this.state.responseAPI.coordenacao}</label>
            </div>
          </div>
    );
  }
}

export default Create;
