import React, { Component } from "react";
import AlertMsg from '../../../Globais/AlertMsg';

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertText: "Ocorreu um erro técnico. Tente novamente mais tarde",
      alertisNotVisible: true,
      alertColor: "danger"
    }
  }

  render() {
    //Verifica se existe o token
    if (sessionStorage.getItem('token') == null) {
      window.location = '/';
    } else {
      return (
        <div className="Inicio container">
          <div className="container">
            <div className="py-3 text-center">
              <h2>Interessados</h2>
            </div>
            <div className="row">
              <div className="col-md-12 order-md-1">
                <form onSubmit={this.handleSubmit} id="formSubmit">
                  <div className="row">
                    <div className="col-md-12 mb-3">
                      <label>Nome</label>
                      <input type="text" className="form-control" id="nomeInteressadoInput" placeholder="Nome do interessado" required />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label>Endereço Postal</label>
                      <input type="text" className="form-control" id="endPostalInput" placeholder="Endereço Postal" required />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Email</label>
                      <input type="text" className="form-control" id="emailInput" placeholder="Email do interessado" required />
                    </div>
                    <div className="col-md-12 mb-3">
                      <label>Tipo</label>
                      <input type="text" className="form-control" id="tipoInput" placeholder="Tipo" required/>
                    </div>
                  </div>
                  <AlertMsg text={this.state.alertText} isNotVisible={this.state.alertisNotVisible} alertColor={this.state.alertColor} status={this.changeStatus} />
                  <hr className="mb-4" />
                  <button className="btn btn-success btn-lg btn-block mb-5" type="submit">Editar</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Edit;