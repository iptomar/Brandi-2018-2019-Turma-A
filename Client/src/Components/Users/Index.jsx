import React, { Component } from "react";
import $ from "jquery";
import AlertMsg from "../AlertMsg";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertText: "",
      alertisNotVisible: true,
      alertColor: "",
      id: null,
      userList: [],
      rolesList: []
    };
  }

  componentDidMount() {
    this.queryState(this.props.query);
    this.fetchUsers();
    this.fetchRoles();
    let getThis = this;
    //Ativa o clique do botão
    $(document).on('click', '#modalButton', function () {
      var idC = $(this).data('id');
      getThis.setState({ id: idC });
    });
    //Ativa o botão de eliminação do modal
    $(document).on('click', '#deleteUserConfirm', function () {
      getThis.deleteUser(getThis.state.id);
    });
  }
  //Define o tipo de query
  queryState(query) {
    if (query != undefined) {
      switch (query) {
        case '&showConfirmEdited':
          this.setState({
            alertText: "Utilizador editado com sucesso",
            alertisNotVisible: false,
            alertColor: "success"
          });
          break;
        case '&showConfirmDelete':
          this.setState({
            alertText: "Utilizador eliminado com sucesso",
            alertisNotVisible: false,
            alertColor: "success"
          });
          break;
        case '&showConfirm':
          this.setState({
            alertText: "Utilizador criado com sucesso",
            alertisNotVisible: false,
            alertColor: "success"
          });
          break;
        default:
          window.location = "/utilizadores/listar"
          break;
      }
    }
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

  // Ativa o click em cada linha da tabela
  rowClick(href) {
    window.location = href + "/detalhes";
  }

  //Elimina utilizadores
  async deleteUser(id) {
    //Enviar pedidos
    const response = await fetch(`/api/users/${id}/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": sessionStorage.getItem("token")
      }
    });
    await response.json().then(resp => {
      switch (resp.status) {
        case "Delete":
          window.location = "/utilizadores/listar&showConfirmDelete"
          break;
        default:
          console.log("A API ESTÁ A ARDER" + resp.status);
          break;
      }
    });
  }

  render() {
    let getThis = this;
    //Verifica se existe o token
    if (sessionStorage.getItem("token") == null) {
      window.location = "/";
    } else {
      return (
        <div className="container">
          <AlertMsg text={this.state.alertText} isNotVisible={this.state.alertisNotVisible} alertColor={this.state.alertColor} />
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
                      <button type="button" className="btn btn-danger" id="modalButton" data-id={obj.userID} data-toggle="modal" data-target="#modalConfirmElem" >
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
          <div className="modal fade" id="modalConfirmElem" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Eliminar Utilizador</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">Têm a certeza que deseja eliminar este utilizador?</div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Não</button>
                  <button type="button" className="btn btn-warning" id="deleteUserConfirm">Sim</button>
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
