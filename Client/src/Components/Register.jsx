import React, { Component } from "react";
import AlertMsg from "./AlertMsg";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertText: "",
      alertisNotVisible: true,
      alertColor: ""
    };
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
    //Criar o hash
    let hexCodes;
    const encoder = new TextEncoder();
    const data = encoder.encode(document.getElementById("pass").value);
    await window.crypto.subtle.digest("SHA-512", data).then(hashArray => {
      //Hash to String
      const byteArray = new Uint8Array(hashArray);
      hexCodes = [...byteArray].map(value => {
        const hexCode = value.toString(16);
        return hexCode.padStart(2, "0");
      });
    });

    //Objeto Register
    const registerData = {
      login: document.getElementById("user").value,
      password: hexCodes.join(""),
      email: document.getElementById("email").value
    };
    //Enviar pedidos
    const response = await fetch("/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(registerData)
    });
    //Aguardar API
    await response.json().then(resp => {
      let status = resp.status;
      switch (status) {
        case "Registed":
          this.setState({
            alertText: "Registado com sucesso",
            alertisNotVisible: false,
            alertColor: "success"
          });
          break;
        case "FieldError":
          this.setState({
            alertText: "Utilizador já registado",
            alertisNotVisible: false,
            alertColor: "warning"
          });
          break;
        case "DatabaseError":
          this.setState({
            alertText: "De momento não é possível realizar esta ação. Tente novamente mais tade",
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
    return (
      <div className="Login">
        <div className="container form-login">
          <p className="h4">Registar novo utilizador</p>
          <form className="py-3" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Nome de utilizador:</label>
              <input
                id="user"
                type="text"
                className="form-control"
                placeholder="Nome de utilizador"
                spellCheck="false"
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                id="email"
                type="text"
                className="form-control"
                placeholder="Email"
                spellCheck="false"
                required
              />
            </div>
            <div className="form-group">
              <label>Palavra-passe:</label>
              <input
                id="pass"
                type="password"
                className="form-control"
                placeholder="Palavra-passe"
                required
              />
            </div>
            <div className="form-group">
              <label>Confirmar palavra-passe:</label>
              <input
                id="passConfirmer"
                type="password"
                className="form-control"
                placeholder="Confirmar palavra-passe"
                required
              />
            </div>
            <AlertMsg
              text={this.state.alertText}
              isNotVisible={this.state.alertisNotVisible}
              alertColor={this.state.alertColor}
            />
            <button type="submit" className="btn btn-primary">
              Registar
            </button>
          </form>
          <div className="feedback alert" />
        </div>
      </div>
    );
  }
}

export default Register;
