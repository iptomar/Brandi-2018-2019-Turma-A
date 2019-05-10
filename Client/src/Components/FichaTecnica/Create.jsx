import React, { Component } from "react";
import Pag1 from "../../Components/FichaTecnica/Create/Pag1";
import Pag2 from "../../Components/FichaTecnica/Create/Pag2";
import Pag3 from "../../Components/FichaTecnica/Create/Pag3";
import Pag4 from "../../Components/FichaTecnica/Create/Pag4";

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
      <div className="Create">

        <form className="py-3" onSubmit={this.handleSubmit}>
            
            <div className="py-3 text-center">
              <h2>Ficha Técnica</h2>
            </div>
            
            <div className="accordion" id="accordionExample">
              <div className="card bg-light">
                <div className="card-header" id="headingOne">
                  <h2 className="mb-0">
                    <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                      Página #1
                    </button>
                  </h2>
                </div>

                <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                  <div className="card-body">
                    <Pag1 />
                  </div>
                </div>
              </div>
              <div className="card bg-light">
                <div className="card-header" id="headingTwo">
                  <h2 className="mb-0">
                    <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                      Página #2
                    </button>
                  </h2>
                </div>
                <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                  <div className="card-body">
                    <Pag2/>
                  </div>
                </div>
              </div>
              <div className="card bg-light">
                <div className="card-header" id="headingThree">
                  <h2 className="mb-0">
                    <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                      Página #3
                    </button>
                  </h2>
                </div>
                <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                  <div className="card-body">
                    <Pag3/>
                  </div>
                </div>
              </div>

              <div className="card bg-light">
                <div className="card-header" id="headingFour">
                  <h2 className="mb-0">
                    <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                      Página #4
                    </button>
                  </h2>
                </div>
                <div id="collapseFour" className="collapse" aria-labelledby="headingFour" data-parent="#accordionExample">
                  <div className="card-body">
                    <Pag4/>
                  </div>
                </div>
              </div>
            </div>
            
            
            
        </form>
      </div>
    );
  }
}
export default Create;
