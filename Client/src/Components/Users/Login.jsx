import React, { Component } from "react";
import AlertMsg from '../Globais/AlertMsg';
import '../../CssComponents/login.css';
import iptlogo from '../../Images/ipt.png';
import lcrlogo from '../../Images/lcr_ipt.png';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      alertText: 'Utilizador ou palavra-passe erradas',
      alertisNotVisible: true,
      alertColor: 'danger'
    };
    this.changeStatus = this.changeStatus.bind(this);
  }

  //Altera o estado conforme o Alert
  changeStatus(){
    this.setState({ alertisNotVisible: true });
  }

  /**
   * Submete os dados da utilizador para o backend
   */
  handleSubmit = async e => {
    e.preventDefault();

    //Objeto Login
    const loginData = {
      login: document.getElementById('user').value,
      password: document.getElementById('pass').value
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
      //Verificar o estado da resposta da API
      let status = resp.status;
      switch (status) {
        case "Authenticated":
          //Armazenar o token
          sessionStorage.setItem('token', response.headers.get('x-auth-token'));
          //Redirect
          window.location = '/fichaRI';
          break;
        case "NotAuthenticated":
          this.setState({ alertisNotVisible: false });
          break;
        default:
          console.log("A API ESTÁ A ARDER, DÁRIOOOOOOOOOOOOOOOOOOOOOO");
      }
    });
  };

  render() {
    if (sessionStorage.getItem('token') !== null) {
      window.location = '/fichaRI';
      return null;
    }
    else {
      return (

        <div className="center">
          <a href="http://www.cr.estt.ipt.pt/" target="_blank" rel="noopener noreferrer">
            <img src={lcrlogo}className="img-logo-ipt" alt="" width="170px" align="left"/>
          </a>
          <a href="http://portal2.ipt.pt/" target="_blank" rel="noopener noreferrer">
            <img src={iptlogo} className="img-logo-ipt" alt="" align="right"/>
          </a>
          
          <form className="form-entrar" onSubmit={this.handleSubmit}>
            <div className="text-center mb-4">
              <h1 className="h1 mb-5 font-weight-normal">Brandi</h1>
            </div>
            <AlertMsg text={this.state.alertText} isNotVisible={this.state.alertisNotVisible} alertColor={this.state.alertColor} status={this.changeStatus}/>
            <div className="form-label-group">
              <input type="text" id="user" className="form-control" placeholder=" " required autoFocus />
              <label>Utilizador</label>
            </div>
            <div className="form-label-group">
              <input type="password" id="pass" className="form-control" placeholder=" " required />
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
