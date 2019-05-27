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
    //Verifica se existe o token
    if (sessionStorage.getItem("token") == null) {
      window.location = "/";
    } else {
      let href = "/utilizadores/" + this.props.id;
      let getThis = this;
      return (
        <div className="Inicio container mb-5">
          <div className="container">
            <div className="py-3 text-center">
              <div className="row">
                <h2 className="col-md-10">Utilizador {this.state.data.login}</h2>
                <a className="btn btn-warning mr-2" href={href + "/editar"}>
                  <i className="fas fa-edit"></i>
                </a>
                <button type="button" className="btn btn-danger" id="modalButton" data-toggle="modal" data-target="#modalConfirmElem" >
                  <i className="fas fa-trash-alt"></i>
                </button>
              </div>
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
                    {this.state.data.role}
                  </option>
                </select>
              </div>
            </div>
          </div>
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
                  <button type="button" className="btn btn-warning" onClick={()=>getThis.deleteUser(getThis.props.id)}>Sim</button>
                </div>
              </div>
            </div>
          </div>
        </div>


      );

    }
  }
}

export default Details;
