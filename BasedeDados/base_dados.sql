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
    designacaoProcesso VARCHAR(255) NOT NULL,
    data DATE NOT NULL,
    designacaoProcedimento VARCHAR(255) NOT NULL,
    duracao VARCHAR(255) NOT NULL,
    observacoes VARCHAR(255),
	processoCEARCFK VARCHAR(255) NOT NULL UNIQUE,	
    PRIMARY KEY(folhaDeObraID),
    FOREIGN KEY(processoCEARCFK) REFERENCES tbl_fichaRegistoIdentificacao(processoCEARC)
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

DROP TABLE IF EXISTS tbl_materiaisFolhaObra;
CREATE TABLE tbl_materiaisFolhaObra
(
    materialID INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    PRIMARY KEY(materialID)
);

DROP TABLE IF EXISTS tbl_folhasDeObraMateriais;
CREATE TABLE tbl_folhasDeObraMateriais
(
    folhaDeObraMaterialID INT NOT NULL AUTO_INCREMENT,
    quantidade DOUBLE NOT NULL,
    folhaDeObraFK INT NOT NULL,
    materialFK INT NOT NULL,
    PRIMARY KEY(folhaDeObraMaterialID),
    FOREIGN KEY(folhaDeObraFK) REFERENCES tbl_folhasDeObra(folhaDeObraID),
    FOREIGN KEY(materialFK) REFERENCES tbl_materiaisFolhaObra(materialID)
);

DROP TABLE IF EXISTS tbl_interessadosContactos;
CREATE TABLE tbl_interessadosContactos
(
    interessadoContactoID INT NOT NULL AUTO_INCREMENT,
    contacto VARCHAR(255) NOT NULL,
    interessadoFK INT NOT NULL,
    PRIMARY KEY(interessadoContactoID),
    FOREIGN KEY(interessadoFK) REFERENCES tbl_interessados(interessadoID)
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
	ElementosAcessPropRecPag6 TEXT,
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

DROP TABLE IF EXISTS tbl_documentacaoFotografica;
CREATE TABLE tbl_documentacaoFotografica
(
    documentacaoFotograficaID INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    fichaTecnicaFK INT NOT NULL,
    PRIMARY KEY(documentacaoFotograficaID),
	FOREIGN KEY(fichaTecnicaFK) REFERENCES tbl_fichasTecnicas(fichaTecnicaID)
);

DROP TABLE IF EXISTS tbl_documentacaoGrafica;
CREATE TABLE tbl_documentacaoGrafica
(
    documentacaoGraficaID INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    fichaTecnicaFK INT NOT NULL,
    PRIMARY KEY(documentacaoGraficaID),
	FOREIGN KEY(fichaTecnicaFK) REFERENCES tbl_fichasTecnicas(fichaTecnicaID)
);

DROP TABLE IF EXISTS tbl_detalhesFotografia;
CREATE TABLE tbl_detalhesFotografia
(
    detalhesFotografiaID INT NOT NULL AUTO_INCREMENT,
    tipoRegisto VARCHAR(255),
    resolucao VARCHAR(255),
    referencia VARCHAR(255),
    formato VARCHAR(255),
	fichaTecnicaFK INT NOT NULL,
    PRIMARY KEY(detalhesFotografiaID),
	FOREIGN KEY(fichaTecnicaFK) REFERENCES tbl_fichasTecnicas(fichaTecnicaID)
);

DROP TABLE IF EXISTS tbl_fotografias;
CREATE TABLE tbl_fotografias
(
    fotografiaID INT NOT NULL AUTO_INCREMENT,
    fotografia VARCHAR(255),
	detalhesFotografiaFK INT NOT NULL,
    PRIMARY KEY(fotografiaID),
	FOREIGN KEY(detalhesFotografiaFK) REFERENCES tbl_detalhesFotografia(detalhesFotografiaID)
);


DROP TABLE IF EXISTS tbl_examesAnalises;
CREATE TABLE tbl_examesAnalises
(
    exameAnaliseID INT NOT NULL AUTO_INCREMENT,
    identificacaoMateriais VARCHAR(255),
    identificacaoIntervencoes VARCHAR(255),
	caracterizacaoEstadoConservacao VARCHAR(255),
	identificacaoPatologias VARCHAR(255),
    datacaoObjeto VARCHAR(255),
	ensaioProdutos VARCHAR(255),
	interpretacaoResultados VARCHAR(255),
    conclusoes VARCHAR(255),
	fichaTecnicaFK INT NOT NULL,
    PRIMARY KEY(exameAnaliseID),
	FOREIGN KEY(fichaTecnicaFK) REFERENCES tbl_fichasTecnicas(fichaTecnicaID)
);

DROP TABLE IF EXISTS tbl_especificacoesExames;
CREATE TABLE tbl_especificacoesExames
(
    especificacoesExamesID INT NOT NULL AUTO_INCREMENT,
	tipo VARCHAR(255),
	localizacao VARCHAR(255),
    objetosEspecificos VARCHAR(255),
	resultados VARCHAR(255),
	entidadeTecnica VARCHAR(255),
	data DATE,
	exameAnaliseFK INT NOT NULL,
    PRIMARY KEY(especificacoesExamesID),
    FOREIGN KEY(exameAnaliseFK) REFERENCES tbl_examesAnalises(exameAnaliseID)
);

DROP TABLE IF EXISTS tbl_testesEficacia;
CREATE TABLE tbl_testesEficacia
(
    testeEficaciaID INT NOT NULL AUTO_INCREMENT,
    identificacaoExtrato VARCHAR(255),
    caracteristicas VARCHAR(255),
    tecnicoResponsavel VARCHAR(255),
    data DATE,
    especificacoesExamesFK INT NOT NULL,
    PRIMARY KEY(testeEficaciaID),
    FOREIGN KEY(especificacoesExamesFK) REFERENCES tbl_especificacoesExames(especificacoesExamesID)
);

DROP TABLE IF EXISTS tbl_solventes;
CREATE TABLE tbl_solventes
(
    solventeID INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(255),
    observacoes VARCHAR(255),
    testeEficaciaFK INT NOT NULL,
    PRIMARY KEY(solventeID),
    FOREIGN KEY(testeEficaciaFK) REFERENCES tbl_testesEficacia(testeEficaciaID)
);

DROP TABLE IF EXISTS tbl_grausEficaciaSolubilizacao;
CREATE TABLE tbl_grausEficaciaSolubilizacao
(
    grauID INT NOT NULL AUTO_INCREMENT,
    numero INT,
    nome VARCHAR(255),
    solventeFK INT NOT NULL UNIQUE,
    PRIMARY KEY(grauID),
    FOREIGN KEY(solventeFK) REFERENCES tbl_solventes(solventeID)
);

DROP TABLE IF EXISTS tbl_materiais;
CREATE TABLE tbl_materiais( 
    materiaisID INT NOT NULL AUTO_INCREMENT,
    estrutura VARCHAR(255) NOT NULL,
    superficie VARCHAR(255) NOT NULL,
    fichaTecnicaFK INT NOT NULL,
    PRIMARY KEY(materiaisID), 
    FOREIGN KEY (fichaTecnicaFK) REFERENCES tbl_fichasTecnicas(fichaTecnicaID)
);

DROP TABLE IF EXISTS tbl_condicoesAmbientaisLocal;
CREATE TABLE tbl_condicoesAmbientaisLocal( 
    condicoesAmbientaisLocalID INT NOT NULL AUTO_INCREMENT,
	condicoesAmbientaisDescricao VARCHAR(255),
    temperaturaFrioHumido INT,
    temperaturaQuenteSeco INT,
    humidadeFrioHumido INT,
	humidadeQuenteSeco INT,
	periodoFrioHumidoInicio VARCHAR(255),
	periodoQuenteSecoInicio VARCHAR(255),
	periodoFrioHumidoFim VARCHAR(255),
	periodoQuenteSecoFim VARCHAR(255),
	poluicaoAgentesPoluidores VARCHAR(255),
	poluicaoFontes VARCHAR(255),
	poluicaoResultados VARCHAR(255),
	conclusoes VARCHAR(255),
	fichaTecnicaFK INT NOT NULL,
    PRIMARY KEY(condicoesAmbientaisLocalID), 
    FOREIGN KEY (fichaTecnicaFK) REFERENCES tbl_fichasTecnicas(fichaTecnicaID)
);

DROP TABLE IF EXISTS tbl_iluminacao;
CREATE TABLE tbl_iluminacao( 
	iluminacaoID INT NOT NULL AUTO_INCREMENT,
	radiacao VARCHAR(255),
	origem VARCHAR(255),
	valorIluminancia VARCHAR(255),
	valorUVmedidos VARCHAR(255),
	valorRealUV VARCHAR(255),
	condicoesAmbientaisLocalFK INT NOT NULL,
    PRIMARY KEY(iluminacaoID), 
    FOREIGN KEY (condicoesAmbientaisLocalFK) REFERENCES tbl_condicoesAmbientaisLocal(condicoesAmbientaisLocalID)
);

DROP TABLE IF EXISTS tbl_Tecnicas;
CREATE TABLE tbl_Tecnicas(
        tecnicasID INT NOT NULL AUTO_INCREMENT,
        estrutura VARCHAR(255) NOT NULL,
        superficie VARCHAR(255) NOT NULL,
        fichaTecnicaFK INT NOT NULL,
        PRIMARY KEY (tecnicasID),
        FOREIGN KEY (fichaTecnicaFK) REFERENCES tbl_fichasTecnicas(fichaTecnicaID)
);

DROP TABLE IF EXISTS tbl_equipasFichasTecnicas;
CREATE TABLE tbl_equipasFichasTecnicas
(
    equipaTecnicoID INT NOT NULL AUTO_INCREMENT,
    funcaoDesempenhada VARCHAR(255) NOT NULL,
    tecnicoFK INT NOT NULL,
    fichaTecnicaFK INT NOT NULL,
    PRIMARY KEY(equipaTecnicoID),
    FOREIGN KEY(tecnicoFK) REFERENCES tbl_tecnicos(tecnicoID),
    FOREIGN KEY(fichaTecnicaFK) REFERENCES tbl_fichasTecnicas(fichaTecnicaID)
);

DROP TABLE IF EXISTS tbl_interessadosFichasTecnicas;
CREATE TABLE tbl_interessadosFichasTecnicas
(
    interessadoFichaTecnicaID INT NOT NULL AUTO_INCREMENT,
    interessadoFK INT NOT NULL, 
	fichaTecnicaFK INT NOT NULL,
    PRIMARY KEY(interessadoFichaTecnicaID),
    FOREIGN KEY(interessadoFK) REFERENCES tbl_interessados(interessadoID),
	FOREIGN KEY(fichaTecnicaFK) REFERENCES tbl_fichasTecnicas(fichaTecnicaID)
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
 -- esta tabela representa a tabela onde o utilizador pode insere a constituição da equipa na página 10
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

/*
INSERT INTO tbl_fichasTecnicas (visible,localizacao,proprietario,codPostalProprietario,emailProprietario,contactoProprietario,donoObra,codPostalDonoObra,contactoDonoObra,mecenas,codPostalMecenas,contactoMecenas,bemIntegradoEmConjunto,tipoBensConjunto,elemConstConj,materiasElementosAcessorios,marcasInscricoesAssinaturas,marcasInscricoesMontagem,marcasInscricoesConstrucao,classPatrimonial,epoca,qualidade,materiaisEstruturaSuporte,materiaisSuperficies,tecnicasEstruturaSuporte,tecnicasSuperficie,condAmbDescricao,condAmbFrioTemperatura,condAmbFrioHumidade,condAmbFrioPeriodoInicio,condAmbFrioPeriodoFim,condAmbQuenteTemperatura,condAmbQuenteHumidade,condAmbQuentePeriodoInicio,condAmbQuentePeriodoFim,ilumArtTipo,ilumArtValorIluminancia,ilumArtValurUV,ilumArtValorRealUV,ilumNatOrigem,ilumNatValorIluminancia,ilumNatValorUV,ilumNatValorRealUV,poluicaoAgentes,poluicaoFontesOrigem,poluicaoResultados,poluicaoObservacoesConclusoes,fichaRegistoFK) VALUES (true, "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", true, "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", 1);
*/

INSERT INTO tbl_fichasTecnicas (visible,localizacao,proprietario,codPostalProprietario,emailProprietario,contactoProprietario,donoObra,codPostalDonoObra,contactoDonoObra,mecenas,codPostalMecenas,contactoMecenas,bemIntegradoEmConjunto,tipoBensConjunto,elemConstConj,materiasElementosAcessorios,marcasInscricoesAssinaturas,marcasInscricoesMontagem,marcasInscricoesConstrucao,classPatrimonial,epoca,qualidade,materiaisEstruturaSuporte,materiaisSuperficies,tecnicasEstruturaSuporte,tecnicasSuperficie,condAmbDescricao,condAmbFrioTemperatura,condAmbFrioHumidade,condAmbFrioPeriodoInicio,condAmbFrioPeriodoFim,condAmbQuenteTemperatura,condAmbQuenteHumidade,condAmbQuentePeriodoInicio,condAmbQuentePeriodoFim,ilumArtTipo,ilumArtValorIluminancia,ilumArtValurUV,ilumArtValorRealUV,ilumNatOrigem,ilumNatValorIluminancia,ilumNatValorUV,ilumNatValorRealUV,poluicaoAgentes,poluicaoFontesOrigem,poluicaoResultados,poluicaoObservacoesConclusoes, examesAnalisesInterpResultados,examesAnalisesObsConclusoes,estadoConservFQMestrutura,estadoConservFQMsuperficie,estadoConservFQMelementosAcess,estadoConservBioEstrutura,estadoConservBioSuperficie,estadoConservBioElementosAcess,estadoConservObsConclusoes,estruturaIntervAnter,superficieIntervAnter,elementosAcessoriosIntervAnter,observaçoesConclusoesPag6,tipoInterv,aspetosEspecificosPag6,tipoIntervCR,EstruturaPropPag6,EstruturaPropRecPag6,SuperficiePropPag6,SuperficiePropRecPag6,ElementosAcessPropRecPag6,estruturaPag8,recursosEstruturaPag8,superficiePag8,recursosSuperficiePag8,elementosAcessoriosPag8,recursosElementosAcPag8,observaçoesConclusoesPag8,relTecInterLCRM,tipoDesigOrig,refOrig,entidadeOrig,tipoDesigDocGraf,refDocGraf,entidadeDocGraf,tipoDesigExames,refExames,entidadeExames,atledpArqDoc,tipoArqDoc,localArqDoc,cotaArqDoc,atledpIcon,tipoIcon,localIcon,cotaIcon,atledpBiblio,tipoBiblio,localBiblio,cotaBiblio,atledpOutras,tipoOutras,localOutras,cotaOutras,fichaRegistoFK) VALUES (true, "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", true, "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", 1);
INSERT INTO tbl_fichasTecnicas (visible,localizacao,proprietario,codPostalProprietario,emailProprietario,contactoProprietario,donoObra,codPostalDonoObra,contactoDonoObra,mecenas,codPostalMecenas,contactoMecenas,bemIntegradoEmConjunto,tipoBensConjunto,elemConstConj,materiasElementosAcessorios,marcasInscricoesAssinaturas,marcasInscricoesMontagem,marcasInscricoesConstrucao,classPatrimonial,epoca,qualidade,materiaisEstruturaSuporte,materiaisSuperficies,tecnicasEstruturaSuporte,tecnicasSuperficie,condAmbDescricao,condAmbFrioTemperatura,condAmbFrioHumidade,condAmbFrioPeriodoInicio,condAmbFrioPeriodoFim,condAmbQuenteTemperatura,condAmbQuenteHumidade,condAmbQuentePeriodoInicio,condAmbQuentePeriodoFim,ilumArtTipo,ilumArtValorIluminancia,ilumArtValurUV,ilumArtValorRealUV,ilumNatOrigem,ilumNatValorIluminancia,ilumNatValorUV,ilumNatValorRealUV,poluicaoAgentes,poluicaoFontesOrigem,poluicaoResultados,poluicaoObservacoesConclusoes, examesAnalisesInterpResultados,examesAnalisesObsConclusoes,estadoConservFQMestrutura,estadoConservFQMsuperficie,estadoConservFQMelementosAcess,estadoConservBioEstrutura,estadoConservBioSuperficie,estadoConservBioElementosAcess,estadoConservObsConclusoes,estruturaIntervAnter,superficieIntervAnter,elementosAcessoriosIntervAnter,observaçoesConclusoesPag6,tipoInterv,aspetosEspecificosPag6,tipoIntervCR,EstruturaPropPag6,EstruturaPropRecPag6,SuperficiePropPag6,SuperficiePropRecPag6,ElementosAcessPropRecPag6,estruturaPag8,recursosEstruturaPag8,superficiePag8,recursosSuperficiePag8,elementosAcessoriosPag8,recursosElementosAcPag8,observaçoesConclusoesPag8,relTecInterLCRM,tipoDesigOrig,refOrig,entidadeOrig,tipoDesigDocGraf,refDocGraf,entidadeDocGraf,tipoDesigExames,refExames,entidadeExames,atledpArqDoc,tipoArqDoc,localArqDoc,cotaArqDoc,atledpIcon,tipoIcon,localIcon,cotaIcon,atledpBiblio,tipoBiblio,localBiblio,cotaBiblio,atledpOutras,tipoOutras,localOutras,cotaOutras,fichaRegistoFK) VALUES (true, "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", true, "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", 1);
INSERT INTO tbl_fichasTecnicas (visible,localizacao,proprietario,codPostalProprietario,emailProprietario,contactoProprietario,donoObra,codPostalDonoObra,contactoDonoObra,mecenas,codPostalMecenas,contactoMecenas,bemIntegradoEmConjunto,tipoBensConjunto,elemConstConj,materiasElementosAcessorios,marcasInscricoesAssinaturas,marcasInscricoesMontagem,marcasInscricoesConstrucao,classPatrimonial,epoca,qualidade,materiaisEstruturaSuporte,materiaisSuperficies,tecnicasEstruturaSuporte,tecnicasSuperficie,condAmbDescricao,condAmbFrioTemperatura,condAmbFrioHumidade,condAmbFrioPeriodoInicio,condAmbFrioPeriodoFim,condAmbQuenteTemperatura,condAmbQuenteHumidade,condAmbQuentePeriodoInicio,condAmbQuentePeriodoFim,ilumArtTipo,ilumArtValorIluminancia,ilumArtValurUV,ilumArtValorRealUV,ilumNatOrigem,ilumNatValorIluminancia,ilumNatValorUV,ilumNatValorRealUV,poluicaoAgentes,poluicaoFontesOrigem,poluicaoResultados,poluicaoObservacoesConclusoes, examesAnalisesInterpResultados,examesAnalisesObsConclusoes,estadoConservFQMestrutura,estadoConservFQMsuperficie,estadoConservFQMelementosAcess,estadoConservBioEstrutura,estadoConservBioSuperficie,estadoConservBioElementosAcess,estadoConservObsConclusoes,estruturaIntervAnter,superficieIntervAnter,elementosAcessoriosIntervAnter,observaçoesConclusoesPag6,tipoInterv,aspetosEspecificosPag6,tipoIntervCR,EstruturaPropPag6,EstruturaPropRecPag6,SuperficiePropPag6,SuperficiePropRecPag6,ElementosAcessPropRecPag6,estruturaPag8,recursosEstruturaPag8,superficiePag8,recursosSuperficiePag8,elementosAcessoriosPag8,recursosElementosAcPag8,observaçoesConclusoesPag8,relTecInterLCRM,tipoDesigOrig,refOrig,entidadeOrig,tipoDesigDocGraf,refDocGraf,entidadeDocGraf,tipoDesigExames,refExames,entidadeExames,atledpArqDoc,tipoArqDoc,localArqDoc,cotaArqDoc,atledpIcon,tipoIcon,localIcon,cotaIcon,atledpBiblio,tipoBiblio,localBiblio,cotaBiblio,atledpOutras,tipoOutras,localOutras,cotaOutras,fichaRegistoFK) VALUES (true, "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", true, "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", 1);
INSERT INTO tbl_fichasTecnicas (visible,localizacao,proprietario,codPostalProprietario,emailProprietario,contactoProprietario,donoObra,codPostalDonoObra,contactoDonoObra,mecenas,codPostalMecenas,contactoMecenas,bemIntegradoEmConjunto,tipoBensConjunto,elemConstConj,materiasElementosAcessorios,marcasInscricoesAssinaturas,marcasInscricoesMontagem,marcasInscricoesConstrucao,classPatrimonial,epoca,qualidade,materiaisEstruturaSuporte,materiaisSuperficies,tecnicasEstruturaSuporte,tecnicasSuperficie,condAmbDescricao,condAmbFrioTemperatura,condAmbFrioHumidade,condAmbFrioPeriodoInicio,condAmbFrioPeriodoFim,condAmbQuenteTemperatura,condAmbQuenteHumidade,condAmbQuentePeriodoInicio,condAmbQuentePeriodoFim,ilumArtTipo,ilumArtValorIluminancia,ilumArtValurUV,ilumArtValorRealUV,ilumNatOrigem,ilumNatValorIluminancia,ilumNatValorUV,ilumNatValorRealUV,poluicaoAgentes,poluicaoFontesOrigem,poluicaoResultados,poluicaoObservacoesConclusoes, examesAnalisesInterpResultados,examesAnalisesObsConclusoes,estadoConservFQMestrutura,estadoConservFQMsuperficie,estadoConservFQMelementosAcess,estadoConservBioEstrutura,estadoConservBioSuperficie,estadoConservBioElementosAcess,estadoConservObsConclusoes,estruturaIntervAnter,superficieIntervAnter,elementosAcessoriosIntervAnter,observaçoesConclusoesPag6,tipoInterv,aspetosEspecificosPag6,tipoIntervCR,EstruturaPropPag6,EstruturaPropRecPag6,SuperficiePropPag6,SuperficiePropRecPag6,ElementosAcessPropRecPag6,estruturaPag8,recursosEstruturaPag8,superficiePag8,recursosSuperficiePag8,elementosAcessoriosPag8,recursosElementosAcPag8,observaçoesConclusoesPag8,relTecInterLCRM,tipoDesigOrig,refOrig,entidadeOrig,tipoDesigDocGraf,refDocGraf,entidadeDocGraf,tipoDesigExames,refExames,entidadeExames,atledpArqDoc,tipoArqDoc,localArqDoc,cotaArqDoc,atledpIcon,tipoIcon,localIcon,cotaIcon,atledpBiblio,tipoBiblio,localBiblio,cotaBiblio,atledpOutras,tipoOutras,localOutras,cotaOutras,fichaRegistoFK) VALUES (true, "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", true, "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", 1);
INSERT INTO tbl_fichasTecnicas (visible,localizacao,proprietario,codPostalProprietario,emailProprietario,contactoProprietario,donoObra,codPostalDonoObra,contactoDonoObra,mecenas,codPostalMecenas,contactoMecenas,bemIntegradoEmConjunto,tipoBensConjunto,elemConstConj,materiasElementosAcessorios,marcasInscricoesAssinaturas,marcasInscricoesMontagem,marcasInscricoesConstrucao,classPatrimonial,epoca,qualidade,materiaisEstruturaSuporte,materiaisSuperficies,tecnicasEstruturaSuporte,tecnicasSuperficie,condAmbDescricao,condAmbFrioTemperatura,condAmbFrioHumidade,condAmbFrioPeriodoInicio,condAmbFrioPeriodoFim,condAmbQuenteTemperatura,condAmbQuenteHumidade,condAmbQuentePeriodoInicio,condAmbQuentePeriodoFim,ilumArtTipo,ilumArtValorIluminancia,ilumArtValurUV,ilumArtValorRealUV,ilumNatOrigem,ilumNatValorIluminancia,ilumNatValorUV,ilumNatValorRealUV,poluicaoAgentes,poluicaoFontesOrigem,poluicaoResultados,poluicaoObservacoesConclusoes, examesAnalisesInterpResultados,examesAnalisesObsConclusoes,estadoConservFQMestrutura,estadoConservFQMsuperficie,estadoConservFQMelementosAcess,estadoConservBioEstrutura,estadoConservBioSuperficie,estadoConservBioElementosAcess,estadoConservObsConclusoes,estruturaIntervAnter,superficieIntervAnter,elementosAcessoriosIntervAnter,observaçoesConclusoesPag6,tipoInterv,aspetosEspecificosPag6,tipoIntervCR,EstruturaPropPag6,EstruturaPropRecPag6,SuperficiePropPag6,SuperficiePropRecPag6,ElementosAcessPropRecPag6,estruturaPag8,recursosEstruturaPag8,superficiePag8,recursosSuperficiePag8,elementosAcessoriosPag8,recursosElementosAcPag8,observaçoesConclusoesPag8,relTecInterLCRM,tipoDesigOrig,refOrig,entidadeOrig,tipoDesigDocGraf,refDocGraf,entidadeDocGraf,tipoDesigExames,refExames,entidadeExames,atledpArqDoc,tipoArqDoc,localArqDoc,cotaArqDoc,atledpIcon,tipoIcon,localIcon,cotaIcon,atledpBiblio,tipoBiblio,localBiblio,cotaBiblio,atledpOutras,tipoOutras,localOutras,cotaOutras,fichaRegistoFK) VALUES (true, "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", true, "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", 1);

INSERT INTO tbl_constituicaoequipa (constEq, funcDes, habPro, fichaTecnicaFK) VALUES ("a", "a", "a", 1);
INSERT INTO tbl_constituicaoequipa (constEq, funcDes, habPro, fichaTecnicaFK) VALUES ("b", "b", "b", 2);
INSERT INTO tbl_constituicaoequipa (constEq, funcDes, habPro, fichaTecnicaFK) VALUES ("c", "c", "c", 3);
INSERT INTO tbl_constituicaoequipa (constEq, funcDes, habPro, fichaTecnicaFK) VALUES ("d", "d", "d", 4);
INSERT INTO tbl_constituicaoequipa (constEq, funcDes, habPro, fichaTecnicaFK) VALUES ("e", "e", "e", 5);

INSERT INTO tbl_testespagina4tabelas (tipoReferencia, LocalizacaoAreaPonto, Resultados, DataDePreenchimento, fichaTecnicaFK) VALUES ("a", "a", "a", "2019-06-03",  1);
INSERT INTO tbl_testespagina4tabelas (tipoReferencia, LocalizacaoAreaPonto, Resultados, DataDePreenchimento, fichaTecnicaFK) VALUES ("b", "b", "b", "2019-06-03",  2);
INSERT INTO tbl_testespagina4tabelas (tipoReferencia, LocalizacaoAreaPonto, Resultados, DataDePreenchimento, fichaTecnicaFK) VALUES ("c", "c", "c", "2019-06-03",  3);
INSERT INTO tbl_testespagina4tabelas (tipoReferencia, LocalizacaoAreaPonto, Resultados, DataDePreenchimento, fichaTecnicaFK) VALUES ("d", "d", "d", "2019-06-03",  4);
INSERT INTO tbl_testespagina4tabelas (tipoReferencia, LocalizacaoAreaPonto, Resultados, DataDePreenchimento, fichaTecnicaFK) VALUES ("e", "e", "e", "2019-06-03",  5);



INSERT INTO tbl_testespagina4objectivosGerais (Objectivo, fichaTecnicaFK) VALUES ("a",  1);
INSERT INTO tbl_testespagina4objectivosGerais (Objectivo, fichaTecnicaFK) VALUES ("b",  2);
INSERT INTO tbl_testespagina4objectivosGerais (Objectivo, fichaTecnicaFK) VALUES ("c",  3);
INSERT INTO tbl_testespagina4objectivosGerais (Objectivo, fichaTecnicaFK) VALUES ("d",  4);
INSERT INTO tbl_testespagina4objectivosGerais (Objectivo, fichaTecnicaFK) VALUES ("e",  5);

