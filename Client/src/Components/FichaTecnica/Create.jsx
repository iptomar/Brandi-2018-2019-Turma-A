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

class Create extends Component {

  constructor(props) {
    super(props);
    this.state = {
      alertText: '',
      alertisNotVisible: true,
      alertColor: '',
      id: this.props.id,
      alert: false,
      files: [],
      filesG: []
    };
    this.getData = this.getData.bind(this);
    this.getDataG = this.getDataG.bind(this);
  }

  componentDidMount() {
    if(window.location.href.includes("/detalhes") && window.location.href.includes("/fichaTecnica/")){
      $('input, textarea').attr('readonly', 'readonly');
      this.fetchAndSetData(this.state.id);
    }
  }

  async fetchAndSetData(id){
    //Enviar pedido
    const response = await fetch(`/api/fichaTecnica/${this.props.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": sessionStorage.getItem("token")
      }
    });

    //Aguardar API
    await response.json().then(resp => {
      let status = resp.stat;
      switch (status) {
       case "Authenticated":
        let dados = resp.resposta;
        //console.log(dados);
         //Inserção dos dados nos campos necessários
         //Pag 1
        document.getElementById('localizacao').value = dados.localizacao;
        document.getElementById('proprietario').value = dados.proprietario;
        document.getElementById('codPostalProprietario').value = dados.codPostalProprietario;
        document.getElementById('emailProprietario').value = dados.emailProprietario;
        document.getElementById('contactoProprietario').value = dados.contactoProprietario;
        document.getElementById('donoObra').value = dados.donoObra;
        document.getElementById('codPostalDonoObra').value = dados.codPostalDonoObra;
        document.getElementById('contactoDonoObra').value = dados.contactoDonoObra;
        document.getElementById('mecenas').value = dados.mecenas;
        document.getElementById('codPostalMecenas').value = dados.codPostalMecenas;
        document.getElementById('contactoMecenas').value = dados.contactoMecenas;
        //Pag 2
        if(!dados.bemIntegradoEmConjunto){ document.getElementById('bemIntegradoSim').parentNode.parentNode.parentNode.style.display = "none";
        }else{ document.getElementById('bemIntegradoNão').parentNode.parentNode.parentNode.style.display = "none"; }
        document.getElementById('tipoConjunto').value = dados.tipoBensConjunto;
        document.getElementById('elementosConst').value = dados.elemConstConj;
        document.getElementById('elementosAcess').value = dados.materiasElementosAcessorios;
        document.getElementById('assinaturasAutoria').value = dados.marcasInscricoesAssinaturas;
        document.getElementById('inscricoesMontagem').value = dados.marcasInscricoesMontagem;
        document.getElementById('inscricoesConstrucao').value = dados.marcasInscricoesConstrucao;
        document.getElementById('classPatrimonial').value = dados.classPatrimonial;
        
        if(dados.epoca !== "EpocaCoeva"){ document.getElementById('EpocaCoevo').parentNode.parentNode.parentNode.style.display = "none";}
        if(dados.epoca !== "EpocaTardio"){ document.getElementById('EpocaTardio').parentNode.parentNode.parentNode.style.display = "none";}
        if(dados.epoca !== "EpocaOutra"){ document.getElementById('EpocaOutra').parentNode.parentNode.parentNode.style.display = "none";}
        if(dados.epoca !== "EpocaReplica"){ document.getElementById('EpocaReplica').parentNode.parentNode.parentNode.style.display = "none";}
        if(dados.epoca !== "EpocaReproducao"){ document.getElementById('EpocaReproducao').parentNode.parentNode.parentNode.style.display = "none";}

        if(dados.qualidade !== "Excelente") document.getElementById('QualidadeExcelente').parentNode.parentNode.parentNode.style.display = "none";
        if(dados.qualidade !== "Muito boa") document.getElementById('QualidadeMuitoBoa').parentNode.parentNode.parentNode.style.display = "none";
        if(dados.qualidade !== "Boa") document.getElementById('QualidadeBoa').parentNode.parentNode.parentNode.style.display = "none";
        if(dados.qualidade !== "Regular") document.getElementById('QualidadeRegular').parentNode.parentNode.parentNode.style.display = "none";

        document.getElementById('estruturaSuporteMateriais').value = dados.materiaisEstruturaSuporte;
        document.getElementById('SuperficieMateriais').value = dados.materiaisSuperficies;
        document.getElementById('estruturaSuporteTecnicas').value = dados.tecnicasEstruturaSuporte;
        document.getElementById('SuperficieTecnicas').value = dados.tecnicasSuperficie;
        //Pag 3
        document.getElementById('condAmbDescricao').value = dados.condAmbDescricao;
        document.getElementById('condAmbFrioTemperatura').value = dados.condAmbFrioTemperatura;
        document.getElementById('condAmbFrioHumidade').value = dados.condAmbFrioHumidade;
        document.getElementById('condAmbFrioPeriodoInicio').value = dados.condAmbFrioPeriodoInicio;
        document.getElementById('condAmbFrioPeriodoFim').value = dados.condAmbFrioPeriodoFim;
        document.getElementById('condAmbQuenteTemperatura').value = dados.condAmbQuenteTemperatura;
        document.getElementById('condAmbQuenteHumidade').value = dados.condAmbQuenteHumidade;
        document.getElementById('condAmbQuentePeriodoInicio').value = dados.condAmbQuentePeriodoInicio;
        document.getElementById('condAmbQuentePeriodoFim').value = dados.condAmbQuentePeriodoFim;
        document.getElementById('ilumArtTipo').value = dados.ilumArtTipo;
        document.getElementById('ilumArtValorIluminancia').value = dados.ilumArtValorIluminancia;
        document.getElementById('ilumArtValurUV').value = dados.ilumArtValurUV;
        document.getElementById('ilumArtValorRealUV').value = dados.ilumArtValorRealUV;
        document.getElementById('ilumNatOrigem').value = dados.ilumNatOrigem;
        document.getElementById('ilumNatValorIluminancia').value = dados.ilumNatValorIluminancia;
        document.getElementById('ilumNatValorUV').value = dados.ilumNatValorUV;
        document.getElementById('ilumNatValorRealUV').value = dados.ilumNatValorRealUV;
        document.getElementById('poluicaoAgentes').value = dados.poluicaoAgentes;
        document.getElementById('poluicaoFontesOrigem').value = dados.poluicaoFontesOrigem;
        document.getElementById('poluicaoResultados').value = dados.poluicaoResultados;
        document.getElementById('poluicaoObservacoesConclusoes').value = dados.poluicaoObservacoesConclusoes;
        //Pag 4
        //FAZER DESAPARECER OS QUE NÃO SÃO ADEQUADOS (AINDA NÃO FEITO POR CAUSA DO INSERT NÃO TER ESTES DADOS CORRETOS)
    // let objGerais = [];
    // if(document.getElementById("identMateriais").checked) objGerais.push(document.getElementById("identMateriais").value);
    // if(document.getElementById("identIntervencoes").checked) objGerais.push(document.getElementById("identIntervencoes").value);
    // if(document.getElementById("caracterizacao").checked) objGerais.push(document.getElementById("caracterizacao").value);
    // if(document.getElementById("identPatologias").checked) objGerais.push(document.getElementById("identPatologias").value);
    // if(document.getElementById("datacao").checked) objGerais.push(document.getElementById("datacao").value);
    // if(document.getElementById("ensaio").checked) objGerais.push(document.getElementById("ensaio").value);
    // formData.append("objGerais", objGerais);
    // let tab = [];
    // for(let i = 0 ; i < document.getElementById("tabela").children[1].childElementCount; i++){
    //     let content = document.getElementById("tabela").children[1].children[i];
    //     tab.push({tipoRef: content.children[0].children[0].value, lap: content.children[1].children[0].value, objEsp: content.children[2].children[0].value, reslt: content.children[3].children[0].value, data: content.children[5].children[0].value });
    // }
    // formData.append("tabobjGerais", tab);
    // document.getElementById('interpretacaoResul').value = dados.;
    // document.getElementById('observaConclusoes').value = dados.;
    //Pag 5
    // document.getElementById('estruturaPag5').value = dados.;
    // document.getElementById('superficiePag5').value = dados.;
    // document.getElementById('elementosAcessoriosPag5').value = dados.;
    // document.getElementById('estruturaPag5diag').value = dados.;
    // document.getElementById('superficiePag5diag').value = dados.;
    // document.getElementById('elementosAcessoriosPag5diag').value = dados.;
    // document.getElementById('observaçoesConclusoesPag5').value = dados.;
    // //Pag 6
    // document.getElementById('estruturaIntervAnter').value = dados.;
    // document.getElementById('superficieIntervAnter').value = dados.;
    // document.getElementById('elementosAcessoriosIntervAnter').value = dados.;
    // document.getElementById('observaçoesConclusoesPag6').value = dados.;
    // if(document.getElementById('intervPrevencao').checked) formData.append("tipoInterv", document.getElementById('intervPrevencao').value);
    // else if(document.getElementById('intervConvercao').checked) formData.append("tipoInterv", document.getElementById('intervConvercao').value);
    // else formData.append("tipoInterv", document.getElementById('intervRestauro').value);
    // formData.append("aspetosEspecificosPag6", document.getElementById('aspetosEspecificosPag6').value);
    // if(document.getElementById('intervPrevencaoConsRes').checked) formData.append("tipoIntervCR", document.getElementById('intervPrevencaoConsRes').value);
    // else if(document.getElementById('intervConvercaoConsRes').checked) formData.append("tipoIntervCR", document.getElementById('intervConvercaoConsRes').value);
    // else formData.append("tipoIntervCR", document.getElementById('intervRestauroConsRes').value);
    // formData.append("EstruturaPropPag6", document.getElementById('EstruturaPropPag6').value);
    // formData.append("EstruturaPropRecPag6", document.getElementById('EstruturaPropRecPag6').value);
    // formData.append("SuperficiePropPag6", document.getElementById('SuperficiePropPag6').value);
    // formData.append("SuperficiePropRecPag6", document.getElementById('SuperficiePropRecPag6').value);
    // formData.append("ElementosAcessPropRecPag6", document.getElementById('ElementosAcessPropRecPag6').value);
    // formData.append("observaçoesConclusoesPag6", document.getElementById('observaçoesConclusoesPag6').value);
    // //Pag 8
    // formData.append("estruturaPag8", document.getElementById('estruturaPag8').value);
    // formData.append("recursosEstruturaPag8", document.getElementById('recursosEstruturaPag8').value);
    // formData.append("superficiePag8", document.getElementById('superficiePag8').value);
    // formData.append("recursosSuperficiePag8", document.getElementById('recursosSuperficiePag8').value);
    // formData.append("elementosAcessoriosPag8", document.getElementById('elementosAcessoriosPag8').value);
    // formData.append("recursosElementosAcPag8", document.getElementById('recursosElementosAcPag8').value);
    // formData.append("observaçoesConclusoesPag8", document.getElementById('observaçoesConclusoesPag8').value);
    // //Pag 9
    // formData.append("relTecInterLCRM", document.getElementById('relTecInterLCRM').value);
    // formData.append("tipoDesigOrig", document.getElementById('tipoDesigOrig').value);
    // formData.append("refOrig", document.getElementById('refOrig').value);
    // formData.append("entidadeOrig", document.getElementById('entidadeOrig').value);
    // formData.append("tipoDesigDocGraf", document.getElementById('tipoDesigDocGraf').value);
    // formData.append("refDocGraf", document.getElementById('refDocGraf').value);
    // formData.append("entidadeDocGraf", document.getElementById('entidadeDocGraf').value);
    // formData.append("tipoDesigExames", document.getElementById('tipoDesigExames').value);
    // formData.append("refExames", document.getElementById('refExames').value);
    // formData.append("entidadeExames", document.getElementById('entidadeExames').value);
    // //Pag10
    // formData.append("atledpArqDoc", document.getElementById('atledpArqDoc').value);
    // formData.append("tipoArqDoc", document.getElementById('tipoArqDoc').value);
    // formData.append("localArqDoc", document.getElementById('localArqDoc').value);
    // formData.append("cotaArqDoc", document.getElementById('cotaArqDoc').value);
    // formData.append("atledpIcon", document.getElementById('atledpIcon').value);
    // formData.append("tipoIcon", document.getElementById('tipoIcon').value);
    // formData.append("localIcon", document.getElementById('localIcon').value);
    // formData.append("cotaIcon", document.getElementById('cotaIcon').value);
    // formData.append("atledpBiblio", document.getElementById('atledpBiblio').value);
    // formData.append("tipoBiblio", document.getElementById('tipoBiblio').value);
    // formData.append("localBiblio", document.getElementById('localBiblio').value);
    // formData.append("cotaBiblio", document.getElementById('cotaBiblio').value);
    // formData.append("atledpOutras", document.getElementById('atledpOutras').value);
    // formData.append("tipoOutras", document.getElementById('tipoOutras').value);
    // formData.append("localOutras", document.getElementById('localOutras').value);
    // formData.append("cotaOutras", document.getElementById('cotaOutras').value);
    // let table = [];
    // for(let j = 0 ; j < document.getElementById("table").children[1].childElementCount; j++){
    //     let cont = document.getElementById("table").children[1].children[j];
    //     table.push(
    //       {
    //         constEq: cont.children[0].children[0].value,
    //         funcDes: cont.children[1].children[0].value,
    //         habPro: cont.children[2].children[0].value
    //       }
    //     );
    // }
    // formData.append("tabel10", table);
        //Elimina todos os radiobuttons
        $('input[type=radio]').remove();
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

  changeToEdit(){
    $('input, textarea').removeAttr('readonly');
    $('#btBar').html('<button class="btn btn-success btn-lg btn-block mb-5" type="button" onClick={this.changeToEdit}>Guardar</button>');

  }

  //Recebe os dados do filho Pag1
  getData(data) {
    this.setState({ files: data });
  }

  //Recebe os dados do filho Pag1
  getDataG(data) {
    this.setState({ filesG: data });
  }

  handleSubmit = async e => {
    e.preventDefault();
    //Form
    let formData = new FormData();
    //Pag 1
    formData.append("localizacao", document.getElementById('localizacao').value);
    formData.append("proprietario",  document.getElementById('proprietario').value);
    formData.append("codPostalProprietario",  document.getElementById('codPostalProprietario').value);
    formData.append("emailProprietario",  document.getElementById('emailProprietario').value);
    formData.append("contactoProprietario",  document.getElementById('contactoProprietario').value);
    formData.append("donoObra",  document.getElementById('donoObra').value);
    formData.append("codPostalDonoObra",  document.getElementById('codPostalDonoObra').value);
    formData.append("contactoDonoObra",  document.getElementById('contactoDonoObra').value);
    formData.append("mecenas",  document.getElementById('mecenas').value);
    formData.append("codPostalMecenas",  document.getElementById('codPostalMecenas').value);
    formData.append("contactoMecenas",  document.getElementById('contactoMecenas').value);
    formData.append("files", this.state.files);
    //Pag 2
      //Verificações de radiobutton
    if(document.getElementById('bemIntegradoSim').checked) formData.append("bemIntegradoEmConjunto", true);
    else formData.append("bemIntegradoEmConjunto", false);
    formData.append("tipoBensConjunto",  document.getElementById('tipoConjunto').value);
    formData.append("elemConstConj",  document.getElementById('elementosConst').value);
    formData.append("materiasElementosAcessorios",  document.getElementById('elementosAcess').value);
    formData.append("marcasInscricoesAssinaturas",  document.getElementById('assinaturasAutoria').value);
    formData.append("marcasInscricoesMontagem",  document.getElementById('inscricoesMontagem').value);
    formData.append("marcasInscricoesConstrucao",  document.getElementById('inscricoesConstrucao').value);
    formData.append("classPatrimonial",  document.getElementById('classPatrimonial').value);
    if(document.getElementById('EpocaCoevo').checked) formData.append("epoca", document.getElementById('EpocaCoevo').value);
    else if(document.getElementById('EpocaTardio').checked) formData.append("epoca", document.getElementById('EpocaTardio').value);
    else if(document.getElementById('EpocaOutra').checked) formData.append("epoca", document.getElementById('EpocaOutra').value);
    else if(document.getElementById('EpocaReplica').checked) formData.append("epoca", document.getElementById('EpocaReplica').value);
    else if(document.getElementById('EpocaReproducao').checked) formData.append("epoca", document.getElementById('EpocaReproducao').value);
    else formData.append("epoca", document.getElementById('EpocaFalsificacao').value);
    if(document.getElementById('QualidadeExcelente').checked) formData.append("qualidade", document.getElementById('QualidadeExcelente').value);
    else if(document.getElementById('QualidadeMuitoBoa').checked) formData.append("qualidade", document.getElementById('QualidadeMuitoBoa').value);
    else  if(document.getElementById('QualidadeBoa').checked) formData.append("qualidade", document.getElementById('QualidadeBoa').value);
    else if(document.getElementById('QualidadeRegular').checked) formData.append("qualidade", document.getElementById('QualidadeRegular').value);
    else formData.append("qualidade", document.getElementById('QualidadeFraca').value);
    formData.append("materiaisEstruturaSuporte",  document.getElementById('estruturaSuporteMateriais').value);
    formData.append("materiaisSuperficies", document.getElementById('SuperficieMateriais').value);
    formData.append("tecnicasEstruturaSuporte",  document.getElementById('estruturaSuporteTecnicas').value);
    formData.append("tecnicasSuperficie",  document.getElementById('SuperficieTecnicas').value);
    //Pag 3
    formData.append("condAmbDescricao",  document.getElementById('condAmbDescricao').value);
    formData.append("condAmbFrioTemperatura",  document.getElementById('condAmbFrioTemperatura').value);
    formData.append("condAmbFrioHumidade",  document.getElementById('condAmbFrioHumidade').value);
    formData.append("condAmbFrioPeriodoInicio",  document.getElementById('condAmbFrioPeriodoInicio').value);
    formData.append("condAmbFrioPeriodoFim",  document.getElementById('condAmbFrioPeriodoFim').value);
    formData.append("condAmbQuenteTemperatura",  document.getElementById('condAmbQuenteTemperatura').value);
    formData.append("condAmbQuenteHumidade",  document.getElementById('condAmbQuenteHumidade').value);
    formData.append("condAmbQuentePeriodoInicio",  document.getElementById('condAmbQuentePeriodoInicio').value);
    formData.append("condAmbQuentePeriodoFim",  document.getElementById('condAmbQuentePeriodoFim').value);
    formData.append("ilumArtTipo",  document.getElementById('ilumArtTipo').value);
    formData.append("ilumArtValorIluminancia",  document.getElementById('ilumArtValorIluminancia').value);
    formData.append("ilumArtValurUV",  document.getElementById('ilumArtValurUV').value);
    formData.append("ilumArtValorRealUV",  document.getElementById('ilumArtValorRealUV').value);
    formData.append("ilumNatOrigem",  document.getElementById('ilumNatOrigem').value);
    formData.append("ilumNatValorIluminancia",  document.getElementById('ilumNatValorIluminancia').value);
    formData.append("ilumNatValorUV",  document.getElementById('ilumNatValorUV').value);
    formData.append("ilumNatValorRealUV",  document.getElementById('ilumNatValorRealUV').value);
    formData.append("poluicaoAgentes",  document.getElementById('poluicaoAgentes').value);
    formData.append("poluicaoFontesOrigem",  document.getElementById('poluicaoFontesOrigem').value);
    formData.append("poluicaoResultados",  document.getElementById('poluicaoResultados').value);
    formData.append("poluicaoObservacoesConclusoes",  document.getElementById('poluicaoObservacoesConclusoes').value);
    //Pag 4
    let objGerais = [];
    if(document.getElementById("identMateriais").checked) objGerais.push(document.getElementById("identMateriais").value);
    if(document.getElementById("identIntervencoes").checked) objGerais.push(document.getElementById("identIntervencoes").value);
    if(document.getElementById("caracterizacao").checked) objGerais.push(document.getElementById("caracterizacao").value);
    if(document.getElementById("identPatologias").checked) objGerais.push(document.getElementById("identPatologias").value);
    if(document.getElementById("datacao").checked) objGerais.push(document.getElementById("datacao").value);
    if(document.getElementById("ensaio").checked) objGerais.push(document.getElementById("ensaio").value);
    formData.append("objGerais", objGerais);
    let tab = [];
    for(let i = 0 ; i < document.getElementById("tabela").children[1].childElementCount; i++){
        let content = document.getElementById("tabela").children[1].children[i];
        tab.push({tipoRef: content.children[0].children[0].value, lap: content.children[1].children[0].value, objEsp: content.children[2].children[0].value, reslt: content.children[3].children[0].value, data: content.children[5].children[0].value });
    }
    formData.append("tabobjGerais", tab);
    formData.append("examesAnalisesInterpResultados", document.getElementById('interpretacaoResul').value);
    formData.append("examesAnalisesObsConclusoes", document.getElementById('observaConclusoes').value);
    //Pag 5
    formData.append("estadoConservFQMestrutura", document.getElementById('estruturaPag5').value);
    formData.append("estadoConservFQMsuperficie", document.getElementById('superficiePag5').value);
    formData.append("estadoConservFQMelementosAcess", document.getElementById('elementosAcessoriosPag5').value);
    formData.append("estadoConservBioEstrutura", document.getElementById('estruturaPag5diag').value);
    formData.append("estadoConservBioSuperficie", document.getElementById('superficiePag5diag').value);
    formData.append("estadoConservBioElementosAcess", document.getElementById('elementosAcessoriosPag5diag').value);
    formData.append("estadoConservObsConclusoes", document.getElementById('observaçoesConclusoesPag5').value);
    //Pag 6
    formData.append("estruturaIntervAnter", document.getElementById('estruturaIntervAnter').value);
    formData.append("superficieIntervAnter", document.getElementById('superficieIntervAnter').value);
    formData.append("elementosAcessoriosIntervAnter", document.getElementById('elementosAcessoriosIntervAnter').value);
    formData.append("observaçoesConclusoesPag6", document.getElementById('observaçoesConclusoesPag6').value);
    if(document.getElementById('intervPrevencao').checked) formData.append("tipoInterv", document.getElementById('intervPrevencao').value);
    else if(document.getElementById('intervConvercao').checked) formData.append("tipoInterv", document.getElementById('intervConvercao').value);
    else formData.append("tipoInterv", document.getElementById('intervRestauro').value);
    formData.append("aspetosEspecificosPag6", document.getElementById('aspetosEspecificosPag6').value);
    if(document.getElementById('intervPrevencaoConsRes').checked) formData.append("tipoIntervCR", document.getElementById('intervPrevencaoConsRes').value);
    else if(document.getElementById('intervConvercaoConsRes').checked) formData.append("tipoIntervCR", document.getElementById('intervConvercaoConsRes').value);
    else formData.append("tipoIntervCR", document.getElementById('intervRestauroConsRes').value);
    formData.append("EstruturaPropPag6", document.getElementById('EstruturaPropPag6').value);
    formData.append("EstruturaPropRecPag6", document.getElementById('EstruturaPropRecPag6').value);
    formData.append("SuperficiePropPag6", document.getElementById('SuperficiePropPag6').value);
    formData.append("SuperficiePropRecPag6", document.getElementById('SuperficiePropRecPag6').value);
    formData.append("ElementosAcessPropRecPag6", document.getElementById('ElementosAcessPropRecPag6').value);
    formData.append("observaçoesConclusoesPag6", document.getElementById('observaçoesConclusoesPag6').value);
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
    let table = [];
    for(let j = 0 ; j < document.getElementById("table").children[1].childElementCount; j++){
        let cont = document.getElementById("table").children[1].children[j];
        table.push(
          {
            constEq: cont.children[0].children[0].value,
            funcDes: cont.children[1].children[0].value,
            habPro: cont.children[2].children[0].value
          }
        );
    }
    formData.append("tabel10", table);

    
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
      <div className="container Create">
         <form className="py-3" onSubmit={this.handleSubmit}>
           <div className="row">
            <div className="col-md-10 py-3 text-center">
                <h2>Ficha Técnica</h2>
              </div>
              <div className="col-md-2" id="btBar">
                {window.location.href.includes("/detalhes") && window.location.href.includes("/fichaTecnica/") ? 
                  <button className="btn btn-success btn-lg btn-block mb-5" type="button" onClick={this.changeToEdit}>Editar</button>
                :
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
                      <Pag1
                      sendData={this.getData} 
                      // sendDataG={this.getData}
                       />
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
                    <Pag2/>
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
                    <Pag3/>
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
                    <Pag4/>
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
                    <Pag5/>
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
                    <Pag6/>
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
                    <Pag7/>
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
                    <Pag8/>
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
                    <Pag9/>
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
                    <Pag10/>
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
