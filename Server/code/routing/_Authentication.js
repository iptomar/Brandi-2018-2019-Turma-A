const bcrypt = require("bcrypt");

/**
 *
 * @param {_basedeDados.BasedeDados} bd base de dados
 * @param {*} dados login e password
 * @returns {objeto} stat: 1 <erro> 0<sucesso> , resposta: <utilizador>
 */
exports.beAuthenticate = async function(bd, dados) {
  let resultadofinal = { stat: 1, resposta: {} };
  let resposta_bd = await bd.query(
    "Select * from tbl_utilizadores where login = ?  limit  1 ",
    [dados.login]
  );
  //não ocorreu erros com a base de dados
  if (resposta_bd.stat === 0) {
    if (
      dados.login && //se o campo login está preenchido
      dados.password && //se o campo password está preenchido
      resposta_bd.stat === 0 && //se não houve erros na base de dados
      resposta_bd.resposta.length > 0 //se encontrou utilizador
    ) {
      //*************************************encriptar password*************************************
      let password = await bcrypt.hash(
        dados.password,
        resposta_bd.resposta[0].salt
      );
      //*************************************verificar se as passwords são iguais*************************************
      if (password === resposta_bd.resposta[0].password) {
        resultadofinal.stat = 0; //definir como 0
        resposta_bd.resposta[0].password = undefined; //retirar o campo password
        resposta_bd.resposta[0].salt = undefined; //retirar o campo salt
        resultadofinal.resposta = resposta_bd.resposta[0];
      }
    }
  }
  //ocorreu erros com a base de dados
  else {
    resultadofinal.resposta = resposta_bd.resposta;
  }
  return resultadofinal;
};

/**
 * Registo de utilizador na base de dados
 * @param {_basedeDados.BasedeDados} bd base de dados
 * @param {*} dados utilizador
 * @return {objeto} resposta stat: 0 <sucesso> 1 <erro> resposta: resposta da base de dados
 */
exports.postRegistration = async function(bd, dados) {
  let mensagem = { stat: 1, resposta: {} };
  let salt = await bcrypt.genSalt(10);
  let password = await bcrypt.hash(dados.password, salt);
  let resposta_bd = await bd.query(
    "Insert into tbl_utilizadores(login , email ,password ,salt) VALUES(?,?,?,?)",
    [dados.login, dados.email, password, salt]
  );
  //houve campos duplicados
  if (resposta_bd.stat === 2) {
    mensagem.resposta = "NotRegisted";
    mensagem.stat = resposta_bd.stat;
  }
  //sucesso
  else if (resposta_bd.stat === 0) {
    mensagem.resposta = "UserRegisted";
    mensagem.stat=0;
  }
  //ocorreu um erro com a base de dados
  else {
    //authenticação automática
    //mensagem = await this.beAuthenticate(bd, dados);
    mensagem.resposta = resposta_bd.resposta;
  }
  return mensagem;
};
