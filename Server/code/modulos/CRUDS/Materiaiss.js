/**
 * Ficheiro que faz as querys de um objeto
 */

/**
 * Método que devolve todos os materiais
 * @param bd - base de dados para fazer query
 */
exports.getAllMateriais = async (bd) => {
    let resultadofinal = {
        stat: 1,
        resposta: {}
    };

    let resposta_bd = await bd.query(
        "Select * from tbl_materiais;"
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

/**
 * Método que devolve os materiais de uma ficha tecnica
 * @param bd - base de dados para fazer query
 */
exports.getMaterial = async (bd, id) => {
    let resultadofinal = {
        stat: 1,
        resposta: {}
    };
    let resposta_bd = await bd.query(
        "Select * from tbl_materiais where fichaTecnicaFK = ?", [id]
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

/**
 * Método que cria materiais
 * @param bd - base de dados para fazer query
 */
exports.createMaterial = async (bd, dados) => {
    //dados = [{estrutura: "esturjurahfj", superficie: "bfnjdfj", fichaTecnicaFK: 1}];
    //console.log(dados);
    let resultadofinal = { stat: 1, resposta: "" };
    let resposta_bd;
    //verifica se os campos estão preenchidos
    for(let k=0; k<dados.length; k++){
        if(dados[k].estrutura == null || dados[k].superficie == null || dados[k].fichaTecnicaFK == null){
            resultadofinal.resposta = "Campos Inválidos";
            return resultadofinal;
        }
    }
        //Loop asincrono
        let i=0;
        while(i < dados.length){
            resposta_bd = await bd.query(
                "INSERT INTO tbl_materiais (estrutura, superficie, fichaTecnicaFK) VALUES(?, ?, ?, ?)",
                [dados[i].estrutura, dados[i].superficie, dados[i].fichaTecnicaFK]
            );

            if(resposta_bd != null){
                i++;
            }
        }
    if (resposta_bd.stat === 0) {
      resultadofinal.resposta = resposta_bd.resposta[0];
      resultadofinal.stat = 0;
    } else if (resposta_bd.stat === 1) {
      resultadofinal.resposta = "DBConnectionError";
    } else if (resposta_bd.stat >= 2) {
      resultadofinal.resposta = resposta_bd.resposta;
    }
  return resultadofinal;

};

/**
 * Método que dá update num material
 * @param bd - base de dados para fazer query
 */
exports.updateMateriais = async (bd, dados, id) => {

        //dados = [{estrutura: "esturjurahfj", superficie: "bfnjdfj", fichaTecnicaFK: 1}];

    let resultadofinal = { stat: 1, resposta: "" };
    let resposta_bd;
    for(let k=0; k<dados.length; k++){
        if(dados[k].materiaisID == null || dados[k].estrutura == null || dados[k].superficie == null){
            resultadofinal.resposta = "Campos Inválidos";
            return resultadofinal;
        }
    }
        //Loop asincrono
        let i=0;
        while(i < dados.length){
            resposta_bd = await bd.query(
                "update tbl_materiais set estrutura = ?,superficie = ? where fichaTecnicaFK = ? && materiaisID = ?",
                [dados[i].estrutura, dados[i].superficie, id, dados[i].materiaisID]
            );

            if(resposta_bd != null){
                i++;
            }
        }
        let OkPacket = resposta_bd.resposta;
        console.log(OkPacket.affectedRows);
      if (OkPacket.affectedRows != 0) {
        resultadofinal.resposta = resposta_bd.resposta[0];
        resultadofinal.stat = 0;
      } else if (resposta_bd.stat === 1) {
        resultadofinal.resposta = "DBConnectionError";
      } else if (resposta_bd.stat >= 2) {
        resultadofinal.resposta = resposta_bd.resposta;
      }
    return resultadofinal;
};