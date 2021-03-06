var fs = require("file-system");
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
    dados.imgGrafico &&
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
    dados.ElementosAcessPropPag6 &&
    dados.ElementosAcessPropRecPag6 &&
    dados.observaçoesConclusoesPag7 &&
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
      "INSERT INTO tbl_fichasTecnicas (" +
        "visible,localizacao,proprietario,codPostalProprietario,emailProprietario,contactoProprietario,donoObra,codPostalDonoObra,contactoDonoObra,mecenas,codPostalMecenas,contactoMecenas,imgGrafico," +
        "tipoBensConjunto,bemIntegradoEmConjunto,elemConstConj,materiasElementosAcessorios,marcasInscricoesAssinaturas,marcasInscricoesMontagem,marcasInscricoesConstrucao,classPatrimonial,epoca,qualidade,materiaisEstruturaSuporte,materiaisSuperficies," +
        "tecnicasEstruturaSuporte,tecnicasSuperficie,condAmbDescricao,condAmbFrioTemperatura,condAmbFrioHumidade,condAmbFrioPeriodoInicio,condAmbFrioPeriodoFim,condAmbQuenteTemperatura,condAmbQuenteHumidade,condAmbQuentePeriodoInicio,condAmbQuentePeriodoFim,ilumArtTipo," +
        "ilumArtValorIluminancia,ilumArtValurUV,ilumArtValorRealUV,ilumNatOrigem,ilumNatValorIluminancia,ilumNatValorUV,ilumNatValorRealUV,poluicaoAgentes,poluicaoFontesOrigem,poluicaoResultados, poluicaoObservacoesConclusoes,examesAnalisesInterpResultados," +
        "examesAnalisesObsConclusoes,estadoConservFQMestrutura,estadoConservFQMsuperficie,estadoConservFQMelementosAcess,estadoConservBioEstrutura,      estadoConservBioSuperficie,estadoConservBioElementosAcess,estadoConservObsConclusoes,estruturaIntervAnter,superficieIntervAnter,elementosAcessoriosIntervAnter,observaçoesConclusoesPag6," +
        "tipoInterv,aspetosEspecificosPag6,tipoIntervCR,EstruturaPropPag6,EstruturaPropRecPag6,SuperficiePropPag6,SuperficiePropRecPag6, ElementosAcessPropPag6, ElementosAcessPropRecPag6, observaçoesConclusoesPag7, estruturaPag8,recursosEstruturaPag8,superficiePag8,recursosSuperficiePag8," +
        "elementosAcessoriosPag8,recursosElementosAcPag8,observaçoesConclusoesPag8, relTecInterLCRM,tipoDesigOrig,refOrig,entidadeOrig,tipoDesigDocGraf,refDocGraf,entidadeDocGraf,tipoDesigExames,refExames," +
        "entidadeExames,atledpArqDoc,tipoArqDoc,localArqDoc,cotaArqDoc,atledpIcon,tipoIcon,localIcon,cotaIcon,atledpBiblio,tipoBiblio,localBiblio," +
        "cotaBiblio,atledpOutras,tipoOutras,localOutras,cotaOutras,fichaRegistoFK)" +
        "values (?,?,?,?,?,?,?,?,?,?,?,?," +
        "?,?,?,?,?,?,?,?,?,?,?,?," +
        "?,?,?,?,?,?,?,?,?,?,?,?," +
        "?,?,?,?,?,?,?,?,?,?,?,?," +
        "?,?,?,?,?,?,?,?,?,?,?,?," +
        "?,?,?,?,?,?,?,?,?,?,?,?," +
        "?,?,?,?,?,?,?,?,?,?,?,?," +
        "?,?,?,?,?,?,?,?,?,?,?,?," +
        "?,?,?,?,?,?,?,?,?)",
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
        dados.imgGrafico,
        dados.tipoBensConjunto,
        dados.bemIntegradoEmConjunto,
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
        //5
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
        //6
        dados.aspetosEspecificosPag6,
        dados.tipoIntervCR,
        dados.EstruturaPropPag6,
        dados.EstruturaPropRecPag6,
        dados.SuperficiePropPag6,
        dados.SuperficiePropRecPag6,
        dados.ElementosAcessPropPag6,
        dados.ElementosAcessPropRecPag6,
        dados.observaçoesConclusoesPag7,
        // Intervenção Realizada página 8
        dados.estruturaPag8,
        dados.recursosEstruturaPag8,
        dados.superficiePag8,
        dados.recursosSuperficiePag8,
        dados.elementosAcessoriosPag8,
        //7
        dados.recursosElementosAcPag8,
        dados.observaçoesConclusoesPag8,
        //Documentação produzida / recolhida página 9
        dados.relTecInterLCRM,
        dados.tipoDesigOrig,
        dados.refOrig,
        dados.entidadeOrig,
        dados.tipoDesigDocGraf,
        dados.refDocGraf,
        dados.entidadeDocGraf,
        dados.tipoDesigExames,
        dados.refExames,
        dados.entidadeExames,

        //8
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
        //9
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
        let resposta_bd4 = { stat: 1, resposta: {} };

        let auxiliar = "";
        for (let i = 0; i < dados.tabel10.length; i++) {
          auxiliar += "(?,?,?,?),";
        }
        auxiliar = auxiliar.substring(0, auxiliar.length - 1); //tira ultima virgula
        //array auxiliar que contem todos os objectivosGerais num só array
        let array2 = [];
        for (let i = 0; i < dados.tabel10.length; i++) {
          array2.push(dados.tabel10[i].constEq);
          array2.push(dados.tabel10[i].funcDes);
          array2.push(dados.tabel10[i].habPro);
          //id da ficha tecnica criada
          array2.push(resposta_bd.resposta.insertId);
        }
        resposta_bd4 = await bd.query(
          "Insert into tbl_constituicaoequipa(constEq ,funcDes ,habPro ,fichaTecnicaFK ) values " +
            auxiliar,
          array2
        );

        if (resposta_bd4.stat === 0) {
          let resposta_bd5 = { stat: 1, resposta: {} };

          let auxiliar = "";
          for (let i = 0; i < dados.imgArray.length; i++) {
            auxiliar += "(?,?),";
          }
          auxiliar = auxiliar.substring(0, auxiliar.length - 1); //tira ultima virgula
          //array auxiliar que contem todos os objectivosGerais num só array
          let array2 = [];
          for (let i = 0; i < dados.imgArray.length; i++) {
            array2.push(dados.imgArray[i]);
            //id da ficha tecnica criada
            array2.push(resposta_bd.resposta.insertId);
          }
          resposta_bd5 = await bd.query(
            "Insert into tbl_imagensFichaTecnica(imagem ,fichaTecnicaFK ) values " +
              auxiliar,
            array2
          );

          if (resposta_bd5.stat === 0) {
            resultadofinal.stat = 0;
            resultadofinal.resposta = resposta_bd.resposta;
            resultadofinal.resposta2 = resposta_bd2.resposta;
            resultadofinal.resposta3 = resposta_bd3.resposta;
            resultadofinal.resposta4 = resposta_bd4.resposta;
            resultadofinal.resposta5 = resposta_bd5.resposta;
            return resultadofinal;
          } else {
            let apagartabelaobjectivosgerais = await bd.query(
              "Delete from tbl_testespagina4tabelas where fichaTecnicaFK = ?",
              resposta_bd.resposta.insertId
            );
            let apagarobjectivosgerais = await bd.query(
              "Delete from tbl_testespagina4objectivosGerais where fichaTecnicaFK = ?",
              resposta_bd.resposta.insertId
            );
            let apagarfichatecnica = await bd.query(
              "Delete from tbl_fichasTecnicas where fichaTecnicaID = ?",
              resposta_bd.resposta.insertId
            );
            let apagarimagens = await bd.query(
              "Delete from tbl_imagensFichaTecnica where fichaTecnicaID = ?",
              resposta_bd.resposta.insertId
            );
            if (
              apagarobjectivosgerais.stat === 0 &&
              apagarfichatecnica.stat === 0 &&
              apagartabelaobjectivosgerais.stat === 0 &&
              apagarimagens.stat === 0
            ) {
              resultadofinal.stat = 1;
              resultadofinal.resposta = "não foi possivel criar ficha tecnica";
              return resultadofinal;
            }
            //ocorreu um erro ao apagar os objectivos e a ficha tecnica
            else {
              resultadofinal.stat = 1;
              resultadofinal.resposta = apagarfichatecnica.resposta;
              resultadofinal.resposta2 = apagarobjectivosgerais.resposta;
              resultadofinal.resposta3 = apagartabelaobjectivosgerais.resposta;
              resultadofinal.resposta4 = apagarimagens.resposta;
            }
          }
        }
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
exports.getFichaTecnica = async (bd, id, idRI) => {
  let resultadofinal = { stat: 1, resposta: {} };
  // é necessário array por causa de overflow da variavel resultadofinal
  let resultadofinalteste = [];
  let var1 = { folhaobra: {}, testessolubilizacao: {} };
  let resposta_bd = await bd.query(
    "Select *  from tbl_fichasTecnicas where fichaTecnicaID = ? and visible = true limit 1",
    [id]
  );
  if (resposta_bd.stat == 0 && resposta_bd.resposta.length > 0) {
    resultadofinal.stat = 0;
    resultadofinal.resposta = resposta_bd.resposta[0];
    //posição 1 todos os dados de uma ficha tecnica
    resultadofinalteste.push(resultadofinal);
    let resposta_aux = await bd.query(
      "Select * from tbl_testespagina4objectivosGerais where fichaTecnicaFK = ?",
      [id]
    );
    //todos os dados da tabela testespagina4objectivosGerais relacionados com 1 ficha tecnica
    resultadofinalteste.push(resposta_aux.resposta);
    resposta_aux = await bd.query(
      "select * from tbl_testespagina4tabelas where fichaTecnicaFK = ?",
      [id]
    );
    //todos os dados da tabela testespagina4tabels relacionados com 1 ficha tecnica
    resultadofinalteste.push(resposta_aux.resposta);

    resposta_aux = await bd.query(
      "select * from tbl_constituicaoequipa where fichaTecnicaFK = ?",
      [id]
    );
    resultadofinalteste.push(resposta_aux.resposta);

    //todos os dados da tabela imagensFichaTecnica relacionados com 1 ficha tecnica
    resposta_aux = await bd.query(
      "select id from tbl_imagensFichaTecnica where fichaTecnicaFK = ?",
      [id]
    );
    resultadofinalteste.push(resposta_aux.resposta);
    //todas as folhas de obra
    resposta_aux = await bd.query(
      "Select folhaDeObraID from tbl_folhasDeObra where fichaRIFK = ? ",
      resposta_bd.resposta[0].fichaRegistoFK
    );
    var1.folhaobra = resposta_aux.resposta;

    //todos os testes de solubilidade
    resposta_aux = await bd.query(
      "Select id from tbl_testessolventes where fichaRIFK = ? ",
      resposta_bd.resposta[0].fichaRegistoFK
    );
    var1.testessolubilizacao = resposta_aux.resposta;
    resultadofinalteste.push(var1);
  } else if (resposta_bd.stat === 0) {
    resultadofinal.stat = resposta_bd.stat;
    resultadofinal.resposta = "FichaNaoExistente";
  } else {
    resultadofinal.stat = resposta_bd.stat;
    resultadofinal.resposta = resposta_bd.resposta;
  }

  return resultadofinalteste;
};
/**
 * Metodo para alterar uma ficha RegistoIdentificacao
 */
exports.updateFichaTecnica = async (bd, dados) => {
  let resultadofinal = { stat: 1, resposta: "Missing Fields" };
  let resposta_bd;
  //verificar se os campos estao preenchidos
  if (
    true
    // dados.visible &&
    // dados.localizacao &&
    // dados.proprietario &&
    // dados.codPostalProprietario &&
    // dados.emailProprietario &&
    // dados.contactoProprietario &&
    // dados.donoObra &&
    // dados.codPostalDonoObra &&
    // dados.contactoDonoObra &&
    // dados.mecenas &&
    // dados.codPostalMecenas &&
    // dados.contactoMecenas &&
    // dados.imgGrafico &&
    // dados.imgArray &&
    // dados.bemIntegradoEmConjunto &&
    // dados.tipoBensConjunto &&
    // dados.elemConstConj &&
    // dados.materiasElementosAcessorios &&
    // dados.marcasInscricoesAssinaturas &&
    // dados.marcasInscricoesMontagem &&
    // dados.marcasInscricoesConstrucao &&
    // dados.classPatrimonial &&
    // dados.epoca &&
    // dados.qualidade &&
    // dados.materiaisEstruturaSuporte &&
    // dados.materiaisSuperficies &&
    // dados.tecnicasEstruturaSuporte &&
    // dados.tecnicasSuperficie &&
    // dados.condAmbDescricao &&
    // dados.condAmbFrioTemperatura &&
    // dados.condAmbFrioHumidade &&
    // dados.condAmbFrioPeriodoInicio &&
    // dados.condAmbFrioPeriodoFim &&
    // dados.condAmbQuenteTemperatura &&
    // dados.condAmbQuenteHumidade &&
    // dados.condAmbQuentePeriodoInicio &&
    // dados.condAmbQuentePeriodoFim &&
    // dados.ilumArtTipo &&
    // dados.ilumArtValorIluminancia &&
    // dados.ilumArtValurUV &&
    // dados.ilumArtValorRealUV &&
    // dados.ilumNatOrigem &&
    // dados.ilumNatValorIluminancia &&
    // dados.ilumNatValorUV &&
    // dados.ilumNatValorRealUV &&
    // dados.poluicaoAgentes &&
    // dados.poluicaoFontesOrigem &&
    // dados.poluicaoResultados &&
    // dados.poluicaoObservacoesConclusoes &&

    // dados.objGerais &&
    // dados.tabobjGerais &&

    // dados.examesAnalisesInterpResultados &&
    // dados.examesAnalisesObsConclusoes &&
    // dados.estadoConservFQMestrutura &&
    // dados.estadoConservFQMsuperficie &&
    // dados.estadoConservFQMelementosAcess &&
    // dados.estadoConservBioEstrutura &&
    // dados.estadoConservBioSuperficie &&
    // dados.estadoConservBioElementosAcess &&
    // dados.estadoConservObsConclusoes &&
    // //Pagina 6
    // dados.estruturaIntervAnter &&
    // dados.superficieIntervAnter &&
    // dados.elementosAcessoriosIntervAnter &&
    // dados.observaçoesConclusoesPag6 &&
    // dados.tipoInterv &&
    // dados.aspetosEspecificosPag6 &&
    // dados.tipoIntervCR &&
    // dados.EstruturaPropPag6 &&
    // dados.EstruturaPropRecPag6 &&
    // dados.SuperficiePropPag6 &&
    // dados.SuperficiePropRecPag6 &&
    // dados.ElementosAcessPropPag6 &&
    // dados.ElementosAcessPropRecPag6 &&
    // dados.observaçoesConclusoesPag7 &&
    // //pagina 8
    // dados.estruturaPag8 &&
    // dados.recursosEstruturaPag8 &&
    // dados.superficiePag8 &&
    // dados.recursosSuperficiePag8 &&
    // dados.elementosAcessoriosPag8 &&
    // dados.recursosElementosAcPag8 &&
    // dados.observaçoesConclusoesPag8 &&
    // dados.fichaRegistoFK
  ) {
    if (dados.imgGrafico == "") {
      resposta_bd = await bd.query(
        "update tbl_fichasTecnicas set " +
          "visible = ?,localizacao= ?,proprietario= ?,codPostalProprietario= ?,emailProprietario= ?,contactoProprietario= ?,donoObra= ?,codPostalDonoObra= ?,contactoDonoObra= ?,mecenas= ?,codPostalMecenas= ?,contactoMecenas= ?, " +
          "tipoBensConjunto= ?,bemIntegradoEmConjunto= ?,elemConstConj= ?,materiasElementosAcessorios= ?,marcasInscricoesAssinaturas= ?,marcasInscricoesMontagem= ?,marcasInscricoesConstrucao= ?,classPatrimonial= ?,epoca= ?,qualidade= ?,materiaisEstruturaSuporte= ?,materiaisSuperficies= ?," +
          "tecnicasEstruturaSuporte= ?,tecnicasSuperficie= ?,condAmbDescricao= ?,condAmbFrioTemperatura= ?,condAmbFrioHumidade= ?,condAmbFrioPeriodoInicio= ?,condAmbFrioPeriodoFim= ?,condAmbQuenteTemperatura= ?,condAmbQuenteHumidade= ?,condAmbQuentePeriodoInicio= ?,condAmbQuentePeriodoFim= ?,ilumArtTipo= ?," +
          "ilumArtValorIluminancia= ?,ilumArtValurUV= ?,ilumArtValorRealUV= ?,ilumNatOrigem= ?,ilumNatValorIluminancia= ?,ilumNatValorUV= ?,ilumNatValorRealUV= ?,poluicaoAgentes= ?,poluicaoFontesOrigem= ?,poluicaoResultados= ?, poluicaoObservacoesConclusoes= ?,examesAnalisesInterpResultados= ?," +
          "examesAnalisesObsConclusoes= ?,estadoConservFQMestrutura= ?,estadoConservFQMsuperficie= ?,estadoConservFQMelementosAcess= ?,estadoConservBioEstrutura= ?, estadoConservBioSuperficie= ?,estadoConservBioElementosAcess= ?,estadoConservObsConclusoes= ?,estruturaIntervAnter= ?,superficieIntervAnter= ?,elementosAcessoriosIntervAnter= ?,observaçoesConclusoesPag6= ?," +
          "tipoInterv= ?,aspetosEspecificosPag6= ?,tipoIntervCR= ?,EstruturaPropPag6= ?,EstruturaPropRecPag6= ?,SuperficiePropPag6= ?,SuperficiePropRecPag6= ?, ElementosAcessPropPag6= ?, ElementosAcessPropRecPag6= ?, observaçoesConclusoesPag7= ?, estruturaPag8= ?,recursosEstruturaPag8= ?,superficiePag8= ?,recursosSuperficiePag8= ?," +
          "elementosAcessoriosPag8= ?,recursosElementosAcPag8= ?,observaçoesConclusoesPag8= ?, relTecInterLCRM= ?,tipoDesigOrig= ?,refOrig= ?,entidadeOrig= ?,tipoDesigDocGraf= ?,refDocGraf= ?,entidadeDocGraf= ?,tipoDesigExames= ?,refExames= ?," +
          "entidadeExames= ?,atledpArqDoc= ?,tipoArqDoc= ?,localArqDoc= ?,cotaArqDoc= ?,atledpIcon= ?,tipoIcon= ?,localIcon= ?,cotaIcon= ?,atledpBiblio= ?,tipoBiblio= ?,localBiblio= ?," +
          "cotaBiblio= ?,atledpOutras= ?,tipoOutras= ?,localOutras= ?,cotaOutras= ? where fichaTecnicaID=?",
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
          dados.tipoBensConjunto,
          dados.bemIntegradoEmConjunto,
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
          //5
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
          //6
          dados.aspetosEspecificosPag6,
          dados.tipoIntervCR,
          dados.EstruturaPropPag6,
          dados.EstruturaPropRecPag6,
          dados.SuperficiePropPag6,
          dados.SuperficiePropRecPag6,
          dados.ElementosAcessPropPag6,
          dados.ElementosAcessPropRecPag6,
          dados.observaçoesConclusoesPag7,
          // Intervenção Realizada página 8
          dados.estruturaPag8,
          dados.recursosEstruturaPag8,
          dados.superficiePag8,
          dados.recursosSuperficiePag8,
          dados.elementosAcessoriosPag8,
          //7
          dados.recursosElementosAcPag8,
          dados.observaçoesConclusoesPag8,
          //Documentação produzida / recolhida página 9
          dados.relTecInterLCRM,
          dados.tipoDesigOrig,
          dados.refOrig,
          dados.entidadeOrig,
          dados.tipoDesigDocGraf,
          dados.refDocGraf,
          dados.entidadeDocGraf,
          dados.tipoDesigExames,
          dados.refExames,
          dados.entidadeExames,

          //8
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
          //9
          dados.atledpOutras,
          dados.tipoOutras,
          dados.localOutras,
          dados.cotaOutras,
          dados.fichaTecnicaID
        ]
      );
    } else {
      let imagemVelha = await bd.query(
        "Select imgGrafico from tbl_fichasTecnicas where fichaTecnicaID = ?",
        [dados.fichaTecnicaID]
      );
      imagemVelha = imagemVelha.resposta[0].imgGrafico;
      if (fs.existsSync(imagemVelha + "")) {
        fs.unlink(imagemVelha + "", err => {
          if (err) throw err;
        });
      }
      resposta_bd = await bd.query(
        "update tbl_fichasTecnicas set " +
          "visible = ?,localizacao= ?,proprietario= ?,codPostalProprietario= ?,emailProprietario= ?,contactoProprietario= ?,donoObra= ?,codPostalDonoObra= ?,contactoDonoObra= ?,mecenas= ?,codPostalMecenas= ?,contactoMecenas= ?, imgGrafico= ?, " +
          "tipoBensConjunto= ?,bemIntegradoEmConjunto= ?,elemConstConj= ?,materiasElementosAcessorios= ?,marcasInscricoesAssinaturas= ?,marcasInscricoesMontagem= ?,marcasInscricoesConstrucao= ?,classPatrimonial= ?,epoca= ?,qualidade= ?,materiaisEstruturaSuporte= ?,materiaisSuperficies= ?," +
          "tecnicasEstruturaSuporte= ?,tecnicasSuperficie= ?,condAmbDescricao= ?,condAmbFrioTemperatura= ?,condAmbFrioHumidade= ?,condAmbFrioPeriodoInicio= ?,condAmbFrioPeriodoFim= ?,condAmbQuenteTemperatura= ?,condAmbQuenteHumidade= ?,condAmbQuentePeriodoInicio= ?,condAmbQuentePeriodoFim= ?,ilumArtTipo= ?," +
          "ilumArtValorIluminancia= ?,ilumArtValurUV= ?,ilumArtValorRealUV= ?,ilumNatOrigem= ?,ilumNatValorIluminancia= ?,ilumNatValorUV= ?,ilumNatValorRealUV= ?,poluicaoAgentes= ?,poluicaoFontesOrigem= ?,poluicaoResultados= ?, poluicaoObservacoesConclusoes= ?,examesAnalisesInterpResultados= ?," +
          "examesAnalisesObsConclusoes= ?,estadoConservFQMestrutura= ?,estadoConservFQMsuperficie= ?,estadoConservFQMelementosAcess= ?,estadoConservBioEstrutura= ?, estadoConservBioSuperficie= ?,estadoConservBioElementosAcess= ?,estadoConservObsConclusoes= ?,estruturaIntervAnter= ?,superficieIntervAnter= ?,elementosAcessoriosIntervAnter= ?,observaçoesConclusoesPag6= ?," +
          "tipoInterv= ?,aspetosEspecificosPag6= ?,tipoIntervCR= ?,EstruturaPropPag6= ?,EstruturaPropRecPag6= ?,SuperficiePropPag6= ?,SuperficiePropRecPag6= ?, ElementosAcessPropPag6=?, ElementosAcessPropRecPag6= ?, observaçoesConclusoesPag6=?, estruturaPag8= ?,recursosEstruturaPag8= ?,superficiePag8= ?,recursosSuperficiePag8= ?," +
          "elementosAcessoriosPag8= ?,recursosElementosAcPag8= ?,observaçoesConclusoesPag8= ?, relTecInterLCRM= ?,tipoDesigOrig= ?,refOrig= ?,entidadeOrig= ?,tipoDesigDocGraf= ?,refDocGraf= ?,entidadeDocGraf= ?,tipoDesigExames= ?,refExames= ?," +
          "entidadeExames= ?,atledpArqDoc= ?,tipoArqDoc= ?,localArqDoc= ?,cotaArqDoc= ?,atledpIcon= ?,tipoIcon= ?,localIcon= ?,cotaIcon= ?,atledpBiblio= ?,tipoBiblio= ?,localBiblio= ?," +
          "cotaBiblio= ?,atledpOutras= ?,tipoOutras= ?,localOutras= ?,cotaOutras= ? where fichaTecnicaID=?",
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
          dados.imgGrafico,
          dados.tipoBensConjunto,
          dados.bemIntegradoEmConjunto,
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
          //5
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
          //6
          dados.aspetosEspecificosPag6,
          dados.tipoIntervCR,
          dados.EstruturaPropPag6,
          dados.EstruturaPropRecPag6,
          dados.SuperficiePropPag6,
          dados.SuperficiePropRecPag6,
          dados.ElementosAcessPropPag6,
          dados.ElementosAcessPropRecPag6,
          dados.observaçoesConclusoesPag7,
          // Intervenção Realizada página 8
          dados.estruturaPag8,
          dados.recursosEstruturaPag8,
          dados.superficiePag8,
          dados.recursosSuperficiePag8,
          dados.elementosAcessoriosPag8,
          //7
          dados.recursosElementosAcPag8,
          dados.observaçoesConclusoesPag8,
          //Documentação produzida / recolhida página 9
          dados.relTecInterLCRM,
          dados.tipoDesigOrig,
          dados.refOrig,
          dados.entidadeOrig,
          dados.tipoDesigDocGraf,
          dados.refDocGraf,
          dados.entidadeDocGraf,
          dados.tipoDesigExames,
          dados.refExames,
          dados.entidadeExames,

          //8
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
          //9
          dados.atledpOutras,
          dados.tipoOutras,
          dados.localOutras,
          dados.cotaOutras,
          dados.fichaTecnicaID
        ]
      );
    }
  }

  //inseriu na base de dados
  if (resposta_bd.stat === 0) {
    resultadofinal.stat = 0;
    resultadofinal.resposta = resposta_bd.resposta;
    //apagar os dados da tabela tbl_testespagina4objectivosGerais
    let resposta_aux = await bd.query(
      "delete from tbl_testespagina4objectivosGerais where fichaTecnicaFK = ?",
      [dados.fichaTecnicaID]
    );
    //apagar os dados da tabela tbl_testespagina4tabelas
    resposta_aux = await bd.query(
      "delete from tbl_testespagina4tabelas where fichaTecnicaFK = ?",
      [dados.fichaTecnicaID]
    );
    resposta_aux = await bd.query(
      "delete from tbl_constituicaoequipa where fichaTecnicaFK = ?",
      [dados.fichaTecnicaID]
    );
    let auxiliar = "";
    for (let i = 0; i < dados.objGerais.length; i++) {
      auxiliar += "(?,?),";
    }
    let array2 = [];
    for (let i = 0; i < dados.objGerais.length; i++) {
      array2.push(dados.objGerais[i]);
      //id da ficha tecnica criada
      array2.push(dados.fichaTecnicaID);
    }
    auxiliar = auxiliar.substring(0, auxiliar.length - 1); //tira ultima virgula
    let resposta_bd2 = { stat: 1, resposta: {} };
    resposta_bd2 = await bd.query(
      "Insert into tbl_testespagina4objectivosGerais(Objectivo,fichaTecnicaFK) values " +
        auxiliar,
      array2
    );
    auxiliar = "";
    for (let i = 0; i < dados.tabobjGerais.length; i++) {
      auxiliar += "(?,?,?,?,?,?),";
    }
    auxiliar = auxiliar.substring(0, auxiliar.length - 1); //tira ultima virgula
    //array auxiliar que contem todos os objectivosGerais num só array
    array2 = [];
    for (let i = 0; i < dados.tabobjGerais.length; i++) {
      array2.push(dados.tabobjGerais[i].tipoRef);
      array2.push(dados.tabobjGerais[i].lap);
      array2.push(dados.tabobjGerais[i].objEsp);
      array2.push(dados.tabobjGerais[i].reslt);

      array2.push(dados.tabobjGerais[i].data);
      //id da ficha tecnica criada
      array2.push(dados.fichaTecnicaID);
    }
    let resposta_bd3 = { stat: 1, resposta: {} };
    resposta_bd3 = await bd.query(
      "Insert into tbl_testespagina4tabelas(tipoReferencia ,LocalizacaoAreaPonto ,ObjectivosEspecificos ,Resultados,DataDePreenchimento ,fichaTecnicaFK) values " +
        auxiliar,
      array2
    );
    auxiliar = "";
    for (let i = 0; i < dados.tabel10.length; i++) {
      auxiliar += "(?,?,?,?),";
    }
    auxiliar = auxiliar.substring(0, auxiliar.length - 1); //tira ultima virgula
    //array auxiliar que contem todos os objectivosGerais num só array
    array2 = [];
    for (let i = 0; i < dados.tabel10.length; i++) {
      array2.push(dados.tabel10[i].constEq);
      array2.push(dados.tabel10[i].funcDes);
      array2.push(dados.tabel10[i].habPro);
      array2.push(dados.fichaTecnicaID);
    }
    resposta_bd4 = await bd.query(
      "Insert into tbl_constituicaoequipa(constEq ,funcDes ,habPro ,fichaTecnicaFK ) values " +
        auxiliar,
      array2
    );

    //array de imagens
    if (dados.imgArray.length != 0) {
      let imagensVelhas = await bd.query(
        "Select imagem from tbl_imagensFichaTecnica where fichaTecnicaFK = ?",
        [dados.fichaTecnicaID]
      );
      for (let i = 0; i < imagensVelhas.resposta.length; i++) {
        var imagemVelha = imagensVelhas.resposta[i].imagem;
        if (fs.existsSync(imagemVelha + "")) {
          fs.unlink(imagemVelha + "", err => {
            if (err) throw err;
          });
        }
      }
      let resposta_aux = await bd.query(
        "delete from tbl_imagensFichaTecnica where fichaTecnicaFK = ?",
        [dados.fichaTecnicaID]
      );

      auxiliar = "";
      for (let i = 0; i < dados.imgArray.length; i++) {
        auxiliar += "(?,?),";
      }
      auxiliar = auxiliar.substring(0, auxiliar.length - 1); //tira ultima virgula
      //array auxiliar que contem todos os objectivosGerais num só array
      array2 = [];
      for (let i = 0; i < dados.imgArray.length; i++) {
        array2.push(dados.imgArray[i]);
        array2.push(dados.fichaTecnicaID);
      }
      resposta_bd4 = await bd.query(
        "Insert into tbl_imagensFichaTecnica(imagem, fichaTecnicaFK ) values " +
          auxiliar,
        array2
      );
    }
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
/**
 * Método que devolve todas as fichas RegistoIdentificacao
 * @param bd - base de dados para fazer query
 */
exports.getAllFichasTecnicas = async (bd, limit, pagenumber, id) => {
  let resultadofinal = { stat: 1, resposta: {} };

  let resposta_bd = await bd.query(
    "Select fichaTecnicaID from tbl_fichasTecnicas where fichaRegistoFK = ? visible = true limit ?,?",
    [id, limit, pagenumber]
  );

  if (resposta_bd.stat === 0) {
    resultadofinal.resposta = resposta_bd.resposta;
    resultadofinal.stat = 0;
  } else if (resposta_bd.stat === 1) {
    resultadofinal.resposta = "DBConnectionError";
  } else if (resposta_bd.stat >= 2) {
    resultadofinal.resposta = resposta_bd.resposta;
  }
  return resultadofinal;
};

exports.getFichaTecnicaImagemGrafico = async (bd, id) => {
  let resultadofinal = { stat: 1, resposta: {} };
  let resposta_bd = await bd.query(
    "Select imgGrafico from tbl_fichasTecnicas where fichaTecnicaID = ? and visible = true limit 1",
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

exports.getFichaTecnicaFotografias = async (bd, id) => {
  let resultadofinal = { stat: 1, resposta: {} };
  let resposta_bd = await bd.query(
    "Select imagem from tbl_imagensFichaTecnica where id = ? limit 1",
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
