import React, { Component } from "react";

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.deleteFile = this.deleteFile.bind(this);
    this.getBaseImage = this.getBaseImage.bind(this);
  }

  sendFiles() {
    this.props.sendData(this.state.file);
  }

  async handleChange(event) {
    await this.setState({
      file: Array.from(event.target.files)
    })
    //Apresenta o array das imagens
    this.state.file.forEach(async element => {
      await this.getBaseImage(element);
    });
    this.sendFiles();

  }

  //Apresenta os ficheiros carregados
  getBaseImage(ficheiro) {
    var reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById(ficheiro.name).setAttribute('src', e.target.result);
    };
    reader.readAsDataURL(ficheiro);
  }

  async deleteFile(event) {
    await this.setState({
      file: this.state.file.filter(position => position.name !== event.target.id)
    });
  }

  render() {
    let getThis = this;
    return (
      <div>
        <div className="custom-file">
          <input type="file" className="custom-file-input" id="customFile" name="filetoupload" accept="image/*" onChange={this.handleChange}/>
          <label className="custom-file-label" data-browse="Escolher Ficheiro" >Escolha Fotografia</label>
        </div>
        <div>
          <div className="card-deck mt-3">
            {!this.state.file.length !== 0 ? (
              this.state.file.map(function (file) {
                return (
                  <div className="card" key={file.name}>
                    <img id={file.name} className="card-img-top" alt="" />
                    <button type="button" id={file.name} onClick={getThis.deleteFile} className="btn btn-outline-dark shadow-none" style={{ position: "absolute", right: "0px", top: "0px", color: "white", border: "none", fontWeight: "bold" }}>X</button>
                  </div>
                );
              })
            ) : (<span></span>)}
          </div>
        </div>
      </div>
    );
  }
}

export default FileUpload;
