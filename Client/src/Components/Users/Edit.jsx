import React, { Component } from "react";

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      rolesList: [],
      dataTecnicos: []
    };
    this.editaDados = this.editaDados.bind(this);
  }

  componentDidMount() {
    this.getUser(this.props.id);


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
          if (this.state.data.role === "Admin") {
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
    console.log(this.state.data);
    console.log(this.state.dataTecnicos)
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
            console.log("entrou");
            this.setState({ rolesList: resp.resposta })
            break;
        }
      });
  }

  async editaDados() {
    console.log(this.state.data);
    console.log(this.state.dataTecnicos)
    //Armazenar o valor selecionado na dropdownlist
    var dataUsers;
    var dataTecn;

    //Dados do Utilizador
    if (this.state.data.role === "Admin") {
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
        visible: 1
      }
    }

    //Verifica se não foi preenchido algum campo
    if (dataUsers.login === "") dataUsers.login = document.getElementById("user").placeholder;
    if (dataUsers.email === "") dataUsers.email = document.getElementById("email").placeholder;

    //Dados do técnico
    if (this.state.dataTecnicos !== undefined) {
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
    //Enviar pedidos pata alterar os dados do utilizador
    const response = await fetch(`/api/users/${this.props.id}/edit`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": sessionStorage.getItem("token")
        },
        body: JSON.stringify(dataUsers)
      }
    );

    //Aguardar API
    await response.json().then(resp => {
      console.log(resp);
      let status = resp.status;
      switch (status) {
        case 'Updated':
          window.location = "/perfil";
          break;
        default:
          console.log("A API ESTÁ A ARDER: " + status);
      }
    });
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

                {this.state.data.role === "Admin" ? (

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
                  </div>
                ) : (

                    <div></div>
                  )}

                {this.state.dataTecnicos !== undefined ? (
                  <div>
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