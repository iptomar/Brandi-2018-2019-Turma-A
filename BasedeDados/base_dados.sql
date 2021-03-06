﻿DROP DATABASE IF exists brandi_a;
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
	visible BOOL NOT NULL,
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
	visible BOOL NOT NULL, 
    designacao VARCHAR(255) NOT NULL,
    processoLCRM VARCHAR(255) NOT NULL UNIQUE,
    processoCEARC VARCHAR(255) NOT NULL UNIQUE,
    dataEntrada DATE NOT NULL,
    dataConclusao DATE,
    dataEntrega DATE,
    coordenacao VARCHAR(255) NOT NULL,
    direcaoTecnica VARCHAR(255) NOT NULL,
	imagem VARCHAR(255) NOT NULL,
    tipologia VARCHAR(255) NOT NULL,
    analogias VARCHAR(255) NOT NULL,
    dimensoes VARCHAR(255) NOT NULL,
    outrasDimensoes VARCHAR(255) NOT NULL,
    breveDescricao VARCHAR(255) NOT NULL,
    conclusoes VARCHAR(255) NOT NULL,
    oficina VARCHAR(255) NOT NULL,
    datacao VARCHAR(255) NOT NULL,
    localOrigem VARCHAR(255) NOT NULL,
    superCategorias VARCHAR(255) NOT NULL,
    categorias VARCHAR(255) NOT NULL,
    subCategorias VARCHAR(255) NOT NULL,
    interessadoFK INT NOT NULL,
    PRIMARY KEY(fichaRegistoID),
    FOREIGN KEY(interessadoFK) REFERENCES tbl_interessados(interessadoID)
);

DROP TABLE IF EXISTS tbl_folhasDeObra;
CREATE TABLE tbl_folhasDeObra
(
    folhaDeObraID INT NOT NULL AUTO_INCREMENT,
    fichaRIFK INT NOT NULL,
    PRIMARY KEY(folhaDeObraID),
    FOREIGN KEY(fichaRIFK) REFERENCES tbl_fichaRegistoIdentificacao(fichaRegistoID)
);

DROP TABLE IF EXISTS tbl_folhaDeObraLinha;
CREATE TABLE tbl_folhaDeObraLinha
(
    folhaDeObraLinhaID INT NOT NULL AUTO_INCREMENT,
    data DATE NOT NULL,
    designacaoProcedimento VARCHAR(255) NOT NULL,
    materiais varchar(255) not NULL,
    quantidades varchar(255) not null,
    duracao VARCHAR(255) NOT NULL,
    tecnico varchar(255) not null,
    observacoes VARCHAR(255),
    folhaDeObraFK INT NOT NULL,	
    PRIMARY KEY(folhaDeObraLinhaID),
    FOREIGN KEY(folhaDeObraFK) REFERENCES tbl_folhasDeObra(folhaDeObraID)
);

DROP TABLE IF EXISTS tbl_tecnicosFolhasDeObra;
CREATE TABLE tbl_tecnicosFolhasDeObra
(
    tecnicoFolhaDeObraID INT NOT NULL AUTO_INCREMENT,
    tecnicoFK INT NOT NULL,
    folhaDeObraFK INT NOT NULL,
    PRIMARY KEY(tecnicoFolhaDeObraID),
    FOREIGN KEY(tecnicoFK) REFERENCES tbl_tecnicos(tecnicoID),
    FOREIGN KEY(folhaDeObraFK) REFERENCES tbl_folhasDeObra(folhaDeObraID)
);

DROP TABLE IF EXISTS tbl_registoTecnicos;
CREATE TABLE tbl_registoTecnicos
(
    registoTecnicoID INT NOT NULL AUTO_INCREMENT,
    fichaRegistoFK INT NOT NULL,
    tecnicoFK INT NOT NULL,
    PRIMARY KEY(registoTecnicoID),
    FOREIGN KEY(fichaRegistoFK) REFERENCES tbl_fichaRegistoIdentificacao(fichaRegistoID),
    FOREIGN KEY(tecnicoFK) REFERENCES tbl_tecnicos(tecnicoID)
);

DROP TABLE IF EXISTS tbl_fichasTecnicas;
CREATE TABLE tbl_fichasTecnicas
(
    fichaTecnicaID INT NOT NULL AUTO_INCREMENT,
	visible BOOLEAN,
    localizacao VARCHAR(255),
    proprietario VARCHAR(255),
    codPostalProprietario VARCHAR(255),
    emailProprietario VARCHAR(255),
    contactoProprietario VARCHAR(255),
    donoObra VARCHAR(255),
    codPostalDonoObra VARCHAR(255),
    contactoDonoObra VARCHAR(255),
    mecenas VARCHAR(255),
    codPostalMecenas VARCHAR(255),
    contactoMecenas VARCHAR(255),
    imgGrafico VARCHAR(255),
    bemIntegradoEmConjunto BOOLEAN,
    tipoBensConjunto VARCHAR(255),
    elemConstConj VARCHAR(255),
    materiasElementosAcessorios VARCHAR(255),
    marcasInscricoesAssinaturas VARCHAR(255),
    marcasInscricoesMontagem VARCHAR(255),
    marcasInscricoesConstrucao VARCHAR(255),
    classPatrimonial VARCHAR(255),
    epoca VARCHAR(255),
    qualidade VARCHAR(255),
    materiaisEstruturaSuporte VARCHAR(255),
    materiaisSuperficies VARCHAR(255),
    tecnicasEstruturaSuporte VARCHAR(255),
    tecnicasSuperficie VARCHAR(255),
    condAmbDescricao VARCHAR(255),
    condAmbFrioTemperatura VARCHAR(255),
    condAmbFrioHumidade VARCHAR(255),
    condAmbFrioPeriodoInicio VARCHAR(255),
    condAmbFrioPeriodoFim VARCHAR(255),
    condAmbQuenteTemperatura VARCHAR(255),
    condAmbQuenteHumidade VARCHAR(255),
    condAmbQuentePeriodoInicio VARCHAR(255),
    condAmbQuentePeriodoFim VARCHAR(255),
    ilumArtTipo VARCHAR(255),
    ilumArtValorIluminancia VARCHAR(255),
    ilumArtValurUV VARCHAR(255),
    ilumArtValorRealUV VARCHAR(255),
    ilumNatOrigem VARCHAR(255),
    ilumNatValorIluminancia VARCHAR(255),
    ilumNatValorUV VARCHAR(255),
    ilumNatValorRealUV VARCHAR(255),
    poluicaoAgentes VARCHAR(255),
    poluicaoFontesOrigem VARCHAR(255),
    poluicaoResultados VARCHAR(255),
    poluicaoObservacoesConclusoes VARCHAR(255),
    -- campos pagina 4, falta parte de objetivos gerais 
    examesAnalisesInterpResultados VARCHAR(255),
    examesAnalisesObsConclusoes VARCHAR(255),
    -- campos pagina 5
    estadoConservFQMestrutura VARCHAR(255),
    estadoConservFQMsuperficie VARCHAR(255),
    estadoConservFQMelementosAcess VARCHAR(255),
    estadoConservBioEstrutura VARCHAR(255),
    estadoConservBioSuperficie VARCHAR(255),
    estadoConservBioElementosAcess VARCHAR(255),
    estadoConservObsConclusoes VARCHAR(255),
    -- campos pagina 6 e 7
    estruturaIntervAnter TEXT,
	superficieIntervAnter TEXT,
	elementosAcessoriosIntervAnter TEXT,
	observaçoesConclusoesPag6 TEXT,
	tipoInterv TEXT,
	aspetosEspecificosPag6 TEXT,
	tipoIntervCR TEXT,
	EstruturaPropPag6 TEXT,
	EstruturaPropRecPag6 TEXT,
	SuperficiePropPag6 TEXT,
	SuperficiePropRecPag6 TEXT,
	ElementosAcessPropPag6 TEXT,
    ElementosAcessPropRecPag6 TEXT,
    observaçoesConclusoesPag7 TEXT,
    -- campos pagina 8
    estruturaPag8 TEXT,
    recursosEstruturaPag8 TEXT,
    superficiePag8 TEXT,
    recursosSuperficiePag8 TEXT,
    elementosAcessoriosPag8 TEXT,
    recursosElementosAcPag8 TEXT,
    observaçoesConclusoesPag8 TEXT,
    -- campos pagina 9
    relTecInterLCRM TEXT,
    tipoDesigOrig TEXT,
    refOrig TEXT,
    entidadeOrig TEXT,
    tipoDesigDocGraf TEXT,
    refDocGraf TEXT,
    entidadeDocGraf TEXT,
    tipoDesigExames TEXT,
    refExames TEXT,
    entidadeExames TEXT,
    -- campos pagina 10
	atledpArqDoc TEXT,
	tipoArqDoc TEXT,
	localArqDoc TEXT,
	cotaArqDoc TEXT,
	atledpIcon TEXT,
	tipoIcon TEXT,
	localIcon TEXT,
	cotaIcon TEXT,
	atledpBiblio TEXT,
	tipoBiblio TEXT,
	localBiblio TEXT,
	cotaBiblio TEXT,
	atledpOutras TEXT,
	tipoOutras TEXT,
	localOutras TEXT,
	cotaOutras TEXT,
	fichaRegistoFK INT NOT NULL ,
    PRIMARY KEY(fichaTecnicaID),
	FOREIGN KEY(fichaRegistoFK)
    REFERENCES tbl_fichaRegistoIdentificacao(fichaRegistoID)
);

-- Adicionei estas tabelas para testes da pagina 4
Drop table if exists tbl_testespagina4objectivosGerais;
create table tbl_testespagina4objectivosGerais(
    ID int not null AUTO_INCREMENT,
    Objectivo varchar(255) not null,
    fichaTecnicaFK int not null,
    PRIMARY KEY(ID),
    FOREIGN key (fichaTecnicaFK) REFERENCES tbl_fichasTecnicas(fichaTecnicaID)
);
-- esta tabela representa a tabela onde o utilizador pode inserir mais descrições sobre a ficha tecnica na pagina 4
    drop table if exists tbl_testespagina4tabelas;
    create table tbl_testespagina4tabelas(
        id int not null AUTO_INCREMENT,
        tipoReferencia TEXT,
        LocalizacaoAreaPonto TEXT,
        ObjectivosEspecificos TEXT,
        Resultados TEXT,
        DataDePreenchimento DATE,
        fichaTecnicaFK int not null,
        PRIMARY key (id),
        FOREIGN key (fichaTecnicaFK) REFERENCES tbl_fichasTecnicas(fichaTecnicaID)
    );
 -- esta tabela representa a tabela onde o utilizador pode inserir a constituição da equipa na página 10
 drop table if exists tbl_constituicaoequipa;
 create table tbl_constituicaoequipa(
     id int not null AUTO_INCREMENT,
     constEq TEXT,
     funcDes TEXT,
     habPro  TEXT,
     fichaTecnicaFK int not null,
     PRIMARY key (id),
     FOREIGN key (fichaTecnicaFK) REFERENCES tbl_fichasTecnicas(fichaTecnicaID)
 );
 -- esta tabela representa a tabela onde o utilizador pode inserir os testes de solubilidade
drop table if exists tbl_testessolventes;
create table tbl_testessolventes (
     id int not null AUTO_INCREMENT,
     idEstratoSujidade TEXT,
     caracteristicas TEXT,
     fichaRIFK int not null,
     PRIMARY key (id),
     FOREIGN key (fichaRIFK) REFERENCES tbl_fichaRegistoIdentificacao(fichaRegistoID)
);

 -- tabela que complementa a informação da página dos testes de solubilidade
drop table if exists tbl_testesSolventesComplementar;
create table tbl_testesSolventesComplementar(
    id int not null AUTO_INCREMENT,
    solvente TEXT,
    grauDeEficacia TEXT,
    observacoes TEXT,
    testeSolventFK int,
    PRIMARY key (id),
    FOREIGN key (testeSolventFK) REFERENCES tbl_testessolventes(id)
);



drop table if exists tbl_imagensFichaTecnica;
create table tbl_imagensFichaTecnica(
    id int not null AUTO_INCREMENT,
    imagem TEXT,
    fichaTecnicaFK int not null,
    PRIMARY key (id),
    FOREIGN key (fichaTecnicaFK) REFERENCES tbl_fichasTecnicas(fichaTecnicaID)
);

--           INSERTS           --


INSERT INTO tbl_roles (role) values("Admin");
INSERT INTO tbl_roles (role) values("Aluno");
INSERT INTO tbl_roles (role) values("Tecnicos");

INSERT INTO tbl_utilizadores (visible, login, email, password, salt, roleFK) values (true, "admin", "admin@mail.pt", "$2b$10$mSuvyD.arjNUXw3IkIbLNuFGkF3ler3Y5pcZyovaQ2q500OxUa/1S", "$2b$10$mSuvyD.arjNUXw3IkIbLNu", 1); # password = admin
INSERT INTO tbl_utilizadores (visible, login, email, password, salt, roleFK) values (true, "tecnico1", "tecnico1@mail.pt", "$2b$10$ydvB/IzUj3rIHD7DmlQ.9.ja0RJnVeYMiIW70Gtxha86NFJ58yT8S", "$2b$10$ydvB/IzUj3rIHD7DmlQ.9.", 3); # password = tecnico
INSERT INTO tbl_utilizadores (visible, login, email, password, salt, roleFK) values (true, "tecnico2", "tecnico2@mail.pt", "$2b$10$5qU/03QwQ9E1wuWlNfuDSuHVcQUSd9vaSKbpgPsa1jN.8CCrU9OJi", "$2b$10$5qU/03QwQ9E1wuWlNfuDSu", 3); # password = tecnico
INSERT INTO tbl_utilizadores (visible, login, email, password, salt, roleFK) values (true, "tecnico3", "tecnico3@mail.pt", "$2b$10$SPuYiCVNKUs1wl38h9nKZuRrrM20zrWL4V.CGxq1OAFC1iXqUi4eu", "$2b$10$SPuYiCVNKUs1wl38h9nKZu", 3); # password = tecnico
INSERT INTO tbl_utilizadores (visible, login, email, password, salt, roleFK) values (true, "aluno", "aluno@mail.pt", "$2b$10$p8Y7XuHQDytBUsFpkWSlGuQcPwN/PoChYr1vADIY.0ZNQfV2OB076", "$2b$10$p8Y7XuHQDytBUsFpkWSlGu", 2); # password = aluno

INSERT INTO tbl_tecnicos (nome, habilitacoes, nivelProfissional, userFK) values ("Aníbal Teste", "Bom em tudo", 9, 1);
INSERT INTO tbl_tecnicos (nome, habilitacoes, nivelProfissional, userFK) values ("João Teste", "Primitivo", 2, 2);
INSERT INTO tbl_tecnicos (nome, habilitacoes, nivelProfissional, userFK) values ("Xico Teste", "Razoavel em tudo", 6, 3);
INSERT INTO tbl_tecnicos (nome, habilitacoes, nivelProfissional, userFK) values ("Maria Teste", "Bastante boa", 8, 4);
INSERT INTO tbl_tecnicos (nome, habilitacoes, nivelProfissional, userFK) values ("Zeca Teste", "Excelente", 10, 5);

INSERT INTO tbl_interessados (nome, enderecoPostal, email, tipo) values ("Esdrubal Teste", "2220-012", "EsdrubalTeste@mail.com", "Proprietário");
INSERT INTO tbl_interessados (nome, enderecoPostal, email, tipo) values ("Antonieta Teste", "3330-013", "AntonietaTeste@mail.com", "Dono da obra");
INSERT INTO tbl_interessados (nome, enderecoPostal, email, tipo) values ("Capitulina Teste", "4440-014", "CapitulinaTeste@mail.com", "Mecenas");

INSERT INTO tbl_fichaRegistoIdentificacao (visible, designacao, processoLCRM, processoCEARC, dataEntrada, coordenacao, direcaoTecnica, imagem, tipologia, analogias, dimensoes, outrasDimensoes, breveDescricao, conclusoes, oficina, datacao, localOrigem, superCategorias, categorias, subCategorias, interessadoFK) VALUES (true, "Cadeira de madeira", "1234", "1234", "2018-03-26", "Mário Teste", "Maria Teste", "../images/registoIdentificacao/imagem_CadeiraMadeira.jpg", "Mobiliário civil", "Apresenta características e semelhanças com gaiolas existentes no mercado atual, denotando na sua construção, a inspiração na arquitetura da construção de palácios de cristal do século XIX princípios do século XX.", "85x76x38", "Não se aplica", "Gaiola em madeira, com engradados de arame entrelaçado, com diferentes medidas, encimada com elemento em madeira e argola de sustentação em latão.", "Nada a referir", "Desconhecido", "Final século XIX inícios de XX", "Não foi apurado", "Bens culturais", "Bens culturais móveis", "Mobiliário", 1);
INSERT INTO tbl_fichaRegistoIdentificacao (visible, designacao, processoLCRM, processoCEARC, dataEntrada, coordenacao, direcaoTecnica, imagem, tipologia, analogias, dimensoes, outrasDimensoes, breveDescricao, conclusoes, oficina, datacao, localOrigem, superCategorias, categorias, subCategorias, interessadoFK) VALUES (true, "Estante de metal", "5678", "5678", "2017-01-02", "Ze Teste", "Mario Teste", "../images/registoIdentificacao/imagem_EstanteMetal.jpg", "Mobiliário civil", "Apresenta características e semelhanças com gaiolas existentes no mercado atual, denotando na sua construção, a inspiração na arquitetura da construção de palácios de cristal do século XIX princípios do século XX.", "30x79x30", "Não se aplica", "Gaiola em madeira, com engradados de arame entrelaçado, com diferentes medidas, encimada com elemento em madeira e argola de sustentação em latão.", "Nada a referir", "Desconhecido", "Final século XIX inícios de XX", "Não foi apurado", "Bens culturais", "Bens culturais móveis", "Mobiliário", 1);
INSERT INTO tbl_fichaRegistoIdentificacao (visible, designacao, processoLCRM, processoCEARC, dataEntrada, coordenacao, direcaoTecnica, imagem, tipologia, analogias, dimensoes, outrasDimensoes, breveDescricao, conclusoes, oficina, datacao, localOrigem, superCategorias, categorias, subCategorias, interessadoFK) VALUES (true, "Mesa de barro", "1111", "1111", "2019-01-11", "João Teste", "Joana Teste", "../images/registoIdentificacao/imagem_MesaBarro.jpg", "Mobiliário civil", "Apresenta características e semelhanças com gaiolas existentes no mercado atual, denotando na sua construção, a inspiração na arquitetura da construção de palácios de cristal do século XIX princípios do século XX.", "70x90x30", "Não se aplica", "Gaiola em madeira, com engradados de arame entrelaçado, com diferentes medidas, encimada com elemento em madeira e argola de sustentação em latão.", "Nada a referir", "Desconhecido", "Final século XIX inícios de XX", "Não foi apurado", "Bens culturais", "Bens culturais móveis", "Mobiliário", 1);
INSERT INTO tbl_fichaRegistoIdentificacao (visible, designacao, processoLCRM, processoCEARC, dataEntrada, coordenacao, direcaoTecnica, imagem, tipologia, analogias, dimensoes, outrasDimensoes, breveDescricao, conclusoes, oficina, datacao, localOrigem, superCategorias, categorias, subCategorias, interessadoFK) VALUES (true, "Estatueta de loiça", "2222", "2222", "2016-07-21", "António Teste", "Tiago Teste", "../images/registoIdentificacao/imagem_EstatuetaLoica.jpg", "Mobiliário civil", "Apresenta características e semelhanças com gaiolas existentes no mercado atual, denotando na sua construção, a inspiração na arquitetura da construção de palácios de cristal do século XIX princípios do século XX.", "70x90x30", "Não se aplica", "Gaiola em madeira, com engradados de arame entrelaçado, com diferentes medidas, encimada com elemento em madeira e argola de sustentação em latão.", "Nada a referir", "Desconhecido", "Final século XIX inícios de XX", "Não foi apurado", "Bens culturais", "Bens culturais móveis", "Mobiliário", 1);
INSERT INTO tbl_fichaRegistoIdentificacao (visible, designacao, processoLCRM, processoCEARC, dataEntrada, coordenacao, direcaoTecnica, imagem, tipologia, analogias, dimensoes, outrasDimensoes, breveDescricao, conclusoes, oficina, datacao, localOrigem, superCategorias, categorias, subCategorias, interessadoFK) VALUES (true, "Cruz de prata", "3333", "3333", "2010-03-20", "Cruzado Teste", "Areias Teste", "../images/registoIdentificacao/imagem_CruzPrata.jpg", "Mobiliário civil", "Apresenta características e semelhanças com gaiolas existentes no mercado atual, denotando na sua construção, a inspiração na arquitetura da construção de palácios de cristal do século XIX princípios do século XX.", "15x20x50", "Não se aplica", "Gaiola em madeira, com engradados de arame entrelaçado, com diferentes medidas, encimada com elemento em madeira e argola de sustentação em latão.", "Nada a referir", "Desconhecido", "Final século XIX inícios de XX", "Não foi apurado", "Bens culturais", "Bens culturais móveis", "Mobiliário", 1);
INSERT INTO tbl_fichaRegistoIdentificacao (visible, designacao, processoLCRM, processoCEARC, dataEntrada, coordenacao, direcaoTecnica, imagem, tipologia, analogias, dimensoes, outrasDimensoes, breveDescricao, conclusoes, oficina, datacao, localOrigem, superCategorias, categorias, subCategorias, interessadoFK) VALUES (true, "Vaso de ouro", "4444", "4444", "2019-02-15", "Rafael Teste", "André Teste", "../images/registoIdentificacao/imagem_VasoOuro.jpg", "Mobiliário civil", "Apresenta características e semelhanças com gaiolas existentes no mercado atual, denotando na sua construção, a inspiração na arquitetura da construção de palácios de cristal do século  XIX princípios do século XX.", "60x45x110", "Não se aplica", "Gaiola em madeira, com engradados de arame entrelaçado, com diferentes medidas, encimada com elemento em madeira e argola de  sustentação em latão.", "Nada a referir", "Desconhecido", "Final século XIX inícios de XX", "Não foi apurado", "Bens culturais", "Bens culturais móveis", "Mobiliário", 1);

INSERT INTO tbl_registoTecnicos (fichaRegistoFK, tecnicoFK) values (1, 1);
INSERT INTO tbl_registoTecnicos (fichaRegistoFK, tecnicoFK) values (2, 3);
INSERT INTO tbl_registoTecnicos (fichaRegistoFK, tecnicoFK) values (3, 2);
INSERT INTO tbl_registoTecnicos (fichaRegistoFK, tecnicoFK) values (4, 4);
INSERT INTO tbl_registoTecnicos (fichaRegistoFK, tecnicoFK) values (5, 5);
INSERT INTO tbl_registoTecnicos (fichaRegistoFK, tecnicoFK) values (6, 1);

INSERT INTO tbl_fichasTecnicas (visible,localizacao,proprietario,codPostalProprietario,emailProprietario,contactoProprietario,donoObra,codPostalDonoObra,contactoDonoObra,mecenas,codPostalMecenas,contactoMecenas,bemIntegradoEmConjunto,tipoBensConjunto,elemConstConj,materiasElementosAcessorios,marcasInscricoesAssinaturas,marcasInscricoesMontagem,marcasInscricoesConstrucao,classPatrimonial,epoca,qualidade,materiaisEstruturaSuporte,materiaisSuperficies,tecnicasEstruturaSuporte,tecnicasSuperficie,condAmbDescricao,condAmbFrioTemperatura,condAmbFrioHumidade,condAmbFrioPeriodoInicio,condAmbFrioPeriodoFim,condAmbQuenteTemperatura,condAmbQuenteHumidade,condAmbQuentePeriodoInicio,condAmbQuentePeriodoFim,ilumArtTipo,ilumArtValorIluminancia,ilumArtValurUV,ilumArtValorRealUV,ilumNatOrigem,ilumNatValorIluminancia,ilumNatValorUV,ilumNatValorRealUV,poluicaoAgentes,poluicaoFontesOrigem,poluicaoResultados,poluicaoObservacoesConclusoes, examesAnalisesInterpResultados,examesAnalisesObsConclusoes,estadoConservFQMestrutura,estadoConservFQMsuperficie,estadoConservFQMelementosAcess,estadoConservBioEstrutura,estadoConservBioSuperficie,estadoConservBioElementosAcess,estadoConservObsConclusoes,estruturaIntervAnter,superficieIntervAnter,elementosAcessoriosIntervAnter,observaçoesConclusoesPag6,tipoInterv,aspetosEspecificosPag6,tipoIntervCR,EstruturaPropPag6,EstruturaPropRecPag6,SuperficiePropPag6,SuperficiePropRecPag6,ElementosAcessPropRecPag6,observaçoesConclusoesPag7,estruturaPag8,recursosEstruturaPag8,superficiePag8,recursosSuperficiePag8,elementosAcessoriosPag8,recursosElementosAcPag8,observaçoesConclusoesPag8,relTecInterLCRM,tipoDesigOrig,refOrig,entidadeOrig,tipoDesigDocGraf,refDocGraf,entidadeDocGraf,tipoDesigExames,refExames,entidadeExames,atledpArqDoc,tipoArqDoc,localArqDoc,cotaArqDoc,atledpIcon,tipoIcon,localIcon,cotaIcon,atledpBiblio,tipoBiblio,localBiblio,cotaBiblio,atledpOutras,tipoOutras,localOutras,cotaOutras,fichaRegistoFK) VALUES (true, "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", true, "a", "a", "a", "a", "a", "a", "a", "Tardio", "Boa", "a", "a", "a", "a", "a", "50", "50", "10", "12", "50", "50", "10", "12", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", 1);
INSERT INTO tbl_fichasTecnicas (visible,localizacao,proprietario,codPostalProprietario,emailProprietario,contactoProprietario,donoObra,codPostalDonoObra,contactoDonoObra,mecenas,codPostalMecenas,contactoMecenas,bemIntegradoEmConjunto,tipoBensConjunto,elemConstConj,materiasElementosAcessorios,marcasInscricoesAssinaturas,marcasInscricoesMontagem,marcasInscricoesConstrucao,classPatrimonial,epoca,qualidade,materiaisEstruturaSuporte,materiaisSuperficies,tecnicasEstruturaSuporte,tecnicasSuperficie,condAmbDescricao,condAmbFrioTemperatura,condAmbFrioHumidade,condAmbFrioPeriodoInicio,condAmbFrioPeriodoFim,condAmbQuenteTemperatura,condAmbQuenteHumidade,condAmbQuentePeriodoInicio,condAmbQuentePeriodoFim,ilumArtTipo,ilumArtValorIluminancia,ilumArtValurUV,ilumArtValorRealUV,ilumNatOrigem,ilumNatValorIluminancia,ilumNatValorUV,ilumNatValorRealUV,poluicaoAgentes,poluicaoFontesOrigem,poluicaoResultados,poluicaoObservacoesConclusoes, examesAnalisesInterpResultados,examesAnalisesObsConclusoes,estadoConservFQMestrutura,estadoConservFQMsuperficie,estadoConservFQMelementosAcess,estadoConservBioEstrutura,estadoConservBioSuperficie,estadoConservBioElementosAcess,estadoConservObsConclusoes,estruturaIntervAnter,superficieIntervAnter,elementosAcessoriosIntervAnter,observaçoesConclusoesPag6,tipoInterv,aspetosEspecificosPag6,tipoIntervCR,EstruturaPropPag6,EstruturaPropRecPag6,SuperficiePropPag6,SuperficiePropRecPag6,ElementosAcessPropRecPag6,observaçoesConclusoesPag7,estruturaPag8,recursosEstruturaPag8,superficiePag8,recursosSuperficiePag8,elementosAcessoriosPag8,recursosElementosAcPag8,observaçoesConclusoesPag8,relTecInterLCRM,tipoDesigOrig,refOrig,entidadeOrig,tipoDesigDocGraf,refDocGraf,entidadeDocGraf,tipoDesigExames,refExames,entidadeExames,atledpArqDoc,tipoArqDoc,localArqDoc,cotaArqDoc,atledpIcon,tipoIcon,localIcon,cotaIcon,atledpBiblio,tipoBiblio,localBiblio,cotaBiblio,atledpOutras,tipoOutras,localOutras,cotaOutras,fichaRegistoFK) VALUES (true, "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", true, "b", "b", "b", "b", "b", "b", "b", "Tardio", "Boa", "b", "b", "b", "b", "b", "50", "50", "10", "12", "50", "50", "10", "12", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", 1);
INSERT INTO tbl_fichasTecnicas (visible,localizacao,proprietario,codPostalProprietario,emailProprietario,contactoProprietario,donoObra,codPostalDonoObra,contactoDonoObra,mecenas,codPostalMecenas,contactoMecenas,bemIntegradoEmConjunto,tipoBensConjunto,elemConstConj,materiasElementosAcessorios,marcasInscricoesAssinaturas,marcasInscricoesMontagem,marcasInscricoesConstrucao,classPatrimonial,epoca,qualidade,materiaisEstruturaSuporte,materiaisSuperficies,tecnicasEstruturaSuporte,tecnicasSuperficie,condAmbDescricao,condAmbFrioTemperatura,condAmbFrioHumidade,condAmbFrioPeriodoInicio,condAmbFrioPeriodoFim,condAmbQuenteTemperatura,condAmbQuenteHumidade,condAmbQuentePeriodoInicio,condAmbQuentePeriodoFim,ilumArtTipo,ilumArtValorIluminancia,ilumArtValurUV,ilumArtValorRealUV,ilumNatOrigem,ilumNatValorIluminancia,ilumNatValorUV,ilumNatValorRealUV,poluicaoAgentes,poluicaoFontesOrigem,poluicaoResultados,poluicaoObservacoesConclusoes, examesAnalisesInterpResultados,examesAnalisesObsConclusoes,estadoConservFQMestrutura,estadoConservFQMsuperficie,estadoConservFQMelementosAcess,estadoConservBioEstrutura,estadoConservBioSuperficie,estadoConservBioElementosAcess,estadoConservObsConclusoes,estruturaIntervAnter,superficieIntervAnter,elementosAcessoriosIntervAnter,observaçoesConclusoesPag6,tipoInterv,aspetosEspecificosPag6,tipoIntervCR,EstruturaPropPag6,EstruturaPropRecPag6,SuperficiePropPag6,SuperficiePropRecPag6,ElementosAcessPropRecPag6,observaçoesConclusoesPag7,estruturaPag8,recursosEstruturaPag8,superficiePag8,recursosSuperficiePag8,elementosAcessoriosPag8,recursosElementosAcPag8,observaçoesConclusoesPag8,relTecInterLCRM,tipoDesigOrig,refOrig,entidadeOrig,tipoDesigDocGraf,refDocGraf,entidadeDocGraf,tipoDesigExames,refExames,entidadeExames,atledpArqDoc,tipoArqDoc,localArqDoc,cotaArqDoc,atledpIcon,tipoIcon,localIcon,cotaIcon,atledpBiblio,tipoBiblio,localBiblio,cotaBiblio,atledpOutras,tipoOutras,localOutras,cotaOutras,fichaRegistoFK) VALUES (true, "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", true, "c", "c", "c", "c", "c", "c", "c", "Tardio", "Boa", "c", "c", "c", "c", "c", "50", "50", "10", "12", "50", "50", "10", "12", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", 1);
INSERT INTO tbl_fichasTecnicas (visible,localizacao,proprietario,codPostalProprietario,emailProprietario,contactoProprietario,donoObra,codPostalDonoObra,contactoDonoObra,mecenas,codPostalMecenas,contactoMecenas,bemIntegradoEmConjunto,tipoBensConjunto,elemConstConj,materiasElementosAcessorios,marcasInscricoesAssinaturas,marcasInscricoesMontagem,marcasInscricoesConstrucao,classPatrimonial,epoca,qualidade,materiaisEstruturaSuporte,materiaisSuperficies,tecnicasEstruturaSuporte,tecnicasSuperficie,condAmbDescricao,condAmbFrioTemperatura,condAmbFrioHumidade,condAmbFrioPeriodoInicio,condAmbFrioPeriodoFim,condAmbQuenteTemperatura,condAmbQuenteHumidade,condAmbQuentePeriodoInicio,condAmbQuentePeriodoFim,ilumArtTipo,ilumArtValorIluminancia,ilumArtValurUV,ilumArtValorRealUV,ilumNatOrigem,ilumNatValorIluminancia,ilumNatValorUV,ilumNatValorRealUV,poluicaoAgentes,poluicaoFontesOrigem,poluicaoResultados,poluicaoObservacoesConclusoes, examesAnalisesInterpResultados,examesAnalisesObsConclusoes,estadoConservFQMestrutura,estadoConservFQMsuperficie,estadoConservFQMelementosAcess,estadoConservBioEstrutura,estadoConservBioSuperficie,estadoConservBioElementosAcess,estadoConservObsConclusoes,estruturaIntervAnter,superficieIntervAnter,elementosAcessoriosIntervAnter,observaçoesConclusoesPag6,tipoInterv,aspetosEspecificosPag6,tipoIntervCR,EstruturaPropPag6,EstruturaPropRecPag6,SuperficiePropPag6,SuperficiePropRecPag6,ElementosAcessPropRecPag6,observaçoesConclusoesPag7,estruturaPag8,recursosEstruturaPag8,superficiePag8,recursosSuperficiePag8,elementosAcessoriosPag8,recursosElementosAcPag8,observaçoesConclusoesPag8,relTecInterLCRM,tipoDesigOrig,refOrig,entidadeOrig,tipoDesigDocGraf,refDocGraf,entidadeDocGraf,tipoDesigExames,refExames,entidadeExames,atledpArqDoc,tipoArqDoc,localArqDoc,cotaArqDoc,atledpIcon,tipoIcon,localIcon,cotaIcon,atledpBiblio,tipoBiblio,localBiblio,cotaBiblio,atledpOutras,tipoOutras,localOutras,cotaOutras,fichaRegistoFK) VALUES (true, "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", true, "d", "d", "d", "d", "d", "d", "d", "Tardio", "Boa", "d", "d", "d", "d", "d", "50", "50", "10", "12", "50", "50", "10", "12", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", 1);
INSERT INTO tbl_fichasTecnicas (visible,localizacao,proprietario,codPostalProprietario,emailProprietario,contactoProprietario,donoObra,codPostalDonoObra,contactoDonoObra,mecenas,codPostalMecenas,contactoMecenas,bemIntegradoEmConjunto,tipoBensConjunto,elemConstConj,materiasElementosAcessorios,marcasInscricoesAssinaturas,marcasInscricoesMontagem,marcasInscricoesConstrucao,classPatrimonial,epoca,qualidade,materiaisEstruturaSuporte,materiaisSuperficies,tecnicasEstruturaSuporte,tecnicasSuperficie,condAmbDescricao,condAmbFrioTemperatura,condAmbFrioHumidade,condAmbFrioPeriodoInicio,condAmbFrioPeriodoFim,condAmbQuenteTemperatura,condAmbQuenteHumidade,condAmbQuentePeriodoInicio,condAmbQuentePeriodoFim,ilumArtTipo,ilumArtValorIluminancia,ilumArtValurUV,ilumArtValorRealUV,ilumNatOrigem,ilumNatValorIluminancia,ilumNatValorUV,ilumNatValorRealUV,poluicaoAgentes,poluicaoFontesOrigem,poluicaoResultados,poluicaoObservacoesConclusoes, examesAnalisesInterpResultados,examesAnalisesObsConclusoes,estadoConservFQMestrutura,estadoConservFQMsuperficie,estadoConservFQMelementosAcess,estadoConservBioEstrutura,estadoConservBioSuperficie,estadoConservBioElementosAcess,estadoConservObsConclusoes,estruturaIntervAnter,superficieIntervAnter,elementosAcessoriosIntervAnter,observaçoesConclusoesPag6,tipoInterv,aspetosEspecificosPag6,tipoIntervCR,EstruturaPropPag6,EstruturaPropRecPag6,SuperficiePropPag6,SuperficiePropRecPag6,ElementosAcessPropRecPag6,observaçoesConclusoesPag7,estruturaPag8,recursosEstruturaPag8,superficiePag8,recursosSuperficiePag8,elementosAcessoriosPag8,recursosElementosAcPag8,observaçoesConclusoesPag8,relTecInterLCRM,tipoDesigOrig,refOrig,entidadeOrig,tipoDesigDocGraf,refDocGraf,entidadeDocGraf,tipoDesigExames,refExames,entidadeExames,atledpArqDoc,tipoArqDoc,localArqDoc,cotaArqDoc,atledpIcon,tipoIcon,localIcon,cotaIcon,atledpBiblio,tipoBiblio,localBiblio,cotaBiblio,atledpOutras,tipoOutras,localOutras,cotaOutras,fichaRegistoFK) VALUES (true, "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", true, "e", "e", "e", "e", "e", "e", "e", "Tardio", "Boa", "e", "e", "e", "e", "e", "50", "50", "10", "12", "50", "50", "10", "12", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", 1);

INSERT INTO tbl_constituicaoequipa (constEq, funcDes, habPro, fichaTecnicaFK) VALUES ("a", "a", "a", 1);
INSERT INTO tbl_constituicaoequipa (constEq, funcDes, habPro, fichaTecnicaFK) VALUES ("b", "b", "b", 2);
INSERT INTO tbl_constituicaoequipa (constEq, funcDes, habPro, fichaTecnicaFK) VALUES ("c", "c", "c", 3);
INSERT INTO tbl_constituicaoequipa (constEq, funcDes, habPro, fichaTecnicaFK) VALUES ("d", "d", "d", 4);
INSERT INTO tbl_constituicaoequipa (constEq, funcDes, habPro, fichaTecnicaFK) VALUES ("e", "e", "e", 5);

INSERT INTO tbl_testespagina4tabelas (tipoReferencia, ObjectivosEspecificos, LocalizacaoAreaPonto, Resultados, DataDePreenchimento, fichaTecnicaFK) VALUES ("a", "a", "a", "a", "2019-06-03",  1);
INSERT INTO tbl_testespagina4tabelas (tipoReferencia, ObjectivosEspecificos, LocalizacaoAreaPonto, Resultados, DataDePreenchimento, fichaTecnicaFK) VALUES ("b", "b", "b", "b", "2019-06-03",  2);
INSERT INTO tbl_testespagina4tabelas (tipoReferencia, ObjectivosEspecificos, LocalizacaoAreaPonto, Resultados, DataDePreenchimento, fichaTecnicaFK) VALUES ("c", "c", "c", "c", "2019-06-03",  3);
INSERT INTO tbl_testespagina4tabelas (tipoReferencia, ObjectivosEspecificos, LocalizacaoAreaPonto, Resultados, DataDePreenchimento, fichaTecnicaFK) VALUES ("d", "d", "d", "d", "2019-06-03",  4);
INSERT INTO tbl_testespagina4tabelas (tipoReferencia, ObjectivosEspecificos, LocalizacaoAreaPonto, Resultados, DataDePreenchimento, fichaTecnicaFK) VALUES ("e", "e", "e", "e", "2019-06-03",  5);


INSERT INTO tbl_testespagina4objectivosGerais (Objectivo, fichaTecnicaFK) VALUES ("identMateriais",  1);
INSERT INTO tbl_testespagina4objectivosGerais (Objectivo, fichaTecnicaFK) VALUES ("identMateriais",  2);
INSERT INTO tbl_testespagina4objectivosGerais (Objectivo, fichaTecnicaFK) VALUES ("identMateriais",  3);
INSERT INTO tbl_testespagina4objectivosGerais (Objectivo, fichaTecnicaFK) VALUES ("identMateriais",  4);
INSERT INTO tbl_testespagina4objectivosGerais (Objectivo, fichaTecnicaFK) VALUES ("identMateriais",  5);

-- Objeto 1
INSERT INTO tbl_testessolventes(idEstratoSujidade, caracteristicas, fichaRIFK) VALUES ("IdentificacaoExtrato1", "Caracteristicas1", 1); -- testesSolventes 1
INSERT INTO tbl_testessolventes(idEstratoSujidade, caracteristicas, fichaRIFK) VALUES ("IdentificacaoExtrato2", "Caracteristicas2", 1); -- testesSolventes 2
INSERT INTO tbl_testessolventes(idEstratoSujidade, caracteristicas, fichaRIFK) VALUES ("IdentificacaoExtrato3", "Caracteristicas3", 1); -- testesSolventes 3
INSERT INTO tbl_testessolventes(idEstratoSujidade, caracteristicas, fichaRIFK) VALUES ("IdentificacaoExtrato4", "Caracteristicas4", 1); -- testesSolventes 4
INSERT INTO tbl_testessolventes(idEstratoSujidade, caracteristicas, fichaRIFK) VALUES ("IdentificacaoExtrato5", "Caracteristicas5", 1); -- testesSolventes 5

-- testesSolventes 1 para Objeto 1
INSERT INTO tbl_testesSolventesComplementar(solvente, grauDeEficacia, observacoes, testeSolventFK) VALUES ("Solvente1", "3", "Observações1", 1);
INSERT INTO tbl_testesSolventesComplementar(solvente, grauDeEficacia, observacoes, testeSolventFK) VALUES ("Solvente2", "2", "Observações2", 1);
INSERT INTO tbl_testesSolventesComplementar(solvente, grauDeEficacia, observacoes, testeSolventFK) VALUES ("Solvente3", "1", "Observações3", 1);
INSERT INTO tbl_testesSolventesComplementar(solvente, grauDeEficacia, observacoes, testeSolventFK) VALUES ("Solvente4", "5", "Observações4", 1);

-- testesSolventes 2 para Objeto 1
INSERT INTO tbl_testesSolventesComplementar(solvente, grauDeEficacia, observacoes, testeSolventFK) VALUES ("Solvente1", "3", "Observações1", 2);
INSERT INTO tbl_testesSolventesComplementar(solvente, grauDeEficacia, observacoes, testeSolventFK) VALUES ("Solvente2", "2", "Observações2", 2);
INSERT INTO tbl_testesSolventesComplementar(solvente, grauDeEficacia, observacoes, testeSolventFK) VALUES ("Solvente3", "1", "Observações3", 2);
INSERT INTO tbl_testesSolventesComplementar(solvente, grauDeEficacia, observacoes, testeSolventFK) VALUES ("Solvente4", "5", "Observações4", 2);

-- testesSolventes 3 para Objeto 1
INSERT INTO tbl_testesSolventesComplementar(solvente, grauDeEficacia, observacoes, testeSolventFK) VALUES ("Solvente1", "3", "Observações1", 3);
INSERT INTO tbl_testesSolventesComplementar(solvente, grauDeEficacia, observacoes, testeSolventFK) VALUES ("Solvente2", "2", "Observações2", 3);
INSERT INTO tbl_testesSolventesComplementar(solvente, grauDeEficacia, observacoes, testeSolventFK) VALUES ("Solvente3", "1", "Observações3", 3);
INSERT INTO tbl_testesSolventesComplementar(solvente, grauDeEficacia, observacoes, testeSolventFK) VALUES ("Solvente4", "5", "Observações4", 3);

-- testesSolventes 4 para Objeto 1
INSERT INTO tbl_testesSolventesComplementar(solvente, grauDeEficacia, observacoes, testeSolventFK) VALUES ("Solvente1", "3", "Observações1", 4);
INSERT INTO tbl_testesSolventesComplementar(solvente, grauDeEficacia, observacoes, testeSolventFK) VALUES ("Solvente2", "2", "Observações2", 4);
INSERT INTO tbl_testesSolventesComplementar(solvente, grauDeEficacia, observacoes, testeSolventFK) VALUES ("Solvente3", "1", "Observações3", 4);
INSERT INTO tbl_testesSolventesComplementar(solvente, grauDeEficacia, observacoes, testeSolventFK) VALUES ("Solvente4", "5", "Observações4", 4);

-- testesSolventes 5 para Objeto 1
INSERT INTO tbl_testesSolventesComplementar(solvente, grauDeEficacia, observacoes, testeSolventFK) VALUES ("Solvente1", "3", "Observações1", 5);
INSERT INTO tbl_testesSolventesComplementar(solvente, grauDeEficacia, observacoes, testeSolventFK) VALUES ("Solvente2", "2", "Observações2", 5);
INSERT INTO tbl_testesSolventesComplementar(solvente, grauDeEficacia, observacoes, testeSolventFK) VALUES ("Solvente3", "1", "Observações3", 5);
INSERT INTO tbl_testesSolventesComplementar(solvente, grauDeEficacia, observacoes, testeSolventFK) VALUES ("Solvente4", "5", "Observações4", 5);


-- Objeto 2
INSERT INTO tbl_testessolventes(idEstratoSujidade, caracteristicas, fichaRIFK) VALUES ("IdentificacaoExtrato1", "Caracteristicas1", 2); -- testesSolventes 6
INSERT INTO tbl_testessolventes(idEstratoSujidade, caracteristicas, fichaRIFK) VALUES ("IdentificacaoExtrato2", "Caracteristicas2", 2); -- testesSolventes 7
INSERT INTO tbl_testessolventes(idEstratoSujidade, caracteristicas, fichaRIFK) VALUES ("IdentificacaoExtrato3", "Caracteristicas3", 2); -- testesSolventes 8
INSERT INTO tbl_testessolventes(idEstratoSujidade, caracteristicas, fichaRIFK) VALUES ("IdentificacaoExtrato4", "Caracteristicas4", 2); -- testesSolventes 9
INSERT INTO tbl_testessolventes(idEstratoSujidade, caracteristicas, fichaRIFK) VALUES ("IdentificacaoExtrato5", "Caracteristicas5", 2); -- testesSolventes 10

-- testesSolventes 1 para Objeto 2
INSERT INTO tbl_testesSolventesComplementar(solvente, grauDeEficacia, observacoes, testeSolventFK) VALUES ("Solvente1", "3", "Observações1", 6);
INSERT INTO tbl_testesSolventesComplementar(solvente, grauDeEficacia, observacoes, testeSolventFK) VALUES ("Solvente2", "2", "Observações2", 6);
INSERT INTO tbl_testesSolventesComplementar(solvente, grauDeEficacia, observacoes, testeSolventFK) VALUES ("Solvente3", "1", "Observações3", 6);
INSERT INTO tbl_testesSolventesComplementar(solvente, grauDeEficacia, observacoes, testeSolventFK) VALUES ("Solvente4", "5", "Observações4", 6);

-- testesSolventes 2 para Objeto 2
INSERT INTO tbl_testesSolventesComplementar(solvente, grauDeEficacia, observacoes, testeSolventFK) VALUES ("Solvente1", "3", "Observações1", 7);
INSERT INTO tbl_testesSolventesComplementar(solvente, grauDeEficacia, observacoes, testeSolventFK) VALUES ("Solvente2", "2", "Observações2", 7);
INSERT INTO tbl_testesSolventesComplementar(solvente, grauDeEficacia, observacoes, testeSolventFK) VALUES ("Solvente3", "1", "Observações3", 7);
INSERT INTO tbl_testesSolventesComplementar(solvente, grauDeEficacia, observacoes, testeSolventFK) VALUES ("Solvente4", "5", "Observações4", 7);

-- testesSolventes 3 para Objeto 2
INSERT INTO tbl_testesSolventesComplementar(solvente, grauDeEficacia, observacoes, testeSolventFK) VALUES ("Solvente1", "3", "Observações1", 8);
INSERT INTO tbl_testesSolventesComplementar(solvente, grauDeEficacia, observacoes, testeSolventFK) VALUES ("Solvente2", "2", "Observações2", 8);
INSERT INTO tbl_testesSolventesComplementar(solvente, grauDeEficacia, observacoes, testeSolventFK) VALUES ("Solvente3", "1", "Observações3", 8);
INSERT INTO tbl_testesSolventesComplementar(solvente, grauDeEficacia, observacoes, testeSolventFK) VALUES ("Solvente4", "5", "Observações4", 8);

-- testesSolventes 4 para Objeto 2
INSERT INTO tbl_testesSolventesComplementar(solvente, grauDeEficacia, observacoes, testeSolventFK) VALUES ("Solvente1", "3", "Observações1", 9);
INSERT INTO tbl_testesSolventesComplementar(solvente, grauDeEficacia, observacoes, testeSolventFK) VALUES ("Solvente2", "2", "Observações2", 9);
INSERT INTO tbl_testesSolventesComplementar(solvente, grauDeEficacia, observacoes, testeSolventFK) VALUES ("Solvente3", "1", "Observações3", 9);
INSERT INTO tbl_testesSolventesComplementar(solvente, grauDeEficacia, observacoes, testeSolventFK) VALUES ("Solvente4", "5", "Observações4", 9);

-- testesSolventes 5 para Objeto 2
INSERT INTO tbl_testesSolventesComplementar(solvente, grauDeEficacia, observacoes, testeSolventFK) VALUES ("Solvente1", "3", "Observações1", 10);
INSERT INTO tbl_testesSolventesComplementar(solvente, grauDeEficacia, observacoes, testeSolventFK) VALUES ("Solvente2", "2", "Observações2", 10);
INSERT INTO tbl_testesSolventesComplementar(solvente, grauDeEficacia, observacoes, testeSolventFK) VALUES ("Solvente3", "1", "Observações3", 10);
INSERT INTO tbl_testesSolventesComplementar(solvente, grauDeEficacia, observacoes, testeSolventFK) VALUES ("Solvente4", "5", "Observações4", 10);

INSERT INTO tbl_folhasDeObra(folhaDeObraID, fichaRIFK) VALUES(1, 1);

-- LINHAS DA FOLHA DE OBRA FICHARI1
INSERT INTO tbl_folhaDeObraLinha(folhaDeObraLinhaID,  data, designacaoProcedimento,materiais,quantidades, duracao,tecnico, observacoes, folhaDeObraFK) VALUES (1,  '1993-10-19', 'designacaoProcedimento',"materiais","quantidades", '01:20',  "tecnico",'Observado', 1);
INSERT INTO tbl_folhaDeObraLinha(folhaDeObraLinhaID,  data, designacaoProcedimento,materiais,quantidades, duracao,tecnico, observacoes, folhaDeObraFK) VALUES (2,  '1993-10-20', 'designacaoProcedimento',"materiais","quantidades", '01:30', "tecnico", 'Observado', 1);
INSERT INTO tbl_folhaDeObraLinha(folhaDeObraLinhaID,  data, designacaoProcedimento,materiais,quantidades, duracao,tecnico, observacoes, folhaDeObraFK) VALUES (3,  '1993-10-22', 'designacaoProcedimento',"materiais","quantidades", '01:37', "tecnico",'Observado', 1);
