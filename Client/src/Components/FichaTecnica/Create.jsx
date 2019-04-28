import React, { Component } from "react";
import Pag1 from "../../Components/FichaTecnica/Create/Pag1";
import Pag3 from "../../Components/FichaTecnica/Create/Pag3";
class Create extends Component {
  handleSubmit = async e => {
    e.preventDefault();
      alert("AINDA NÃO CONFIUGRADO!!!");
    // //Objeto data
    // const data = {
    //   processoLCRM: document.getElementById('nprocLCRM').value,
    //   dataAberturaLCRM: document.getElementById('dataprocLCRM').value,
    //   dataEntradaLCRM: document.getElementById('dataEprocLCRM').value,
    //   processoCEARC: document.getElementById('nprocCEARC').value,
    //   dataAberturaCEARC: document.getElementById('dataprocCEARC').value,
    //   dataEntradaCEARC: document.getElementById('dataEprocCEARC').value,
    //   direcaoTecnica: document.getElementById('coordenacao').value
    // };

    // //Enviar pedidos
    // const response = await fetch("/api/processo/create", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     'x-auth-token': sessionStorage.getItem('token')
    //   },
    //   body: JSON.stringify(data)
    // });
    // //Aguardar API
    // await response.json().then(resp => {
    //   let status = resp.stat;
    //   switch (status) {
    //     case "DatabaseError":
    //       this.setState({
    //         alertText: "Ocorreu um erro técnico. Tente novamente mais tarde",
    //         alertisNotVisible: false,
    //         alertColor: "danger"
    //       });
    //       break;
    //     case "Ficha inserida":
    //       this.setState({
    //         alertisNotVisible: false
    //       });
    //       break;
    //     case "Erro na criação":
    //       this.setState({
    //         alertText: "Ocorreu um erro técnico. Tente novamente mais tarde",
    //         alertisNotVisible: false,
    //         alertColor: "danger"
    //       });
    //       break;
    //     default:
    //       console.log("A API ESTÁ A ARDER, DARIOOOOOOOOOOOOOOOOOOOOOO");
    //   }
    // });
  };

  render() {
    return (
      <div className="LoginPage">
        <form className="py-3" onSubmit={this.handleSubmit}>
          <Pag1 />
        </form>
      </div>
    );
  }
}
export default Create;
