/**
 * Módulo para fazer o CRUD de Roles
 */

/**
 * Método que retorna todas as roles que existem
 * @param bd - base de dados para fazer querys
 * @return {object} stat : 1<erro> 0 <sucesso> resposta<bd.query>
 */
exports.listAllRoles = async bd => {
  let resultadofinal = { stat: 1, resposta: {} };
  let resposta_bd = await bd.query("Select * from tbl_roles");
  if (resposta_bd.stat === 0) {
    resultadofinal.stat = resposta_bd.stat;
    resultadofinal.resposta = resposta_bd.resposta;
  }
  return resultadofinal;
};

/**
 * Método que retorna cria role na base de dados
 * @param dados - role nome da role
 * @param bd - base de dados para fazer querys
 */
exports.createRole = async (bd, dados) => {
  let resultadofinal = { stat: 1, resposta: {} };
  //verificar se o campo role esta preenchido
  if (dados.role) {
    //verificar se a role ja existe
    let resposta_bd = await bd.query("Select * from tbl_roles where role = ?", [
      dados.role
    ]);
    if (resposta_bd === 0 && resposta_bd.resposta.length > 0) {
      //inserir na base de dados
      let resposta_bd2 = await bd.query("Insert into tbl_roles where role =?", [
        dados.role
      ]);
      //verificar se foi inserido na base de dados
      if (resposta_bd2.stat === 0) {
        resultadofinal.stat = 0;
        resultadofinal.resposta = "RoleCreated";
      }
    }
  }
  return resultadofinal;
};
/**
 * Método que permite actualizar uma role
 * @param dados - dado roleID que para  alterar a role
 * @param bd - base de dados para executar a query
 */
exports.updateRole = async (bd, dados) => {
  let resultadofinal = { stat: 1, resposta: {} };
  //verificar se o campo role esta preenchido
  if (dados.role) {
    //pesquisar pela role
    let resposta_bd = await bd.query(
      "Select * from tbl_role where role = ? limit 1",
      [dados.role]
    );
    //encontrou a role
    if (resposta_bd.stat === 0 && resposta_bd.resposta.length > 0) {
      let resposta_bd2 = await bd.query(
        "Update tbl_roles set role = ? where roleID = ?",
        [dados.role, dados.roleID]
      );
      //registo actualizado
      if (resposta_bd2.stat === 0) {
        resultadofinal.stat = 0;
        resultadofinal.resposta = resposta_bd2.resposta;
      }
    }
  }
  return resultadofinal;
};
/**
 * Método que permite apagar uma role
 * @param dados - roleID para  apagar a role
 * @param bd - base de dados para fazer query
 */
exports.deleteRole = async (bd, dados) => {
  let resultadofinal = { stat: 1, resposta: {} };
  //verificar se o campo roleID esta preenchido
  if (dados.roleID) {
    //pesquisar a role que o utilizador quer apagar
    let resposta_bd = bd.query("Select * from tbl_roles where roleID = ?", [
      dados.roleID
    ]);
    //encontrou a role
    if (resposta_bd.stat === 0 && resposta_bd.resposta.length > 0) {
      let resposta_bd2 = await bd.query(
        "Delete from tbl_roles where roleID = ?",
        [dados.roleID]
      );
      //apagou a role com sucesso
      if (resposta_bd2.stat === 0) {
        resultadofinal.stat = 0;
        resultadofinal.resposta = resposta_bd2.resposta;
      }
    }
  }
  return resultadofinal;
};

/**
 * Método que permite fazer a pesquisa de uma determinada role
 * @param dados - roleID para fazer a pesquisa da role
 * @param bd - base de dados para query
 */
exports.listRole = async (bd, dados) => {
  let resultadofinal = { stat: 1, resposta: {} };
  //verificar se o campo roleID esta preenchido
  if (dados.roleID) {
    //pesquisa da role
    let resposta_bd = await bd.query(
      "Select * from tbl_roles where roleID = ? limit 1",
      [dados.roleID]
    );
    //nao ocorreu nenhum problema ao pesquisar
    if (resposta_bd.stat === 0) {
      resultadofinal.stat = 0;
      resultadofinal.resposta = resposta_bd.resposta;
    }
  }
  return resultadofinal;
};
