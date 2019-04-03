import React, { Component } from "react";

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertText: "",
      alertisNotVisible: true,
      alertColor: "",
      data: [],
    };
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
      console.log(response);
      let status = resp.stat;
      switch (status) {
        case "Authenticated":
          this.setState({ data: resp.resposta });
          break;
        default:
          console.log("A API ESTÁ A ARDER, DARIOOOOOOOOOOOOOOOOOOOOOO");
      }
    });
  }

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
                      readOnly="readOnly"
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
                      readOnly="readOnly"
                    />
                  </div>
                </div>
                <label>Tipo de utilizador</label>
                <select id="DDLRoles" className="form-control" disabled>
                  <option className="dropdown-item">
                    {this.state.data.roleFK}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      );

    }
  }
}

export default Details;
