import React, { Component } from "react";
import AlertMsg from "../AlertMsg";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: ""
    };
    //Enviar pedido
    const response = await fetch("/api/fichastecnicas", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    //Aguardar API
    await response.json().then(resp => { this.state.list = resp; });
  }

  render() {
    var visualList = "";
    for (let index = 0; index < this.state.list.length; index++) {
      visualList += `<div class="card" style="width: 18rem;"><img src="..." class="card-img-top" ><div class="card-body"><a href="/fichaTecnica/${this.state.list[index].id}/details" class="card-title">${this.state.list[index].descricao}</a></div></div>`;
    }

    return (
      <div className="Inicio container">
        <p className="h4">Ficha Técnica</p>
        <div class="card-deck">
          {visualList}
        </div>
      </div>
    );
  }
}

export default Index;
