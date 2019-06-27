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
  }

  //Recebe os dados do filho Upload
  async getData(data) {
    await this.setState({ files: data });
    this.sendFiles();
  }

  sendFiles() {
    this.props.sendData(this.state.files);
  }

  opacidadeOnImg(e) {
    var img = document.getElementById(e.target.id);
    img.style.opacity = "0.5"
  }

  opacidadeOffImg(e) {
    var img = document.getElementById(e.target.id);
    img.style.opacity = "1"
  }

  closeModel() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
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
        <FileUpload sendData={this.getData} type="image" isMultiple />
        {/* Carrousel para apresentação das imagens */}
        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel" style={{ display: "none" }}>
          <div id="otherImage" className="carousel-inner">
            <div className="carousel-item active">
              <img id="actImage" alt="" className="d-block w-100" data-toggle="modal" data-target="#exampleModal" onMouseOver={this.opacidadeOnImg} onMouseOut={this.opacidadeOffImg}
                style={{ height: "750px", objectFit: "cover", borderRadius: "5px", cursor: "pointer", transition: "0.3s" }} />
            </div>
          </div>
          <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Anterior</span>
          </a>
          <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Proximo</span>
          </a>
        </div>
      </div>
    );
  }
}

export default Pag1;