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
        dados.fichaRegistoFK
    ) {
        console.log("entrou");
        resposta_bd = await bd.query(
            "INSERT INTO tbl_fichasTecnicas (visible,localizacao,proprietario,codPostalProprietario,emailProprietario,contactoProprietario,donoObra,codPostalDonoObra,contactoDonoObra,mecenas, codPostalMecenas, contactoMecenas, bemIntegradoEmConjunto, tipoBensConjunto, elemConstConj, materiasElementosAcessorios, marcasInscricoesAssinaturas, marcasInscricoesMontagem, marcasInscricoesConstrucao, classPatrimonial, epoca, qualidade, materiaisEstruturaSuporte,  materiaisSuperficies, tecnicasEstruturaSuporte, tecnicasSuperficie, condAmbDescricao, condAmbFrioTemperatura, condAmbFrioHumidade, condAmbFrioPeriodoInicio, condAmbFrioPeriodoFim, condAmbQuenteTemperatura, condAmbQuenteHumidade, condAmbQuentePeriodoInicio, condAmbFrioPeriodoFim, ilumArtTipo, ilumArtValorIluminancia, ilumArtValurUV, ilumArtValorRealUV, ilumNatOrigem, ilumNatValorIluminancia, ilumNatValorUV, ilumArtValorRealUV,  poluicaoAgentes, poluicaoFontesOrigem, poluicaoResultados, poluicaoObservacoesConclusoes, fichaRegistoFK) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
            [
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
                dados.fichaRegistoFK
            ]
        );
    }
    //inserçao bem sucedida na base de dados
    if (resposta_bd.stat === 0) {
         resultadofinal.stat = 0;
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
        dados.fichaRegistoFK
    ) {
        resposta_bd = await bd.query(
            "update tbl_fichasTecnicas set visible=?,localizacao=?,proprietario=?,codPostalProprietario=?,emailProprietario =?, contactoProprietario=?, donoObra=?, codPostalDonoObra =? , contactoDonoObra =?, contactoDonoObra =?, mecenas =?, codPostalMecenas =?, contactoMecenas =?, bemIntegradoEmConjunto =?, tipoBensConjunto =?, elemConstConj =?, materiasElementosAcessorios =?, marcasInscricoesAssinaturas =?, marcasInscricoesMontagem =?, marcasInscricoesConstrucao =?, classPatrimonial =?, epoca =?, qualidade =?, materiaisEstruturaSuporte =?, materiaisSuperficies =?, tecnicasEstruturaSuporte =?, tecnicasSuperficie =?, condAmbDescricao =?,condAmbFrioTemperatura =?, condAmbFrioHumidade =?, condAmbFrioPeriodoInicio =?, condAmbFrioPeriodoFim =?, condAmbQuenteTemperatura =?, condAmbQuenteHumidade =?, condAmbQuentePeriodoInicio =?, condAmbQuentePeriodoFim =?, ilumArtTipo =?, ilumArtValorIluminancia =?, ilumArtValurUV =?, ilumArtValorRealUV =?, ilumNatOrigem =?, ilumNatValorIluminancia =?, ilumNatValorUV =?, ilumNatValorRealUV =?, poluicaoAgentes =?, poluicaoFontesOrigem =?, poluicaoResultados =?, poluicaoObservacoesConclusoes =?, fichaRegistoFK =? where fichaTecnicaID = ? ",
            [
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


