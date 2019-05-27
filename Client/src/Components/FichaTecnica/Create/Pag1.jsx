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
    };
    this.getData = this.getData.bind(this);
  }

  //Recebe os dados do filho Upload
  async getData(data) {
    await this.setState({ files: data });
    this.sendFiles();
  }

  sendFiles() {
    this.props.sendData(this.state.files);
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
        <hr />
        <br />
        <FileUpload sendData={this.getData} type="image" isMultiple />
        <hr />
        <div className="row">
          {/* COLUNA 2 */}
          <div className="col-md-6 mb-3">
            <label>Dono da obra:</label>
            <input type="text" className="form-control mb-3" id="donoObra" placeholder="Dono da obra" required />
            <label>Código postal:</label>
            <input type="text" className="form-control mb-3" id="codPostalDonoObra" placeholder="Código postal" required />
            <label>Contactos telefónicos:</label>
            <input type="text" className="form-control mb-3" id="contactoDonoObra" placeholder="Contactos telefónicos" required />
          </div>

          <div className="col-md-6 mb-3">
            <label>Mecenas:</label>
            <input type="text" className="form-control mb-3" id="mecenas" placeholder="Mecenas" required />
            <label>Código postal:</label>
            <input type="text" className="form-control mb-3" id="codPostalMecenas" placeholder="Código postal" required />
            <label>Contactos telefónicos:</label>
            <input type="text" className="form-control mb-3" id="contactoMecenas" placeholder="Contactos telefónicos" required />
          </div>
        </div>
        <hr />
        <br />
        <FileUpload sendData={this.getData} type="image" />
      </div>
    );
  }
}

export default Pag1;