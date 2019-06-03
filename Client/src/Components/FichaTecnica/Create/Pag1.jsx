import React, { Component } from "react";
import FileUpload from "../../Globais/FileUpload";

export class Pag1 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      alertText: '',
      alertisNotVisible: true,
      alertColor: '',
      files: [],
      filesG: []
    };
    this.getData = this.getData.bind(this);
    this.getDataG = this.getDataG.bind(this);
  }

  //Recebe os dados do filho Upload
  async getData(data) {
    await this.setState({ files: data });
    this.sendFiles(1);
  }
  
  sendFiles(type) {
    if(type === 1) this.props.sendData(this.state.files);
    this.props.sendData(this.state.filesG);
  }

  async getDataG(data) {
    await this.setState({ files: data });
    this.sendFiles(2);
  }

  render() {
    return (
      <div className="container" style={{ paddingTop: "0px" }}>
        <div className="row">
          {/* COLUNA 1 */}
          <div className="col-md-6 mb-3">
            <label>Localização:</label>
            <input type="text" className="form-control mb-3" id="localizacao" placeholder="Localização da obra" required />
            <hr />
            <label>Proprietário:</label>
            <input type="text" className="form-control mb-3" id="proprietario" placeholder="Proprietário" required />
            <label>Código postal:</label>
            <input type="text" className="form-control mb-3" id="codPostalProprietario" placeholder="Endereço postal" required />
            <label>Email:</label>
            <input type="text" className="form-control mb-3" id="emailProprietario" placeholder="Email" required />
            <label>Contactos telefónicos:</label>
            <input type="text" className="form-control" id="contactoProprietario" placeholder="Contactos telefónicos" required />
          </div>
          {/* COLUNA 2 */}
          <div className="col-md-6 mb-3">
            <label>Dono da obra:</label>
            <input type="text" className="form-control mb-3" id="donoObra" placeholder="Dono da obra" required />
            <label>Código postal:</label>
            <input type="text" className="form-control mb-3" id="codPostalDonoObra" placeholder="Código postal" required />
            <label>Contactos telefónicos:</label>
            <input type="text" className="form-control mb-3" id="contactoDonoObra" placeholder="Contactos telefónicos" required />
            <hr />
            <label>Mecenas:</label>
            <input type="text" className="form-control mb-3" id="mecenas" placeholder="Mecenas" required />
            <label>Código postal:</label>
            <input type="text" className="form-control mb-3" id="codPostalMecenas" placeholder="Código postal" required />
            <label>Contactos telefónicos:</label>
            <input type="text" className="form-control mb-3" id="contactoMecenas" placeholder="Contactos telefónicos" required />
          </div>
        </div>
        <br />
        <label>Fotografia(s) do objeto:</label>
        <FileUpload sendData={this.getDataG} type="image" isMultiple />
        <hr />
        <label>Gráfico:</label>
        <FileUpload sendData={this.getData} type="image" />
      </div>
    );
  }
}

export default Pag1;