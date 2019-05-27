import React, { Component } from "react";
import AlertMsg from '../../Globais/AlertMsg';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertText: "",
      alertisNotVisible: true,
      alertColor: '',
      data: [],
    };
  }

  componentDidMount() {
    this.getInteressados();
  }

  async getInteressados() {
    const response = await fetch('/api/interessados', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": sessionStorage.getItem("token")
      }
    });

    await response.json().then(resp => {
      let status = resp.status;
      switch (status) {
        case "Authenticated":
          this.setState({ data: resp.resposta });
          break;
        default:
          console.log(this.state.alertText);
      }
    })
  }

  // Ativa o click em cada linha da tabela
  rowClick(href) {
    window.location = href + "/detalhes";
  }


  render() {
    let getThis = this;

    //Verifica se existe o token
    if (sessionStorage.getItem("token") == null) {
      window.location = "/";
    } else {
      return (
        <div className="Inicio container">
          <div className="row">
            <div className="col-md-9">
              <h2 className="py-3 mb-3 text-center">
                Lista de Interessados
              </h2>
            </div>
            <div className="col-md-3" style={{ display: "inline" }}>
              <a href="/interessados/criar" className="mt-3 btn btn-success">
                <i className="fas fa-plus fa-white" /> Adicionar Interessado
              </a>
            </div>
          </div>
          <AlertMsg text={this.state.alertText} isNotVisible={this.state.alertisNotVisible} alertColor={this.state.alertColor} />
          {
            <div className="row">
              {this.state.data.length !== 0 ? (
                <table className="table table-sm table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Nome</th>
                      <th scope="col">Endereço Postal</th>
                      <th scope="col">Email</th>
                      <th scope="col">Tipo de utilizador</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.data.map(function (obj) {
                      let href = "/interessados/" + obj.interessadoID;
                      return (
                        <tr className="align-middle" key={obj.interessadoID} style={{ cursor: "pointer" }}>
                          <td className="align-middle" onClick={() => getThis.rowClick(href)}>{obj.nome}</td>
                          <td className="align-middle" onClick={() => getThis.rowClick(href)}>{obj.enderecoPostal}</td>
                          <td className="align-middle" onClick={() => getThis.rowClick(href)}>{obj.email}</td>
                          <td className="align-middle" onClick={() => getThis.rowClick(href)}>{obj.tipo}</td>
                          <td>
                            <a className="btn btn-warning mr-2" href={href + "/editar"}>
                              <i className="fas fa-edit"></i>
                            </a>
                            <a className="btn btn-danger mr-2" href={href + "/"}>
                              <i className="fas fa-trash-alt"></i>
                            </a>
                          </td>
                        </tr>
                      );
                    })
                    }
                  </tbody>
                </table>
              ) : (
                  <div className="mx-auto my-5">
                    <h5>Ainda não existe nenhum Interessado</h5>
                    <h6>
                      <a href="/interessados/criar">Adicione</a> já um interessado
                      </h6>
                  </div>
                )}
            </div>
          }
        </div>
      );
    }
  }
}

export default Index;
