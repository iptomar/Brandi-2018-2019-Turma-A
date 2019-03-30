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

#ADICIONEI MAIS ISTO
INSERT INTO tbl_roles (role) values("Admin");
INSERT INTO tbl_roles (role) values("Aluno");
INSERT INTO tbl_roles (role) values("Tecnicos");
INSERT INTO tbl_utilizadores (login, email, password, salt, roleFK) values ("admin", "admin@mail.com", "$2b$10$7io89FC0T16oI4cuZf5A.eKUlNHmPHWhqbZAjZwG2.l/q4jOt54xO", "$2b$10$7io89FC0T16oI4cuZf5A.e", 1); # password = admin
INSERT INTO tbl_utilizadores (login, email, password, salt, roleFK) values ("tecnico1", "tecnico1@mail.com", "$2b$10$/xQxm72q/9uIYcdRzD1leeQsoAfxy2k2nliWx9EBsMpUlFyvbQp4.", "$2b$10$/xQxm72q/9uIYcdRzD1lee", 3); # password = tecnico
INSERT INTO tbl_utilizadores (login, email, password, salt, roleFK) values ("tecnico2", "tecnico2@mail.com", "$2b$10$2Y9iK6yq7bkaVlSxs2/4x.xmh.Bc6/pqaH7EIegtz0oiox04OmnCu", "$2b$10$2Y9iK6yq7bkaVlSxs2/4x.", 3); # password = tecnico
INSERT INTO tbl_utilizadores (login, email, password, salt, roleFK) values ("tecnico3", "tecnico3@mail.com", "$2b$10$Uy6VqpjOVVJqJE/u/7JmIuygnFDtFHtluuakXhdNH1Xa54ZLkwr1q", "$2b$10$Uy6VqpjOVVJqJE/u/7JmIu", 3); # password = tecnico
INSERT INTO tbl_utilizadores (login, email, password, salt, roleFK) values ("aluno", "aluno@mail.com", "$2b$10$xZ8KFZkeA0sLNhGBanV9Ueb6m7GNihxL8JjzmRqNtXBWzirwG1NCK", "$2b$10$xZ8KFZkeA0sLNhGBanV9Ue", 2); # password = aluno
INSERT INTO tbl_tecnicos (nome, habilitacoes, nivelProfissional, userFK) values ("Aníbal Teste", "Bom em tudo", 10, 1);
INSERT INTO tbl_tecnicos (nome, habilitacoes, nivelProfissional, userFK) values ("António Teste", "Mediano", 8, 2);
INSERT INTO tbl_interessados (nome, enderecoPostal, email, tipo) values ("Esdrubal Teste", "2220-012", "EsdrubalTeste@mail.com", "Proprietário");
INSERT INTO tbl_interessados (nome, enderecoPostal, email, tipo) values ("Carlos Teste", "1243-011", "CarlosTeste@mail.com", "Proprietário");
INSERT INTO tbl_interessados (nome, enderecoPostal, email, tipo) values ("Jacinto Teste", "3323-312", "JacintoTeste@mail.com", "Proprietário");
INSERT INTO tbl_fichaRegistoIdentificacao (visible, designacao, processoLCRM, processoCEARC, dataEntrada, coordenacao, direcaoTecnica, localidade, interessadoFK) values (true, "Cadeira de madeira", "1234", "1234", "2018-03-26", "Mário Teste", "Maria Teste", "Tomar", 1);
INSERT INTO tbl_fichaRegistoIdentificacao (visible, designacao, processoLCRM, processoCEARC, dataEntrada, coordenacao, direcaoTecnica, localidade, interessadoFK) values (true, "Mesa de madeira", "4321", "4321", "2018-03-30", "Carlos Teste", "Carlinhos Teste", "Tomar", 2);
INSERT INTO tbl_fichaRegistoIdentificacao (visible, designacao, processoLCRM, processoCEARC, dataEntrada, coordenacao, direcaoTecnica, localidade, interessadoFK) values (false, "Estatua de madeira", "1243", "1243", "2018-03-29", "Faguntes Teste", "Fabio Teste", "Tomar", 3);
INSERT INTO tbl_registoTecnicos (fichaRegistoFK, tecnicoFK) values (1, 1);
INSERT INTO tbl_registoTecnicos (fichaRegistoFK, tecnicoFK) values (2, 2);
INSERT INTO tbl_registoTecnicos (fichaRegistoFK, tecnicoFK) values (3, 1);
