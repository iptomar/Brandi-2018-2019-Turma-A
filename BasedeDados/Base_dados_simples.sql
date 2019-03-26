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
    userFK INT,
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
DROP TABLE IF EXISTS tbl_fichasRegistos;
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

#ADICIONEI MAIS ISTO
INSERT INTO TBL_ROLES (role) values("Admin");
INSERT INTO TBL_ROLES (role) values("Aluno");
INSERT INTO tbl_utilizadores (login, email, password, salt, roleFK) values ("admin", "admin@mail.com", "$2b$10$WgipzU.uVvoM1nliHmhWu.dDrMuqJzm72yUk248ogM.Y9KLKgtdoS", "$2b$10$WgipzU.uVvoM1nliHmhWu.", 1); # password = admin
INSERT INTO tbl_tecnicos (nome, habilitacoes, nivelProfissional, userFK) values ("Aníbal Teste", "Bom em tudo", 10, 1);
INSERT INTO tbl_interessados (nome, enderecoPostal, email, tipo) values ("Esdrubal Teste", "2220-012", "EsdrubalTeste@mail.com", "Proprietário");
INSERT INTO tbl_fichaRegistoIdentificacao (visible, designacao. processoLCRM, processoCEARC, dataEntrada, dataConclusao, dataEntrega, coordenacao, direcaoTecnica, localidade, interessadoFK) values (true, "Cadeira de madeira", "1234", "1234", "2018-03-26", "", "", "Mário Teste", "Maria Teste", "Tomar", 1);
INSERT INTO tbl_registoTecnicos (fichaRegistoFK, tecnicoFK) values (1, 1);