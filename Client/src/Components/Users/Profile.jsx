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
      dataTecnico: []
    };
  }

  componentDidMount() {
    var name = sessionStorage.getItem('id');
    this.getUser(name);
    if (this.state.data.role === "Admin") {
      this.fetchRoles();
    }
  }

  editar() {

    var id = sessionStorage.getItem('id');
    window.location = "/utilizadores/" + id + "/editar";
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
      console.log(resp);
      let status = resp.status;
      switch (status) {
        case "Authenticated":
          console.log(resp.resposta);
          this.setState({ data: resp.resposta });
          this.setState({ dataTecnico: resp.resposta.tecnicos[0] });
          break;
        default:
          console.log("A API ESTÁ A ARDER, DARIOOOOOOOOOOOOOOOOOOOOOO");
      }
    });
  }

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
      <div className="container">
        <div className="pt-3 py-3 text-center">
          <h3>User Profile</h3>
        </div>
        <hr />
        <div className="row">
          <div className="col-xs-12 col-sm-12">
            <div className="panel panel-default">
              <div className="panel-body">
                <div className="profile__header">
                  <br></br>
                  <center>
                    {this.state.dataTecnico === undefined ? (
                      <div>
                        <h4 style={{ fontWeight: "bold", fontSize: "35px", textAlign: "center", left: "85px" }}>{getThis.state.data.login}</h4>
                      </div>
                    ) : (
                        <div>
                          <h4 style={{ fontWeight: "bold", fontSize: "35px", textAlign: "center", left: "85px" }}>{getThis.state.dataTecnico.nome}</h4>
                        </div>
                      )}
                    <div className="profile__avatar">
                      <img src="http://icons.iconarchive.com/icons/icons8/ios7/512/Users-User-Male-2-icon.png" alt="...">
                      </img>

                    </div>
                  </center>
                  <br />
                </div>
              </div>
            </div>
            <br></br>
            <div className="panel panel-default">
              <div className="panel-body">
                <table className="table profile__table">
                  <tbody>
                    <tr>
                      <th><strong>Email</strong></th>
                      <td>{this.state.data.email}</td>
                    </tr>
                    <tr>
                      <th><strong>Username</strong></th>
                      <td>{this.state.data.login}</td>
                    </tr>
                    <tr>
                      <th><strong>Tipo de Utilizador</strong></th>
                      <td>{this.state.data.role}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <hr />
          </div>
          {this.state.dataTecnico !== undefined ? (
            <div className="col-xs-1 col-sm-5">
              <h2>
                Currículo Profissional
          </h2>
              <table className="table profile__table">
                <tbody>
                  <tr>
                    <th><strong>Habilitações</strong></th>
                    <td>{this.state.dataTecnico.habilitacoes}</td>
                  </tr>
                  <tr>
                    <th><strong>Nivel Profissional</strong></th>
                    <td>{this.state.dataTecnico.nivelProfissional}/10</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
              <div></div>
            )}
        </div>
        <div className="pt-3 py-3 text-center">
          <button onClick={this.editar} className="btn btn-success btn-lg btn-block mb-5" type="submit">
            <i className="fas fa-edit" /> Editar perfil
        </button>
        </div>
        <br />
        <br />
      </div>
    );
  }
}

export default Profile;