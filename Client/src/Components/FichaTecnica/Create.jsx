import React, { Component } from "react";
import AlertMsg from "../AlertMsg";

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertText: "",
      alertisNotVisible: true,
      alertColor: "",
      showRegFotografico: false
    };
  }

  handleSubmit = async e => {
    e.preventDefault();

    //Objeto data
    const data = {
      nome: document.getElementById('dobjeto').value,
      numero:  document.getElementById('nprocLCRM').value,
      texto: document.getElementById('coordenacao').value,
      cena: document.getElementById('coordenacao').value
    };

    console.log(JSON.stringify(data));

    //Enviar pedidos
    const response = await fetch("/api/fichastecnicas/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
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
            alertText: "Ficha inserida",
               alertisNotVisible: false,
             alertColor: 'success'
         });
         break;
        default:
          console.log("A API ESTÁ A ARDER, DARIOOOOOOOOOOOOOOOOOOOOOO");
      }
    });
  };

  hideOrShow(){
    this.setState({
      showRegFotografico: !this.state.showRegFotografico
    })
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
                    <input type="number" id="nprocCEARC" className="form-control col-md-1" placeholder="N.º"/>
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
                  <label className="h5 ">Registo fotográfico identificativo do objeto</label>
                  <a style={{cursor:"pointer"}} onClick={()=>this.hideOrShow()}>
                    <i className="fas fa-3x fa-plus-square m-3"/>
                  </a>
                  {
                    this.state.showRegFotografico ?

                    <div className="form-group row col-md-6">
                      <label className="col-form-label col-md-3">Fotografia:</label>
                      <input type="file" id="foto" className="col-form form-control-file col-md-9" accept="image/*" onChange=""/>
                    </div>

                    :null
                  }
                  
                </div>
                <AlertMsg text={this.state.alertText} isNotVisible={this.state.alertisNotVisible} alertColor={this.state.alertColor}/>
                <button type="submit" className="btn btn-primary">Criar</button>
            </form>
        </div>
    );
  }
}

export default Create;