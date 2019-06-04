import React, { Component } from "react";
import favicon from "../../Images/favicon.ico";
import '../../CssComponents/header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  
 
  componentDidMount() {
    this.getUser(sessionStorage.getItem('id'));
  }
  out() {
    //Eliminar os dados armazenados da conta
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('nome');
    //Redirect
    window.location = '/';
  }  
  
  async getUser(id) {
    //Enviar pedido
    const response = await fetch(`/api/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": sessionStorage.getItem("token")
      }
    });
    //Aguardar API
    await response.json().then(resp => {
      let status = resp.status;
      switch (status) {
        case "Authenticated":
          this.setState({ data: resp.resposta });
          console.log(this.state.data.role)
          break;
        default:
          console.log("A API ESTÁ A ARDER, DARIOOOOOOOOOOOOOOOOOOOOOO");
      }
    });
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light">
        <a className="navbar-brand" href="/" style={{ paddingLeft: '35px' }}>
          <img
            src={favicon}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Ícone"
          />
          {" "}Brandi
           </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="/" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Fichas de R. e I.
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <a className="dropdown-item" href="/fichaRI"><i className="fas fa-th-list"></i> Listar</a>
                <a className="dropdown-item" href="/fichaRI/criar"><i className="fa fa-plus"></i> Criar</a>
              </div>
            </li>

            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="/" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Interessados
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <a className="dropdown-item" href="/interessados"><i className="fas fa-th-list"></i> Listar</a>
                <a className="dropdown-item" href="/interessados/criar"><i className="fas fa-plus"></i> Adicionar</a>
              </div>
            </li>
            {this.state.data.role === "Admin"?(
            <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="/" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Utilizadores
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a className="dropdown-item" href="/utilizadores/listar"><i className="fas fa-th-list"></i> Listar</a>
              <a className="dropdown-item" href="/utilizadores/registar"><i className="fas fa-plus"></i> Registar</a>
            </div>
          </li>
          ):(
            <div></div>
          )}
            <li className="nav-item">
              <a className="nav-link" href="/Sobre">Sobre</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/Contactos">Contactos</a>
            </li>
          </ul>
          <hr />
          {/* <span className="sessionName">{sessionStorage.getItem('nome')}</span> */}
          <a className="sessionName" href="/perfil"><i className="far fa-user"></i>&nbsp;{sessionStorage.getItem('nome')}</a>
          <div className="divConta">
            <ul className="navbar-nav">
              {/* <li className="nav-item">
               <a className="nav-link" href="/Sobre">Perfil</a>
             </li> */}

              <li className="nav-sair">
                <a className="nav-link" href="#.#" onClick={this.out}>Sair</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>


    );
  }
}

export default Header;