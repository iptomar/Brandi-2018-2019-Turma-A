import React, { Component } from "react";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
    this.getFichasRI();
  }

  async getFichasRI() {
    //Enviar pedido
    const response = await fetch("/api/fichaRegistoIdentificacao", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": sessionStorage.getItem("token")
      }
    });
    //Aguardar API
    await response.json().then(resp => {
      this.setState({ list: resp.resposta });
    });
  }

  render() {
    //Verifica se existe o token
    if (sessionStorage.getItem("token") == null) {
      window.location = "/";
    } else {
      return (
        <div className="Inicio container">
          <div className="row">
            <div className="col-md-9">
              <h2 className="py-3 mb-3 text-center">
                Fichas de Registo e Identificação
              </h2>
            </div>
            <div className="col-md-3" style={{ display: "inline" }}>
              <a href="/fichaRI/criar" className="mt-3 btn btn-success">
                <i className="fas fa-plus fa-white" /> Adicionar Ficha
              </a>
            </div>
          </div>
          <div className="row">
            {!this.state.list.length !== 0 ? (
              this.state.list.map(function (obj) {
                let href = "/fichaRI/" + obj.fichaRegistoID + "/detalhes";
                return (
                  <div className="col-sm-3 mb-3" key={obj.fichaRegistoID}>
                    <a href={href}>
                      <div className="card">
                        <div className="card-body p-0">
                          <img src="https://upload.wikimedia.org/wikipedia/commons/5/5b/Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg" alt="Imagem" className="card-img-top img-fluid"
                            style={{ objectFit: "cover", height: "200px", width: "300px" }} />
                          <div className="card-footer text-muted text-center">
                            {obj.designacao}
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                );
              })
            ) : (
                <div>
                  <h5>Ainda não existe nenhuma ficha técnica</h5>
                  <h6>
                    <a href="/fichaRI/criar">Adicione</a> já uma ficha
                </h6>
                </div>
              )}
          </div>
        </div>
      );
    }
  }
}

export default Index;
