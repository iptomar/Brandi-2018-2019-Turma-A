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

  render() {
    let getThis = this;
    //Verifica se existe o token
    if (sessionStorage.getItem("token") == null) {
      window.location = "/";
    } else {
      return (
        <div className="container">
          <h2 className="py-3 mb-3">Lista de Utilizadores</h2>
          <table className="table table-sm">
            <thead>
              <tr>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Tipo de utilizador</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
             { this.state.userList.map(function (obj) {
                let href = "/utilizadores/" + obj.userID;
                return (
                  <tr className="align-middle" key={obj.userID}>
                    <td className="align-middle">{obj.login}</td>
                    <td className="align-middle">{obj.email}</td>
                    <td className="align-middle">
                    {getThis.state.rolesList.map(function (role){
                      if(role.roleID === obj.roleFK){
                          return role.role;
                       }
                       return null;
                    })}
                    </td>
                    <td>
                      <a className="btn btn-warning mr-2" href={href+"/editar"}>
                        <i className="fas fa-edit"></i>
                      </a>
                      <button className="btn btn-danger" >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                );
              })
            }
            </tbody>
          </table>
        </div>
      );
    }
  }
}

export default Index;
