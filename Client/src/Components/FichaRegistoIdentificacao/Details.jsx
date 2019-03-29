import React, { Component } from "react";

class Details extends Component {
  constructor(props) {
    super(props);
    document.body.style = 'background: rgb(235, 235, 235)';
    this.state = {
      data: null
    }
    this.getFichaRI(props.id);
  }

  async getFichaRI(id) {
    //Enviar pedido
    const response = await fetch("/api/fichaRegistoIdentificacao/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'x-auth-token': sessionStorage.getItem('token')
      }
    });
    //Aguardar API
    await response.json().then(resp => {
      let status = resp.stat;
      switch (status) {
        case "Authenticated":
          this.setState({ data: resp.resposta });
          break;
        default:
          console.log("A API ESTÁ A ARDER, DARIOOOOOOOOOOOOOOOOOOOOOO");
      }
    });
  };

  render() {
    console.log(this.state.data);
    if (sessionStorage.getItem('token') == null) {
      window.location = '/';
    } else {
      if (this.state.data != null) {
        return (
          //Verifica se existe o token
          <div className="Inicio container">
            <div className="container">
              <div className="py-3 text-center">
                <h2>Ficha de Registo e Identificação</h2>
              </div>
              <div className="row">
                <div className="col-md-12 mb-3">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5b/Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg" alt="Imagem" className="img-fluid"/>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 order-md-1">
                    <div className="row">
                      <div className="col-md-12 mb-3">
                        <label>Designação do Objeto: </label>
                        {" "}
                        <label>{this.state.data.designacao}</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label>Processo LCRM: </label>
                        {" "}
                        <label>{this.state.data.processoLCRM}</label>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label>Processo CEARC: </label>
                        {" "}
                        <label>{this.state.data.processoCEARC}</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <label>Data de Entrada: </label>
                        {" "}
                        <label>{this.state.data.dataEntrada}</label>
                      </div>
                      <div className="col-md-4 mb-3">
                        <label>Data de Conclusão: </label>
                        {" "}
                        <label>{this.state.data.dataConclusao}</label>
                      </div>
                      <div className="col-md-4 mb-3">
                        <label>Data de Entrega: </label>
                        {" "}
                        <label>{this.state.data.dataEntrega}</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label>Coordenação: </label>
                        {" "}
                        <label>{this.state.data.coordenacao}</label>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label>Direção Técnica: </label>
                        {" "}
                        <label>{this.state.data.direcaoTecnica}</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 mb-3">
                        <label>Técnico(s) Responsável(eis): </label>
                        {" "}
                        <label>SEM INFORMACAO</label>>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 mb-3">
                        <label>Proprietário | Dono da Obra: </label>
                        {" "}
                        <label>SEM INFORMACAO</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 mb-3">
                        <label>Contacto(s): </label>
                        {" "}
                        <label>SEM INFORMACAO</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 mb-3">
                        <label>Endereço Postal | Localidade: </label>
                        {" "}
                        <label>{this.state.data.localidade}</label>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        );
      }else return null;
    }
  }
}

export default Details;