import React, { Component } from "react";
import Pag1 from "../../Components/FichaTecnica/Create/Pag1";
import Pag2 from "../../Components/FichaTecnica/Create/Pag2";
import Pag3 from "../../Components/FichaTecnica/Create/Pag3";
import Pag4 from "../../Components/FichaTecnica/Create/Pag4";
import Pag5 from "../../Components/FichaTecnica/Create/Pag5";


class Create extends Component {

  constructor(props) {
    super(props);
    this.state = {
      alertText: '',
      alertisNotVisible: true,
      alertColor: '',
      id: this.props.id,
      alert: false,
    };

  }


  handleSubmit = async e => {
    e.preventDefault();
      //Objeto data
      const data = {
        localização:  document.getElementById('localização').value,
        proprietario:  document.getElementById('proprietario').value,
        codPostalProprietario:  document.getElementById('codPostalProprietario').value,
        emailProprietario:  document.getElementById('emailProprietario').value,
        contactoProprietario:  document.getElementById('contactoProprietario').value,
        donoObra:  document.getElementById('donoObra').value,
        codPostalDonoObra:  document.getElementById('codPostalDonoObra').value,
        contactoDonoObra:  document.getElementById('contactoDonoObra').value,
        mecenas:  document.getElementById('mecenas').value,
        codPostalMecenas:  document.getElementById('codPostalMecenas').value,
        contactoMecenas:  document.getElementById('contactoMecenas').value,
        tipoBensConjunto:  document.getElementById('tipoConjunto').value,
        elemConstConj:  document.getElementById('elementosConst').value,
        materiasElementosAcessorios:  document.getElementById('elementosAcess').value,
        marcasInscricoesAssinaturas:  document.getElementById('assinaturasAutoria').value,
        marcasInscricoesMontagem:  document.getElementById('inscricoesMontagem').value,
        marcasInscricoesConstrucao:  document.getElementById('inscricoesConstrucao').value,
        classPatrimonial:  document.getElementById('classPatrimonial').value,
        epoca:  null,
        qualidade:  null,
        bemIntegradoEmConjunto: null ,
        materiaisEstruturaSuporte:  document.getElementById('estruturaSuporteMateriais').value,
        materiaisSuperficies:  document.getElementById('SuperficieMateriais').value,
        tecnicasEstruturaSuporte:  document.getElementById('estruturaSuporteTecnicas').value,
        tecnicasSuperficie:  document.getElementById('SuperficieTecnicas').value,
        condAmbDescricao:  document.getElementById('condAmbDescricao').value,
        condAmbFrioTemperatura:  document.getElementById('condAmbFrioTemperatura').value,
        condAmbFrioHumidade:  document.getElementById('condAmbFrioHumidade').value,
        condAmbFrioPeriodoInicio:  document.getElementById('condAmbFrioPeriodoInicio').value,
        condAmbFrioPeriodoFim:  document.getElementById('condAmbFrioPeriodoFim').value,
        condAmbQuenteTemperatura:  document.getElementById('condAmbQuenteTemperatura').value,
        condAmbQuenteHumidade:  document.getElementById('condAmbQuenteHumidade').value,
        condAmbQuentePeriodoInicio:  document.getElementById('condAmbQuentePeriodoInicio').value,
        condAmbQuentePeriodoFim:  document.getElementById('condAmbQuentePeriodoFim').value,
        ilumArtTipo:  document.getElementById('ilumArtTipo').value,
        ilumArtValorIluminancia:  document.getElementById('ilumArtValorIluminancia').value,
        ilumArtValurUV:  document.getElementById('ilumArtValurUV').value,
        ilumArtValorRealUV:  document.getElementById('ilumArtValorRealUV').value,
        ilumNatOrigem:  document.getElementById('ilumNatOrigem').value,
        ilumNatValorIluminancia:  document.getElementById('ilumNatValorIluminancia').value,
        ilumNatValorUV:  document.getElementById('ilumNatValorUV').value,
        ilumNatValorRealUV:  document.getElementById('ilumNatValorRealUV').value,
        poluicaoAgentes:  document.getElementById('poluicaoAgentes').value,
        poluicaoFontesOrigem:  document.getElementById('poluicaoFontesOrigem').value,
        poluicaoResultados:  document.getElementById('poluicaoResultados').value,
        poluicaoObservacoesConclusoes:  document.getElementById('poluicaoObservacoesConclusoes').value,
        fichaRegistoFK: this.state.id
      };
      //Verificações de radiobutton
      if(document.getElementById('bemIntegradoSim').checked) data.bemIntegradoEmConjunto = true;
      else data.bemIntegradoEmConjunto = false;

      if(document.getElementById('EpocaCoevo').checked) data.epoca = document.getElementById('EpocaCoevo').value;
      else if(document.getElementById('EpocaTardio').checked) data.epoca = document.getElementById('EpocaTardio').value;
      else  if(document.getElementById('EpocaOutra').checked) data.epoca = document.getElementById('EpocaOutra').value;
      else if(document.getElementById('EpocaReplica').checked) data.epoca = document.getElementById('EpocaReplica').value;
      else if(document.getElementById('EpocaReproducao').checked) data.epoca = document.getElementById('EpocaReproducao').value;
      else data.epoca = document.getElementById('EpocaFalsificacao').value;

      
      if(document.getElementById('QualidadeExcelente').checked) data.qualidade = document.getElementById('QualidadeExcelente').value;
      else if(document.getElementById('QualidadeMuitoBoa').checked) data.qualidade = document.getElementById('QualidadeMuitoBoa').value;
      else  if(document.getElementById('QualidadeBoa').checked) data.qualidade = document.getElementById('QualidadeBoa').value;
      else if(document.getElementById('QualidadeRegular').checked) data.qualidade = document.getElementById('QualidadeRegular').value;
      else data.qualidade = document.getElementById('QualidadeFraca').value;

    //Enviar pedidos
    const response = await fetch("/api/fichaTecnica/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'x-auth-token': sessionStorage.getItem('token')
      },
      body: JSON.stringify(data)
      });
      //Aguardar API
      await response.json().then(resp => {
        let status = resp.stat;
        switch (status) {
          case "DatabaseError":
             this.setState({
               alertText: "Ocorreu um erro técnico. Tente novamente mais tarde",
               alertisNotVisible: false,
               alertColor: "danger"
             });
             break;
           case "Ficha inserida":
             this.setState({
               alertisNotVisible: false
             });
             break;
         case "Erro na criação":
           this.setState({
             alertText: "Ocorreu um erro técnico. Tente novamente mais tarde",
             alertisNotVisible: false,
             alertColor: "danger"
           });
           break;
         default:
            console.log("A API ESTÁ A ARDER, DARIOOOOOOOOOOOOOOOOOOOOOO");
       }
    });
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

            
            <div className="card bg-light">
                <div className="card-header" id="headingFive">
                  <h2 className="mb-0">
                    <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                      Página #5
                    </button>
                  </h2>
                </div>
                <div id="collapseFive" className="collapse" aria-labelledby="headingFive" data-parent="#accordionExample">
                  <div className="card-body">
                    <Pag5/>
                  </div>
                </div>
            </div>
            <button className="btn btn-success btn-lg btn-block mb-5" type="submit">Criar</button>
        </form> 
      </div>
    );
  }
}
export default Create;
