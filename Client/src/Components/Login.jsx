import React, { Component } from "react";
import AlertMsg from './AlertMsg';
import '../CssComponents/login.css';

class Login extends Component {
  constructor() {
    super();
    document.body.style = 'background: rgb(235, 235, 235);'
    this.state = {
      alertText: 'Utilizador ou palavra-passe erradas',
      alertisNotVisible: true,
      alertColor: 'danger'
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
      ;
      //Verificar o estado da resposta da API
      let status = resp.status;
      switch (status) {
        case "Authenticated":
          //Armazenar o token
          sessionStorage.setItem('token', response.headers.get('x-auth-token'));
          //Armazenar os dados do utilizador
          sessionStorage.setItem('nome', resp.resposta.login);
          //Redirect
          window.location = '/fichaTecnica';
          break;
        case "NotAuthenticated":
          this.setState({ alertisNotVisible: false });
          break;
        default:
          console.log("A API ESTÁ A ARDER,  DARIOOOOOOOOOOOOOOOOOOOOOO");
      }
    });
  };

  render() {
    if (sessionStorage.getItem('token') !== null) {
      window.location = '/fichaTecnica';
      return null;
    }
    else {
      return (
        <div className="center">
        <img src="http://portal2.ipt.pt/img/logo.png" className="img-logo-ipt" alt="" align="right"/>
          <form className="form-entrar" onSubmit={this.handleSubmit}>
            <div className="text-center mb-4">
              <img className="mb-4" src="favicon.ico" alt="" width="72" height="72" />
              <h1 className="h2 mb-5 font-weight-normal">Entrar</h1>
            </div>
            <AlertMsg text={this.state.alertText} isNotVisible={this.state.alertisNotVisible} alertColor={this.state.alertColor} />
            <div className="form-label-group">
              <input type="text" id="user" className="form-control" placeholder="Utilizador" required autoFocus />
              <label>Utilizador</label>
            </div>
            <div className="form-label-group">
              <input type="password" id="pass" className="form-control" placeholder="Password" required />
              <label>Password</label>
            </div>
            
            <button className="btn btn-lg btn-success btn-block" type="submit">Entrar</button>
          </form>
        </div>
      );
    }
  }
}

export default Login;
