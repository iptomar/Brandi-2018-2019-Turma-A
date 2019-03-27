import React, { Component } from "react";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: ""
    };
    this.getFichasTecn();
  }

  async getFichasTecn() {
    //Enviar pedido
    const response = await fetch("/api/fichatecnica", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'x-auth-token': sessionStorage.getItem('token')
      }
    });
    //Aguardar API
    await response.json().then(resp => this.setState({list: resp}));
    console.log(this.state.list[0].designacao);
  };

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
      visualList += `<div><h5>Ainda não existe nenhuma ficha técnica</h5><h6><a href="/fichaTecnica/criar">Adicione</a> já uma ficha</h6></div>`
    }
      return (
        <div className="Inicio container">
          <p className="h4">Fichas Técnicas</p>
          <div dangerouslySetInnerHTML={{__html: visualList}}></div>
        </div>
      );
    }
  }
}

export default Index;
