exports.getAllTecnicas = async bd => {
  let resultadofinal = { stat: 1, resposta: "" };
  let resposta_bd = await bd.query("Select * from tbl_Tecnicas");
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
exports.getSingleTecnicas = async (bd, id) => {
  let resultadofinal = { stat: 1, resposta: "" };
  let resposta_bd = await bd.query(
    " Select * from tbl_Tecnicas where tecnicasID   = ?",
    [id]
  );
  if (resposta_bd.stat === 0 && resposta_bd.resposta.length > 0) {
    resultadofinal.resposta = resposta_bd.resposta[0];
    resultadofinal.stat = 0;
  } else if (resposta_bd.stat === 1) {
    resultadofinal.resposta = "DBConnectionError";
  } else if (resposta_bd.stat >= 2) {
    resultadofinal.resposta = resposta_bd.resposta;
  }
  return resultadofinal;
};

exports.createTecnicas = async (bd, dados) => {
  let resultadofinal = { stat: 1, resposta: "Campos Inválidos" };
  let auxiliar = "";
  for (let i = 0; i < dados.length; i++) {
    auxiliar += "(?,?,?),";
  }
  auxiliar = auxiliar.substring(0, auxiliar.length - 1); //tira ultima virgula
  let array2 = [];
  for (let i = 0; i < dados.length; i++) {
    if (dados[i].estrutura && dados[i].superifice && dados[i].fichaTecnicaFK) {
      array2.push(dados[i].estrutura);
      array2.push(dados[i].superifice);
      array2.push(dados[i].fichaTecnicaFK);
    } else {
      return resultadofinal;
    }
  }

  let resposta_bd = await bd.query(
    " Insert into tbl_Tecnicas (estrutura,superficie,fichaTecnicaFK) values " +
      auxiliar,
    array2
  );
  if (resposta_bd.stat === 0 && resposta_bd.resposta.length > 0) {
    resultadofinal.resposta = resposta_bd.resposta[0];
    resultadofinal.stat = 0;
  } else if (resposta_bd.stat === 1) {
    resultadofinal.resposta = "DBConnectionError";
  } else if (resposta_bd.stat >= 2) {
    resultadofinal.resposta = resposta_bd.resposta;
  }
  return resultadofinal;
};

exports.updateTecnicas = async (bd, dados) => {
  let resultadofinal = { stat: 1, resposta: "Campos Inválidos" };

  return resultadofinal;
};

exports.deleteTecnicas = async (bd, dados) => {
  let resultadofinal = { stat: 1, resposta: "" };
  return resultadofinal;
};
