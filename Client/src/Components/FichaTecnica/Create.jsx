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
    if(window.location.href.includes("/detalhes") && window.location.href.includes("/fichaTecnica/")){
      //Coloca todas as textarea e input com readonly
      $('input, textarea').attr('readonly', 'readonly');
      //Atualiza todos os valores necessários para apresentação da ficha técnica
      this.fetchAndSetData(this.state.id);
    }
  }

   // Controla as alterações nos inputs (Necessidade do React)
   handleChange(event) {
    let name = event.target.id;
    let value = event.target.value;
    this.setState( prevState => ({
      data: {
        ...prevState.data,
        [name] : value
      }
    }));
  }

  /**
   * Atualiza os campos com os dados de uma ficha técnica
   * para o utilizador poder verificar os seus detalhes
   * @param {*} id
   * :ID da ficha técnica
   */
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
    await response.json().then(async resp => {
      let status = resp.stat;
      switch (status) {
       case "Authenticated":
        await this.setState({ data: resp.resposta });
         //Ativa a função de atualização
         $("input, textarea").on('change', this.handleChange);
         //Inserção dos dados nos campos necessários
         //Pag 1
        document.getElementById('localizacao').value = this.state.data.localizacao;
        document.getElementById('proprietario').value = this.state.data.proprietario;
        document.getElementById('codPostalProprietario').value = this.state.data.codPostalProprietario;
        document.getElementById('emailProprietario').value = this.state.data.emailProprietario;
        document.getElementById('contactoProprietario').value = this.state.data.contactoProprietario;
        document.getElementById('donoObra').value = this.state.data.donoObra;
        document.getElementById('codPostalDonoObra').value = this.state.data.codPostalDonoObra;
        document.getElementById('contactoDonoObra').value = this.state.data.contactoDonoObra;
        document.getElementById('mecenas').value = this.state.data.mecenas;
        document.getElementById('codPostalMecenas').value = this.state.data.codPostalMecenas;
        document.getElementById('contactoMecenas').value = this.state.data.contactoMecenas;
        //Pag 2
        if(!this.state.data.bemIntegradoEmConjunto){ document.getElementById('bemIntegradoSim').parentNode.parentNode.parentNode.style.display = "none";
        }else{ document.getElementById('bemIntegradoNão').parentNode.parentNode.parentNode.style.display = "none"; }
        document.getElementById('tipoConjunto').value = this.state.data.tipoBensConjunto;
        document.getElementById('elementosConst').value = this.state.data.elemConstConj;
        document.getElementById('elementosAcess').value = this.state.data.materiasElementosAcessorios;
        document.getElementById('assinaturasAutoria').value = this.state.data.marcasInscricoesAssinaturas;
        document.getElementById('inscricoesMontagem').value = this.state.data.marcasInscricoesMontagem;
        document.getElementById('inscricoesConstrucao').value = this.state.data.marcasInscricoesConstrucao;
        document.getElementById('classPatrimonial').value = this.state.data.classPatrimonial;
        
        if(this.state.data.epoca !== "Coevo"){ document.getElementById('EpocaCoevo').parentNode.parentNode.parentNode.style.display = "none";}
        if(this.state.data.epoca !== "Tardio"){ document.getElementById('EpocaTardio').parentNode.parentNode.parentNode.style.display = "none";}
        if(this.state.data.epoca !== "Outra"){ document.getElementById('EpocaOutra').parentNode.parentNode.parentNode.style.display = "none";}
        if(this.state.data.epoca !== "Replica"){ document.getElementById('EpocaReplica').parentNode.parentNode.parentNode.style.display = "none";}
        if(this.state.data.epoca !== "Reproducao"){ document.getElementById('EpocaReproducao').parentNode.parentNode.parentNode.style.display = "none";}
        if(this.state.data.epoca !== "Falsificacao"){ document.getElementById('EpocaFalsificacao').parentNode.parentNode.parentNode.style.display = "none";}

        if(this.state.data.qualidade !== "Excelente") document.getElementById('QualidadeExcelente').parentNode.parentNode.parentNode.style.display = "none";
        if(this.state.data.qualidade !== "Muito boa") document.getElementById('QualidadeMuitoBoa').parentNode.parentNode.parentNode.style.display = "none";
        if(this.state.data.qualidade !== "Boa") document.getElementById('QualidadeBoa').parentNode.parentNode.parentNode.style.display = "none";
        if(this.state.data.qualidade !== "Regular") document.getElementById('QualidadeRegular').parentNode.parentNode.parentNode.style.display = "none";
        if(this.state.data.qualidade !== "Fraca") document.getElementById('QualidadeFraca').parentNode.parentNode.parentNode.style.display = "none";

        document.getElementById('estruturaSuporteMateriais').value = this.state.data.materiaisEstruturaSuporte;
        document.getElementById('SuperficieMateriais').value = this.state.data.materiaisSuperficies;
        document.getElementById('estruturaSuporteTecnicas').value = this.state.data.tecnicasEstruturaSuporte;
        document.getElementById('SuperficieTecnicas').value = this.state.data.tecnicasSuperficie;
        //Pag 3
        document.getElementById('condAmbDescricao').value = this.state.data.condAmbDescricao;
        document.getElementById('condAmbFrioTemperatura').value = this.state.data.condAmbFrioTemperatura;
        document.getElementById('condAmbFrioHumidade').value = this.state.data.condAmbFrioHumidade;
        document.getElementById('condAmbFrioPeriodoInicio').value = this.state.data.condAmbFrioPeriodoInicio;
        document.getElementById('condAmbFrioPeriodoFim').value = this.state.data.condAmbFrioPeriodoFim;
        document.getElementById('condAmbQuenteTemperatura').value = this.state.data.condAmbQuenteTemperatura;
        document.getElementById('condAmbQuenteHumidade').value = this.state.data.condAmbQuenteHumidade;
        document.getElementById('condAmbQuentePeriodoInicio').value = this.state.data.condAmbQuentePeriodoInicio;
        document.getElementById('condAmbQuentePeriodoFim').value = this.state.data.condAmbQuentePeriodoFim;
        document.getElementById('ilumArtTipo').value = this.state.data.ilumArtTipo;
        document.getElementById('ilumArtValorIluminancia').value = this.state.data.ilumArtValorIluminancia;
        document.getElementById('ilumArtValurUV').value = this.state.data.ilumArtValurUV;
        document.getElementById('ilumArtValorRealUV').value = this.state.data.ilumArtValorRealUV;
        document.getElementById('ilumNatOrigem').value = this.state.data.ilumNatOrigem;
        document.getElementById('ilumNatValorIluminancia').value = this.state.data.ilumNatValorIluminancia;
        document.getElementById('ilumNatValorUV').value = this.state.data.ilumNatValorUV;
        document.getElementById('ilumNatValorRealUV').value = this.state.data.ilumNatValorRealUV;
        document.getElementById('poluicaoAgentes').value = this.state.data.poluicaoAgentes;
        document.getElementById('poluicaoFontesOrigem').value = this.state.data.poluicaoFontesOrigem;
        document.getElementById('poluicaoResultados').value = this.state.data.poluicaoResultados;
        document.getElementById('poluicaoObservacoesConclusoes').value = this.state.data.poluicaoObservacoesConclusoes;

        //Pag 4
        //FAZER DESAPARECER OS QUE NÃO SÃO ADEQUADOS (FALTA SER ENVIADO)
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
      document.getElementById('interpretacaoResul').value = this.state.data.examesAnalisesInterpResultados;
     document.getElementById('observaConclusoes').value = this.state.data.examesAnalisesObsConclusoes;

     //Pag 5
     document.getElementById('estruturaPag5').value = this.state.data.estadoConservFQMestrutura;
     document.getElementById('superficiePag5').value = this.state.data.estadoConservFQMsuperficie;
     document.getElementById('elementosAcessoriosPag5').value = this.state.data.estadoConservFQMelementosAcess;
     document.getElementById('estruturaPag5diag').value = this.state.data.estadoConservBioEstrutura;
     document.getElementById('superficiePag5diag').value = this.state.data.estadoConservBioSuperficie;
     document.getElementById('elementosAcessoriosPag5diag').value = this.state.data.estadoConservBioElementosAcess;
     document.getElementById('observaçoesConclusoesPag5').value = this.state.data.estadoConservObsConclusoes;

    //Pag 6
    document.getElementById('estruturaIntervAnter').value = this.state.data.estruturaIntervAnter;
    document.getElementById('superficieIntervAnter').value = this.state.data.superficieIntervAnter;
    document.getElementById('elementosAcessoriosIntervAnter').value = this.state.data.elementosAcessoriosIntervAnter;
    document.getElementById('observaçoesConclusoesPag6').value = this.state.data.observaçoesConclusoesPag6;
    if(this.state.data.tipoInterv !== "Prevenção") document.getElementById('intervPrevencao').parentNode.parentNode.parentNode.style.display = "none";
    if(this.state.data.tipoInterv !== "Conservação") document.getElementById('intervConvercao').parentNode.parentNode.parentNode.style.display = "none";
    if(this.state.data.tipoInterv !== "Restauro") document.getElementById('intervRestauro').parentNode.parentNode.parentNode.style.display = "none";
    document.getElementById('aspetosEspecificosPag6').value = this.state.data.aspetosEspecificosPag6;
    
    //Pag7
    //console.log(this.state.data);
    if(this.state.data.tipoIntervCR !== "Prevenção") document.getElementById('intervPrevencaoConsRes').parentNode.parentNode.parentNode.style.display = "none";
    if(this.state.data.tipoIntervCR !== "Conservação") document.getElementById('intervConvercaoConsRes').parentNode.parentNode.parentNode.style.display = "none";
    if(this.state.data.tipoIntervCR !== "Restauro") document.getElementById('intervRestauroConsRes').parentNode.parentNode.parentNode.style.display = "none";
    
    document.getElementById('EstruturaPropPag6').value = this.state.data.EstruturaPropPag6;
    document.getElementById('EstruturaPropRecPag6').value = this.state.data.EstruturaPropRecPag6;
    document.getElementById('SuperficiePropPag6').value = this.state.data.SuperficiePropPag6;
    document.getElementById('SuperficiePropRecPag6').value = this.state.data.SuperficiePropRecPag6;
    document.getElementById('ElementosAcessPropRecPag6').value =this.state.data.ElementosAcessPropRecPag6;
    document.getElementById('observaçoesConclusoesPag7').value= this.state.data.observaçoesConclusoesPag7;		 	
    
    //Pag 8
    document.getElementById('estruturaPag8').value = this.state.data.estruturaPag8;
    document.getElementById('recursosEstruturaPag8').value = this.state.data.recursosEstruturaPag8;
    document.getElementById('superficiePag8').value = this.state.data.superficiePag8 ;
    document.getElementById('recursosSuperficiePag8').value = this.state.data.recursosSuperficiePag8;
    document.getElementById('elementosAcessoriosPag8').value = this.state.data.elementosAcessoriosPag8 ;
    document.getElementById('recursosElementosAcPag8').value = this.state.data.recursosElementosAcPag8;
    document.getElementById('observaçoesConclusoesPag8').value = this.state.data.observaçoesConclusoesPag8;
    
    //Pag 9
    document.getElementById('relTecInterLCRM').value = this.state.data.relTecInterLCRM;
    document.getElementById('tipoDesigOrig').value = this.state.data.tipoDesigOrig;
    document.getElementById('refOrig').value = this.state.data.refOrig;
    document.getElementById('entidadeOrig').value = this.state.data.entidadeOrig;
    document.getElementById('tipoDesigDocGraf').value = this.state.data.tipoDesigDocGraf;
    document.getElementById('refDocGraf').value = this.state.data.refDocGraf;
    document.getElementById('entidadeDocGraf').value = this.state.data.entidadeDocGraf;
    document.getElementById('tipoDesigExames').value = this.state.data.tipoDesigExames;
    document.getElementById('refExames').value = this.state.data.refExames;
    document.getElementById('entidadeExames').value = this.state.data.entidadeExames;

    //Pag10
    document.getElementById('atledpArqDoc').value = this.state.data.atledpArqDoc;
    document.getElementById('tipoArqDoc').value = this.state.data.tipoArqDoc;
    document.getElementById('localArqDoc').value = this.state.data.localArqDoc;
    document.getElementById('cotaArqDoc').value = this.state.data.cotaArqDoc;
    document.getElementById('atledpIcon').value = this.state.data.atledpIcon;
    document.getElementById('tipoIcon').value = this.state.data.tipoIcon;
    document.getElementById('localIcon').value = this.state.data.localIcon;
    document.getElementById('cotaIcon').value = this.state.data.cotaIcon;
    document.getElementById('atledpBiblio').value = this.state.data.atledpBiblio;
    document.getElementById('tipoBiblio').value = this.state.data.tipoBiblio;
    document.getElementById('localBiblio').value = this.state.data.localBiblio;
    document.getElementById('cotaBiblio').value = this.state.data.cotaBiblio;
    document.getElementById('atledpOutras').value = this.state.data.atledpOutras;
    document.getElementById('tipoOutras').value = this.state.data.tipoOutras;
    document.getElementById('localOutras').value = this.state.data.localOutras;
    document.getElementById('cotaOutras').value = this.state.data.cotaOutras;
    //console.log(this.state.tabel10);
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

  /**
   * Método que transforma a página dos detalhes para a página da edição
   */
  changeToEdit(){
    //Remove o atributo readonly nos input e nas textarea
    $('input, textarea').removeAttr('readonly');
    //$('#btBar').html('<button class="btn btn-success btn-lg btn-block mb-5" type="button">Guardar</button>');
    const btEditar = document.getElementById('btEditar');
    btEditar.style.display="none";
    const btGuardar = document.getElementById('btGuardar');
    btGuardar.style.display='block';
    //Apresentar todo o conteudo que foi escondido na apresentação
    $('.Create .collapse div').show();
  }

  /**
   * Método que envia o formulário da edição para o backend
   */
  submitEdit = async e => {
    e.preventDefault();
    //Form
    let formData = new FormData();

    //Pag 1
    formData.append("localizacao", this.state.data.localizacao);
    formData.append("proprietario",  this.state.data.proprietario);
    formData.append("codPostalProprietario",  this.state.data.codPostalProprietario);
    formData.append("emailProprietario",  this.state.data.emailProprietario);
    formData.append("contactoProprietario",  this.state.data.contactoProprietario);
    formData.append("donoObra",  this.state.data.donoObra);
    formData.append("codPostalDonoObra",  this.state.data.codPostalDonoObra);
    formData.append("contactoDonoObra",  this.state.data.contactoDonoObra);
    formData.append("mecenas",  this.state.data.mecenas);
    formData.append("codPostalMecenas",  this.state.data.codPostalMecenas);
    formData.append("contactoMecenas",  this.state.data.contactoMecenas);
    //Pag 2
      //Verificações de radiobutton
    if(document.getElementById('bemIntegradoSim').checked) formData.append("bemIntegradoEmConjunto", true);
    else formData.append("bemIntegradoEmConjunto", false);
    formData.append("tipoBensConjunto",  this.state.data.tipoBensConjunto);
    formData.append("elemConstConj",  this.state.data.elemConstConj);
    formData.append("materiasElementosAcessorios",  this.state.data.materiasElementosAcessorios);
    formData.append("marcasInscricoesAssinaturas",  this.state.data.marcasInscricoesAssinaturas);
    formData.append("marcasInscricoesMontagem",  this.state.data.marcasInscricoesMontagem);
    formData.append("marcasInscricoesConstrucao",  this.state.data.marcasInscricoesConstrucao);
    formData.append("classPatrimonial",  this.state.data.classPatrimonial);
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
    formData.append("materiaisEstruturaSuporte",  this.state.data.materiaisEstruturaSuporte);
    formData.append("materiaisSuperficies", this.state.data.materiaisSuperficies);
    formData.append("tecnicasEstruturaSuporte",  this.state.data.tecnicasEstruturaSuporte);
    formData.append("tecnicasSuperficie",  this.state.data.tecnicasSuperficie);
    //Pag 3
    formData.append("condAmbDescricao",  this.state.data.condAmbDescricao);
    formData.append("condAmbFrioTemperatura",  this.state.data.condAmbFrioTemperatura);
    formData.append("condAmbFrioHumidade",  this.state.data.condAmbFrioHumidade);
    formData.append("condAmbFrioPeriodoInicio",  this.state.data.condAmbFrioPeriodoInicio);
    formData.append("condAmbFrioPeriodoFim",  this.state.data.condAmbFrioPeriodoFim);
    formData.append("condAmbQuenteTemperatura",  this.state.data.condAmbQuenteTemperatura);
    formData.append("condAmbQuenteHumidade",   this.state.data.condAmbQuenteHumidade);
    formData.append("condAmbQuentePeriodoInicio",  this.state.data.condAmbQuentePeriodoInicio);
    formData.append("condAmbQuentePeriodoFim",  this.state.data.condAmbQuentePeriodoFim);
    formData.append("ilumArtTipo",  this.state.data.ilumArtTipo);
    formData.append("ilumArtValorIluminancia",   this.state.data.ilumArtValorIluminancia);
    formData.append("ilumArtValurUV",  this.state.data.ilumArtValurUV);
    formData.append("ilumArtValorRealUV",  this.state.data.ilumArtValorRealUV);
    formData.append("ilumNatOrigem",  this.state.data.ilumNatOrigem);

    formData.append("ilumNatValorIluminancia",  this.state.data.ilumNatValorIluminancia);
    formData.append("ilumNatValorUV",  this.state.data.ilumNatValorUV);
    formData.append("ilumNatValorRealUV",  this.state.data.ilumNatValorUV);
    formData.append("poluicaoAgentes",  this.state.data.poluicaoAgentes);
    formData.append("poluicaoFontesOrigem",  this.state.data.poluicaoFontesOrigem);
    formData.append("poluicaoResultados",  this.state.data.poluicaoResultados);
    formData.append("poluicaoObservacoesConclusoes",  this.state.data.poluicaoObservacoesConclusoes);
    // //Pag 4
    //FALTA O LADO DO SERVER AINDA
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
     formData.append("examesAnalisesInterpResultados", this.state.data.examesAnalisesInterpResultados);
     formData.append("examesAnalisesObsConclusoes", this.state.data.examesAnalisesObsConclusoes);
     //Pag 5
     formData.append("estadoConservFQMestrutura", this.state.data.estadoConservFQMestrutura);
     formData.append("estadoConservFQMsuperficie", this.state.data.estadoConservFQMsuperficie);
     formData.append("estadoConservFQMelementosAcess", this.state.data.estadoConservFQMelementosAcess);
     formData.append("estadoConservBioEstrutura", this.state.data.estadoConservBioEstrutura);
     formData.append("estadoConservBioSuperficie", this.state.data.estadoConservBioSuperficie);
     formData.append("estadoConservBioElementosAcess", this.state.data.estadoConservBioElementosAcess);
     formData.append("estadoConservObsConclusoes", this.state.data.estadoConservObsConclusoes);
    //Pag 6
     formData.append("estruturaIntervAnter", this.state.data.estruturaIntervAnter);
     formData.append("superficieIntervAnter", this.state.data.superficieIntervAnter);
     formData.append("elementosAcessoriosIntervAnter", this.state.data.elementosAcessoriosIntervAnter);
     formData.append("observaçoesConclusoesPag6", this.state.data.observaçoesConclusoesPag6);
     //if(document.getElementById('intervPrevencao').checked) formData.append("tipoInterv", document.getElementById('intervPrevencao').value);
     //else if(document.getElementById('intervConvercao').checked) formData.append("tipoInterv", document.getElementById('intervConvercao').value);
     //else formData.append("tipoInterv", document.getElementById('intervRestauro').value);
     formData.append("aspetosEspecificosPag6", this.state.data.aspetosEspecificosPag6);
    //Pag7
     //if(document.getElementById('intervPrevencaoConsRes').checked) formData.append("tipoIntervCR", document.getElementById('intervPrevencaoConsRes').value);
     //else if(document.getElementById('intervConvercaoConsRes').checked) formData.append("tipoIntervCR", document.getElementById('intervConvercaoConsRes').value);
     //else formData.append("tipoIntervCR", document.getElementById('intervRestauroConsRes').value);
     formData.append("EstruturaPropPag6", this.state.data.EstruturaPropPag6);
     formData.append("EstruturaPropRecPag6", this.state.data.EstruturaPropRecPag6);
     formData.append("SuperficiePropPag6", this.state.data.SuperficiePropPag6);
     formData.append("SuperficiePropRecPag6", this.state.data.SuperficiePropRecPag6);
     formData.append("ElementosAcessPropRecPag6", this.state.data.ElementosAcessPropRecPag6);
     formData.append("observaçoesConclusoesPag7", this.state.data.observaçoesConclusoesPag7);
    // //Pag 8
     formData.append("estruturaPag8", this.state.data.estruturaPag8);
     formData.append("recursosEstruturaPag8", this.state.data.recursosEstruturaPag8);
     formData.append("superficiePag8", this.state.data.superficiePag8);
     formData.append("recursosSuperficiePag8", this.state.data.recursosSuperficiePag8);
     formData.append("elementosAcessoriosPag8", this.state.data.elementosAcessoriosPag8);
     formData.append("recursosElementosAcPag8",this.state.data.recursosElementosAcPag8);
     formData.append("observaçoesConclusoesPag8", this.state.data.observaçoesConclusoesPag8);
    // //Pag 9
     formData.append("relTecInterLCRM", this.state.data.relTecInterLCRM);
     formData.append("tipoDesigOrig", this.state.data.tipoDesigOrig);
     formData.append("refOrig", this.state.data.refOrig);
     formData.append("entidadeOrig", this.state.data.entidadeOrig);
     formData.append("tipoDesigDocGraf", this.state.data.tipoDesigDocGraf);
     formData.append("refDocGraf", this.state.data.refDocGraf);
     formData.append("entidadeDocGraf", this.state.data.entidadeDocGraf);
     formData.append("tipoDesigExames", this.state.data.tipoDesigExames);
     formData.append("refExames", this.state.data.refExames);
     formData.append("entidadeExames", this.state.data.entidadeExames);
    // //Pag10
     formData.append("atledpArqDoc", this.state.data.atledpArqDoc);
     formData.append("tipoArqDoc", this.state.data.tipoArqDoc);
     formData.append("localArqDoc", this.state.data.localArqDoc);
     formData.append("cotaArqDoc", this.state.data.cotaArqDoc);
     formData.append("atledpIcon", this.state.data.atledpIcon);
     formData.append("tipoIcon", this.state.data.tipoIcon);
     formData.append("localIcon", this.state.data.localIcon);
     formData.append("cotaIcon", this.state.data.cotaIcon);
     formData.append("atledpBiblio", this.state.data.atledpBiblio);
     formData.append("tipoBiblio", this.state.data.tipoBiblio);
     formData.append("localBiblio", this.state.data.localBiblio);
     formData.append("cotaBiblio", this.state.data.cotaBiblio);
     formData.append("atledpOutras", this.state.data.atledpOutras);
     formData.append("tipoOutras", this.state.data.tipoOutras);
     formData.append("localOutras", this.state.data.localOutras);
     formData.append("cotaOutras", this.state.data.cotaOutras);
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
           case "Registed":
             this.setState({
               alertisNotVisible: false
             });
             window.location = "/fichaRI/"+this.state.id+"/detalhes";
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
    if(document.getElementById('bemIntegradoSim').checked) formData.append("bemIntegradoEmConjunto", 1);
    else formData.append("bemIntegradoEmConjunto", 0);
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
    formData.append("objGerais",JSON.stringify( objGerais));
    let tab = [];
    for(let i = 0 ; i < document.getElementById("tabela").children[1].childElementCount; i++){
        let content = document.getElementById("tabela").children[1].children[i];
        tab.push({tipoRef: content.children[0].children[0].value, lap: content.children[1].children[0].value, objEsp: content.children[2].children[0].value, reslt: content.children[3].children[0].value, data: content.children[5].children[0].value });
    }
    //Têm de ser enviado em JSON para a equipa de backend retirar os dados
    formData.append("tabobjGerais", JSON.stringify(tab));
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
    for(let j = 0 ; j < document.getElementById("table").children[1].childElementCount; j++){
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
