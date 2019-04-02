import React, { Component } from "react";
import AlertMsg from "../AlertMsg";

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertText: "Ocorreu um erro técnico. Tente novamente mais tarde",
      alertisNotVisible: true,
      alertColor: "danger",
      file: null,
      tecnicosResp: []
    }
    this.fetchTecnicos();
    this.handleChange = this.handleChange.bind(this);
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
    //Objeto data
    const data = {
      designacao: document.getElementById("dObjeto").value,
      processoLCRM: document.getElementById("procLCRM").value,
      processoCEARC: document.getElementById("procCEARC").value,
      dataEntrada: document.getElementById("dateEntrada").value,
      dataConclusao: document.getElementById("dateConclusão").value,
      dataEntrega: document.getElementById("dateEntrega").value,
      coordenacao: document.getElementById("coord").value,
      direcaoTecnica: document.getElementById("dirTecn").value,
      localidade: document.getElementById("endPostLocal").value,
      interessadoFK: 1,
      tecnicosFK: this.verifyCBS()
    };

    //Enviar pedidos
    const response = await fetch("/api/fichaRegistoIdentificacao/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'x-auth-token': sessionStorage.getItem('token')
      },
      body: JSON.stringify(data)
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
          window.location = '/fichaRI';
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

  handleChange(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0])
    })
  }

  onImgLoad = ({ target: img }) => {
    this.setState({
      width: img.width,
      height: img.height,
    });
    document.getElementById("customFile").blur();
  };

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
                <form onSubmit={this.handleSubmit}>
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
                        <div className="input-group mb-3 col-md-2" key={object.tecnicoID}>
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
                    <div className="col-md-12 mb-3">
                      <div className="custom-file">
                        <input type="file" className="custom-file-input" id="customFile" accept="image/*" onChange={this.handleChange} />
                        <label className="custom-file-label" data-browse="Escolher Ficheiro" >Escolha Fotografia</label>
                      </div>
                      <div className="text-center">
                        {
                          this.state.file ?
                            <img src={this.state.file} onLoad={this.onImgLoad} id="imgPrev" className="rounded img-thumbnail" alt="Pré-visualização da fotografia carregada..." />
                            :
                            null
                        }
                      </div>
                    </div>
                  </div>
                  <AlertMsg text={this.state.alertText} isNotVisible={this.state.alertisNotVisible} alertColor={this.state.alertColor} />
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