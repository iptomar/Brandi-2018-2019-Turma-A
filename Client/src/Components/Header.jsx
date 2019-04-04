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
          <a className="navbar-brand" href="/" style={{paddingLeft:'35px'}}>
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
            {/* DROPDOWN UTILIZADORES*/}
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a className="nav-link active dropdown-toggle" href="#.#" id="navbardrop" data-toggle="dropdown">
                  Utilizadores
                </a>
                <div className="dropdown-menu">
                  <a className="dropdown-item" style={{cursor:'pointer'}} href="/utilizadores/registar">Registar</a>
                  <a className="dropdown-item" style={{cursor:'pointer'}} href="/utilizadores/listar">Listar</a>
                </div>
              </li>
            </ul>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/sobre">Sobre</a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="/contactos">Contactos</a>
            </li>
            </ul>
            {/* DROPDOWN */}
            <ul className="navbar-nav">
              <li className="nav-item dropdown" style={{paddingLeft:'50px', paddingRight:'35px'}}>
                <a className="nav-link active dropdown-toggle" href="#.#" id="navbardrop" data-toggle="dropdown">
                  {sessionStorage.getItem('nome')}
                </a>
                <div className="dropdown-menu">
                  <a className="dropdown-item" style={{cursor:'pointer'}} href="/perfil">Perfil</a>
                  <a className="dropdown-item" style={{cursor:'pointer'}} href="#.#" onClick={this.out}>Sair</a>
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
