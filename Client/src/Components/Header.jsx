import React, { Component } from "react";
import favicon from "../Images/favicon.ico";

class Header extends Component {

  constructor(){
    super();
  }

  out(){
    //Eliminar os dados armazenados da conta
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('nome');
    //Redirect
    window.location = '/';
  }

  render() {
    return (
      <div className="Header">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/">
            <img
              src={favicon}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Ícone"
            />
            {" "}Brandi
          </a>
          <div class="collapse navbar-collapse justify-content-end" id="navbarCollapse">
            <ul class="navbar-nav">
            <li class="nav-item dropdown">
            <a class="nav-link" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{sessionStorage.getItem('nome')}</a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown" >
              <button class="dropdown-item">Sair</button>
            </div>
            </li>
            </ul>
          </div>
        </nav>
        <br></br>
      </div>
    );
  }
}

export default Header;
