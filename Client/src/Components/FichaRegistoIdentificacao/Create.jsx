import React, { Component } from "react";
import AlertMsg from "../AlertMsg";

class Create extends Component {
  constructor(props) {
    super(props);
    document.body.style = 'background: rgb(235, 235, 235)';

    this.state = {
      alertText: "Ficha inserida com sucesso",
      alertisNotVisible: true,
      alertColor: "success",
      file: null
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = async e => {
    e.preventDefault();

    //Objeto data
    const data = {
    };

    //Enviar pedidos
    const response = await fetch("/api/fichatecnica/create", {
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
        case "Ficha inserida":
          this.setState({
            alertisNotVisible: false
          });
          break;
        case "Erro na criação":
          this.setState({
            alertText: "Ocorreu um erro técnico. Tente novamente mais tarde",
            alertisNotVisible: false,
            alertColor: "danger"
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
    return (
      <div className="Inicio container">
        <div className="container">
          <div className="py-3 text-center">
            <h2>Ficha de Registo e Identificação</h2>
          </div>
          <AlertMsg text={this.state.alertText} isNotVisible={this.state.alertisNotVisible} alertColor={this.state.alertColor} />
          <div className="row">
            <div className="col-md-12 order-md-1">
              <form className="">
                <div className="row">
                  <div className="col-md-12 mb-3">
                    <label>Designação do Objeto</label>
                    <input type="text" className="form-control" id="dObjeto" placeholder="Designação do Objeto" required />
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
export default Create;
