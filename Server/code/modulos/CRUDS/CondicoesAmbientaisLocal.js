exports.getAllCondicoesAmbientaisLocal = async bd => {
  let resultadofinal = { stat: 1, resposta: "" };
  let resposta_bd = await bd.query(
    "Select * from tbl_condicoesAmbientaisLocal"
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

exports.getSingleCondicoesAmbientaisLocal = async (bd, id) => {
  let resultadofinal = { stat: 1, resposta: "" };
  let resposta_bd = await bd.query(
    " Select from tbl_condicoesAmbientaisLocal where condicoesAmbientaisLocalID  = ?",
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

exports.createCondicoesAmbientaisLocal = async (bd, dados) => {
  let resultadofinal = { stat: 1, resposta: "Campos Inválidos" };
  if (
    dados.condicoesAmbientaisDescricao &&
    dados.temperaturaFrioHumido &&
    dados.temperaturaQuenteSeco &&
    dados.humidadeFrioHumido &&
    dados.humidadeQuenteSeco &&
    dados.periodoFrioHumidoInicio &&
    dados.periodoQuenteSecoInicio &&
    dados.periodoFrioHumidoFim &&
    dados.periodoQuenteSecoFim &&
    dados.poluicaoAgentesPoluidores &&
    dados.poluicaoFontes &&
    dados.poluicaoResultados &&
    dados.conclusoes &&
    dados.fichaTecnicaFK
  ) {
    let resposta_bd = await bd.query(
      " Insert into tbl_condicoesAmbientaisLocal (condicoesAmbientaisDescricao,temperaturaFrioHumido,temperaturaQuenteSeco,humidadeFrioHumido,humidadeQuenteSeco,periodoFrioHumidoInicio,periodoQuenteSecoInicio,periodoFrioHumidoFim,periodoQuenteSecoFim,poluicaoAgentesPoluidores,poluicaoFontes,poluicaoResultados,conclusoes,fichaTecnicaFK) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?) ",
      [
        dados.condicoesAmbientaisDescricao,
        dados.temperaturaFrioHumido,
        dados.temperaturaQuenteSeco,
        dados.humidadeFrioHumido,
        dados.humidadeQuenteSeco,
        dados.periodoFrioHumidoInicio,
        dados.periodoQuenteSecoInicio,
        dados.periodoFrioHumidoFim,
        dados.periodoQuenteSecoFim,
        dados.poluicaoAgentesPoluidores,
        dados.poluicaoFontes,
        dados.poluicaoResultados,
        dados.conclusoes,
        dados.fichaTecnicaFK
      ]
    );
    if (resposta_bd.stat === 0 && resposta_bd.resposta.length > 0) {
      resultadofinal.resposta = resposta_bd.resposta[0];
      resultadofinal.stat = 0;
    } else if (resposta_bd.stat === 1) {
      resultadofinal.resposta = "DBConnectionError";
    } else if (resposta_bd.stat >= 2) {
      resultadofinal.resposta = resposta_bd.resposta;
    }
  }
  return resultadofinal;
};

exports.updateCondicoesAmbientaisLocal = async (bd, dados) => {
  let resultadofinal = { stat: 1, resposta: "Campos Inválidos" };
  return resultadofinal;
};

exports.deleteCondicoesAmbientaisLocal = async (bd, dados) => {
  let resultadofinal = { stat: 1, resposta: "" };
  return resultadofinal;
};
