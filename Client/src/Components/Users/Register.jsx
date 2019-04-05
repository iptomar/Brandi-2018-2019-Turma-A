import React, { Component } from "react";
import AlertMsg from "../AlertMsg";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertText: "",
      alertisNotVisible: true,
      alertColor: "",
      rolesList: null
    };
    this.fetchRoles();
  }

  //Receber os roles
  async fetchRoles() {
    //Enviar pedidos
    const response = await fetch("/api/roles", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": sessionStorage.getItem("token")
      }
    });
    await response
      .json()
      .then(resp => this.setState({ rolesList: resp.resposta }));
  }

  handleSubmit = async e => {
    e.preventDefault();
    if (
      document.getElementById("pass").value !==
      document.getElementById("passConfirmer").value
    ) {
      this.setState({
        alertText: "As palavras-passe não são iguais",
        alertisNotVisible: false,
        alertColor: "warning"
      });
      return null;
    }

    var select = document.getElementById("DDLRoles");
    var option = select.options[select.selectedIndex];

    //Objeto Register
    const registerData = {
      login: document.getElementById("user").value,
      email: document.getElementById("email").value,
      password: document.getElementById('pass').value,
      roleFK: option.id
    };

    //Enviar pedidos
    const response = await fetch("/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": sessionStorage.getItem("token")
      },
      body: JSON.stringify(registerData)
    });

    //Aguardar API
    await response.json().then(resp => {
      let status = resp.status;
      switch (status) {
        case "Registed":
          window.location = "/utilizadores/listar&showConfirm"
          break;
        case "FieldError":
          this.setState({
            alertText: "Utilizador já registado",
            alertisNotVisible: false,
            alertColor: "warning"
          });
          break;
        case "NotRegisted":
          this.setState({
            alertText: "Erro no campo Login",
            alertisNotVisible: false,
            alertColor: "warning"
          });
          break;
        case "DatabaseError":
          this.setState({
            alertText:
              "De momento não é possível realizar esta ação. Tente novamente mais tade",
            alertisNotVisible: false,
            alertColor: "danger"
          });
          break;
        default:
          console.log("O Registo ESTÁ A ARDER,  DARIOOOOOOOOOOOOOOOOOOOOOO");
      }
    });
  };

  render() {
    //Verifica se existe o token
    if (sessionStorage.getItem("token") == null) {
      window.location = "/";
    } else {
      if (this.state.rolesList != null) {
        return (
          <div className="Inicio container">
            <div className="container">
              <div className="py-3 text-center">
                <h2>Registar</h2>
              </div>
              <div className="row">
                <div className="col-md-12 order-md-1">
                  <form onSubmit={this.handleSubmit}>
                    <div className="row">
                      <div className="col-md-12 mb-3">
                        <label>Nome de utilizador</label>
                        <input
                          type="text"
                          className="form-control"
                          id="user"
                          placeholder="Nome de utilizador"
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 mb-3">
                        <label>Email</label>
                        <input
                          type="text"
                          className="form-control"
                          id="email"
                          placeholder="Email"
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 mb-3">
                        <label>Palavra-passe</label>
                        <input
                          type="password"
                          className="form-control"
                          id="pass"
                          placeholder="Palavra-passe"
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 mb-3">
                        <label>Confirmar palavra-passe</label>
                        <input
                          type="password"
                          className="form-control"
                          id="passConfirmer"
                          placeholder="Confirmar palavra-passe"
                          required
                        />
                      </div>
                    </div>
                    <label>Tipo de utilizador</label>
                    <select id="DDLRoles" className="form-control mb-3">
                      {this.state.rolesList.map(function (object) {
                        return (
                          <option
                            className="dropdown-item"
                            id={object.roleID}
                            key={object.roleID}
                          >
                            {object.role}
                          </option>
                        );
                      })}
                    </select>
                    <AlertMsg
                      text={this.state.alertText}
                      isNotVisible={this.state.alertisNotVisible}
                      alertColor={this.state.alertColor}
                    />
                    <hr className="mb-4" />
                    <button
                      className="btn btn-success btn-lg btn-block mb-5"
                      type="submit"
                    >
                      Criar
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        return null;
      }
    }
  }
}

export default Register;
