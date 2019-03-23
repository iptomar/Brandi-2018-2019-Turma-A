import React, { Component } from "react";
import AlertMsg from './AlertMsg';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertText: '',
      alertisNotVisible: true,
      alertColor: ''
    };

  }

  handleSubmit = async e => {
    e.preventDefault();
    //Criar o hash
    let hexCodes;
    const encoder = new TextEncoder();
    const data = encoder.encode(document.getElementById('pass').value);
    await window.crypto.subtle.digest("SHA-512", data).then(hashArray => {
      //Hash to String
      const byteArray = new Uint8Array(hashArray);
      hexCodes = [...byteArray].map(value => {
        const hexCode = value.toString(16);
        return hexCode.padStart(2, '0');
      })
    });

    //Objeto Login
    const loginData = {
      login: document.getElementById('user').value,
      password: hexCodes.join('')
    };
    //Enviar pedidos
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData)
    });
    //Aguardar API
    await response.json().then(resp => {
      //Armazenar o token
      sessionStorage.setItem('token', response.headers.get('x-auth-token'));
      //Verificar o estado da resposta da API
      let status = resp.status;
      switch (status) {
        case "Authenticated":
          window.location = '/fichaTecnica';
          break;
        case "NotAutheticated":
          this.setState({
            alertText: "Utilizador ou palavra-passe erradas",
            alertisNotVisible: false,
            alertColor: 'danger'
          });
          break;
        default:
          console.log("A API ESTÁ A ARDER,  DARIOOOOOOOOOOOOOOOOOOOOOO");
      }
    });
  };

  render() {
    if (sessionStorage.getItem('token') != null) window.location = '/fichaTecnica';
    else {
      return (
        <div className="Login">
          <div className="container form-login">
            <p className="h4">Autenticação</p>
            <form className="py-3" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>Nome de utilizador:</label>
                <input id="user" type="text" className="form-control" placeholder="Nome de utilizador" spellCheck="false" required />
              </div>
              <div className="form-group">
                <label>Palavra-passe:</label>
                <input id="pass" type="password" className="form-control" placeholder="Palavra-passe" required />
              </div>
              <AlertMsg text={this.state.alertText} isNotVisible={this.state.alertisNotVisible} alertColor={this.state.alertColor} />
              <button type="submit" className="btn btn-primary">Entrar</button>
            </form>
          </div>
        </div>
      );
    }
  }
}

export default Login;
