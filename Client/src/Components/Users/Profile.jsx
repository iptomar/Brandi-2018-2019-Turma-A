import React, { Component } from "react";
import '../../CssComponents/profile.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertText: "",
      alertisNotVisible: true,
      alertColor: "",
      data: [],
      rolesList: [],
    };
  }

  componentDidMount() {
    var name = sessionStorage.getItem('id');
    this.getUser(name);
    this.fetchRoles();
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
          console.log(resp.resposta);
          this.setState({ data: resp.resposta });
          break;
        default:
          console.log("A API ESTÁ A ARDER, DARIOOOOOOOOOOOOOOOOOOOOOO");
      }
    });
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
      .then(resp => {
        switch (resp.stat) {
          case "NoPermission":
            alert("NÃO TENS PERMISSÃO");
            window.location = "/";
            break;
          default:
            console.log(resp.resposta);
            this.setState({ rolesList: resp.resposta })
            break;
        }
      });
  }

  render() {
    let getThis = this;
    return (
      <div className="container mb-5">
        <div className="row">
          <div className="col-md-8">
            <h2 className="py-3 mb-3 text-center">
              O meu perfil
              </h2>
          </div>
          <div className="col-md-4" style={{ display: "inline" }}>
            <a href="/perfil" className="mt-3 btn btn-warning">
              <i className="fas fa-edit" /> Editar perfil
            </a>
            <a href="/perfil" className="mt-3 btn btn-danger ml-2">
              <i className="fas fa-key" /> Alterar palavra-passe
              </a>
          </div>

        </div>
        <hr />
        <div className="row">
          <div className="col-md-12 mb-3">
            <label>Nome de utilizador</label>
            <input
              type="text"
              className="form-control"
              id="user"
              placeholder={getThis.state.data.login}
              readOnly
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
              placeholder={getThis.state.data.email}
              readOnly
            />
          </div>
        </div>
        <label>Tipo de utilizador</label>
        <select id="DDLRoles" className="form-control" disabled>
          <option className="dropdown-item">
            {getThis.state.data.role}
          </option>
        </select>
      </div>
    );
  }
}

export default Profile;
