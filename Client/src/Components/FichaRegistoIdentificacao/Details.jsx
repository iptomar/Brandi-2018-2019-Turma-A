import React, { Component } from "react";

class Details extends Component {
  constructor(props) {
    super(props);
    document.body.style = 'background: rgb(235, 235, 235)';
    this.state = {
      data: null
    }
    this.getFichasTecn();
  }

  async getFichasTecn() {
    //Enviar pedido
    const response = await fetch("/api/fichatecnica/0", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'x-auth-token': sessionStorage.getItem('token')
      }
    });
    //Aguardar API
    await response.json().then(resp => {
      let status = resp.stat;
      console.log(status);
      switch (status) {
        case "????":
          this.setState({ data: resp });
          break;
        default:
          console.log("A API ESTÁ A ARDER, DARIOOOOOOOOOOOOOOOOOOOOOO");
      }




    });
  };

  render() {
    // if (sessionStorage.getItem('token') == null) {
    //   window.location = '/';
    // } else {
      return (
        //Verifica se existe o token
        <div className="Inicio container">
          <div className="container">
            <div className="py-3 text-center">
              <h2>Ficha de Registo e Identificação</h2>
            </div>
            <div className="row">
              <div className="col-md-12 mb-3">
                <img src="..." alt="..." />
              </div>
            </div>
            <hr className="mb-4" />
            <div className="row">
              <div className="col-md-12 order-md-1">
                <form className="">
                  <div className="row">
                    <div className="col-md-12 mb-3">
                      <label>Designação do Objeto</label>
                      {/* <label>{this.state.data}</label> */}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label>Processo LCRM</label>
                      <input type="number" className="form-control" id="procLCRM" placeholder="Processo LCRM" required />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Processo CEARC</label>
                      <input type="number" className="form-control" id="procCEARC" placeholder="Processo CEARC" required />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label>Data de Entrada</label>
                      <input type="date" className="form-control" id="dateEntrada" required />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label>Data de Conclusão</label>
                      <input type="date" className="form-control" id="dateConclusão" />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label>Data de Entrega</label>
                      <input type="date" className="form-control" id="dateEntrega" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label>Coordenação</label>
                      <input type="text" className="form-control" id="coord" placeholder="Coordenação" required />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Direção Técnica</label>
                      <input type="text" className="form-control" id="dirTecn" placeholder="Direção Técnica" required />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 mb-3">
                      <label>Técnico(s) Responsável(eis)</label>
                      <input type="text" className="form-control" id="tecResp" placeholder="Técnico(s) Responsável(eis)" required />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 mb-3">
                      <label>Proprietário | Dono da Obra</label>
                      <input type="text" className="form-control" id="propDonObra" placeholder="Proprietário | Dono da Obra" required />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 mb-3">
                      <label>Contacto(s)</label>
                      <input type="text" className="form-control" id="contact" placeholder="Contacto(s)" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 mb-3">
                      <label>Endereço Postal | Localidade</label>
                      <input type="text" className="form-control" id="endPostLocal" placeholder="Endereço Postal | Localidade" />
                    </div>
                  </div>
                  <hr className="mb-4" />
                  <button className="btn btn-success btn-lg btn-block mb-5" type="submit">Criar</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    // }
  }
}
export default Details;
