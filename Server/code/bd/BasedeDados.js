const mysql = require("mysql");

//************************************* Base de DADOS *************************************
class BasedeDados {
  constructor(host, user, password, connectionLimit, database) {
    this._pool = mysql.createPool({
      host: host,
      user: user,
      password: password,
      connectionLimit: connectionLimit,
      database: database,
      timezone: 'UTC'
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
      //datas incorretas ou inteiros incorretos
      if (
        ex.code === "ER_TRUNCATED_WRONG_VALUE" ||
        ex.code === "ER_TRUNCATED_WRONG_VALUE_FOR_FIELD"
      )
        response.stat = 4;
      response.resposta = ex;
   
    } finally {
      return response;
    }
  }
  async errorDUPENTRY(string) {
    var n = string.lastIndexOf("key ");
    var res = string.substring(n + 5, string.length - 1);
    return res;
  }
  async error_TRUNCATED(string) {
    var n = string.lastIndexOf("column");
    var n2 = string.lastIndexOf("at");
    var res = string.substring(n + 6, n2);
    return res;
  }
  async ER_NO_REFERENCED_ROW_2(string) {
    var n = string.lastIndexOf("FOREIGN KEY");
    var n2 = string.lastIndexOf("REFERENCES");
    var res = string.substring(n + 11, n2);
    return res;
  }
  async tratamentoErros(error, string) {
    let stringerror;
    switch (error) {
      case 2:
        stringerror = await this.errorDUPENTRY(string);
        break;
      case 3:
        stringerror = await this.ER_NO_REFERENCED_ROW_2(string);
        break;
      case 4:
        stringerror = await this.error_TRUNCATED(string);
        break;
    }
    return "Erro no campo " + stringerror;
  }
}
exports.BasedeDados = BasedeDados;
