import React, { Component } from "react";
import AlertMsg from '../../Globais/AlertMsg';

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertText: "Ocorreu um erro técnico. Tente novamente mais tarde",
      alertisNotVisible: true,
      alertColor: "danger"
    }
    this.redirectToIndex = this.redirectToIndex.bind(this);
  }

  handleSubmit = async e => {
    e.preventDefault();

    let nome = document.getElementById("nomeInteressadoInput").value;
    let email = document.getElementById("emailInput").value;
    let tipo = document.getElementById("tipoInput").value;
    let endPostal = document.getElementById("endPostalInput").value;

    if(nome === "" || email === "" || tipo === "" || endPostal === ""){
      this.setState({
        alertText: "É necessário preencher todos os campos!",
        alertisNotVisible: false,
        alertColor: "danger"
      });
      return;
    }

    //Enviar pedidos (FORMA UTILIZADA A PEDIDO DA EQUIPA DA API)
    const response = await fetch("/api/interessados/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'x-auth-token': sessionStorage.getItem('token')
      },
      body: JSON.stringify({
        "nome": nome,
        "email": email,
        "tipo": tipo,
        "enderecoPostal": endPostal
      })
    });

    //Aguardar API
    await response.json().then(resp => {
      let status = resp.status;
      switch (status) {
        case "NotCreated":
          this.setState({
            alertText: "Ocorreu um erro técnico. Tente novamente mais tarde",
            alertisNotVisible: false,
            alertColor: "danger"
          });
          break;
        case "Created": 
          window.location = '/interessados';
          break;
        default:
        this.setState({
          alertText: "Ocorreu um erro técnico. Tente novamente mais tarde",
          alertisNotVisible: false,
          alertColor: "danger"
        });
        break;
      }
    });
  }

  redirectToIndex = () => {
    window.location = '/interessados';
  };

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
                  <div className="row">
                    <div className="col-md-6">
                      <button className="btn btn-success btn-lg btn-block mb-5" type="submit">Criar</button>
                    </div>
                    <div className="col-md-6">
                      <button className="btn btn-secondary btn-lg btn-block mb-5" onClick={this.redirectToIndex}>Cancelar</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Create;