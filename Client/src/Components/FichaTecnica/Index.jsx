import React, { Component } from "react";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: ""
    };
    // this.getFichasTecn();
  }

  // async getFichasTecn() {
  //   //Enviar pedido
  //   const response = await fetch("/api/fichatecnica", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       'x-auth-token': sessionStorage.getItem('token')
  //     }
  //   });
  //   //Aguardar API
  //   await response.json().then(resp => this.setState({list: resp}));
  // };

  render() {
    var visualList = "";
    //Verifica se existe o token
    if (sessionStorage.getItem('token') == null) {
      window.location = '/';
    } else {
      //Carrega e calcula os novos objetos da página
      if(this.state.list.length !== 0){
        visualList+=`<div className="card-deck">`;
      for (let index = 0; index < this.state.list.length; index++) {
        visualList += `<div className="card" style="width: 18rem;"><img src="..." className="card-img-top" ><div className="card-body"><a href="/fichaTecnica/details/${this.state.list[index].fichaRegistoID}" className="card-title">${this.state.list[index].designacao}</a></div></div>`;
      }
      visualList+=`</div>`;
    }else{
      visualList += `<div><h5>Ainda não existe nenhuma ficha técnica!</h5></div>`
    }
      return (
        <div className="Inicio container">
          <div className="row">
            <div className="col-md-9">
              <h2 className="py-3 mb-3 text-center">
                Fichas Técnicas
              </h2>
            </div>
            <div className="col-md-3" style={{ display: "inline" }}>
              <a href="/fichaTecnica/criar" className="mt-3 btn btn-success">
                <i className="fas fa-plus fa-white" /> Adicionar Ficha
              </a>
            </div>
          </div>
          <div dangerouslySetInnerHTML={{__html: visualList}}></div>
        </div>
      );
    }
  }
}

export default Index;
