import React, { Component } from "react";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: ""
    };
    this.getFichasRI();
  }

  async getFichasRI() {
    //Enviar pedido
    const response = await fetch("/api/fichaRegistoIdentificacao", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'x-auth-token': sessionStorage.getItem('token')
      }
    });
    //Aguardar API
    await response.json().then(resp => this.setState({ list: resp }));
  };

  render() {
    var visualList = "";
    //Verifica se existe o token
    if (sessionStorage.getItem('token') == null) {
      window.location = '/';
    } else {
      //Carrega e calcula os novos objetos da página
      if (this.state.list.length !== 0) {
        visualList += '<div class="row">'
        for (let index = 0; index < this.state.list.length; index++) {
          visualList += '<div class="col-md-3" style="max-width: 26%;">';
          visualList += `<a href="/fichaRI/detalhes/${this.state.list[index].fichaRegistoID}">`;
          visualList += '<div class="card mb-3 text-center" style="width: 18rem; height:12rem;">';
          visualList += '<img src="http://portal2.ipt.pt/img/logo.png" class="card-img-top img-fluid" style="height:100%; width:100%;"/>'
          visualList += `<div class="card-footer text-muted">${this.state.list[index].designacao}</div>`;
          visualList += `</div>`;
          visualList += '</a>';
          visualList += `</div>`;
        }
        visualList += '</div>';
      } else {
        visualList += `<div><h5>Ainda não existe nenhuma ficha técnica</h5><h6><a href="/fichaRI/criar">Adicione</a> já uma ficha</h6></div>`
      }
      return (
        <div className="Inicio container">
          <div className="row">
            <div className="col-md-10"><h2 className="py-3 mb-3 text-center">Fichas de Registo e Identificação</h2></div>
            <div style={{ display: "inline" }}>
              <a href="/fichaRI/criar" className="mt-3 btn btn-success">
                <i class="fas fa-plus fa-white"></i>Adicionar Ficha
            </a>
            </div>

          </div>
          <div dangerouslySetInnerHTML={{ __html: visualList }}></div>
        </div>
      );
    }
  }
}

export default Index;