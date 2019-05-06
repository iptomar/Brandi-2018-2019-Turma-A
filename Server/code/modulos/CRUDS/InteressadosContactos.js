exports.getAllInteressadosContactos = async (bd, limit, pagenumber) => {
  let resultadofinal = { stat: 1, resposta: "" };
  let resposta_bd = await bd.query("Select * from tbl_interessadosContactos");
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
exports.getSingleInteressadosContactos = async (bd, id) => {
  let resultadofinal = { stat: 1, resposta: "" };
  let resposta_bd = await bd.query(
    " Select * from tbl_interessadosContactos where interessadoContactoID= ?",
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

exports.createInteressadosContactos = async (bd, dados) => {
  let resultadofinal = { stat: 1, resposta: "Campos Inválidos" };
  let auxiliar = "";
  for (let i = 0; i < dados.length; i++) {
    auxiliar += "(?,?),";
  }
  auxiliar = auxiliar.substring(0, auxiliar.length - 1); //tira ultima virgula
  let array2 = [];
  for (let i = 0; i < dados.length; i++) {
    if (dados[i].contacto && dados[i].interessadoFK) {
      array2.push(dados[i].contacto);
      array2.push(dados[i].interessadoFK);
    } else {
      return resultadofinal;
    }
  }
  let resposta_bd = await bd.query(
    " Insert into tbl_interessadosContactos (contacto,interessadoFK) values " +
    auxiliar,
    array2
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

exports.updateInteressadosContactos = async (bd, dados) => {
  let resultadofinal = { stat: 1, resposta: "Campos Inválidos" };

  return resultadofinal;
};

exports.deleteInteressadosContactos = async (bd, dados) => {
  let resultadofinal = { stat: 1, resposta: "" };
  return resultadofinal;
};
