import React, { Component } from "react";
import AlertMsg from '../Globais/AlertMsg';

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: [],
      filesNotValid: false,
      alertText: 'Alguns ficheiros foram removidos por não estarem de acordo com os requisitos',
      alertisNotVisible: true,
      alertColor: 'danger'
    };
    this.handleChange = this.handleChange.bind(this);
    this.deleteFile = this.deleteFile.bind(this);
    this.getBaseImage = this.getBaseImage.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
  }

  //Altera o estado conforme o Alert
  changeStatus() {
    this.setState({ alertisNotVisible: true });
  }

  /**
   * Envia os ficheiros para quem utilizar este componente
   */
  sendFiles() {
    this.props.sendData(this.state.file);
  }

  /**
   * Filtra e coloca no state os ficheiros já filtrados.
   * Se existir algum ficheiro fora do tipo escolhido
   * Esse é removido, e é apresentado um aviso
   * Caso não exista nenhum ficheiro de acordo com 
   * o filtro então é apresentado um aviso a informar do mesmo.
   * @param {*} event 
   */
  async handleChange(event) {
    await this.setState({
      file: Array.from(event.target.files)
    })
    //Apresenta o array das imagens
    this.state.file.forEach(async element => {
      //Verifica se o ficheiro é permitido
      if (element.type.includes(this.props.type)) {
        await this.getBaseImage(element);
      } else {
        await this.setState({
          file: this.state.file.filter(position => position.name !== element.name),
          filesNotValid: true
        });
      }
    });
    //Se existir ficheiros inválido e se o número de ficheiros já filtrados for 0
    if (this.state.filesNotValid) {
      await this.setState({
        alertText: 'Alguns Ficheiros foram removidos por não estarem de acordo com os requisitos',
        alertColor: 'danger',
        alertisNotVisible: false
      });
    }
    this.sendFiles();
  }

  /**
   * Apresenta visualmente um ficheiro dado por parâmetro
   * @param {*} ficheiro 
   * : Ficheiro a ser apresentado
   */
  getBaseImage(ficheiro) {
    var reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById(ficheiro.name).setAttribute('src', e.target.result);
    };
    reader.readAsDataURL(ficheiro);
  }

  /**
   * Método que apaga um ficheiro pela ação do 
   * click do rato no botão de apagar do ficheiro
   * @param {*} event 
   * Evento do click do rato no botão
   */
  async deleteFile(event) {
    await this.setState({
      file: this.state.file.filter(position => position.name !== event.target.id)
    });
    //Reenvia os dados que já foram filtrados
    this.sendFiles();
  }

  render() {
    let getThis = this;
    return (
      <div>
        <div className="custom-file">
        {
            this.props.isMultiple ?
              <input type="file" className="custom-file-input" name="imagem" accept="image/*" onChange={this.handleChange} multiple/>
            :
              <input type="file" className="custom-file-input" name="imagem" accept="image/*" onChange={this.handleChange} />
        }
        <label className="custom-file-label" data-browse="Escolher Ficheiro" >Escolha Ficheiros</label>
        </div>
        <AlertMsg text={this.state.alertText} isNotVisible={this.state.alertisNotVisible} alertColor={this.state.alertColor} status={this.changeStatus} />
        <div>
          <div className="card-deck mt-3">
            {/* Verfica se  existe algum ficheiro já carregado */}
            {this.state.file.length !== 0 ? (
              // Se existir algum ficheiro percorre todos e apresenta-os
              this.state.file.map(function (file) {
                return (
                  <div className="card" key={file.name}>
                    <img id={file.name} className="card-img-top" alt="" />
                    <button type="button" id={file.name} onClick={getThis.deleteFile} className="btn btn-outline-dark shadow-none" style={{ position: "absolute", right: "0px", top: "0px", color: "white", border: "none", fontWeight: "bold" }}>X</button>
                  </div>
                );
              })
            ) : (
                <span></span>
              )}
          </div>
        </div>
      </div>
    );
  }
}

export default FileUpload;
