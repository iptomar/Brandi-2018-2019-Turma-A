const bcrypt = require("bcrypt");

/**
 * Método para authenticar utilizador
 * @param bd - recebe base de dados para fazer query
 * @param dados -dados para executar query
 * @returns {object} stat: 1 <erro> 0 <sucesso> , resposta <dados do utilizador>
 */
exports.authenticateUser = async (bd, dados) => {
  let resultadofinal = { stat: 1, resposta: {} };
  //verificar se os campos estão preenchidos
  if (dados.login && dados.password) {
    //pesquisar o utilizador na base de dados
    let resposta_bd = await bd.query(
      "Select * from tbl_utilizadores where login = ? limit 1",
      [dados.login]
    );
    // verficar se encontrou o utilizador
    if (resposta_bd.stat === 0 && resposta_bd.resposta.length > 0) {
      //gerar uma password
      let password = await bcrypt.hash(
        dados.password,
        resposta_bd.resposta[0].salt
      );
      //comparar se as passwords são iguais
      if (password === resposta_bd.resposta[0].password) {
        //nao ocorreu nenhum erro
        resultadofinal.stat = 0;
        //nao enviar o campo password
        resposta_bd.resposta[0].password = undefined;
        //não enviar o campo salt
        resposta_bd.resposta[0].salt = undefined;
        //resultado = dados publicos do utilizador
        resultadofinal.resposta = resposta_bd.resposta[0];
      }
    } else {
      // erro de conecao com base de dados
      if (resposta_bd.stat === 2) {
        resultadofinal.resposta = "DBConnectionError";
      }
    }
  }
  return resultadofinal;
};

/**
 * Método para registar um utilizador na base de dados
 * @param bd - recebe base de dados para fazer query
 * @param dados -dados para executar query
 * @returns {object} stat: 1 <erro> 0 <sucesso> , resposta <dados do utilizador>
 */
exports.registerUser = async (bd, dados) => {
  let resultadofinal = { stat: 1, resposta: {} };
  //auxiliar para descubrir qual e o campo repetido
  let resposta_bd2;
  //gerar salt
  let salt = await bcrypt.genSalt(10);
  //encriptar password
  let password = await bcrypt.hash(dados.password, salt);
  //registar utilizador na base de dados
  let resposta_bd = await bd.query(
    "Insert into tbl_utilizadores(login,email,password, salt,roleFK) values( ?,?,?,?,?)",
    [dados.login, dados.email, password, salt, dados.roleFK]
  );
  //campos duplicados
  if (resposta_bd.stat === 2) {
    resposta_bd2 = await bd.query(
      "Select * from tbl_utilizadores where login = ?",
      [dados.login]
    );
    //campo login
    if (resposta_bd2.resposta.length > 0) {
      resultadofinal.resposta = "Já existe um utilizador com esse login";
    }
    //verificar se já existe algum utilizador com o email
    else {
      resposta_bd2 = await bd.query(
        "Select * from tbl_utilizadores where email = ?",
        [dados.email]
      );
      if (resposta_bd2.resposta.length > 0) {
        resultadofinal.resposta = "Já existe um utilizador com esse email";
      }
    }
  }
  //erro na conecao com a base de dados
  else if (resposta_bd.stat === 1) {
    resultadofinal.resposta = "DBConnectionError";
  }
  //utilizador registado com sucesso
  else {
    resultadofinal.stat = 0;
    resultadofinal.resposta = resposta_bd.resposta;
  }
  return resultadofinal;
};

/**
 * Método para fazer pesquisa de todos os utilizadores a base dados
 * @param bd - recebe base de dados para fazer query
 * @returns {object} stat: 1 <erro> 0 <sucesso> , resposta <dados do utilizador>
 */
exports.getAllUsers = async bd => {
  let resultadofinal = { stat: 1, resposta: {} };
  let resposta_bd = await bd.query("Select * from tbl_utilizadores");
  if (resposta_bd.stat === 0) {
    resultadofinal.stat = 0;
    resultadofinal.resposta = resposta_bd.resposta;
  }
  return resultadofinal;
};
