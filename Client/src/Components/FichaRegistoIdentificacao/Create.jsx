import React, { Component } from "react";
import AlertMsg from '../Globais/AlertMsg';
import FileUpload from "../Globais/FileUpload";

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertText: "Ocorreu um erro técnico. Tente novamente mais tarde",
      alertisNotVisible: true,
      alertColor: "danger",
      files: [],
      tecnicosResp: []
    }
    this.fetchTecnicos();
    this.getData = this.getData.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
  }

  //Recebe os dados do filho Upload
  getData(data) {
    this.setState({ files: data });
  }

  async fetchTecnicos() {
    //Enviar pedido para receber 
    const response = await fetch("/api/tecnicos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'x-auth-token': sessionStorage.getItem('token')
      }
    });
    await response.json().then(resp => {
      this.setState({ tecnicosResp: resp.resposta })
    });
  }

  verifyCBS() {
    var cboxes = document.querySelectorAll("#tecnicosCheckbox");
    var len = cboxes.length;
    let idCBS = [];
    for (var i = 0; i < len; i++) if (cboxes[i].checked) idCBS.push(cboxes[i].value);
    return idCBS;
  }

  handleSubmit = async e => {
    e.preventDefault();

    if (this.state.files.length === 0) {
      this.setState({
        alertText: "Insira uma imagem",
        alertisNotVisible: false,
        alertColor: "danger"
      });
      return null
    }

    let formData = new FormData();

    let CB = this.verifyCBS();
    if (CB.length === 0) {
      this.setState({
        alertText: "Insira um técnico",
        alertisNotVisible: false,
        alertColor: "danger"
      });
      return null
    }

    formData.append("designacao", document.getElementById("dObjeto").value);
    formData.append("processoLCRM", document.getElementById("procLCRM").value);
    formData.append("processoCEARC", document.getElementById("procCEARC").value);
    formData.append("dataEntrada", document.getElementById("dateEntrada").value);
    formData.append("dataConclusao", document.getElementById("dateConclusão").value);
    formData.append("dataEntrega", document.getElementById("dateEntrega").value);
    formData.append("coordenacao", document.getElementById("coord").value);
    formData.append("direcaoTecnica", document.getElementById("dirTecn").value);
    formData.append("localidade", document.getElementById("endPostLocal").value);
    formData.append("interessadoFK", 1);
    formData.append("tecnicosFK", CB);

    //Enviar as imagens
    for (var i = 0; i < this.state.files.length; i++) {
      formData.append("imagem", this.state.files[i]);
    }
    
    //Enviar pedidos (FORMA UTILIZADA A PEDIDO DA EQUIPA DA API)
    const response = await fetch("/api/fichaRegistoIdentificacao/create", {
      method: "POST",
      headers: {
        'x-auth-token': sessionStorage.getItem('token')
      },
      body: formData
    });
    //Aguardar API
    await response.json().then(resp => {
      let status = resp.stat;
      switch (status) {
        case "DatabaseError":
          this.setState({
            alertText: "Ocorreu um erro técnico. Tente novamente mais tarde",
            alertisNotVisible: false,
            alertColor: "danger"
          });
          break;
        case "Registed":
          window.location = '/fichaRI/&showConfirm';
          break;
        case "NotRegisted":
          this.setState({
            alertisNotVisible: false
          });
          break;
        default:
          console.log("A API ESTÁ A ARDER, DARIOOOOOOOOOOOOOOOOOOOOOO");
      }
    });
  };

  //Altera o estado conforme o Alert
  changeStatus() {
    this.setState({ alertisNotVisible: true });
  }

  render() {
    //Verifica se existe o token
    if (sessionStorage.getItem('token') == null) {
      window.location = '/';
    } else {
      return (
        <div className="Inicio container">
          <div className="container">
            <div className="py-3 text-center">
              <h2>Ficha de Registo e Identificação</h2>
            </div>
            <div className="row">
              <div className="col-md-12 order-md-1">
                <form onSubmit={this.handleSubmit} id="formSubmit">
                  <div className="row">
                    <div className="col-md-12 mb-3">
                      <label>Designação do Objeto</label>
                      <input type="text" className="form-control" id="dObjeto" placeholder="Designação do Objeto" required />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label>Processo LCRM</label>
                      <input type="text" className="form-control" id="procLCRM" placeholder="Processo LCRM" required />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Processo CEARC</label>
                      <input type="text" className="form-control" id="procCEARC" placeholder="Processo CEARC" required />
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
                  <label>Técnico(s) Responsável(eis)</label>
                  <div className="row">
                    {this.state.tecnicosResp.map(function (object) {
                      return (
                        <div className="input-group mb-3 col-md-3" key={object.tecnicoID}>
                          <div className="input-group-prepend">
                            <div className="input-group-text">
                              <input type="checkbox" id="tecnicosCheckbox" value={object.tecnicoID} />
                            </div>
                          </div>
                          <label className="form-control">{object.nome}</label>
                        </div>
                      );
                    })}
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
                  <div className="row">
                    <div className="col-md-12">
                      <FileUpload sendData={this.getData} type="image"/>
                    </div>
                  </div>
                  <AlertMsg text={this.state.alertText} isNotVisible={this.state.alertisNotVisible} alertColor={this.state.alertColor} status={this.changeStatus} />
                  <hr className="mb-4" />
                  <button className="btn btn-success btn-lg btn-block mb-5" type="submit">Criar</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Create;