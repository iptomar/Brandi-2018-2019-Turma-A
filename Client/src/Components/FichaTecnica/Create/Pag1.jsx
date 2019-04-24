import React, { Component } from "react";
import FileUpload from "../../Globais/FileUpload";
import AlertMsg from "../../Globais/AlertMsg";

class Pag1 extends Component {
  constructor(props){
    // super(props);

  }

  render() {
    return (
      <div className="Inicio container">
          <div className="container">
            <div className="py-3 text-center">
              <h2>Ficha Tecnica</h2>
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
export default Pag1;
