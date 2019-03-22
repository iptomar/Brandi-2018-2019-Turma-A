/**
 *
 * @param {_basedeDados.BasedeDados} bd base de dados
 * @returns {objeto} stat: 1 <erro> 0<sucesso> , resposta: <utilizador>
 */

exports.listarFichas = async function(bd) {
  let resultadofinal = { stat: 1, resposta: {} };
  let resposta_bd = await bd.query("Select * from tbl_fichas");
  //não ocorreu erros com a base de dados
  if (resposta_bd.stat === 0) {
    resultadofinal = resposta_bd.resposta;
  }
  //ocorreu erros com a base de dados
  else {
    resultadofinal.resposta = resposta_bd.resposta;
  }
  return resultadofinal;
};

exports.listarFichaPorId = async function(bd, dados) {
  let resultadofinal = { stat: 1, resposta: {} };
  let resposta_bd = await bd.query(
    "Select * from tbl_fichas where fichaID = ? limit 1",
    [dados.fichaID]
  );
  //não ocorreu erros com a base de dados
  if (resposta_bd.stat === 0) {
    resultadofinal = resposta_bd.resposta;
  }
  //ocorreu erros com a base de dados
  else {
    resultadofinal.resposta = resposta_bd.resposta;
  }
  return resultadofinal;
};

exports.criarFicha = async function(bd, dados) {
  let resultadofinal = { stat: 1, resposta: {} };
  let resposta_bd = await bd.query(
    "Insert into tbl_fichas(nome, numero, texto, cena) VALUES(?,?,?,?)",
    [dados.nome, dados.numero, dados.texto, dados.cena]
  );
  //houve campos duplicados
  if (resposta_bd.stat === 2) {
    resultadofinal.resposta = "NotAdded";
    resultadofinal.stat = resposta_bd.stat;
  }
  //sucesso
  else if (resposta_bd.stat === 0) {
    resultadofinal.resposta = "Added";
    resultadofinal.stat = 0;
  }
  //ocorreu um erro com a base de dados
  else {
    //authenticação automática
    //mensagem = await this.beAuthenticate(bd, dados);
    resultadofinal.resposta = resposta_bd.resposta;
  }
  return resultadofinal;
};
