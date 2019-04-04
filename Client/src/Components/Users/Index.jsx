import React, { Component } from "react";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      rolesList: []
    };
    this.fetchUsers();
    this.fetchRoles();
  }

  //Receber os utilizadores
  async fetchUsers() {
    //Enviar pedidos
    const response = await fetch("/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": sessionStorage.getItem("token")
      }
    });
    await response
      .json()
      .then(resp => this.setState({ userList: resp.resposta }));
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
      .then(resp => this.setState({ rolesList: resp.resposta }));
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
  };

  // Ativa o click em cada linha da tabela
  rowClick(href) {
    window.location = href + "/detalhes";
  }

  //Elimina utilizadores
  deleteUser(){
    alert("AINDA NÃO EXISTE API PARA ISTO!!!!");
  }

  render() {
    let getThis = this;
    //Verifica se existe o token
    if (sessionStorage.getItem("token") == null) {
      window.location = "/";
    } else {
      return (
        <div className="container">
          <h2 className="py-3 mb-3">Lista de Utilizadores</h2>
          <table className="table table-sm table-hover">
            <thead>
              <tr>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Tipo de utilizador</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {this.state.userList.map(function (obj) {
                let href = "/utilizadores/" + obj.userID;
                return (
                  <tr className="align-middle" key={obj.userID}>
                    <td className="align-middle" onClick={() => getThis.rowClick(href)}>{obj.login}</td>
                    <td className="align-middle" onClick={() => getThis.rowClick(href)}>{obj.email}</td>
                    <td className="align-middle" onClick={() => getThis.rowClick(href)}>
                      {obj.role}
                    </td>
                    <td>
                      <a className="btn btn-warning mr-2" href={href + "/editar"}>
                        <i className="fas fa-edit"></i>
                      </a>
                      <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#modalConfirmElem" >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                );
              })
              }
            </tbody>
          </table>

          {/* Modal */}
          <div class="modal fade" id="modalConfirmElem" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Eliminar Utilizador</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">Têm a certeza que deseja eliminar este utilizador?</div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Não</button>
                  <button type="button" class="btn btn-warning" onClick={this.deleteUser}>Sim</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Index;
