import React, { Component } from "react";

class Details extends Component {
  constructor(props) {
    super(props);
    document.body.style = "background: rgb(235, 235, 235)";
    this.state = {
      data: null
    };
    this.getFichaRI(props.id);
  }

  async getFichaRI(id) {
    //Enviar pedido
    const response = await fetch("/api/fichaRegistoIdentificacao/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": sessionStorage.getItem("token")
      }
    });
    //Aguardar API
    await response.json().then(resp => {
      let status = resp.stat;
      console.log(status);
      switch (status) {
        case "Authenticated":
          this.setState({ data: resp.resposta });
          break;
        default:
          console.log("A API ESTÁ A ARDER, DARIOOOOOOOOOOOOOOOOOOOOOO");
      }
    });
  }

  render() {
    console.log(this.state.data);
    if (sessionStorage.getItem("token") == null) {
      window.location = "/";
    } else {
      if (this.state.data != null) {
        return (
          <div className="container">
            <div className="py-3 text-center">
              <h2>Detalhes da Ficha de Registo e Identificação</h2>
            </div>
            <div className="row">
              <div className="col-md-12 mb-3">
                <div className="text-center">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/5b/Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg"
                    id="imgPrev"
                    className="rounded img-thumbnail"
                    alt="Imagem"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 order-md-1">
                <div className="row">
                  <div className="col-md-12 mb-3">
                    <label>Designação do Objeto</label>
                    <input
                      type="text"
                      className="form-control"
                      id="dObjeto"
                      placeholder={this.state.data.designacao}
                      readOnly
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label>Processo LCRM</label>
                    <input
                      type="text"
                      className="form-control"
                      id="procLCRM"
                      placeholder={this.state.data.processoLCRM}
                      readOnly
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>Processo CEARC</label>
                    <input
                      type="text"
                      className="form-control"
                      id="procCEARC"
                      placeholder={this.state.data.processoCEARC}
                      readOnly
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label>Data de Entrada</label>
                    <input
                      type="date"
                      className="form-control"
                      id="dateEntrada"
                      readOnly
                      value={this.state.data.dataEntrada}
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label>Data de Conclusão</label>
                    <input
                      type="date"
                      className="form-control"
                      id="dateConclusão"
                      readOnly
                      value={this.state.data.dataConclusao}
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label>Data de Entrega</label>
                    <input
                      type="date"
                      className="form-control"
                      id="dateEntrega"
                      readOnly
                      value={this.state.data.dataEntrega}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label>Coordenação</label>
                    <input
                      type="text"
                      className="form-control"
                      id="coord"
                      placeholder={this.state.data.coordenacao}
                      readOnly
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>Direção Técnica</label>
                    <input
                      type="text"
                      className="form-control"
                      id="dirTecn"
                      placeholder={this.state.data.direcaoTecnica}
                      readOnly
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 mb-3">
                    <label>Técnico(s) Responsável(eis)</label>
                    <input
                      type="text"
                      className="form-control"
                      id="tecResp"
                      placeholder={this.state.data.tecnicos[1]}
                      readOnly
                    />
                  </div>
                </div>
                <hr className="mb-4" />
                <button className="btn btn-warning btn-lg btn-block">
                  Editar
                </button>
                <button className="btn btn-danger btn-lg btn-block">
                  Apagar
                </button>
              </div>
            </div>
          </div>
        );
      } else return null;
    }
  }
}

export default Details;
