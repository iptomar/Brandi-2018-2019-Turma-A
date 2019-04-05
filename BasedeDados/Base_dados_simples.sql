DROP DATABASE IF exists brandi_a;
CREATE DATABASE brandi_a;
USE brandi_a;
DROP TABLE IF EXISTS tbl_roles;
CREATE TABLE tbl_roles
(
    roleID INT NOT NULL AUTO_INCREMENT,
    role VARCHAR(255) NOT NULL UNIQUE,
    PRIMARY KEY(roleID)
);
DROP TABLE IF EXISTS tbl_utilizadores;
CREATE TABLE tbl_utilizadores
(
    userID INT NOT NULL AUTO_INCREMENT,
    visible bool not null, #EXTRA
    login VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(1024) NOT NULL,
    salt VARCHAR(512) NOT NULL,
    roleFK INT NOT NULL,
    PRIMARY KEY(userID),
    FOREIGN KEY(roleFK) REFERENCES tbl_roles(roleID)
);
DROP TABLE IF EXISTS tbl_tecnicos;
CREATE TABLE tbl_tecnicos
(
    tecnicoID INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    habilitacoes VARCHAR(255) NOT NULL,
    nivelProfissional INT NOT NULL,
    userFK INT NOT NULL UNIQUE,
    PRIMARY KEY(tecnicoID),
    FOREIGN KEY(userFK) REFERENCES tbl_utilizadores(userID)
);
DROP TABLE IF EXISTS tbl_interessados;
CREATE TABLE tbl_interessados
(
    interessadoID INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    enderecoPostal VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    tipo VARCHAR(255) NOT NULL,
    PRIMARY KEY(interessadoID)
);
DROP TABLE IF EXISTS tbl_fichaRegistoIdentificacao;
CREATE TABLE tbl_fichaRegistoIdentificacao
(
    fichaRegistoID INT NOT NULL AUTO_INCREMENT,
    visible bool not null, #EXTRA
    designacao VARCHAR(255) NOT NULL,
    processoLCRM VARCHAR(255) NOT NULL UNIQUE,
    processoCEARC VARCHAR(255) NOT NULL UNIQUE,
    dataEntrada DATE NOT NULL,
    dataConclusao DATE,
    dataEntrega DATE,
    coordenacao VARCHAR(255) NOT NULL,
    direcaoTecnica VARCHAR(255) NOT NULL,
    localidade VARCHAR(255) NOT NULL,
    interessadoFK INT,
    PRIMARY KEY(fichaRegistoID),
    FOREIGN KEY(interessadoFK) REFERENCES tbl_interessados(interessadoID)
);

DROP TABLE IF EXISTS tbl_registoTecnicos;
CREATE TABLE tbl_registoTecnicos
(
    registoTecnicoID INT NOT NULL AUTO_INCREMENT,
    fichaRegistoFK INT,
    tecnicoFK INT,
    PRIMARY KEY(registoTecnicoID),
    FOREIGN KEY(fichaRegistoFK) REFERENCES tbl_fichaRegistoIdentificacao(fichaRegistoID),
    FOREIGN KEY(tecnicoFK) REFERENCES tbl_tecnicos(tecnicoID)
);

INSERT INTO TBL_ROLES (role) values("Admin");
INSERT INTO TBL_ROLES (role) values("Aluno");
INSERT INTO TBL_ROLES (role) values("Tecnicos");
INSERT INTO tbl_utilizadores (visible, login, email, password, salt, roleFK) values (true, "admin", "admin@mail.pt", "$2b$10$mSuvyD.arjNUXw3IkIbLNuFGkF3ler3Y5pcZyovaQ2q500OxUa/1S", "$2b$10$mSuvyD.arjNUXw3IkIbLNu", 1); # password = admin
INSERT INTO tbl_utilizadores (visible, login, email, password, salt, roleFK) values (true, "tecnico1", "tecnico1@mail.pt", "$2b$10$ydvB/IzUj3rIHD7DmlQ.9.ja0RJnVeYMiIW70Gtxha86NFJ58yT8S", "$2b$10$ydvB/IzUj3rIHD7DmlQ.9.", 3); # password = tecnico
INSERT INTO tbl_utilizadores (visible, login, email, password, salt, roleFK) values (true, "tecnico2", "tecnico2@mail.pt", "$2b$10$5qU/03QwQ9E1wuWlNfuDSuHVcQUSd9vaSKbpgPsa1jN.8CCrU9OJi", "$2b$10$5qU/03QwQ9E1wuWlNfuDSu", 3); # password = tecnico
INSERT INTO tbl_utilizadores (visible, login, email, password, salt, roleFK) values (true, "tecnico3", "tecnico3@mail.pt", "$2b$10$SPuYiCVNKUs1wl38h9nKZuRrrM20zrWL4V.CGxq1OAFC1iXqUi4eu", "$2b$10$SPuYiCVNKUs1wl38h9nKZu", 3); # password = tecnico
INSERT INTO tbl_utilizadores (visible, login, email, password, salt, roleFK) values (true, "aluno", "aluno@mail.pt", "$2b$10$p8Y7XuHQDytBUsFpkWSlGuQcPwN/PoChYr1vADIY.0ZNQfV2OB076", "$2b$10$p8Y7XuHQDytBUsFpkWSlGu", 2); # password = aluno
INSERT INTO tbl_tecnicos (nome, habilitacoes, nivelProfissional, userFK) values ("Aníbal Teste", "Bom em tudo", 9, 1);
INSERT INTO tbl_tecnicos (nome, habilitacoes, nivelProfissional, userFK) values ("João Teste", "Primitivo", 2, 2);
INSERT INTO tbl_tecnicos (nome, habilitacoes, nivelProfissional, userFK) values ("Xico Teste", "Razoavel em tudo", 6, 3);
INSERT INTO tbl_interessados (nome, enderecoPostal, email, tipo) values ("Esdrubal Teste", "2220-012", "EsdrubalTeste@mail.com", "Proprietário");
INSERT INTO tbl_interessados (nome, enderecoPostal, email, tipo) values ("Antonieta Teste", "3330-013", "AntonietaTeste@mail.com", "Dono da obra");
INSERT INTO tbl_interessados (nome, enderecoPostal, email, tipo) values ("Capitulina Teste", "4440-014", "CapitulinaTeste@mail.com", "Mecenas");
INSERT INTO tbl_fichaRegistoIdentificacao (visible, designacao, processoLCRM, processoCEARC, dataEntrada, coordenacao, direcaoTecnica, localidade, interessadoFK) values (true, "Cadeira de madeira", "1234", "1234", "2018-03-26", "Mário Teste", "Maria Teste", "Tomar", 1);
INSERT INTO tbl_fichaRegistoIdentificacao (visible, designacao, processoLCRM, processoCEARC, dataEntrada, coordenacao, direcaoTecnica, localidade, interessadoFK) values (true, "Estante de metal", "5678", "5678", "2017-01-02", "Ze Teste", "Marcia Teste", "Torres Novas", 2);
INSERT INTO tbl_fichaRegistoIdentificacao (visible, designacao, processoLCRM, processoCEARC, dataEntrada, coordenacao, direcaoTecnica, localidade, interessadoFK) values (true, "Mesa de barro", "1111", "1111", "2019-03-12", "João Teste", "Joana Teste", "Entroncamento", 2);
INSERT INTO tbl_fichaRegistoIdentificacao (visible, designacao, processoLCRM, processoCEARC, dataEntrada, coordenacao, direcaoTecnica, localidade, interessadoFK) values (true, "Estatueta de loiça", "2222", "2222", "2016-03-23", "António Teste", "Tiago Teste", "Tomar", 3);
INSERT INTO tbl_fichaRegistoIdentificacao (visible, designacao, processoLCRM, processoCEARC, dataEntrada, coordenacao, direcaoTecnica, localidade, interessadoFK) values (true, "Cruz de prata", "3333", "3333", "2010-01-13", "Cruzado Teste", "Areias Teste", "Tomar", 1);
INSERT INTO tbl_fichaRegistoIdentificacao (visible, designacao, processoLCRM, processoCEARC, dataEntrada, coordenacao, direcaoTecnica, localidade, interessadoFK) values (true, "Vaso de ouro", "4444", "4444", "2019-01-22", "Rafael Teste", "André Teste", "Tomar", 2);
INSERT INTO tbl_fichaRegistoIdentificacao (visible, designacao, processoLCRM, processoCEARC, dataEntrada, coordenacao, direcaoTecnica, localidade, interessadoFK) values (true, "Cadeirão de madeira", "5555", "5555", "2019-02-15", "Dario Teste", "Telmo Teste", "Abrantes", 1);
INSERT INTO tbl_fichaRegistoIdentificacao (visible, designacao, processoLCRM, processoCEARC, dataEntrada, coordenacao, direcaoTecnica, localidade, interessadoFK) values (true, "Cruz de ferro", "6666", "6666", "2015-11-23", "Maria Teste", "Areias Teste", "Tomar", 1);
INSERT INTO tbl_fichaRegistoIdentificacao (visible, designacao, processoLCRM, processoCEARC, dataEntrada, coordenacao, direcaoTecnica, localidade, interessadoFK) values (true, "Vaso de vidro", "7777", "7777", "2016-02-21", "Rafael Teste", "André Teste", "Entroncamento", 2);
INSERT INTO tbl_fichaRegistoIdentificacao (visible, designacao, processoLCRM, processoCEARC, dataEntrada, coordenacao, direcaoTecnica, localidade, interessadoFK) values (true, "Gaiola de cobre", "8888", "8888", "2017-02-15", "Dario Teste", "Telmo Teste", "Abrantes", 1);
INSERT INTO tbl_registoTecnicos (fichaRegistoFK, tecnicoFK) values (1, 1);
INSERT INTO tbl_registoTecnicos (fichaRegistoFK, tecnicoFK) values (2, 2);
INSERT INTO tbl_registoTecnicos (fichaRegistoFK, tecnicoFK) values (3, 2);
INSERT INTO tbl_registoTecnicos (fichaRegistoFK, tecnicoFK) values (4, 3);
INSERT INTO tbl_registoTecnicos (fichaRegistoFK, tecnicoFK) values (5, 1);
INSERT INTO tbl_registoTecnicos (fichaRegistoFK, tecnicoFK) values (6, 3);
INSERT INTO tbl_registoTecnicos (fichaRegistoFK, tecnicoFK) values (7, 1);
INSERT INTO tbl_registoTecnicos (fichaRegistoFK, tecnicoFK) values (8, 2);
INSERT INTO tbl_registoTecnicos (fichaRegistoFK, tecnicoFK) values (9, 3);
INSERT INTO tbl_registoTecnicos (fichaRegistoFK, tecnicoFK) values (10, 2);
