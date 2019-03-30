const mysql = require("mysql");

//************************************* Base de DADOS *************************************
class BasedeDados {
  constructor(host, user, password, connectionLimit, database) {
    this._pool = mysql.createPool({
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
   * @returns {JSON} {stat:0<sem erro>, 1<ECONNREFUSED>, 2<ER_DUP_ENTRY>,resposta: {<resposta base de dados>}}
   * erros:
   * -1 connecao com a base de dados
   * -2 campos duplicados
   * -3 foreign keys nao existentes
   */
  async query(quer, params) {
    let connection;
    var response = {
      stat: 1,
      resposta: {}
    };
    try {
      connection = await new Promise(async (resolve, reject) => {
        await this._pool.query(quer, params, async (error, results, fields) => {
          if (error) reject(error);
          resolve(results);
        });
      });
      response.stat = 0;
      response.resposta = connection;
    } catch (ex) {
      //database conneciton
      if (ex.code === "ECONNREFUSED") response.stat = 1;
      //duplicate field
      if (ex.code === "ER_DUP_ENTRY") response.stat = 2;
      //foreign key error
      if (ex.code === "ER_NO_REFERENCED_ROW_2") response.stat = 3;
      response.resposta = ex;
    } finally {
      return response;
    }
  }
}
exports.BasedeDados = BasedeDados;
