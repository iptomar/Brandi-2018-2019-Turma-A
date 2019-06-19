import React, { Component } from "react";
import Pag1 from "../../Components/FichaTecnica/Create/Pag1";
import Pag2 from "../../Components/FichaTecnica/Create/Pag2";
import Pag3 from "../../Components/FichaTecnica/Create/Pag3";
import Pag4 from "../../Components/FichaTecnica/Create/Pag4";
import Pag5 from "../../Components/FichaTecnica/Create/Pag5";
import Pag6 from "../../Components/FichaTecnica/Create/Pag6";
import Pag7 from "../../Components/FichaTecnica/Create/Pag7";
import Pag8 from "../../Components/FichaTecnica/Create/Pag8";
import Pag9 from "../../Components/FichaTecnica/Create/Pag9";
import Pag10 from "../../Components/FichaTecnica/Create/Pag10";
import $ from 'jquery';
import FileUpload from "../Globais/FileUpload";

class Create extends Component {

  constructor(props) {
    super(props);
    this.state = {
      alertText: '',
      alertisNotVisible: true,
      alertColor: '',
      id: this.props.id,
      alert: false,
      data: null,
      files: [],
      filesG: []
    };
    this.getData = this.getData.bind(this);
    this.getDataG = this.getDataG.bind(this);
    this.fetchAndSetData = this.fetchAndSetData.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    //Verifica se esta página é usada para verificar os detalhes de uma ficha técnica
    if (window.location.href.includes("/detalhes") && window.location.href.includes("/fichaTecnica/")) {
      //Coloca todas as textarea e input com readonly
      $('input, textarea').attr('readonly', 'readonly');
      //Ocultar input do tipo checkbox
      $('input[type=checkbox], input[type=radio]').hide();
      //Ocultar os componentes FileUpload
      $('.custom-file').hide();
      $('.btn.btn-dark').hide();
      //Atualiza todos os valores necessários para apresentação da ficha técnica
      this.fetchAndSetData(this.state.id);
    }
  }

  /**
   * Atualiza os campos com os dados de uma ficha técnica
   * para o utilizador poder verificar os seus detalhes
   * @param {*} id
   * :ID da ficha técnica
   */
  async fetchAndSetData(id) {
    //Enviar pedido
    const response = await fetch(`/api/fichaTecnica/${this.props.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": sessionStorage.getItem("token")
      }
    });

    //Aguardar API
    await response.json().then(async resp => {
      let status = resp.stat;
      switch (status) {
        case "Authenticated":
          await this.setState({ data: resp.resposta });
          //Ativa a função de atualização
          $("input, textarea").on('change', this.handleChange);
          //Inserção dos dados nos campos necessários
          //Pag 1
          document.getElementById('localizacao').value = this.state.data[0].resposta.localizacao;
          document.getElementById('proprietario').value = this.state.data[0].resposta.proprietario;
          document.getElementById('codPostalProprietario').value = this.state.data[0].resposta.codPostalProprietario;
          document.getElementById('emailProprietario').value = this.state.data[0].resposta.emailProprietario;
          document.getElementById('contactoProprietario').value = this.state.data[0].resposta.contactoProprietario;
          document.getElementById('donoObra').value = this.state.data[0].resposta.donoObra;
          document.getElementById('codPostalDonoObra').value = this.state.data[0].resposta.codPostalDonoObra;
          document.getElementById('contactoDonoObra').value = this.state.data[0].resposta.contactoDonoObra;
          document.getElementById('mecenas').value = this.state.data[0].resposta.mecenas;
          document.getElementById('codPostalMecenas').value = this.state.data[0].resposta.codPostalMecenas;
          document.getElementById('contactoMecenas').value = this.state.data[0].resposta.contactoMecenas;

          //Pag 2
          if (this.state.data[0].resposta.bemIntegradoEmConjunto === 0) {
            document.getElementById('bemIntegradoSim').parentNode.parentNode.parentNode.style.display = "none";
            document.getElementById('bemIntegradoNão').checked = true;
            document.getElementById('bemIntegradoSim').checked = false;
          } else {
            document.getElementById('bemIntegradoNão').parentNode.parentNode.parentNode.style.display = "none";
            document.getElementById('bemIntegradoNão').checked = false;
            document.getElementById('bemIntegradoSim').checked = true;

          }
          document.getElementById('tipoBensConjunto').value = this.state.data[0].resposta.tipoBensConjunto;
          document.getElementById('elemConstConj').value = this.state.data[0].resposta.elemConstConj;
          document.getElementById('materiasElementosAcessorios').value = this.state.data[0].resposta.materiasElementosAcessorios;
          document.getElementById('marcasInscricoesAssinaturas').value = this.state.data[0].resposta.marcasInscricoesAssinaturas;
          document.getElementById('marcasInscricoesMontagem').value = this.state.data[0].resposta.marcasInscricoesMontagem;
          document.getElementById('marcasInscricoesConstrucao').value = this.state.data[0].resposta.marcasInscricoesConstrucao;
          document.getElementById('classPatrimonial').value = this.state.data[0].resposta.classPatrimonial;

          //Radio
          document.getElementById('EpocaCoevo').parentNode.parentNode.parentNode.style.display = "none";
          document.getElementById('EpocaTardio').parentNode.parentNode.parentNode.style.display = "none";
          document.getElementById('EpocaOutra').parentNode.parentNode.parentNode.style.display = "none";
          document.getElementById('EpocaReplica').parentNode.parentNode.parentNode.style.display = "none";
          document.getElementById('EpocaReproducao').parentNode.parentNode.parentNode.style.display = "none";
          document.getElementById('EpocaFalsificacao').parentNode.parentNode.parentNode.style.display = "none";

          if (this.state.data[0].resposta.epoca !== "Coevo") {

            document.getElementById('EpocaTardio').checked = true;
            if (this.state.data[0].resposta.epoca !== "Tardio") {
              document.getElementById('EpocaOutra').checked = true;
              if (this.state.data[0].resposta.epoca !== "Outra") {
                document.getElementById('EpocaReplica').checked = true;
                if (this.state.data[0].resposta.epoca !== "Replica") {
                  document.getElementById('EpocaReproducao').checked = true;
                  if (this.state.data[0].resposta.epoca !== "Reproducao") {
                    document.getElementById('EpocaFalsificacao').checked = true;
                    if (this.state.data[0].resposta.epoca !== "Falsificação") {
                      document.getElementById('EpocaFalsificacao').checked = false;
                    } else {
                      document.getElementById('EpocaFalsificacao').checked = true;
                      document.getElementById('EpocaFalsificacao').parentNode.parentNode.parentNode.style.display = "";
                    }
                  } else {
                    document.getElementById('EpocaReproducao').checked = true;
                    document.getElementById('EpocaReproducao').parentNode.parentNode.parentNode.style.display = "";
                  }

                } else {
                  document.getElementById('EpocaReplica').checked = true;
                  document.getElementById('EpocaReplica').parentNode.parentNode.parentNode.style.display = "";
                }

              } else {
                document.getElementById('EpocaOutra').checked = true;
                document.getElementById('EpocaOutra').parentNode.parentNode.parentNode.style.display = "";
              }

            } else {
              document.getElementById('EpocaTardio').checked = true;
              document.getElementById('EpocaTardio').parentNode.parentNode.parentNode.style.display = "";
            }
          }else{
            document.getElementById('EpocaCoevo').parentNode.parentNode.parentNode.style.display = "";
          }

          document.getElementById('QualidadeExcelente').parentNode.parentNode.parentNode.style.display = "none";
          document.getElementById('QualidadeMuitoBoa').parentNode.parentNode.parentNode.style.display = "none";
          document.getElementById('QualidadeBoa').parentNode.parentNode.parentNode.style.display = "none";
          document.getElementById('QualidadeRegular').parentNode.parentNode.parentNode.style.display = "none";
          document.getElementById('QualidadeFraca').parentNode.parentNode.parentNode.style.display = "none";

          if (this.state.data[0].resposta.qualidade !== "Excelente") {
            document.getElementById('QualidadeMuitoBoa').checked = true;
            if (this.state.data[0].resposta.qualidade !== "Muito boa") {
              document.getElementById('QualidadeBoa').checked = true;
              if (this.state.data[0].resposta.qualidade !== "Boa") {
                document.getElementById('QualidadeRegular').checked = true;
                if (this.state.data[0].resposta.qualidade !== "Regular") {
                  document.getElementById('QualidadeFraca').checked = true;
                  if (this.state.data[0].resposta.qualidade !== "Fraca") {
                    document.getElementById('QualidadeFraca').checked = false;
                  } else {
                    document.getElementById('QualidadeFraca').checked = true;
                    document.getElementById('QualidadeFraca').parentNode.parentNode.parentNode.style.display = "";
                  }

                } else {
                  document.getElementById('QualidadeRegular').checked = true;
                  document.getElementById('QualidadeRegular').parentNode.parentNode.parentNode.style.display = "";
                }

              } else {
                document.getElementById('QualidadeBoa').checked = true;
                document.getElementById('QualidadeBoa').parentNode.parentNode.parentNode.style.display = "";
              }

            } else {
              document.getElementById('QualidadeMuitoBoa').checked = true;
              document.getElementById('QualidadeMuitoBoa').parentNode.parentNode.parentNode.style.display = "";
            }
          }else{
            document.getElementById('QualidadeExcelente').parentNode.parentNode.parentNode.style.display = "";
          }

          document.getElementById('materiaisEstruturaSuporte').value = this.state.data[0].resposta.materiaisEstruturaSuporte;
          document.getElementById('materiaisSuperficies').value = this.state.data[0].resposta.materiaisSuperficies;
          document.getElementById('tecnicasEstruturaSuporte').value = this.state.data[0].resposta.tecnicasEstruturaSuporte;
          document.getElementById('tecnicasSuperficie').value = this.state.data[0].resposta.tecnicasSuperficie;
          //Pag 3
          document.getElementById('condAmbDescricao').value = this.state.data[0].resposta.condAmbDescricao;
          document.getElementById('condAmbFrioTemperatura').value = this.state.data[0].resposta.condAmbFrioTemperatura;
          document.getElementById('condAmbFrioHumidade').value = this.state.data[0].resposta.condAmbFrioHumidade;
          document.getElementById('condAmbFrioPeriodoInicio').value = this.state.data[0].resposta.condAmbFrioPeriodoInicio;
          document.getElementById('condAmbFrioPeriodoFim').value = this.state.data[0].resposta.condAmbFrioPeriodoFim;
          document.getElementById('condAmbQuenteTemperatura').value = this.state.data[0].resposta.condAmbQuenteTemperatura;
          document.getElementById('condAmbQuenteHumidade').value = this.state.data[0].resposta.condAmbQuenteHumidade;
          document.getElementById('condAmbQuentePeriodoInicio').value = this.state.data[0].resposta.condAmbQuentePeriodoInicio;
          document.getElementById('condAmbQuentePeriodoFim').value = this.state.data[0].resposta.condAmbQuentePeriodoFim;
          document.getElementById('ilumArtTipo').value = this.state.data[0].resposta.ilumArtTipo;
          document.getElementById('ilumArtValorIluminancia').value = this.state.data[0].resposta.ilumArtValorIluminancia;
          document.getElementById('ilumArtValurUV').value = this.state.data[0].resposta.ilumArtValurUV;
          document.getElementById('ilumArtValorRealUV').value = this.state.data[0].resposta.ilumArtValorRealUV;
          document.getElementById('ilumNatOrigem').value = this.state.data[0].resposta.ilumNatOrigem;
          document.getElementById('ilumNatValorIluminancia').value = this.state.data[0].resposta.ilumNatValorIluminancia;
          document.getElementById('ilumNatValorUV').value = this.state.data[0].resposta.ilumNatValorUV;
          document.getElementById('ilumNatValorRealUV').value = this.state.data[0].resposta.ilumNatValorRealUV;
          document.getElementById('poluicaoAgentes').value = this.state.data[0].resposta.poluicaoAgentes;
          document.getElementById('poluicaoFontesOrigem').value = this.state.data[0].resposta.poluicaoFontesOrigem;
          document.getElementById('poluicaoResultados').value = this.state.data[0].resposta.poluicaoResultados;
          document.getElementById('poluicaoObservacoesConclusoes').value = this.state.data[0].resposta.poluicaoObservacoesConclusoes;

          //Pag 4
          //CheckBox
          document.getElementById("identMateriais").parentNode.parentNode.parentNode.style.display = "none";
          document.getElementById("identIntervencoes").parentNode.parentNode.parentNode.style.display = "none";
          document.getElementById("identPatologias").parentNode.parentNode.parentNode.style.display = "none";
          document.getElementById("caracterizacao").parentNode.parentNode.parentNode.style.display = "none";
          document.getElementById("datacao").parentNode.parentNode.parentNode.style.display = "none";
          document.getElementById("ensaio").parentNode.parentNode.parentNode.style.display = "none";
          for (let i = 0; i < this.state.data[1].length; i++) {
            if (this.state.data[1][i].Objectivo === "identMateriais") {
              document.getElementById("identMateriais").parentNode.parentNode.parentNode.style.display = "";
              document.getElementById("identMateriais").checked = true;
            }
            if (this.state.data[1][i].Objectivo === "identIntervencoes") {
              document.getElementById("identIntervencoes").parentNode.parentNode.parentNode.style.display = "";
              document.getElementById("identIntervencoes").checked = true;
            }
            if (this.state.data[1][i].Objectivo === "caracterizacao") {
              document.getElementById("caracterizacao").parentNode.parentNode.parentNode.style.display = "";
              document.getElementById("caracterizacao").checked = true;
            }
            if (this.state.data[1][i].Objectivo === "identPatologias") {
              document.getElementById("identPatologias").parentNode.parentNode.parentNode.style.display = "";
              document.getElementById("identPatologias").checked = true;
            }
            if (this.state.data[1][i].Objectivo === "datacao") {
              document.getElementById("datacao").parentNode.parentNode.parentNode.style.display = "";
              document.getElementById("datacao").checked = true;
            }
            if (this.state.data[1][i].Objectivo === "ensaio") {
              document.getElementById("ensaio").parentNode.parentNode.parentNode.style.display = "";
              document.getElementById("ensaio").checked = true;
            }
          }
          //Realizar a inserção na tabela
          document.getElementById("tabela").children[1].children[0].remove();
          let content = document.getElementById("tabela").children[1];
          for (let i = 0; i < this.state.data[2].length; i++) {
            let tr = document.createElement('tr');
            tr.innerHTML = '<tr><td><textarea class="form-control" type="text" style="resize: none;" rows="2" placeholder="Tipo-Referência" readonly="readonly">' + this.state.data[2][i].tipoReferencia + '</textarea></td><td><textarea class="form-control" type="text" style="resize: none;" rows="2" placeholder="Localização / Área / Ponto" readonly="readonly">' + this.state.data[2][i].LocalizacaoAreaPonto + '</textarea></td><td><textarea class="form-control" type="text" style="resize: none;" rows="2" placeholder="Objetivos Específicos" readonly="readonly">' + this.state.data[2][i].ObjectivosEspecificos + '</textarea></td><td><textarea class="form-control" type="text" style="resize: none;" rows="2" placeholder="Resultados" readonly="readonly">' + this.state.data[2][i].Resultados + '</textarea></td><td><textarea class="form-control" type="text" readonly="readonly" style="resize: none;" rows="2">Name</textarea></td><td><input class="form-control" style="width: 170px; height: 63px;" type="date" value="' + this.state.data[2][i].DataDePreenchimento.split("T")[0] + '" readonly="readonly"></td></tr>';
            content.append(tr);
          }
          document.getElementById('examesAnalisesInterpResultados').value = this.state.data[0].resposta.examesAnalisesInterpResultados;
          document.getElementById('examesAnalisesObsConclusoes').value = this.state.data[0].resposta.examesAnalisesObsConclusoes;

          //Pag 5
          document.getElementById('estadoConservFQMestrutura').value = this.state.data[0].resposta.estadoConservFQMestrutura;
          document.getElementById('estadoConservFQMsuperficie').value = this.state.data[0].resposta.estadoConservFQMsuperficie;
          document.getElementById('estadoConservFQMelementosAcess').value = this.state.data[0].resposta.estadoConservFQMelementosAcess;
          document.getElementById('estadoConservBioEstrutura').value = this.state.data[0].resposta.estadoConservBioEstrutura;
          document.getElementById('estadoConservBioSuperficie').value = this.state.data[0].resposta.estadoConservBioSuperficie;
          document.getElementById('estadoConservBioElementosAcess').value = this.state.data[0].resposta.estadoConservBioElementosAcess;
          document.getElementById('estadoConservObsConclusoes').value = this.state.data[0].resposta.estadoConservObsConclusoes;

          //Pag 6
          document.getElementById('estruturaIntervAnter').value = this.state.data[0].resposta.estruturaIntervAnter;
          document.getElementById('superficieIntervAnter').value = this.state.data[0].resposta.superficieIntervAnter;
          document.getElementById('elementosAcessoriosIntervAnter').value = this.state.data[0].resposta.elementosAcessoriosIntervAnter;
          document.getElementById('observaçoesConclusoesPag6').value = this.state.data[0].resposta.observaçoesConclusoesPag6;

          document.getElementById('intervPrevencao').parentNode.parentNode.parentNode.style.display = "none";
          document.getElementById('intervConvercao').parentNode.parentNode.parentNode.style.display = "none";
          document.getElementById('intervRestauro').parentNode.parentNode.parentNode.style.display = "none";

          if (this.state.data[0].resposta.tipoInterv !== "Prevenção") {
            document.getElementById('intervConvercao').checked = true;
            if (this.state.data[0].resposta.tipoInterv !== "Conservação") {
              document.getElementById('intervRestauro').checked = true;
              if (this.state.data[0].resposta.tipoInterv === "Restauro") {
                document.getElementById('intervRestauro').parentNode.parentNode.parentNode.style.display = "";
              }

            } else {
              document.getElementById('intervConvercao').parentNode.parentNode.parentNode.style.display = "";
            }
          } else {
            document.getElementById('intervPrevencao').parentNode.parentNode.parentNode.style.display = "";
          }


          document.getElementById('aspetosEspecificosPag6').value = this.state.data[0].resposta.aspetosEspecificosPag6;

          //Pag7
          //console.log(this.state.data);
          document.getElementById('intervPrevencaoConsRes').parentNode.parentNode.parentNode.style.display = "none";
          document.getElementById('intervConvercaoConsRes').parentNode.parentNode.parentNode.style.display = "none";
          document.getElementById('intervRestauroConsRes').parentNode.parentNode.parentNode.style.display = "none";

          if (this.state.data[0].resposta.tipoInterv !== "Prevenção") {
            document.getElementById('intervConvercaoConsRes').checked = true;
            if (this.state.data[0].resposta.tipoInterv !== "Conservação") {
              document.getElementById('intervRestauroConsRes').checked = true;
              if (this.state.data[0].resposta.tipoInterv === "Restauro") {
                document.getElementById('intervRestauroConsRes').parentNode.parentNode.parentNode.style.display = "";
              }
            } else {
              document.getElementById('intervConvercaoConsRes').parentNode.parentNode.parentNode.style.display = "";
            }
          } else {
            document.getElementById('intervPrevencaoConsRes').parentNode.parentNode.parentNode.style.display = "";
          }



          document.getElementById('EstruturaPropPag6').value = this.state.data[0].resposta.EstruturaPropPag6;
          document.getElementById('EstruturaPropRecPag6').value = this.state.data[0].resposta.EstruturaPropRecPag6;
          document.getElementById('SuperficiePropPag6').value = this.state.data[0].resposta.SuperficiePropPag6;
          document.getElementById('SuperficiePropRecPag6').value = this.state.data[0].resposta.SuperficiePropRecPag6;
          document.getElementById('ElementosAcessPropPag6').value = this.state.data[0].resposta.ElementosAcessPropPag6;
          document.getElementById('ElementosAcessPropRecPag6').value = this.state.data[0].resposta.ElementosAcessPropRecPag6;
          //document.getElementById('observaçoesConclusoesPag7').value = this.state.data[0].resposta.observaçoesConclusoesPag7;
          document.getElementById('observaçoesConclusoesPag7').value = this.state.data[0].resposta.observaçoesConclusoesPag7;

          //Pag 8
          document.getElementById('estruturaPag8').value = this.state.data[0].resposta.estruturaPag8;
          document.getElementById('recursosEstruturaPag8').value = this.state.data[0].resposta.recursosEstruturaPag8;
          document.getElementById('superficiePag8').value = this.state.data[0].resposta.superficiePag8;
          document.getElementById('recursosSuperficiePag8').value = this.state.data[0].resposta.recursosSuperficiePag8;
          document.getElementById('elementosAcessoriosPag8').value = this.state.data[0].resposta.elementosAcessoriosPag8;
          document.getElementById('recursosElementosAcPag8').value = this.state.data[0].resposta.recursosElementosAcPag8;
          document.getElementById('observaçoesConclusoesPag8').value = this.state.data[0].resposta.observaçoesConclusoesPag8;

          //Pag 9
          document.getElementById('relTecInterLCRM').value = this.state.data[0].resposta.relTecInterLCRM;
          document.getElementById('tipoDesigOrig').value = this.state.data[0].resposta.tipoDesigOrig;
          document.getElementById('refOrig').value = this.state.data[0].resposta.refOrig;
          document.getElementById('entidadeOrig').value = this.state.data[0].resposta.entidadeOrig;
          document.getElementById('tipoDesigDocGraf').value = this.state.data[0].resposta.tipoDesigDocGraf;
          document.getElementById('refDocGraf').value = this.state.data[0].resposta.refDocGraf;
          document.getElementById('entidadeDocGraf').value = this.state.data[0].resposta.entidadeDocGraf;
          document.getElementById('tipoDesigExames').value = this.state.data[0].resposta.tipoDesigExames;
          document.getElementById('refExames').value = this.state.data[0].resposta.refExames;
          document.getElementById('entidadeExames').value = this.state.data[0].resposta.entidadeExames;

          //Pag10
          document.getElementById('atledpArqDoc').value = this.state.data[0].resposta.atledpArqDoc;
          document.getElementById('tipoArqDoc').value = this.state.data[0].resposta.tipoArqDoc;
          document.getElementById('localArqDoc').value = this.state.data[0].resposta.localArqDoc;
          document.getElementById('cotaArqDoc').value = this.state.data[0].resposta.cotaArqDoc;
          document.getElementById('atledpIcon').value = this.state.data[0].resposta.atledpIcon;
          document.getElementById('tipoIcon').value = this.state.data[0].resposta.tipoIcon;
          document.getElementById('localIcon').value = this.state.data[0].resposta.localIcon;
          document.getElementById('cotaIcon').value = this.state.data[0].resposta.cotaIcon;
          document.getElementById('atledpBiblio').value = this.state.data[0].resposta.atledpBiblio;
          document.getElementById('tipoBiblio').value = this.state.data[0].resposta.tipoBiblio;
          document.getElementById('localBiblio').value = this.state.data[0].resposta.localBiblio;
          document.getElementById('cotaBiblio').value = this.state.data[0].resposta.cotaBiblio;
          document.getElementById('atledpOutras').value = this.state.data[0].resposta.atledpOutras;
          document.getElementById('tipoOutras').value = this.state.data[0].resposta.tipoOutras;
          document.getElementById('localOutras').value = this.state.data[0].resposta.localOutras;
          document.getElementById('cotaOutras').value = this.state.data[0].resposta.cotaOutras;


          //Realizar a inserção na tabela
          document.getElementById("table").children[1].children[0].remove();
          let cont = document.getElementById("table").children[1];
          for (let i = 0; i < this.state.data[3].length; i++) {
            let tr = document.createElement('tr');
            tr.innerHTML = '<tr><td><textarea class="form-control" type="text" style="resize: none;" rows="2" placeholder="Constituição da Equipa / Nome do Técnico" readonly="readonly">' + this.state.data[3][i].constEq + '</textarea></td><td><textarea class="form-control" type="text" style="resize: none;" rows="2" placeholder="Funções Desempenhadas" readonly="readonly">' + this.state.data[3][i].funcDes + '</textarea></td><td><textarea class="form-control" type="text" style="resize: none;" rows="2" placeholder="Habilitações Escolares / Nível Profissional (1-8)" readonly="readonly">' + this.state.data[3][i].habPro + '</textarea></td></tr>';
            cont.append(tr);
          }


          //Colocar a imagem do gráfico
          document.getElementById('imgGraph').style.display = "block";
          const respGrafico = await fetch("/api/fichaTecnica/imagemgrafico/" + this.state.id, {
            method: "GET",
            headers: {
              'x-auth-token': sessionStorage.getItem('token')
            }
          });

          //Aguardar API
          await respGrafico.json().then(resp => {
            console.log(resp);
            document.querySelector('#imgGraph').src = resp;
          });


          //Colocar a imagem ativa no carrousel
          document.getElementById('carouselExampleControls').style.display = "block";
          //Colocar as outras imagens
          let contentor = document.querySelector("#otherImage");
          for (let i = 0; i < this.state.data[4].length; i++) {
            const respImage = await fetch("/api/fichaTecnica/fotografias/" + this.state.data[4][i].id, {
              method: "GET",
              headers: {
                'x-auth-token': sessionStorage.getItem('token')
              }
            });

            //Aguardar API
            await respImage.json().then(resp => {
              if (i === 0) {
                document.querySelector('#actImage').src = resp;
              } else {
                let div = document.createElement('div');
                div.className = "carousel-item";
                let img = document.createElement('img');
                img.setAttribute('src', resp);
                img.className = "d-block w-100";
                img.style.height = "500px";
                div.appendChild(img);
                contentor.appendChild(div);
              }
            }
            );
          }
          break;
        default:
          console.log("A API ESTÁ A ARDER, DARIOOOOOOOOOOOOOOOOOOOOOO");
      }
    }).catch(resp => {
      this.setState(prevState => ({
        ...prevState,
        error: true,
        loading: true,
        alertText: 'Não existe conexão com o servidor.',
        alertisNotVisible: false,
        alertColor: 'danger'
      }))
    });
  }

  // Controla as alterações nos inputs (Necessidade do React)
  handleChange(event) {
    let name = event.target.id;
    let value = event.target.value;
    this.setState(({ data }) => ({
      data: [
        {
          resposta: {
            ...data[0].resposta,
            [name]: value,
          }
        },
        ...data.slice(1)
      ]
    }));
  }

  /**
   * Método que transforma a página dos detalhes para a página da edição
   */
  changeToEdit() {
    //Remove o atributo readonly nos input e nas textarea
    $('input, textarea').removeAttr('readonly');
    const btEditar = document.getElementById('btEditar');
    btEditar.style.display = "none";
    const btGuardar = document.getElementById('btGuardar');
    btGuardar.style.display = 'block';
    //Apresentar todo o conteudo que foi escondido na apresentação
    $('.Create .collapse div').show();
    //Apresenta os input do tipo checkbox e radio
    $('input[type=checkbox], input[type=radio]').show();
    $('.btn.btn-dark').show();
  }

  /**
   * Método que envia o formulário da edição para o backend
   */
  submitEdit = async e => {
    e.preventDefault();
    //Form
    let formData = new FormData();

    //Pag 1
    formData.append("localizacao", this.state.data[0].resposta.localizacao);
    formData.append("proprietario", this.state.data[0].resposta.proprietario);
    formData.append("codPostalProprietario", this.state.data[0].resposta.codPostalProprietario);
    formData.append("emailProprietario", this.state.data[0].resposta.emailProprietario);
    formData.append("contactoProprietario", this.state.data[0].resposta.contactoProprietario);
    formData.append("donoObra", this.state.data[0].resposta.donoObra);
    formData.append("codPostalDonoObra", this.state.data[0].resposta.codPostalDonoObra);
    formData.append("contactoDonoObra", this.state.data[0].resposta.contactoDonoObra);
    formData.append("mecenas", this.state.data[0].resposta.mecenas);
    formData.append("codPostalMecenas", this.state.data[0].resposta.codPostalMecenas);
    formData.append("contactoMecenas", this.state.data[0].resposta.contactoMecenas);
    for (let i = 0; i < this.state.files.length; i++) {
      formData.append("files[" + i + "]", this.state.files[i]);
    }
    formData.append("imgGraph", this.state.filesG[0]);
    //Pag 2
    //Verificações de radiobutton
    if (document.getElementById('bemIntegradoSim').checked) formData.append("bemIntegradoEmConjunto", true);
    else formData.append("bemIntegradoEmConjunto", false);
    formData.append("tipoBensConjunto", this.state.data[0].resposta.tipoBensConjunto);
    formData.append("elemConstConj", this.state.data[0].resposta.elemConstConj);
    formData.append("materiasElementosAcessorios", this.state.data[0].resposta.materiasElementosAcessorios);
    formData.append("marcasInscricoesAssinaturas", this.state.data[0].resposta.marcasInscricoesAssinaturas);
    formData.append("marcasInscricoesMontagem", this.state.data[0].resposta.marcasInscricoesMontagem);
    formData.append("marcasInscricoesConstrucao", this.state.data[0].resposta.marcasInscricoesConstrucao);
    formData.append("classPatrimonial", this.state.data[0].resposta.classPatrimonial);
    if (document.getElementById('EpocaCoevo').checked) formData.append("epoca", document.getElementById('EpocaCoevo').value);
    else if (document.getElementById('EpocaTardio').checked) formData.append("epoca", document.getElementById('EpocaTardio').value);
    else if (document.getElementById('EpocaOutra').checked) formData.append("epoca", document.getElementById('EpocaOutra').value);
    else if (document.getElementById('EpocaReplica').checked) formData.append("epoca", document.getElementById('EpocaReplica').value);
    else if (document.getElementById('EpocaReproducao').checked) formData.append("epoca", document.getElementById('EpocaReproducao').value);
    else formData.append("epoca", document.getElementById('EpocaFalsificacao').value);
    if (document.getElementById('QualidadeExcelente').checked) formData.append("qualidade", document.getElementById('QualidadeExcelente').value);
    else if (document.getElementById('QualidadeMuitoBoa').checked) formData.append("qualidade", document.getElementById('QualidadeMuitoBoa').value);
    else if (document.getElementById('QualidadeBoa').checked) formData.append("qualidade", document.getElementById('QualidadeBoa').value);
    else if (document.getElementById('QualidadeRegular').checked) formData.append("qualidade", document.getElementById('QualidadeRegular').value);
    else formData.append("qualidade", document.getElementById('QualidadeFraca').value);
    formData.append("materiaisEstruturaSuporte", this.state.data[0].resposta.materiaisEstruturaSuporte);
    formData.append("materiaisSuperficies", this.state.data[0].resposta.materiaisSuperficies);
    formData.append("tecnicasEstruturaSuporte", this.state.data[0].resposta.tecnicasEstruturaSuporte);
    formData.append("tecnicasSuperficie", this.state.data[0].resposta.tecnicasSuperficie);
    //Pag 3
    formData.append("condAmbDescricao", this.state.data[0].resposta.condAmbDescricao);
    formData.append("condAmbFrioTemperatura", this.state.data[0].resposta.condAmbFrioTemperatura);
    formData.append("condAmbFrioHumidade", this.state.data[0].resposta.condAmbFrioHumidade);
    formData.append("condAmbFrioPeriodoInicio", this.state.data[0].resposta.condAmbFrioPeriodoInicio);
    formData.append("condAmbFrioPeriodoFim", this.state.data[0].resposta.condAmbFrioPeriodoFim);
    formData.append("condAmbQuenteTemperatura", this.state.data[0].resposta.condAmbQuenteTemperatura);
    formData.append("condAmbQuenteHumidade", this.state.data[0].resposta.condAmbQuenteHumidade);
    formData.append("condAmbQuentePeriodoInicio", this.state.data[0].resposta.condAmbQuentePeriodoInicio);
    formData.append("condAmbQuentePeriodoFim", this.state.data[0].resposta.condAmbQuentePeriodoFim);
    formData.append("ilumArtTipo", this.state.data[0].resposta.ilumArtTipo);
    formData.append("ilumArtValorIluminancia", this.state.data[0].resposta.ilumArtValorIluminancia);
    formData.append("ilumArtValurUV", this.state.data[0].resposta.ilumArtValurUV);
    formData.append("ilumArtValorRealUV", this.state.data[0].resposta.ilumArtValorRealUV);
    formData.append("ilumNatOrigem", this.state.data[0].resposta.ilumNatOrigem);

    formData.append("ilumNatValorIluminancia", this.state.data[0].resposta.ilumNatValorIluminancia);
    formData.append("ilumNatValorUV", this.state.data[0].resposta.ilumNatValorUV);
    formData.append("ilumNatValorRealUV", this.state.data[0].resposta.ilumNatValorUV);
    formData.append("poluicaoAgentes", this.state.data[0].resposta.poluicaoAgentes);
    formData.append("poluicaoFontesOrigem", this.state.data[0].resposta.poluicaoFontesOrigem);
    formData.append("poluicaoResultados", this.state.data[0].resposta.poluicaoResultados);
    formData.append("poluicaoObservacoesConclusoes", this.state.data[0].resposta.poluicaoObservacoesConclusoes);
    // //Pag 4
    let objGerais = [];
    if (document.getElementById("identMateriais").checked) objGerais.push(document.getElementById("identMateriais").value);
    if (document.getElementById("identIntervencoes").checked) objGerais.push(document.getElementById("identIntervencoes").value);
    if (document.getElementById("caracterizacao").checked) objGerais.push(document.getElementById("caracterizacao").value);
    if (document.getElementById("identPatologias").checked) objGerais.push(document.getElementById("identPatologias").value);
    if (document.getElementById("datacao").checked) objGerais.push(document.getElementById("datacao").value);
    if (document.getElementById("ensaio").checked) objGerais.push(document.getElementById("ensaio").value);
    formData.append("objGerais", JSON.stringify(objGerais));
    let tab = [];
    for (let i = 0; i < document.getElementById("tabela").children[1].childElementCount; i++) {
      let content = document.getElementById("tabela").children[1].children[i];
      tab.push({ tipoRef: content.children[0].children[0].value, lap: content.children[1].children[0].value, objEsp: content.children[2].children[0].value, reslt: content.children[3].children[0].value, data: content.children[5].children[0].value });
    }
    formData.append("tabobjGerais", JSON.stringify(tab));
    formData.append("examesAnalisesInterpResultados", this.state.data[0].resposta.examesAnalisesInterpResultados);
    formData.append("examesAnalisesObsConclusoes", this.state.data[0].resposta.examesAnalisesObsConclusoes);
    //Pag 5
    formData.append("estadoConservFQMestrutura", this.state.data[0].resposta.estadoConservFQMestrutura);
    formData.append("estadoConservFQMsuperficie", this.state.data[0].resposta.estadoConservFQMsuperficie);
    formData.append("estadoConservFQMelementosAcess", this.state.data[0].resposta.estadoConservFQMelementosAcess);
    formData.append("estadoConservBioEstrutura", this.state.data[0].resposta.estadoConservBioEstrutura);
    formData.append("estadoConservBioSuperficie", this.state.data[0].resposta.estadoConservBioSuperficie);
    formData.append("estadoConservBioElementosAcess", this.state.data[0].resposta.estadoConservBioElementosAcess);
    formData.append("estadoConservObsConclusoes", this.state.data[0].resposta.estadoConservObsConclusoes);
    //Pag 6
    formData.append("estruturaIntervAnter", this.state.data[0].resposta.estruturaIntervAnter);
    formData.append("superficieIntervAnter", this.state.data[0].resposta.superficieIntervAnter);
    formData.append("elementosAcessoriosIntervAnter", this.state.data[0].resposta.elementosAcessoriosIntervAnter);
    formData.append("observaçoesConclusoesPag6", this.state.data[0].resposta.observaçoesConclusoesPag6);
    if (document.getElementById('intervPrevencao').checked) formData.append("tipoInterv", document.getElementById('intervPrevencao').value);
    else if (document.getElementById('intervConvercao').checked) formData.append("tipoInterv", document.getElementById('intervConvercao').value);
    else formData.append("tipoInterv", document.getElementById('intervRestauro').value);
    formData.append("aspetosEspecificosPag6", this.state.data[0].resposta.aspetosEspecificosPag6);
    //Pag7
    if (document.getElementById('intervPrevencaoConsRes').checked) formData.append("tipoIntervCR", document.getElementById('intervPrevencaoConsRes').value);
    else if (document.getElementById('intervConvercaoConsRes').checked) formData.append("tipoIntervCR", document.getElementById('intervConvercaoConsRes').value);
    else formData.append("tipoIntervCR", document.getElementById('intervRestauroConsRes').value);
    formData.append("EstruturaPropPag6", this.state.data[0].resposta.EstruturaPropPag6);
    formData.append("EstruturaPropRecPag6", this.state.data[0].resposta.EstruturaPropRecPag6);
    formData.append("SuperficiePropPag6", this.state.data[0].resposta.SuperficiePropPag6);
    formData.append("SuperficiePropRecPag6", this.state.data[0].resposta.SuperficiePropRecPag6);
    formData.append("ElementosAcessPropRecPag6", this.state.data[0].resposta.ElementosAcessPropRecPag6);
    formData.append("ElementosAcessPropPag6", this.state.data[0].resposta.ElementosAcessPropPag6);
    formData.append("observaçoesConclusoesPag7", this.state.data[0].resposta.observaçoesConclusoesPag7);
    // //Pag 8
    formData.append("estruturaPag8", this.state.data[0].resposta.estruturaPag8);
    formData.append("recursosEstruturaPag8", this.state.data[0].resposta.recursosEstruturaPag8);
    formData.append("superficiePag8", this.state.data[0].resposta.superficiePag8);
    formData.append("recursosSuperficiePag8", this.state.data[0].resposta.recursosSuperficiePag8);
    formData.append("elementosAcessoriosPag8", this.state.data[0].resposta.elementosAcessoriosPag8);
    formData.append("recursosElementosAcPag8", this.state.data[0].resposta.recursosElementosAcPag8);
    formData.append("observaçoesConclusoesPag8", this.state.data[0].resposta.observaçoesConclusoesPag8);
    // //Pag 9
    formData.append("relTecInterLCRM", this.state.data[0].resposta.relTecInterLCRM);
    formData.append("tipoDesigOrig", this.state.data[0].resposta.tipoDesigOrig);
    formData.append("refOrig", this.state.data[0].resposta.refOrig);
    formData.append("entidadeOrig", this.state.data[0].resposta.entidadeOrig);
    formData.append("tipoDesigDocGraf", this.state.data[0].resposta.tipoDesigDocGraf);
    formData.append("refDocGraf", this.state.data[0].resposta.refDocGraf);
    formData.append("entidadeDocGraf", this.state.data[0].resposta.entidadeDocGraf);
    formData.append("tipoDesigExames", this.state.data[0].resposta.tipoDesigExames);
    formData.append("refExames", this.state.data[0].resposta.refExames);
    formData.append("entidadeExames", this.state.data[0].resposta.entidadeExames);
    // //Pag10
    formData.append("atledpArqDoc", this.state.data[0].resposta.atledpArqDoc);
    formData.append("tipoArqDoc", this.state.data[0].resposta.tipoArqDoc);
    formData.append("localArqDoc", this.state.data[0].resposta.localArqDoc);
    formData.append("cotaArqDoc", this.state.data[0].resposta.cotaArqDoc);
    formData.append("atledpIcon", this.state.data[0].resposta.atledpIcon);
    formData.append("tipoIcon", this.state.data[0].resposta.tipoIcon);
    formData.append("localIcon", this.state.data[0].resposta.localIcon);
    formData.append("cotaIcon", this.state.data[0].resposta.cotaIcon);
    formData.append("atledpBiblio", this.state.data[0].resposta.atledpBiblio);
    formData.append("tipoBiblio", this.state.data[0].resposta.tipoBiblio);
    formData.append("localBiblio", this.state.data[0].resposta.localBiblio);
    formData.append("cotaBiblio", this.state.data[0].resposta.cotaBiblio);
    formData.append("atledpOutras", this.state.data[0].resposta.atledpOutras);
    formData.append("tipoOutras", this.state.data[0].resposta.tipoOutras);
    formData.append("localOutras", this.state.data[0].resposta.localOutras);
    formData.append("cotaOutras", this.state.data[0].resposta.cotaOutras);
    let table = [];
    for (let j = 0; j < document.getElementById("table").children[1].childElementCount; j++) {
      let cont = document.getElementById("table").children[1].children[j];
      table.push(
        {
          constEq: cont.children[0].children[0].value,
          funcDes: cont.children[1].children[0].value,
          habPro: cont.children[2].children[0].value
        }
      );
    }
    formData.append("tabel10", JSON.stringify(table));
    //Final
    formData.append("fichaRegistoFK", this.state.id);
    //Enviar pedidos
    const response = await fetch(`/api/fichaTecnica/${this.props.id}/edit`, {
      method: "POST",
      headers: {
        'x-auth-token': sessionStorage.getItem('token')
      },
      body: formData,
    });
    //Aguardar API
    await response.json().then(resp => {
      let status = resp.stat;
      switch (status) {
        case "NoPermissions":
          this.setState({
            alertisNotVisible: false,
          });
          alert("Não tem permissões")
          break;
        case "Updated":
          this.setState({
            alertisNotVisible: false
          });
          window.location = "/fichaTecnica/" + this.state.id + "/detalhes";
          break;
        case "NotUpdated":
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



  //Recebe os dados do filho Pag1
  getData(data) {
    this.setState({ files: data });
  }

  //Recebe os dados do filho Pag1
  getDataG(data) {
    this.setState({ filesG: data });
  }

  //Submeter o form da criação da página
  handleSubmit = async e => {
    e.preventDefault();
    //Form
    let formData = new FormData();
    //Pag 1
    formData.append("localizacao", document.getElementById('localizacao').value);
    formData.append("proprietario", document.getElementById('proprietario').value);
    formData.append("codPostalProprietario", document.getElementById('codPostalProprietario').value);
    formData.append("emailProprietario", document.getElementById('emailProprietario').value);
    formData.append("contactoProprietario", document.getElementById('contactoProprietario').value);
    formData.append("donoObra", document.getElementById('donoObra').value);
    formData.append("codPostalDonoObra", document.getElementById('codPostalDonoObra').value);
    formData.append("contactoDonoObra", document.getElementById('contactoDonoObra').value);
    formData.append("mecenas", document.getElementById('mecenas').value);
    formData.append("codPostalMecenas", document.getElementById('codPostalMecenas').value);
    formData.append("contactoMecenas", document.getElementById('contactoMecenas').value);
    for (let i = 0; i < this.state.files.length; i++) {
      formData.append("files[" + i + "]", this.state.files[i]);
    }
    formData.append("imgGraph", this.state.filesG[0]);
    //Pag 2
    //Verificações de radiobutton
    if (document.getElementById('bemIntegradoSim').checked) formData.append("bemIntegradoEmConjunto", 1);
    else formData.append("bemIntegradoEmConjunto", 0);
    formData.append("tipoBensConjunto", document.getElementById('tipoBensConjunto').value);
    formData.append("elemConstConj", document.getElementById('elemConstConj').value);
    formData.append("materiasElementosAcessorios", document.getElementById('materiasElementosAcessorios').value);
    formData.append("marcasInscricoesAssinaturas", document.getElementById('marcasInscricoesAssinaturas').value);
    formData.append("marcasInscricoesMontagem", document.getElementById('marcasInscricoesMontagem').value);
    formData.append("marcasInscricoesConstrucao", document.getElementById('marcasInscricoesConstrucao').value);
    formData.append("classPatrimonial", document.getElementById('classPatrimonial').value);
    if (document.getElementById('EpocaCoevo').checked) formData.append("epoca", document.getElementById('EpocaCoevo').value);
    else if (document.getElementById('EpocaTardio').checked) formData.append("epoca", document.getElementById('EpocaTardio').value);
    else if (document.getElementById('EpocaOutra').checked) formData.append("epoca", document.getElementById('EpocaOutra').value);
    else if (document.getElementById('EpocaReplica').checked) formData.append("epoca", document.getElementById('EpocaReplica').value);
    else if (document.getElementById('EpocaReproducao').checked) formData.append("epoca", document.getElementById('EpocaReproducao').value);
    else formData.append("epoca", document.getElementById('EpocaFalsificacao').value);
    if (document.getElementById('QualidadeExcelente').checked) formData.append("qualidade", document.getElementById('QualidadeExcelente').value);
    else if (document.getElementById('QualidadeMuitoBoa').checked) formData.append("qualidade", document.getElementById('QualidadeMuitoBoa').value);
    else if (document.getElementById('QualidadeBoa').checked) formData.append("qualidade", document.getElementById('QualidadeBoa').value);
    else if (document.getElementById('QualidadeRegular').checked) formData.append("qualidade", document.getElementById('QualidadeRegular').value);
    else formData.append("qualidade", document.getElementById('QualidadeFraca').value);
    formData.append("materiaisEstruturaSuporte", document.getElementById('materiaisEstruturaSuporte').value);
    formData.append("materiaisSuperficies", document.getElementById('materiaisSuperficies').value);
    formData.append("tecnicasEstruturaSuporte", document.getElementById('tecnicasEstruturaSuporte').value);
    formData.append("tecnicasSuperficie", document.getElementById('tecnicasSuperficie').value);
    //Pag 3
    formData.append("condAmbDescricao", document.getElementById('condAmbDescricao').value);
    formData.append("condAmbFrioTemperatura", document.getElementById('condAmbFrioTemperatura').value);
    formData.append("condAmbFrioHumidade", document.getElementById('condAmbFrioHumidade').value);
    formData.append("condAmbFrioPeriodoInicio", document.getElementById('condAmbFrioPeriodoInicio').value);
    formData.append("condAmbFrioPeriodoFim", document.getElementById('condAmbFrioPeriodoFim').value);
    formData.append("condAmbQuenteTemperatura", document.getElementById('condAmbQuenteTemperatura').value);
    formData.append("condAmbQuenteHumidade", document.getElementById('condAmbQuenteHumidade').value);
    formData.append("condAmbQuentePeriodoInicio", document.getElementById('condAmbQuentePeriodoInicio').value);
    formData.append("condAmbQuentePeriodoFim", document.getElementById('condAmbQuentePeriodoFim').value);
    formData.append("ilumArtTipo", document.getElementById('ilumArtTipo').value);
    formData.append("ilumArtValorIluminancia", document.getElementById('ilumArtValorIluminancia').value);
    formData.append("ilumArtValurUV", document.getElementById('ilumArtValurUV').value);
    formData.append("ilumArtValorRealUV", document.getElementById('ilumArtValorRealUV').value);
    formData.append("ilumNatOrigem", document.getElementById('ilumNatOrigem').value);
    formData.append("ilumNatValorIluminancia", document.getElementById('ilumNatValorIluminancia').value);
    formData.append("ilumNatValorUV", document.getElementById('ilumNatValorUV').value);
    formData.append("ilumNatValorRealUV", document.getElementById('ilumNatValorRealUV').value);
    formData.append("poluicaoAgentes", document.getElementById('poluicaoAgentes').value);
    formData.append("poluicaoFontesOrigem", document.getElementById('poluicaoFontesOrigem').value);
    formData.append("poluicaoResultados", document.getElementById('poluicaoResultados').value);
    formData.append("poluicaoObservacoesConclusoes", document.getElementById('poluicaoObservacoesConclusoes').value);
    //Pag 4
    let objGerais = [];
    if (document.getElementById("identMateriais").checked) objGerais.push(document.getElementById("identMateriais").value);
    if (document.getElementById("identIntervencoes").checked) objGerais.push(document.getElementById("identIntervencoes").value);
    if (document.getElementById("caracterizacao").checked) objGerais.push(document.getElementById("caracterizacao").value);
    if (document.getElementById("identPatologias").checked) objGerais.push(document.getElementById("identPatologias").value);
    if (document.getElementById("datacao").checked) objGerais.push(document.getElementById("datacao").value);
    if (document.getElementById("ensaio").checked) objGerais.push(document.getElementById("ensaio").value);
    formData.append("objGerais", JSON.stringify(objGerais));
    let tab = [];
    for (let i = 0; i < document.getElementById("tabela").children[1].childElementCount; i++) {
      let content = document.getElementById("tabela").children[1].children[i];
      tab.push({ tipoRef: content.children[0].children[0].value, lap: content.children[1].children[0].value, objEsp: content.children[2].children[0].value, reslt: content.children[3].children[0].value, data: content.children[5].children[0].value });
    }
    //Têm de ser enviado em JSON para a equipa de backend retirar os dados
    formData.append("tabobjGerais", JSON.stringify(tab));
    formData.append("examesAnalisesInterpResultados", document.getElementById('examesAnalisesInterpResultados').value);
    formData.append("examesAnalisesObsConclusoes", document.getElementById('examesAnalisesObsConclusoes').value);
    //Pag 5
    formData.append("estadoConservFQMestrutura", document.getElementById('estadoConservFQMestrutura').value);
    formData.append("estadoConservFQMsuperficie", document.getElementById('estadoConservFQMsuperficie').value);
    formData.append("estadoConservFQMelementosAcess", document.getElementById('estadoConservFQMelementosAcess').value);
    formData.append("estadoConservBioEstrutura", document.getElementById('estadoConservBioEstrutura').value);
    formData.append("estadoConservBioSuperficie", document.getElementById('estadoConservBioSuperficie').value);
    formData.append("estadoConservBioElementosAcess", document.getElementById('estadoConservBioElementosAcess').value);
    formData.append("estadoConservObsConclusoes", document.getElementById('estadoConservObsConclusoes').value);
    //Pag 6
    formData.append("estruturaIntervAnter", document.getElementById('estruturaIntervAnter').value);
    formData.append("superficieIntervAnter", document.getElementById('superficieIntervAnter').value);
    formData.append("elementosAcessoriosIntervAnter", document.getElementById('elementosAcessoriosIntervAnter').value);
    formData.append("observaçoesConclusoesPag6", document.getElementById('observaçoesConclusoesPag6').value);
    if (document.getElementById('intervPrevencao').checked) formData.append("tipoInterv", document.getElementById('intervPrevencao').value);
    else if (document.getElementById('intervConvercao').checked) formData.append("tipoInterv", document.getElementById('intervConvercao').value);
    else formData.append("tipoInterv", document.getElementById('intervRestauro').value);
    formData.append("aspetosEspecificosPag6", document.getElementById('aspetosEspecificosPag6').value);
    if (document.getElementById('intervPrevencaoConsRes').checked) formData.append("tipoIntervCR", document.getElementById('intervPrevencaoConsRes').value);
    else if (document.getElementById('intervConvercaoConsRes').checked) formData.append("tipoIntervCR", document.getElementById('intervConvercaoConsRes').value);
    else formData.append("tipoIntervCR", document.getElementById('intervRestauroConsRes').value);
    formData.append("EstruturaPropPag6", document.getElementById('EstruturaPropPag6').value);
    formData.append("EstruturaPropRecPag6", document.getElementById('EstruturaPropRecPag6').value);
    formData.append("SuperficiePropPag6", document.getElementById('SuperficiePropPag6').value);
    formData.append("SuperficiePropRecPag6", document.getElementById('SuperficiePropRecPag6').value);
    formData.append("ElementosAcessPropPag6", document.getElementById('ElementosAcessPropPag6').value);
    formData.append("ElementosAcessPropRecPag6", document.getElementById('ElementosAcessPropRecPag6').value);
    formData.append("observaçoesConclusoesPag7", document.getElementById('observaçoesConclusoesPag7').value);
    //Pag 8
    formData.append("estruturaPag8", document.getElementById('estruturaPag8').value);
    formData.append("recursosEstruturaPag8", document.getElementById('recursosEstruturaPag8').value);
    formData.append("superficiePag8", document.getElementById('superficiePag8').value);
    formData.append("recursosSuperficiePag8", document.getElementById('recursosSuperficiePag8').value);
    formData.append("elementosAcessoriosPag8", document.getElementById('elementosAcessoriosPag8').value);
    formData.append("recursosElementosAcPag8", document.getElementById('recursosElementosAcPag8').value);
    formData.append("observaçoesConclusoesPag8", document.getElementById('observaçoesConclusoesPag8').value);
    //Pag 9
    formData.append("relTecInterLCRM", document.getElementById('relTecInterLCRM').value);
    formData.append("tipoDesigOrig", document.getElementById('tipoDesigOrig').value);
    formData.append("refOrig", document.getElementById('refOrig').value);
    formData.append("entidadeOrig", document.getElementById('entidadeOrig').value);
    formData.append("tipoDesigDocGraf", document.getElementById('tipoDesigDocGraf').value);
    formData.append("refDocGraf", document.getElementById('refDocGraf').value);
    formData.append("entidadeDocGraf", document.getElementById('entidadeDocGraf').value);
    formData.append("tipoDesigExames", document.getElementById('tipoDesigExames').value);
    formData.append("refExames", document.getElementById('refExames').value);
    formData.append("entidadeExames", document.getElementById('entidadeExames').value);
    //Pag10
    formData.append("atledpArqDoc", document.getElementById('atledpArqDoc').value);
    formData.append("tipoArqDoc", document.getElementById('tipoArqDoc').value);
    formData.append("localArqDoc", document.getElementById('localArqDoc').value);
    formData.append("cotaArqDoc", document.getElementById('cotaArqDoc').value);
    formData.append("atledpIcon", document.getElementById('atledpIcon').value);
    formData.append("tipoIcon", document.getElementById('tipoIcon').value);
    formData.append("localIcon", document.getElementById('localIcon').value);
    formData.append("cotaIcon", document.getElementById('cotaIcon').value);
    formData.append("atledpBiblio", document.getElementById('atledpBiblio').value);
    formData.append("tipoBiblio", document.getElementById('tipoBiblio').value);
    formData.append("localBiblio", document.getElementById('localBiblio').value);
    formData.append("cotaBiblio", document.getElementById('cotaBiblio').value);
    formData.append("atledpOutras", document.getElementById('atledpOutras').value);
    formData.append("tipoOutras", document.getElementById('tipoOutras').value);
    formData.append("localOutras", document.getElementById('localOutras').value);
    formData.append("cotaOutras", document.getElementById('cotaOutras').value);
    //Array a ser colocado os dados da tabela
    let table = [];
    for (let j = 0; j < document.getElementById("table").children[1].childElementCount; j++) {
      //Encontra o objeto "pai" da tabela onde se irá retirar os dados
      let cont = document.getElementById("table").children[1].children[j];
      //Insere um objeto com os dados da tabela no array que irá ser enviado para o backend
      table.push(
        {
          constEq: cont.children[0].children[0].value,
          funcDes: cont.children[1].children[0].value,
          habPro: cont.children[2].children[0].value
        }
      );
    }
    //Têm de ser enviado em JSON para a equipa de backend retirar os dados
    formData.append("tabel10", JSON.stringify(table));


    //Final
    formData.append("fichaRegistoFK", this.state.id);

    //Enviar pedidos
    const response = await fetch("/api/fichaTecnica/create", {
      method: "POST",
      headers: {
        'x-auth-token': sessionStorage.getItem('token')
      },
      body: formData
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
        case "Registed":
          this.setState({
            alertisNotVisible: false
          });
          window.location = "/fichaRI/" + this.state.id + "/detalhes/&criarfichatecnica";
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
      <div className="container Create">
        <form className="py-3" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-md-10 py-3 text-center">
              <h2>Ficha Técnica</h2>
            </div>
            <div className="col-md-2" >
              {window.location.href.includes("/detalhes") && window.location.href.includes("/fichaTecnica/") ?
                <div>
                  <button id="btEditar" className="btn btn-success btn-lg btn-block mb-5" type="button" onClick={this.changeToEdit}>Editar</button>
                  <button id="btGuardar" className="btn btn-success btn-lg btn-block mb-5" type="button" style={{ display: "none" }} onClick={this.submitEdit}>Guardar</button>
                </div> :
                <span></span>
              }
            </div>
          </div>
          <div className="accordion" id="accordionExample">
            <div className="card bg-light">
              <div className="card-header" id="headingOne">
                <h2 className="mb-0 text-center" data-toggle="collapse" data-target="#collapseOne">
                  <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Página #1
                    </button>
                </h2>
              </div>
              <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                <div className="card-body">
                  <Pag1 sendData={this.getData} />
                  <hr />
                  <label>Gráfico:</label>
                  <FileUpload sendData={this.getDataG} type="image" />
                  <img id="imgGraph" alt="Imagem Gráfico" style={{ display: "none", height: "500px", width: "100%" }} />
                </div>
              </div>
            </div>

            <div className="card bg-light">
              <div className="card-header" id="headingTwo">
                <h2 className="mb-0 text-center" data-toggle="collapse" data-target="#collapseTwo">
                  <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Página #2
                    </button>
                </h2>
              </div>
              <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                <div className="card-body">
                  <Pag2 />
                </div>
              </div>
            </div>

            <div className="card bg-light">
              <div className="card-header" id="headingThree">
                <h2 className="mb-0 text-center" data-toggle="collapse" data-target="#collapseThree">
                  <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    Página #3
                    </button>
                </h2>
              </div>
              <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                <div className="card-body">
                  <Pag3 />
                </div>
              </div>
            </div>

            <div className="card bg-light">
              <div className="card-header" id="headingFour">
                <h2 className="mb-0 text-center" data-toggle="collapse" data-target="#collapseFour">
                  <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                    Página #4
                    </button>
                </h2>
              </div>
              <div id="collapseFour" className="collapse" aria-labelledby="headingFour" data-parent="#accordionExample">
                <div className="card-body">
                  <Pag4 />
                </div>
              </div>
            </div>

            <div className="card bg-light">
              <div className="card-header" id="headingFive">
                <h2 className="mb-0 text-center" data-toggle="collapse" data-target="#collapseFive">
                  <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                    Página #5
                    </button>
                </h2>
              </div>
              <div id="collapseFive" className="collapse" aria-labelledby="headingFive" data-parent="#accordionExample">
                <div className="card-body">
                  <Pag5 />
                </div>
              </div>
            </div>

            <div className="card bg-light">
              <div className="card-header" id="headingSix">
                <h2 className="mb-0 text-center" data-toggle="collapse" data-target="#collapseSix">
                  <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                    Página #6
                    </button>
                </h2>
              </div>
              <div id="collapseSix" className="collapse" aria-labelledby="headingSix" data-parent="#accordionExample">
                <div className="card-body">
                  <Pag6 />
                </div>
              </div>
            </div>

            <div className="card bg-light">
              <div className="card-header" id="headingSeven">
                <h2 className="mb-0 text-center" data-toggle="collapse" data-target="#collapseSeven">
                  <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSix">
                    Página #7
                    </button>
                </h2>
              </div>
              <div id="collapseSeven" className="collapse" aria-labelledby="headingSeven" data-parent="#accordionExample">
                <div className="card-body">
                  <Pag7 />
                </div>
              </div>
            </div>


            <div className="card bg-light">
              <div className="card-header" id="headingEight">
                <h2 className="mb-0 text-center" data-toggle="collapse" data-target="#collapseEight">
                  <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseEight" aria-expanded="false" aria-controls="collapseEight">
                    Página #8
                    </button>
                </h2>
              </div>
              <div id="collapseEight" className="collapse" aria-labelledby="headingEight" data-parent="#accordionExample">
                <div className="card-body">
                  <Pag8 />
                </div>
              </div>
            </div>

            <div className="card bg-light">
              <div className="card-header" id="headingNine">
                <h2 className="mb-0 text-center" data-toggle="collapse" data-target="#collapseNine">
                  <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseNine" aria-expanded="false" aria-controls="collapseNine">
                    Página #9
                    </button>
                </h2>
              </div>
              <div id="collapseNine" className="collapse" aria-labelledby="headingNine" data-parent="#accordionExample">
                <div className="card-body">
                  <Pag9 />
                </div>
              </div>
            </div>

            <div className="card bg-light">
              <div className="card-header" id="headingTen">
                <h2 className="mb-0 text-center" data-toggle="collapse" data-target="#collapseTen">
                  <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTen" aria-expanded="false" aria-controls="collapseTen">
                    Página #10
                    </button>
                </h2>
              </div>
              <div id="collapseTen" className="collapse" aria-labelledby="headingTen" data-parent="#accordionExample">
                <div className="card-body">
                  <Pag10 />
                </div>
              </div>
            </div>

          </div>
          {window.location.href.includes("/detalhes") && window.location.href.includes("/fichaTecnica/") ?
            <span></span>
            :
            <button className="btn btn-success btn-lg btn-block mb-5" type="submit">Criar</button>
          }
        </form>
      </div>
    );
  }
}
export default Create;
