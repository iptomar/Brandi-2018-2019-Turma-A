/**
 * Ficheiro que faz as querys de uma ficha tecnica
 */

/**
 * Método para criar fichas RegistoIdentificacao
 * @param bd - base de dados para fazer querys
 * @param dados - dados para realizar a query
 * @return {object} stat: 1<erro> 0<sucess> resposta: resposta da base de dados
 */
exports.createFichaTecnica = async (bd, dados) => {
  let resultadofinal = { stat: 1, resposta: {} };
  let resposta_bd;
  //verificar se os campos estao preenchidos
  if (
    dados.visible &&
    dados.localizacao &&
    dados.proprietario &&
    dados.codPostalProprietario &&
    dados.emailProprietario &&
    dados.contactoProprietario &&
    dados.donoObra &&
    dados.codPostalDonoObra &&
    dados.contactoDonoObra &&
    dados.mecenas &&
    dados.codPostalMecenas &&
    dados.contactoMecenas &&
    dados.bemIntegradoEmConjunto &&
    dados.tipoBensConjunto &&
    dados.elemConstConj &&
    dados.materiasElementosAcessorios &&
    dados.marcasInscricoesAssinaturas &&
    dados.marcasInscricoesMontagem &&
    dados.marcasInscricoesConstrucao &&
    dados.classPatrimonial &&
    dados.epoca &&
    dados.qualidade &&
    dados.materiaisEstruturaSuporte &&
    dados.materiaisSuperficies &&
    dados.tecnicasEstruturaSuporte &&
    dados.tecnicasSuperficie &&
    dados.condAmbDescricao &&
    dados.condAmbFrioTemperatura &&
    dados.condAmbFrioHumidade &&
    dados.condAmbFrioPeriodoInicio &&
    dados.condAmbFrioPeriodoFim &&
    dados.condAmbQuenteTemperatura &&
    dados.condAmbQuenteHumidade &&
    dados.condAmbQuentePeriodoInicio &&
    dados.condAmbQuentePeriodoFim &&
    dados.ilumArtTipo &&
    dados.ilumArtValorIluminancia &&
    dados.ilumArtValurUV &&
    dados.ilumArtValorRealUV &&
    dados.ilumNatOrigem &&
    dados.ilumNatValorIluminancia &&
    dados.ilumNatValorUV &&
    dados.ilumNatValorRealUV &&
    dados.poluicaoAgentes &&
    dados.poluicaoFontesOrigem &&
    dados.poluicaoResultados &&
    dados.poluicaoObservacoesConclusoes &&
    dados.examesAnalisesInterpResultados &&
    dados.examesAnalisesObsConclusoes &&
    dados.estadoConservFQMestrutura &&
    dados.estadoConservFQMsuperficie &&
    dados.estadoConservFQMelementosAcess &&
    dados.estadoConservBioEstrutura &&
    dados.estadoConservBioSuperficie &&
    dados.estadoConservBioElementosAcess &&
    dados.estadoConservObsConclusoes &&
    //Estado de Conservação (página 5)
    dados.estadoConservFQMestrutura &&
    dados.estadoConservFQMsuperficie &&
    dados.estadoConservFQMelementosAcess &&
    dados.estadoConservBioEstrutura &&
    dados.estadoConservBioSuperficie &&
    dados.estadoConservBioElementosAcess &&
    //Intervenções Anteriores
    dados.estruturaIntervAnter &&
    dados.superficieIntervAnter &&
    dados.elementosAcessoriosIntervAnter &&
    dados.observaçoesConclusoesPag6 &&
    dados.tipoInterv &&
    dados.aspetosEspecificosPag6 &&
    dados.tipoIntervCR &&
    dados.EstruturaPropPag6 &&
    dados.EstruturaPropRecPag6 &&
    dados.SuperficiePropPag6 &&
    dados.SuperficiePropRecPag6 &&
    dados.ElementosAcessPropRecPag6 &&
    dados.observaçoesConclusoesPag6 &&
    //pagina 8
    dados.estruturaPag8 &&
    dados.recursosEstruturaPag8 &&
    dados.superficiePag8 &&
    dados.recursosSuperficiePag8 &&
    dados.elementosAcessoriosPag8 &&
    dados.recursosElementosAcPag8 &&
    dados.observaçoesConclusoesPag8 &&
    dados.fichaRegistoFK
  ) {
    resposta_bd = await bd.query(
      "INSERT INTO tbl_fichasTecnicas (visible,localizacao,proprietario,codPostalProprietario,emailProprietario," +
        "contactoProprietario,donoObra,codPostalDonoObra,mecenas,codPostalMecenas,contactoMecenas,bemIntegradoEmConjunto,tipoBensConjunto" +
        ",elemConstConj,materiasElementosAcessorios,marcasInscricoesAssinaturas,marcasInscricoesMontagem,marcasInscricoesConstrucao,classPatrimonial,epoca,qualidade,materiaisEstruturaSuporte," +
        "materiaisSuperficies,tecnicasEstruturaSuporte,tecnicasSuperficie,condAmbDescricao,condAmbFrioTemperatura,condAmbFrioHumidade,condAmbFrioPeriodoInicio," +
        "condAmbFrioPeriodoFim,condAmbQuenteTemperatura,condAmbQuenteHumidade,condAmbQuentePeriodoInicio,condAmbQuentePeriodoFim,ilumArtTipo,ilumArtValorIluminancia,ilumArtValurUV," +
        "ilumArtValorRealUV,ilumNatOrigem,ilumNatValorIluminancia,ilumNatValorUV,ilumNatValorRealUV,poluicaoAgentes,poluicaoFontesOrigem,poluicaoResultados," +
        "poluicaoObservacoesConclusoes,examesAnalisesInterpResultados,examesAnalisesObsConclusoes,estadoConservFQMestrutura,estadoConservFQMsuperficie,estadoConservFQMelementosAcess,estadoConservBioEstrutura," +
        "estadoConservBioSuperficie,estadoConservBioElementosAcess,estadoConservObsConclusoes,estruturaIntervAnter,superficieIntervAnter,elementosAcessoriosIntervAnter,observaçoesConclusoesPag6," +
        "tipoInterv,aspetosEspecificosPag6,tipoIntervCR,EstruturaPropPag6,EstruturaPropRecPag6,SuperficiePropPag6,SuperficiePropRecPag6,ElementosAcessPropRecPag6," +
        "estruturaPag8,recursosEstruturaPag8,superficiePag8,recursosSuperficiePag8,elementosAcessoriosPag8,recursosElementosAcPag8,observaçoesConclusoesPag8," +
        "relTecInterLCRM,tipoDesigOrig,refOrig,entidadeOrig,tipoDesigDocGraf,refDocGraf,entidadeDocGraf,tipoDesigExames,refExames,entidadeExames," +
        "atledpArqDoc,tipoArqDoc,localArqDoc,cotaArqDoc,atledpIcon,tipoIcon,localIcon,cotaIcon,atledpBiblio,tipoBiblio,localBiblio,cotaBiblio,atledpOutras,tipoOutras,localOutras,cotaOutras,fichaRegistoFK)" +
        "values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        dados.visible,
        dados.localizacao,
        dados.proprietario,
        dados.codPostalProprietario,
        dados.emailProprietario,
        dados.contactoProprietario,
        dados.donoObra,
        dados.codPostalDonoObra,
        dados.contactoDonoObra,
        dados.mecenas,
        dados.codPostalMecenas,
        dados.contactoMecenas,
        dados.bemIntegradoEmConjunto,
        dados.tipoBensConjunto,
        dados.elemConstConj,
        dados.materiasElementosAcessorios,
        dados.marcasInscricoesAssinaturas,
        dados.marcasInscricoesMontagem,
        dados.marcasInscricoesConstrucao,
        dados.classPatrimonial,
        dados.epoca,
        dados.qualidade,
        dados.materiaisEstruturaSuporte,
        dados.materiaisSuperficies,
        dados.tecnicasEstruturaSuporte,
        dados.tecnicasSuperficie,
        dados.condAmbDescricao,
        dados.condAmbFrioTemperatura,
        dados.condAmbFrioHumidade,
        dados.condAmbFrioPeriodoInicio,
        dados.condAmbFrioPeriodoFim,
        dados.condAmbQuenteTemperatura,
        dados.condAmbQuenteHumidade,
        dados.condAmbQuentePeriodoInicio,
        dados.condAmbQuentePeriodoFim,
        dados.ilumArtTipo,
        dados.ilumArtValorIluminancia,
        dados.ilumArtValurUV,
        dados.ilumArtValorRealUV,
        dados.ilumNatOrigem,
        dados.ilumNatValorIluminancia,
        dados.ilumNatValorUV,
        dados.ilumNatValorRealUV,
        dados.poluicaoAgentes,
        dados.poluicaoFontesOrigem,
        dados.poluicaoResultados,
        dados.poluicaoObservacoesConclusoes,
        //Exames e Análises (página) 4
        dados.examesAnalisesInterpResultados,
        dados.examesAnalisesObsConclusoes,
        //Estado de Conservação (página 5)
        dados.estadoConservFQMestrutura,
        dados.estadoConservFQMsuperficie,
        dados.estadoConservFQMelementosAcess,
        dados.estadoConservBioEstrutura,
        dados.estadoConservBioSuperficie,
        dados.estadoConservBioElementosAcess,
        dados.estadoConservObsConclusoes,
        //Intervenções Anteriores
        dados.estruturaIntervAnter,
        dados.superficieIntervAnter,
        dados.elementosAcessoriosIntervAnter,
        //Intervenção Proposta pelo Conservador-Restaurador (página 7)
        dados.observaçoesConclusoesPag6,
        dados.tipoInterv,
        dados.aspetosEspecificosPag6,
        dados.tipoIntervCR,
        dados.EstruturaPropPag6,
        dados.EstruturaPropRecPag6,
        dados.SuperficiePropPag6,
        dados.SuperficiePropRecPag6,
        dados.ElementosAcessPropRecPag6,
        // Intervenção Realizada página 8
        dados.estruturaPag8,
        dados.recursosEstruturaPag8,
        dados.superficiePag8,
        dados.recursosSuperficiePag8,
        dados.elementosAcessoriosPag8,
        dados.recursosElementosAcPag8,
        dados.observaçoesConclusoesPag8,
        //Documentação produzida / recolhida página 9
        dados.tipoDesigOrig,
        dados.refOrig,
        dados.entidadeOrig,
        dados.tipoDesigDocGraf,
        dados.refDocGraf,
        dados.entidadeDocGraf,
        dados.tipoDesigExames,
        dados.refExames,
        dados.entidadeExames,
        //FONTES Arquivísticas | Documentais página 10
        dados.atledpArqDoc,
        dados.tipoArqDoc,
        dados.localArqDoc,
        dados.cotaArqDoc,
        dados.atledpIcon,
        dados.tipoIcon,
        dados.localIcon,
        dados.cotaIcon,
        dados.atledpBiblio,
        dados.tipoBiblio,
        dados.localBiblio,
        dados.cotaBiblio,
        dados.atledpOutras,
        dados.tipoOutras,
        dados.localOutras,
        dados.cotaOutras,
        dados.fichaRegistoFK
      ]
    );
  }
  //inserçao bem sucedida na base de dados
  if (resposta_bd.stat === 0) {
    resultadofinal.stat = 0;

    // inserir os campos da página 4
    // inserir multiplos valores
    let auxiliar = "";
    for (let i = 0; i < dados.objGerais.length; i++) {
      auxiliar += "(?,?),";
    }
    let array2 = [];
    for (let i = 0; i < dados.objGerais.length; i++) {
      array2.push(dados.objGerais[i]);
      //id da ficha tecnica criada
      array2.push(resposta_bd.resposta.insertId);
    }
    auxiliar = auxiliar.substring(0, auxiliar.length - 1); //tira ultima virgula
    let resposta_bd2 = { stat: 1, resposta: {} };
    resposta_bd2 = await bd.query(
      "Insert into tbl_testespagina4objectivosGerais(Objectivo,fichaTecnicaFK) values " +
        auxiliar,
      array2
    );
    // não ocorreu nenhum erro na inserção
    //inserir a proxiam tabela
    if (resposta_bd2.stat === 0) {
      let auxiliar = "";
      for (let i = 0; i < dados.tabobjGerais.length; i++) {
        auxiliar += "(?,?,?,?,?,?),";
      }
      auxiliar = auxiliar.substring(0, auxiliar.length - 1); //tira ultima virgula
      //array auxiliar que contem todos os objectivosGerais num só array
      let array2 = [];
      for (let i = 0; i < dados.tabobjGerais.length; i++) {
        array2.push(dados.tabobjGerais[i].tipoRef);
        array2.push(dados.tabobjGerais[i].lap);
        array2.push(dados.tabobjGerais[i].objEsp);
        array2.push(dados.tabobjGerais[i].reslt);

        array2.push(dados.tabobjGerais[i].data);
        //id da ficha tecnica criada
        array2.push(resposta_bd.resposta.insertId);
      }
      let resposta_bd3 = { stat: 1, resposta: {} };
      resposta_bd3 = await bd.query(
        "Insert into tbl_testespagina4tabelas(tipoReferencia ,LocalizacaoAreaPonto ,ObjectivosEspecificos ,Resultados,DataDePreenchimento ,fichaTecnicaFK) values " +
          auxiliar,
        array2
      );
      //não ocorreu nenhum erro ao inserir os campos descritivos relativos aos objectivos gerais na pagina 4
      if (resposta_bd3.stat === 0) {
        resultadofinal.stat = 0;
        resultadofinal.resposta = resposta_bd.resposta;
        resultadofinal.resposta2 = resposta_bd2.resposta;
        resultadofinal.resposta3 = resposta_bd3.resposta;
        return resultadofinal;
      }
      //ocorreu um erro
      else {
        //apagar os objectivos gerais relativos à ficha tecnica
        let apagarobjectivosgerais = await bd.query(
          "Delete from tbl_testespagina4objectivosGerais where fichaTecnicaFK = ?",
          resposta_bd.resposta.insertId
        );
        let apagarfichatecnica = await bd.query(
          "Delete from tbl_fichasTecnicas where fichaTecnicaID = ?",
          resposta_bd.resposta.insertId
        );
        if (
          apagarobjectivosgerais.stat === 0 &&
          apagarfichatecnica.stat === 0
        ) {
          resultadofinal.stat = 1;
          resultadofinal.resposta = "não foi possivel criar ficha tecnica";
          return resultadofinal;
        }
        //ocorreu um erro ao apagar os objectivos e a ficha tecnica
        else {
          resultadofinal.stat = 1;
          resultadofinal.resposta = apagarfichatecnica.resposta;
          resultadofinal.resposta = apagarobjectivosgerais.resposta;
        }
      }
    }
    //ocorreu um erro ao inserir os objectios gerais
    else {
      //apagar a ficha tecnica
      let apagarfichatecnica = await bd.query(
        "Delete from tbl_fichasTecnicas where fichaTecnicaID = ?",
        resposta_bd.resposta.insertId
      );
      if (apagarfichatecnica.stat === 0) {
        resultadofinal.resposta = "ficha não inserida";
        resultadofinal.stat = 1;
      } else {
        resultadofinal.stat = 1;
        resultadofinal.resposta = apagarfichatecnica.resposta;
      }
      return resultadofinal;
    }
    resultadofinal.resposta = resposta_bd.resposta;
  }
  //ocorreu um erro na inserção
  else {
    resultadofinal.stat = resposta_bd.stat;
    resultadofinal.resposta = resposta_bd.resposta;
  }
  return resultadofinal;
};
/**
 * Metodo que retorna uma ficha RegistoIdentificacao
 * @param id - id da ficha RegistoIdentificacao
 * @param bd - base de dados para querys
 */
exports.getFichaTecnica = async (bd, id) => {
  let resultadofinal = { stat: 1, resposta: {} };
  let resposta_bd = await bd.query(
    "Select * from tbl_fichasTecnicas where fichaRegistoFK = ? and visible = true limit 1",
    [id]
  );
  if (resposta_bd.stat === 0 && resposta_bd.resposta.length > 0) {
    resultadofinal.stat = 0;
    resultadofinal.resposta = resposta_bd.resposta[0];
  } else if (resposta_bd.stat === 0) {
    resultadofinal.stat = resposta_bd.stat;
    resultadofinal.resposta = "FichaNaoExistente";
  } else {
    resultadofinal.stat = resposta_bd.stat;
    resultadofinal.resposta = resposta_bd.resposta;
  }

  return resultadofinal;
};
/**
 * Metodo para alterar uma ficha RegistoIdentificacao
 */
exports.updateFichaTecnica = async (bd, dados) => {
  let resultadofinal = { stat: 1, resposta: "Missing Fields" };
  let resposta_bd;
  //verificar se os campos estao preenchidos
  if (
    dados.visible &&
    dados.localizacao &&
    dados.proprietario &&
    dados.codPostalProprietario &&
    dados.emailProprietario &&
    dados.contactoProprietario &&
    dados.donoObra &&
    dados.codPostalDonoObra &&
    dados.contactoDonoObra &&
    dados.mecenas &&
    dados.codPostalMecenas &&
    dados.contactoMecenas &&
    dados.bemIntegradoEmConjunto &&
    dados.tipoBensConjunto &&
    dados.elemConstConj &&
    dados.materiasElementosAcessorios &&
    dados.marcasInscricoesAssinaturas &&
    dados.marcasInscricoesMontagem &&
    dados.marcasInscricoesConstrucao &&
    dados.classPatrimonial &&
    dados.epoca &&
    dados.qualidade &&
    dados.materiaisEstruturaSuporte &&
    dados.materiaisSuperficies &&
    dados.tecnicasEstruturaSuporte &&
    dados.tecnicasSuperficie &&
    dados.condAmbDescricao &&
    dados.condAmbFrioTemperatura &&
    dados.condAmbFrioHumidade &&
    dados.condAmbFrioPeriodoInicio &&
    dados.condAmbFrioPeriodoFim &&
    dados.condAmbQuenteTemperatura &&
    dados.condAmbQuenteHumidade &&
    dados.condAmbQuentePeriodoInicio &&
    dados.condAmbQuentePeriodoFim &&
    dados.ilumArtTipo &&
    dados.ilumArtValorIluminancia &&
    dados.ilumArtValurUV &&
    dados.ilumArtValorRealUV &&
    dados.ilumNatOrigem &&
    dados.ilumNatValorIluminancia &&
    dados.ilumNatValorUV &&
    dados.ilumNatValorRealUV &&
    dados.poluicaoAgentes &&
    dados.poluicaoFontesOrigem &&
    dados.poluicaoResultados &&
    dados.poluicaoObservacoesConclusoes &&
    dados.examesAnalisesInterpResultados &&
    dados.examesAnalisesObsConclusoes &&
    dados.estadoConservFQMestrutura &&
    dados.estadoConservFQMsuperficie &&
    dados.estadoConservFQMelementosAcess &&
    dados.estadoConservBioEstrutura &&
    dados.estadoConservBioSuperficie &&
    dados.estadoConservBioElementosAcess &&
    dados.estadoConservObsConclusoes &&
    //Pagina 6
    dados.estruturaIntervAnter &&
    dados.superficieIntervAnter &&
    dados.elementosAcessoriosIntervAnter &&
    dados.observaçoesConclusoesPag6 &&
    dados.tipoInterv &&
    dados.aspetosEspecificosPag6 &&
    dados.tipoIntervCR &&
    dados.EstruturaPropPag6 &&
    dados.EstruturaPropRecPag6 &&
    dados.SuperficiePropPag6 &&
    dados.SuperficiePropRecPag6 &&
    dados.ElementosAcessPropRecPag6 &&
    dados.observaçoesConclusoesPag6 &&
    //pagina 8
    dados.estruturaPag8 &&
    dados.recursosEstruturaPag8 &&
    dados.superficiePag8 &&
    dados.recursosSuperficiePag8 &&
    dados.elementosAcessoriosPag8 &&
    dados.recursosElementosAcPag8 &&
    dados.observaçoesConclusoesPag8 &&
    dados.fichaRegistoFK
  ) {
    resposta_bd = await bd.query(
      "update tbl_fichasTecnicas set visible=?,localizacao=?,proprietario=?,codPostalProprietario=?,emailProprietario =?, contactoProprietario=?, donoObra=?, codPostalDonoObra =? , contactoDonoObra =?, contactoDonoObra =?, mecenas =?, codPostalMecenas =?, contactoMecenas =?, bemIntegradoEmConjunto =?, tipoBensConjunto =?, elemConstConj =?, materiasElementosAcessorios =?, marcasInscricoesAssinaturas =?, marcasInscricoesMontagem =?, marcasInscricoesConstrucao =?, classPatrimonial =?, epoca =?, qualidade =?, materiaisEstruturaSuporte =?, materiaisSuperficies =?, tecnicasEstruturaSuporte =?, tecnicasSuperficie =?, condAmbDescricao =?,condAmbFrioTemperatura =?, condAmbFrioHumidade =?, condAmbFrioPeriodoInicio =?, condAmbFrioPeriodoFim =?, condAmbQuenteTemperatura =?, condAmbQuenteHumidade =?, condAmbQuentePeriodoInicio =?, condAmbQuentePeriodoFim =?, ilumArtTipo =?, ilumArtValorIluminancia =?, ilumArtValurUV =?, ilumArtValorRealUV =?, ilumNatOrigem =?, ilumNatValorIluminancia =?, ilumNatValorUV =?, ilumNatValorRealUV =?, poluicaoAgentes =?, poluicaoFontesOrigem =?, poluicaoResultados =?, poluicaoObservacoesConclusoes =?,examesAnalisesInterpResultados =?, examesAnalisesObsConclusoes =?, estadoConservFQMestrutura =?, estadoConservFQMsuperficie =?, estadoConservFQMelementosAcess =?, estadoConservBioEstrutura =?, estadoConservBioSuperficie =?, estadoConservBioElementosAcess =?, estadoConservObsConclusoes =?, estruturaIntervAnter =?, superficieIntervAnter =?, elementosAcessoriosIntervAnter =?, observaçoesConclusoesPag6 =?, tipoInterv =?, aspetosEspecificosPag6 =?, tipoIntervCR =?, EstruturaPropPag6 =?, EstruturaPropRecPag6 =?, SuperficiePropPag6 =?, SuperficiePropRecPag6 =?, ElementosAcessPropRecPag6 =?, observaçoesConclusoesPag6 =?, estruturaPag8 =?, recursosEstruturaPag8 =?, superficiePag8 =?, recursosSuperficiePag8 =?, elementosAcessoriosPag8 =?, recursosElementosAcPag8 =?, observaçoesConclusoesPag8 =?, fichaRegistoFK =? where fichaTecnicaID = ? ",
      [
        dados.visible,
        dados.localizacao,
        dados.proprietario,
        dados.codPostalProprietario,
        dados.emailProprietario,
        ,
        dados.contactoProprietario,
        dados.donoObra,
        dados.codPostalDonoObra,
        dados.contactoDonoObra,
        dados.mecenas,
        dados.codPostalMecenas,
        dados.contactoMecenas,
        dados.bemIntegradoEmConjunto,
        dados.tipoBensConjunto,
        dados.elemConstConj,
        dados.materiasElementosAcessorios,
        dados.marcasInscricoesAssinaturas,
        dados.marcasInscricoesMontagem,
        dados.marcasInscricoesConstrucao,
        dados.classPatrimonial,
        dados.epoca,
        dados.qualidade,
        dados.materiaisEstruturaSuporte,
        dados.materiaisSuperficies,
        dados.tecnicasEstruturaSuporte,
        dados.tecnicasSuperficie,
        dados.condAmbDescricao,
        dados.condAmbFrioTemperatura,
        dados.condAmbFrioHumidade,
        dados.condAmbFrioPeriodoInicio,
        ,
        dados.condAmbFrioPeriodoFim,
        dados.condAmbQuenteTemperatura,
        dados.condAmbQuenteHumidade,
        dados.condAmbQuentePeriodoInicio,
        dados.condAmbQuentePeriodoFim,
        dados.ilumArtTipo,
        dados.ilumArtValorIluminancia,
        dados.ilumArtValurUV,
        dados.ilumArtValorRealUV,
        dados.ilumNatOrigem,
        dados.ilumNatValorIluminancia,
        dados.ilumNatValorUV,
        dados.ilumNatValorRealUV,
        dados.poluicaoAgentes,
        dados.poluicaoFontesOrigem,
        dados.poluicaoResultados,
        dados.poluicaoObservacoesConclusoes,
        dados.examesAnalisesInterpResultados,
        dados.examesAnalisesObsConclusoes,
        dados.estadoConservFQMestrutura,
        dados.estadoConservFQMsuperficie,
        dados.estadoConservFQMelementosAcess,
        dados.estadoConservBioEstrutura,
        dados.estadoConservBioSuperficie,
        dados.estadoConservBioElementosAcess,
        dados.estadoConservObsConclusoes,
        //Página 6
        dados.estruturaIntervAnter,
        dados.superficieIntervAnter,
        dados.elementosAcessoriosIntervAnter,
        dados.observaçoesConclusoesPag6,
        dados.tipoInterv,
        dados.aspetosEspecificosPag6,
        dados.tipoIntervCR,
        dados.EstruturaPropPag6,
        dados.EstruturaPropRecPag6,
        dados.SuperficiePropPag6,
        dados.SuperficiePropRecPag6,
        dados.ElementosAcessPropRecPag6,
        dados.observaçoesConclusoesPag6,
        //pagina 8
        dados.estruturaPag8,
        dados.recursosEstruturaPag8,
        dados.superficiePag8,
        dados.recursosSuperficiePag8,
        dados.elementosAcessoriosPag8,
        dados.recursosElementosAcPag8,
        dados.observaçoesConclusoesPag8,
        dados.fichaRegistoFK
      ]
    );
  }
  //inserio na base de dados
  if (resposta_bd.stat === 0) {
    resultadofinal.stat = 0;
    resultadofinal.resposta = resposta_bd.resposta;
  } else {
    resultadofinal.stat = resposta_bd.stat;
    resultadofinal.resposta = resposta_bd.resposta;
  }

  return resultadofinal;
};
/**
 * Metodo para remover umam ficha tecnica
 */
exports.deleteFichaTecnica = async (bd, id) => {
  let resultadofinal = { stat: 1, resposta: {} };
  let resposta_bd = await bd.query(
    "Update tbl_fichasTecnicas set visible = false where fichaTecnicaID=?",
    [id]
  );
  if (resposta_bd.stat === 0) {
    resultadofinal.stat = 0;
    resultadofinal.resposta = resposta_bd.resposta;
  } else {
    resultadofinal.stat = resposta_bd.stat;
    resultadofinal.resposta = resposta_bd.resposta;
  }
  return resultadofinal;
};
