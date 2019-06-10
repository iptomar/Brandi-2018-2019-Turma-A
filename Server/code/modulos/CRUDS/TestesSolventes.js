exports.getAllTestesSolventes = async (bd, id) => {
  let resultadofinal = { stat: 1, resposta: "" };
  let resposta_bd = await bd.query(
    "Select * from tbl_testessolventes where fichaRIFK = ? ",
    id
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
exports.getSingleTestesSolventes = async (bd, id) => {
  let resultadofinal = { stat: 1, resposta: "", complementar: "" };
  let resposta_bd = await bd.query(
    "Select * from tbl_testessolventes  where id  = ?",
    [id]
  );
  if (resposta_bd.stat === 0 && resposta_bd.resposta.length > 0) {
    resultadofinal.resposta = resposta_bd.resposta;
    resultadofinal.stat = 0;
    resposta_bd = await bd.query(
      "Select * from tbl_testesSolventesComplementar where testeSolventFK = ? ",
      id
    );
    resultadofinal.complementar = resposta_bd.resposta;
  } else if (resposta_bd.stat === 1) {
    resultadofinal.resposta = "DBConnectionError";
  } else if (resposta_bd.stat >= 2) {
    resultadofinal.resposta = resposta_bd.resposta;
  } else if (resposta_bd.stat === 0) {
    resultadofinal.stat = 0;
  }
  return resultadofinal;
};

exports.createTesteSolvente = async (bd, dados) => {
  let resultadofinal = { stat: 1, resposta: "Campos Inválidos" };
  let resposta_bd = await bd.query(
    "Insert into tbl_testessolventes (idEstratoSujidade,caracteristicas,fichaRIFK) values (?,?,?)",
    [dados[0].idEstratoSujidade, dados[0].caracteristicas, dados.fichaRIFK]
  );
  //verificar se foi bem inserido
  if (resposta_bd.stat === 0) {
    resultadofinal.resposta = resposta_bd.resposta;
    resultadofinal.stat = 0;
    // adicionar os campos da tabela da página
    let auxiliar = "";
    for (let i = 1; i < dados.length; i++) {
      auxiliar += "(?,?,?,?),";
    }
    auxiliar = auxiliar.substring(0, auxiliar.length - 1); //tira ultima virgula
    let array2 = [];
    for (let i = 1; i < dados.length; i++) {
      if (
        dados[i].solvente &&
        dados[i].grauDeEficacia &&
        dados[i].observacoes
      ) {
        array2.push(dados[i].solvente);
        array2.push(dados[i].grauDeEficacia);
        array2.push(dados[i].observacoes);
        array2.push(resposta_bd.resposta.insertId);
      } else {
        return resultadofinal;
      }
    }
    let resposta_bd2 = await bd.query(
      "Insert into tbl_testesSolventesComplementar (solvente,grauDeEficacia,observacoes,testeSolventFK) values " +
        auxiliar,
      array2
    );
    if (resposta_bd2.stat === 0) {
      resultadofinal.complementar = resposta_bd2.resposta;
    } else {
      let apagarTestesSolvente = await bd.query(
        "Delete from tbl_testessolventes where id = ?",
        resposta_bd.resposta.insertId
      );
      resultadofinal = { stat: 1, resposta: "Campos Inválidos" };
    }
  } else if (resposta_bd.stat === 1) {
    resultadofinal.resposta = "DBConnectionError";
  } else if (resposta_bd.stat >= 2) {
    resultadofinal.resposta = resposta_bd.resposta;
  }

  return resultadofinal;
};

exports.updateTestesSolventes = async (bd, dados) => {
  let resultadofinal = { stat: 1, resposta: "Campos Inválidos" };
  let resposta_bd = await bd.query(
    "update tbl_testessolventes (idEstratoSujidade,caracteristicas) values (?,?,?) where id =",
    [dados[0].idEstratoSujidade, dados[0].caracteristicas, dados.id]
  );
  //verificar se foi bem actualizado
  if (resposta_bd.stat === 0) {
    resultadofinal.resposta = resposta_bd.resposta;
    resultadofinal.stat = 0;
    // adicionar os campos da tabela da página
    let auxiliar = "";
    for (let i = 1; i < dados.length; i++) {
      auxiliar += "(?,?,?,?),";
    }
    auxiliar = auxiliar.substring(0, auxiliar.length - 1); //tira ultima virgula
    let array2 = [];
    for (let i = 1; i < dados.length; i++) {
      if (
        dados[i].solvente &&
        dados[i].grauDeEficacia &&
        dados[i].observacoes
      ) {
        array2.push(dados[i].solvente);
        array2.push(dados[i].grauDeEficacia);
        array2.push(dados[i].observacoes);
        array2.push(dados.id);
      } else {
        return resultadofinal;
      }
    }
    //apagar a informação que já existe sobre o teste de solvente da tabela complementar
    let apagarTestesSolventes = await bd.query(
      "Delete from tbl_testesSolventesComplementar where testeSolventeFK = ?",
      dados.id
    );
    //inserir os novos dados
    let resposta_bd2 = await bd.query(
      "Insert into tbl_testesSolventesComplementar (solvente,grauDeEficacia,observacoes,testeSolventFK) values " +
        auxiliar,
      array2
    );
    if (resposta_bd2.stat === 0) {
      resultadofinal.complementar = resposta_bd2.resposta;
    } else {
      resultadofinal = { stat: 1, resposta: "Campos Inválidos na tabela" };
    }
  } else if (resposta_bd.stat === 1) {
    resultadofinal.resposta = "DBConnectionError";
  } else if (resposta_bd.stat >= 2) {
    resultadofinal.resposta = resposta_bd.resposta;
  }
  return resultadofinal;
};

exports.deleteSolvent = async (bd, dados) => {
  let resultadofinal = { stat: 1, resposta: "" };
  return resultadofinal;
};
