import React, { Component } from "react";
import AlertMsg from "../../AlertMsg";

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertText: "",
      alertisNotVisible: true,
      alertColor: "",
    }
  }

  render() {
    return (
        <div className="Inicio container">
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
                <button type="submit" className="btn btn-primary">Guardar</button>
            </form>
        </div>        
    );
  }
}
export default Create;
