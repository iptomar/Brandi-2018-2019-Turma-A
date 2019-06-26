exports.getAllInteressados = async (bd, limit, pagenumber) => {
    let resultadofinal = { stat: 1, resposta: "" };
    let resposta_bd = await bd.query("Select * from tbl_interessados");
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
  exports.getSingleInteressado = async (bd, id) => {
    let resultadofinal = { stat: 1, resposta: "" };
    let resposta_bd = await bd.query(
      " Select * from tbl_interessados where interessadoID = ?",
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
  
  exports.createInteressado = async (bd, dados) => {
    let resultadofinal = { stat: 1, resposta: "Campos Inválidos" };
    let auxiliar = "";
    for (let i = 0; i < dados.length; i++) {
      auxiliar += "(?,?,?,?),";
    }
    auxiliar = auxiliar.substring(0, auxiliar.length - 1); //tira ultima virgula
    let array2 = [];
    for (let i = 0; i < dados.length; i++) {
      if (dados[i].nome && dados[i].enderecoPostal && dados[i].email && dados[i].tipo) {
        array2.push(dados[i].nome);
        array2.push(dados[i].enderecoPostal);
        array2.push(dados[i].email);
        array2.push(dados[i].tipo);
      } else {
        return resultadofinal;
      }
    }
    let resposta_bd = await bd.query(
      " Insert into tbl_interessados (nome, enderecoPostal, email, tipo) values " +
        auxiliar,
      array2
    );
    //console.log(resposta_bd);
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
  
  exports.updateInteressados = async (bd, dados, id) => {
    let resultadofinal = { stat: 1, resposta: "Campos Inválidos" };
    let array2 = [];
    for (let i = 0; i < dados.length; i++) {
      if (dados[i].nome && dados[i].enderecoPostal && dados[i].email && dados[i].tipo) {
        array2.push(dados[i].nome);
        array2.push(dados[i].enderecoPostal);
        array2.push(dados[i].email);
        array2.push(dados[i].tipo);
        array2.push(id);
      } else {
        return resultadofinal;
      }
    }
    let resposta_bd = await bd.query(
      " UPDATE tbl_interessados SET nome=?, enderecoPostal=?, email=?, tipo=? WHERE interessadoID=? ",
      array2
    );
    //console.log(resposta_bd);
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
  
  exports.deleteInteressado = async (bd, dados) => {
    let resultadofinal = { stat: 1, resposta: "" };
    return resultadofinal;
  };
  