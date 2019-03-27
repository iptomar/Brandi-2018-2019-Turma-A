import React, { Component } from "react";
import favicon from "../Images/favicon.ico";

class Header extends Component {
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
        <nav className="navbar navbar-expand-lg navbar-light">
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
          <div className="collapse navbar-collapse justify-content-end" id="navbarCollapse">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="/sobre">Sobre</a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="#">Contactos</a>
            </li>
          </ul>

          {/* LOGOUT */}
          
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a className="nav-link" href="#abc" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{sessionStorage.getItem('nome')}</a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown" >
                  <button className="dropdown-item" onClick={this.out}>Sair</button>
                </div>
              </li>
            </ul>
          </div>

        </nav>
      </div>
    );
  }
}

export default Header;
