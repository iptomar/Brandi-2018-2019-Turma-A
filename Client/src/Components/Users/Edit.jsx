import React, { Component } from "react";
import AlertMsg1 from "../Globais/AlertMsg";
import AlertMsg2 from "../Globais/AlertMsg";

var jwt = require('jsonwebtoken');



class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      rolesList: [],
      dataTecnicos: [],
      alertText: "",
      alertisNotVisible: true,
      alertColor: ""
    };
    this.editaDados = this.editaDados.bind(this);
  }

  componentDidMount() {
    var decoded = jwt.decode(sessionStorage.getItem('token'));
    //se for administrador
    if (decoded.role === "Admin") {
      //consegue ver os dados dos restantes utilizadores
      this.getUser(this.props.id);
    }
    //caso não seja administrador
    else {
      //apenas consegue ver os seus dados mesmo que altere o id no URL
      this.getUser(decoded.userID);
    }

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
          this.setState({ dataTecnicos: resp.resposta.tecnicos[0] });
          if (jwt.decode(sessionStorage.getItem('token')).role === "Admin") {
            this.fetchRoles();
          }
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
        switch (resp.status) {
          default:
            this.setState({ rolesList: resp.resposta })
            break;
        }
      });
  }

  async editaDados() {
    //Armazenar o valor selecionado na dropdownlist
    var dataUsers;
    var dataTecn;
    var decoded = jwt.decode(sessionStorage.getItem('token'));
    var response;

    //Dados do Utilizador
    if (decoded.role === "Admin") {
      var select = document.getElementById("DDLRoles");
      var option = select.options[select.selectedIndex];

      dataUsers = {
        login: document.getElementById("user").value,
        email: document.getElementById("email").value,
        roleFK: option.id,
        visible: 1
      };
    }
    else {
      dataUsers = {
        login: document.getElementById("user").value,
        email: document.getElementById("email").value,
        roleFK: this.state.data.roleFK,
        visible: 1
      }
    }
    //Verifica se não foi preenchido algum campo
    if (dataUsers.login === "") dataUsers.login = document.getElementById("user").placeholder;
    if (dataUsers.email === "") dataUsers.email = document.getElementById("email").placeholder;

    //Dados do técnico
    if (this.state.dataTecnicos !== undefined && decoded.role === "Admin") {
      dataTecn = {
        nome: document.getElementById('nomeTecnico').value,
        habilitacoes: document.getElementById('habilitacoes').value,
        nivelProfissional: document.getElementById('nivelProf').value,
        userFK: this.state.dataTecnicos.userFK
      }
      //Verifica se não foi preenchido algum campo
      if (dataTecn.nome === "") dataTecn.nome = document.getElementById("nomeTecnico").placeholder;
      if (dataTecn.habilitacoes === "") dataTecn.habilitacoes = document.getElementById("habilitacoes").placeholder;
      if (dataTecn.nivelProfissional === "") dataTecn.nivelProfissional = document.getElementById("nivelProf").placeholder;

      //Enviar pedidos pata alterar os dados do técnico
      const responseTecnicos = await fetch(`/api/tecnicos/${this.state.dataTecnicos.tecnicoID}/edit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": sessionStorage.getItem("token")
          },
          body: JSON.stringify(dataTecn)
        }

      );
      //Aguardar API
      await responseTecnicos.json().then(resp => {

      });
    }
    if (decoded.role === "Admin") {
      //Enviar pedidos pata alterar os dados do utilizador
      response = await fetch(`/api/users/${this.props.id}/edit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": sessionStorage.getItem("token")
          },
          body: JSON.stringify(dataUsers)
        }
      );
    }
    else {
      //Enviar pedidos pata alterar os dados do utilizador
      response = await fetch(`/api/users/${decoded.userID}/edit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": sessionStorage.getItem("token")
          },
          body: JSON.stringify(dataUsers)
        }
      );

    }

    //Aguardar API
    await response.json().then(resp => {
      let status = resp.status;
      console.log(status);
      switch (status) {
        case 'Updated':
          if (decoded.role === "Admin") {
            window.location = "/utilizadores/listar";
            break;
          }
          else {
            window.location = "/perfil";
            break;
          }
        case 'NotUpdated':
          this.setState({
            alertText: resp.resposta,
            alertisNotVisible: false,
            alertColor: "warning"
          });
          break;
        default:
          console.log("A API ESTÁ A ARDER: " + status);
      }
    });
  };
  //alteração da password de qualquer utilizador
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
    else {
      const dadosPassword = {

        password: document.getElementById('pass').value

      };

      const response = await fetch(`/api/users/${this.state.data.userID}/password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": sessionStorage.getItem("token")
        },
        body: JSON.stringify(dadosPassword)
      });
      await response.json().then(resp => {
        let status = resp.resposta;

        switch (status) {
          case "Updated":
            window.location = "/utilizadores/listar/&passwordchanged";
            break;
          default:
        }

      });
    }

  };
  render() {
    //Verifica se existe o token
    if (sessionStorage.getItem("token") == null) {
      window.location = "/";
    } else {
      return (
        <div className="Inicio container">
          <div className="container">
            <div className="py-3 text-center">
              <h2>Utilizador {this.state.data.login}</h2>
              {jwt.decode(sessionStorage.getItem('token')).role === "Admin" ? (
                <button data-toggle="modal" data-target="#exampleModal" className="btn btn-danger" type="submit">
                  <i className="fas fa-key" /> Alterar Password
        </button>
              ) : (
                  <button></button>
                )}
            </div>

            <div className="row">
              <div className="col-md-12 order-md-1">
                <div className="row">
                  <div className="col-md-12 mb-3">
                    <label>Nome de utilizador</label>
                    <input
                      type="text"
                      className="form-control"
                      id="user"
                      placeholder={this.state.data.login}
                      name="user"
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
                      placeholder={this.state.data.email}
                    />
                  </div>
                </div>

                {jwt.decode(sessionStorage.getItem('token')).role === "Admin" ? (

                  <div>
                    <label>Tipo de utilizador</label>
                    <select id="DDLRoles" className="form-control mb-4"
                    >
                      {this.state.rolesList.map(function (object, i) {
                        return (
                          <option className="dropdown-item"
                            id={object.roleID}
                            value={object.roleID}
                            key={i}
                          >
                            {object.role}
                          </option>
                        );
                      })}
                    </select>
                    <div className="row">
                      <div className="col-md-12 mb-3">
                        <label>Nome</label>
                        <input
                          type="text"
                          className="form-control"
                          id="nomeTecnico"
                          placeholder={this.state.dataTecnicos.nome}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 mb-3">
                        <label>Habilitações</label>
                        <input
                          type="text"
                          className="form-control"
                          id="habilitacoes"
                          placeholder={this.state.dataTecnicos.habilitacoes}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 mb-3">
                        <label>Nivel Profissional</label>
                        <input
                          type="text"
                          className="form-control"
                          id="nivelProf"
                          placeholder={this.state.dataTecnicos.nivelProfissional}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                    <div></div>
                  )}

                <div className="pt-3 py-3 text-center">
                  <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                        </div>
                        <div className="modal-body">
                          <form onSubmit={this.handleSubmit}>
                            <h2>Alterar Password</h2>
                            <div className="row">
                              <div className="col-md-12 mb-3">
                                <label>Palavra-passe</label>
                                <input
                                  type="password"
                                  className="form-control"
                                  id="pass"
                                  placeholder="Palavra-passe"
                                  required
                                />
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-12 mb-3">
                                <label>Confirmar palavra-passe</label>
                                <input
                                  type="password"
                                  className="form-control"
                                  id="passConfirmer"
                                  placeholder="Confirmar palavra-passe"
                                  required
                                />
                              </div>
                            </div>
                            <AlertMsg1
                              text={this.state.alertText}
                              isNotVisible={this.state.alertisNotVisible}
                              alertColor={this.state.alertColor}
                            />
                            <div className="modal-footer">
                              <button className="btn btn-success" type="search">Alterar Password</button>
                              <button type="button" className="btn btn-danger" data-dismiss="modal">Fechar</button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <AlertMsg2
                  text={this.state.alertText}
                  isNotVisible={this.state.alertisNotVisible}
                  alertColor={this.state.alertColor}
                />
                <button onClick={this.editaDados} className="btn btn-success btn-lg btn-block mb-5" type="submit"> Editar </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}


export default Edit;