import React, { Component } from "react";

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      rolesList: []
    };
  }

  componentDidMount() {
    this.getUser(this.props.id);
    this.getRoles();
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
          break;
        default:
          console.log("A API ESTÁ A ARDER, DARIOOOOOOOOOOOOOOOOOOOOOO");
      }
    });
  }

  //Receber os roles
  async getRoles() {
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
    //Armazenar o valor selecionado na dropdownlist
    var select = document.getElementById("DDLRoles");
    var option = select.options[select.selectedIndex];

    //Objeto data
    const data = {
      login: document.getElementById("user").value,
      email: document.getElementById("email").value,
      roleFK: option.id,
      visible: 1
    };

    //Verifica se não foi preenchido algum campo
    if(data.login === "") data.login = document.getElementById("user").placeholder;
    if(data.email === "") data.email = document.getElementById("email").placeholder;

    //Enviar pedidos
    const response = await fetch(`/api/users/${this.props.id}/edit`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": sessionStorage.getItem("token")
        },
        body: JSON.stringify(data)
      }
    );

    //Aguardar API
    await response.json().then(resp => {
      console.log(resp);
      let status = resp.status;
      switch (status) {
        case 'Updated':
            window.location = "/utilizadores/listar&showConfirmEdited";
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
                <form onSubmit={this.handleSubmit}>
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
                  <button className="btn btn-success btn-lg btn-block mb-5" type="submit"> Editar </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Edit;
