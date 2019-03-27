const jwt = require("jsonwebtoken");
/**
 * @param req - request dados que vem para o servidor
 * @return {object} erro -> objeto com campos name e message, decode objeto com campos inseridos no payload do token
 */
exports.getToken = async req => {
  //procurar token no cabecalho do browser
  let token = req.header("x-auth-token");
  //se nao existe token no cabecalho
  if (token === undefined) {
    return null;
  } else if (token) {
    try {
      const decode = jwt.verify(token, "ABCD");
      return decode;
    } catch (error) {
      return error;
    }
  }
};
/**
 * Método para gerar um token
 * @return {token} token
 */
exports.generateToken = async dados => {
  return (token = jwt.sign(JSON.stringify(dados), "ABCD"));
};
