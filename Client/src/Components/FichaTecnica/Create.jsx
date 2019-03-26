import React, { Component } from "react";
import AlertMsg from "../AlertMsg";

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertText: "Ficha técnica inserida com sucesso",
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
      designacao: document.getElementById('dobjeto').value,
      processoLCRM: document.getElementById('nprocLCRM').value,
      processoCEARC: document.getElementById('nprocCEARC').value,
      dataEntrada: null,
      dataConclusao: null,
      dataSaida: null,
      coordenacao: document.getElementById('coordenacao').value,
      direcaoTecnica: document.getElementById('coordenacao').value,
      localidade: null,
      interessadoFK: null
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
      let status = resp.status;
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
  };

  render() {
    return (
        <div className="Inicio container">
            <p className="h4">Ficha Técnica</p>
            <form className="py-3" onSubmit={this.handleSubmit}>
                <div className="form-group row">
                    <label className="col-form-label col-md-2">Descrição do objeto:</label>
                    <input type="text" id="dobjeto" className="form-control col-md-10" placeholder="Descrição do objeto" required/>
                </div>
                <div className="form-group row">
                    <label className="col-form-label col-md-2">Processo LCRM N.º:</label>
                    <input type="number" id="nprocLCRM" className="form-control col-md-1" placeholder="N.º" required/>
                    <label className="col-form-label col-md">Data de entrada:</label>
                    <input type="date" id="dataprocLCRM" className="form-control col"/>
                    <label className="col-form-label col-md-3">Data de abertura de processo:</label>
                    <input type="date" id="dataprocLCRM" className="form-control col-md-2"/>
                </div>
                <div className="form-group row">
                    <label className="col-form-label col-md-2">Processo CEARC N.º:</label>
                    <input type="number" id="nprocCEARC" className="form-control col-md-1" placeholder="N.º" required/>
                    <label className="col-form-label col-md">Data de entrada:</label>
                    <input type="date" id="dataprocCEARC" className="form-control col"/>
                    <label className="col-form-label col-md-3">Data de abertura de processo:</label>
                  <input type="date" id="dataprocCEARC" className="form-control col-md-2"/>
                </div>
                <div className="form-group row">
                  <label className="col-form-label col-md-4">Coordenação/Direção Técnica da Intervenção:</label>
                  <input type="text" id="coordenacao" className="form-control col-md-8" placeholder="Coordenador/Diretor técnico" required/>
                </div>
                <div className="form-group">
                  <button className="btn btn-info" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                    Registo fotográfico identificativo do objeto
                  </button>
                  <div className="py-3 collapse" id="collapseExample">
                    <div className="row">
                      <label className="col-form-label col-md-3">Fotografia:</label>
                      <input type="file" id="fotoTemplate" className="col-form form-control-file col-md-3" accept="image/*" onChange={this.handleChange}/>
                    </div>
                    <div className="text-center">
                      <img src={this.state.file} onLoad={this.onImgLoad} className="rounded img-thumbnail" alt="Pré-visualização da fotografia carregada..."/>
                    </div>
                  </div>
                </div>
                <AlertMsg text={this.state.alertText} isNotVisible={this.state.alertisNotVisible} alertColor={this.state.alertColor}/>
                <button type="submit" className="btn btn-primary">Criar</button>
            </form>
        </div>        
    );
  }
}
export default Create;
