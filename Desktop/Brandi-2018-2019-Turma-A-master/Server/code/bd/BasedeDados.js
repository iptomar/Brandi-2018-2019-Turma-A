const mariadb = require("mariadb");

//************************************* Base de DADOS *************************************
class BasedeDados {
  constructor(host, user, password, connectionLimit, database) {
    this._pool = mariadb.createPool({
      host: host,
      user: user,
      password: password,
      connectionLimit: connectionLimit,
      database: database
    });
  }

  /**
   * faz query a base de dados
   * @param {string} quer query
   * @param {object[]} params parametros da query
   * @returns {JSON} {stat: 1<error>, 0<sem erro>,resposta: {<resposta base de dados>}}
   */
  async query(quer, params) {
    let connecao;
    var resultado = {
      stat: 1,
      resposta: {}
    };
    try {
      connecao = await this._pool.getConnection(); //conecação
      resultado.resposta = await connecao.query(quer, params); //query
      resultado.stat = 0; //query bem sucedida
    } catch (error) {
      resultado.resposta = error; //erro da query
    } finally {
      if (connecao) connecao.end();
      return resultado;
    }
  }
}
exports.BasedeDados = BasedeDados;
