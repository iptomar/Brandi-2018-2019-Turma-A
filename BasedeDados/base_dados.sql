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
    localidade VARCHAR(255) NOT NULL,
    interessadoFK INT NOT NULL,
    PRIMARY KEY(fichaRegistoID),
    FOREIGN KEY(interessadoFK) REFERENCES tbl_interessados(interessadoID)
);

DROP TABLE IF EXISTS tbl_folhasDeObra;
CREATE TABLE tbl_folhasDeObra
(
    folhaDeObraID INT NOT NULL AUTO_INCREMENT,
    processoCEARCFK VARCHAR(255) NOT NULL UNIQUE,
    designacaoProcesso VARCHAR(255) NOT NULL,
    data DATE NOT NULL,
    designacaoProcedimento VARCHAR(255) NOT NULL,
    duracao VARCHAR(255) NOT NULL,
    observacoes VARCHAR(255),   
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

DROP TABLE IF EXISTS tbl_materiais;
CREATE TABLE tbl_materiais
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
    FOREIGN KEY(materialFK) REFERENCES tbl_materiais(materialID)
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

DROP TABLE IF EXISTS tbl_objetos;
CREATE TABLE tbl_objetos(
    objetoID INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    tipologia VARCHAR(255) NOT NULL,
    dimensoes VARCHAR(255) NOT NULL,
    outrasDimensoes VARCHAR(255) NOT NULL,
    localizacao VARCHAR(255) NOT NULL,
    breveDescricao VARCHAR(255) NOT NULL,
    analogias VARCHAR(255) NOT NULL,
    conclusoes VARCHAR(255) NOT NULL,
    oficina VARCHAR(255) NOT NULL,
    datacao VARCHAR(255) NOT NULL,
    localOrigem VARCHAR(255) NOT NULL,
    superCategorias VARCHAR(255) NOT NULL,
    categorias VARCHAR(255) NOT NULL,
    subCategorias VARCHAR(255) NOT NULL,
	PRIMARY KEY(objetoID)
);

DROP TABLE IF EXISTS tbl_outrasReferencias;
CREATE TABLE tbl_outrasReferencias
(
    outraReferenciaID INT NOT NULL AUTO_INCREMENT,
    documentacaoFoto VARCHAR(255),
    documentacaoGrafica VARCHAR(255),
    PRIMARY KEY(outraReferenciaID)
);

DROP TABLE IF EXISTS tbl_fotografias;
CREATE TABLE tbl_fotografias
(
    fotografiaID INT NOT NULL AUTO_INCREMENT,
    tipoRegisto VARCHAR(255),
    resolucao VARCHAR(255),
    referencia VARCHAR(255),
    formato VARCHAR(255),
    PRIMARY KEY(fotografiaID)
);

DROP TABLE IF EXISTS tbl_deteriacoes;
CREATE TABLE tbl_deteriacoes
(
    deteriacaoID INT NOT NULL AUTO_INCREMENT,
    estrutura VARCHAR(255),
    superficie VARCHAR(255),
    elementosAcessorios VARCHAR(255),
    tipo VARCHAR(255),
    PRIMARY KEY(deteriacaoID)
);

DROP TABLE IF EXISTS tbl_estadosConservacao;
CREATE TABLE tbl_estadosConservacao
(
    estadoConservacaoID INT NOT NULL AUTO_INCREMENT,
    conclusoes VARCHAR(255),
    deteriacaoFK INT NOT NULL UNIQUE,
    PRIMARY KEY(estadoConservacaoID),
    FOREIGN KEY(deteriacaoFK) REFERENCES tbl_deteriacoes(deteriacaoID)
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
    tipo VARCHAR(255),
    localizacao VARCHAR(255),
    objetosEspecificados VARCHAR(255),
    resultados VARCHAR(255),
    entidadeTecnica VARCHAR(255),
    data DATE,
    interpretacaoResultados VARCHAR(255),
    conclusoes VARCHAR(255),
    PRIMARY KEY(exameAnaliseID)
);

DROP TABLE IF EXISTS tbl_testesEficacia;
CREATE TABLE tbl_testesEficacia
(
    testeEficaciaID INT NOT NULL AUTO_INCREMENT,
    identificacaoExtrato VARCHAR(255),
    caracteristicas VARCHAR(255),
    tecnicoResponsavel VARCHAR(255),
    data DATE,
    exameAnaliseFK INT NOT NULL,
    PRIMARY KEY(testeEficaciaID),
    FOREIGN KEY(exameAnaliseFK) REFERENCES tbl_examesAnalises(exameAnaliseID)
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

DROP TABLE IF EXISTS tbl_fontes;
CREATE TABLE tbl_fontes
(
    fonteID INT NOT NULL AUTO_INCREMENT,
    tipoFonte VARCHAR(255),
    autor VARCHAR(255),
    titulo VARCHAR(255),
    local VARCHAR(255),
    editor VARCHAR(255),
    data DATE,
    paginas VARCHAR(255),
    PRIMARY KEY(fonteID)
);

DROP TABLE IF EXISTS tbl_vontadesExpressas;
CREATE TABLE tbl_vontadesExpressas
(
    vontadeExpressaID INT NOT NULL AUTO_INCREMENT,
    tipoIntervencao VARCHAR(255),
    aspetosEspecificados VARCHAR(255),
    PRIMARY KEY(vontadeExpressaID)
);

DROP TABLE IF EXISTS tbl_documentacaoProduzida;
CREATE TABLE tbl_documentacaoProduzida
(
    documentoProduzidoID INT NOT NULL AUTO_INCREMENT,
    relatorioTecnicoLCRM VARCHAR(255),
    tipoDocumento VARCHAR(255),
    designacao VARCHAR(255),
    referencias VARCHAR(255),
    entidades VARCHAR(255),
    PRIMARY KEY(documentoProduzidoID)
);

DROP TABLE IF EXISTS tbl_ciclosEstacoesClimatericas;
CREATE TABLE tbl_ciclosEstacoesClimatericas
(
    cicloEstacaoClimaID INT NOT NULL AUTO_INCREMENT,
    tempFrioHumido INT,
    tempQuenteSeco INT,
    humidadeFrioHumido INT,
    humidadeQuenteSeco INT,
    periodoFrioHumidoInicio VARCHAR(255),
    periodoQuenteSecoInicio VARCHAR(255),
    periodoFrioHumidoFim VARCHAR(255),
    periodoQuenteSecoFim VARCHAR(255),
    PRIMARY KEY(cicloEstacaoClimaID)
);

DROP TABLE IF EXISTS tbl_especificacoes;
CREATE TABLE tbl_especificacoes(
    especificacoesID INT NOT NULL AUTO_INCREMENT,
    tipoConjunto VARCHAR(255) NOT NULL,
    elementosBemCultural VARCHAR(255) NOT NULL,
    elementosAcessorios VARCHAR(255)NOT NULL,
    assinaturasAutoria VARCHAR(255)NOT NULL,
    inscricoesElementos VARCHAR(255) NOT NULL,
    inscricoesConstrucao VARCHAR(255) NOT NULL,
    classificacaoPatrimonial VARCHAR(255) NOT NULL,
    estilo VARCHAR(255) NOT NULL,
    epoca VARCHAR(255) NOT NULL,
    qualidade VARCHAR(255) NOT NULL, 
    PRIMARY KEY (especificacoesID)
);

DROP TABLE IF EXISTS tbl_materiaisEspecificacoes;
CREATE TABLE tbl_materiaisEspecificacoes( 
    materiasID INT NOT NULL AUTO_INCREMENT,
    estrutura VARCHAR(255) NOT NULL,
    superficie VARCHAR(255) NOT NULL,
    especificacoesFK INT NOT NULL,
    PRIMARY KEY(materiasID), 
    FOREIGN KEY (especificacoesFK) REFERENCES tbl_especificacoes(especificacoesID)
);

DROP TABLE IF EXISTS tbl_Tecnicas;
CREATE TABLE tbl_Tecnicas(
        tecnicasID INT NOT NULL AUTO_INCREMENT,
        estrutura VARCHAR(255) NOT NULL,
        superficie VARCHAR(255) NOT NULL,
        especificacoesFK INT NOT NULL,
        PRIMARY KEY (tecnicasID),
        FOREIGN KEY (especificacoesFK) REFERENCES tbl_especificacoes(especificacoesID)
);

DROP TABLE IF EXISTS tbl_IntervencoesAnteriores;
CREATE TABLE tbl_IntervencoesAnteriores(
    intervAnterioresID INT NOT NULL AUTO_INCREMENT, 
    estrutura VARCHAR(255) NOT NULL,
    superficies VARCHAR(255) NOT NULL, 
    elementosAcessorioes VARCHAR(255) NOT NULL, 
    conclusoes VARCHAR(255) NOT NULL, 
    PRIMARY KEY (intervAnterioresID)
);

DROP TABLE IF EXISTS tbl_IntervencaoRealizada;
CREATE TABLE tbl_IntervencaoRealizada(
        intervRealizadaID INT NOT NULL AUTO_INCREMENT,
        estrutura VARCHAR(255) NOT NULL,
        superficie VARCHAR(255) NOT NULL,
        elementosAcessorios VARCHAR(255) NOT NULL,
        PRIMARY KEY (intervRealizadaID)
);

DROP TABLE IF EXISTS tbl_PropostasIntervencao;
CREATE TABLE tbl_PropostasIntervencao(
        propIntervID INT NOT NULL AUTO_INCREMENT,
        tipo VARCHAR(255) NOT NULL,
        estrutura VARCHAR(255) NOT NULL,
        superficie VARCHAR(255) NOT NULL,
        elementosAcessorios VARCHAR(255) NOT NULL,
        conclusoes VARCHAR(255) NOT NULL,
        PRIMARY KEY (propIntervID)
);

DROP TABLE IF EXISTS tbl_Poluicao;
CREATE TABLE tbl_Poluicao(
        poluicaoID INT NOT NULL AUTO_INCREMENT,
		agentesPoluidores VARCHAR(255) NOT NULL,
        fontes VARCHAR(255) NOT NULL,
		resultados VARCHAR(255) NOT NULL,
        conclusoes VARCHAR(255) NOT NULL,
        PRIMARY KEY (PoluicaoID)
);

DROP TABLE IF EXISTS tbl_ValoresIluminacao;
CREATE TABLE tbl_ValoresIluminacao(
        valoresIluminacaoID INT NOT NULL AUTO_INCREMENT,
        valorIluminancia INT NOT NULL,
        valorUVmedidos INT NOT NULL,
        valorRealUV INT NOT NULL,
        PRIMARY KEY(valoresIluminacaoID)
);

DROP TABLE IF EXISTS tbl_IluminacaoArtificial;
CREATE TABLE tbl_IluminacaoArtificial(
        ilumArtifID INT NOT NULL AUTO_INCREMENT,
        tipo VARCHAR(255) NOT NULL,
		valoresIluminacaoFK INT NOT NULL UNIQUE,
        PRIMARY KEY(ilumArtifID),
        FOREIGN KEY(valoresIluminacaoFK) REFERENCES tbl_ValoresIluminacao(valoresIluminacaoID)
);
DROP TABLE IF EXISTS tbl_IluminacaoNatural;
CREATE TABLE tbl_IluminacaoNatural(
        iluminacaoNaturalID INT NOT NULL AUTO_INCREMENT,
        origem VARCHAR(255) NOT NULL,
        valoresIluminacaoFK INT NOT NULL UNIQUE,
        PRIMARY KEY(iluminacaoNaturalID),
        FOREIGN KEY(valoresIluminacaoFK) REFERENCES tbl_ValoresIluminacao(valoresIluminacaoID)
);
DROP TABLE IF EXISTS tbl_CondicoesAmbientaisLocal;
CREATE TABLE tbl_CondicoesAmbientaisLocal(
        condAmbLocalID INT NOT NULL AUTO_INCREMENT,
        descricao VARCHAR(255) NOT NULL,
		cicloEstacaoClimaFK INT NOT NULL UNIQUE,
        poluicaoFK INT NOT NULL UNIQUE,
        iluminacaoArtificalFK INT NOT NULL UNIQUE,
        iluminacaoNaturalFK INT NOT NULL UNIQUE,
        PRIMARY KEY(condAmbLocalID),
        FOREIGN KEY(cicloEstacaoClimaFK) REFERENCES tbl_ciclosEstacoesClimatericas(cicloEstacaoClimaID),
        FOREIGN KEY(poluicaoFK) REFERENCES tbl_Poluicao(poluicaoID),
		FOREIGN KEY(iluminacaoArtificalFK) REFERENCES tbl_IluminacaoArtificial(ilumArtifID),
        FOREIGN KEY(iluminacaoNaturalFK) REFERENCES tbl_IluminacaoNatural(iluminacaoNaturalID)
);

DROP TABLE IF EXISTS tbl_fichasTecnicas;
CREATE TABLE tbl_fichasTecnicas
(
    fichaTecnicaID INT NOT NULL AUTO_INCREMENT,
	dataAberturaLCRM DATE NOT NULL,
    dataEntradaLCRM DATE NOT NULL,
    dataAberturaCEARC DATE NOT NULL,
    dataEntradaCEARC DATE NOT NULL,	
	dataUltimaAlteracao DATE NOT NULL,
    fichaRegistoFK INT NOT NULL UNIQUE,
    objetoFK INT NOT NULL,
	fotografiasFK INT NOT NULL,
    especificacoesFK INT NOT NULL UNIQUE,
    outraReferenciaFK INT NOT NULL UNIQUE,
    condAmbLocalFK INT NOT NULL UNIQUE,
    exameAnaliseFK INT NOT NULL UNIQUE,
    estadoConservacaoFK INT NOT NULL UNIQUE,
    intervAnterioresFK INT NOT NULL UNIQUE,
    propIntervFK INT NOT NULL UNIQUE,
    intervRealizadaFK INT NOT NULL UNIQUE,
    vontadeExpressaFK INT NOT NULL UNIQUE,
    documentoProduzidoFK INT NOT NULL UNIQUE,
    fonteFK INT NOT NULL UNIQUE,
    PRIMARY KEY(fichaTecnicaID),
	FOREIGN KEY(objetoFK) REFERENCES tbl_objetos(objetoID),
	FOREIGN KEY(fichaRegistoFK) REFERENCES tbl_fichaRegistoIdentificacao(fichaRegistoID),
    FOREIGN KEY(fotografiasFK) REFERENCES tbl_fotografias(fotografiaID),
    FOREIGN KEY(especificacoesFK) REFERENCES tbl_especificacoes(especificacoesID),
    FOREIGN KEY(outraReferenciaFK) REFERENCES tbl_outrasReferencias(outraReferenciaID),
    FOREIGN KEY(condAmbLocalFK) REFERENCES tbl_CondicoesAmbientaisLocal(condAmbLocalID),
    FOREIGN KEY(exameAnaliseFK) REFERENCES tbl_examesAnalises(exameAnaliseID),
    FOREIGN KEY(estadoConservacaoFK) REFERENCES tbl_estadosConservacao(estadoConservacaoID),
    FOREIGN KEY(intervAnterioresFK) REFERENCES tbl_IntervencoesAnteriores(intervAnterioresID),
    FOREIGN KEY(propIntervFK) REFERENCES tbl_PropostasIntervencao(propIntervID),
    FOREIGN KEY(intervRealizadaFK) REFERENCES tbl_IntervencaoRealizada(intervRealizadaID),
    FOREIGN KEY(vontadeExpressaFK) REFERENCES tbl_vontadesExpressas(vontadeExpressaID),
    FOREIGN KEY(documentoProduzidoFK) REFERENCES tbl_documentacaoProduzida(documentoProduzidoID),
    FOREIGN KEY(fonteFK) REFERENCES tbl_fontes(fonteID)
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

INSERT INTO tbl_roles (role) values("Admin");
INSERT INTO tbl_roles (role) values("Aluno");
INSERT INTO tbl_roles (role) values("Tecnicos");
INSERT INTO tbl_utilizadores (visible, login, email, password, salt, roleFK) values (true, "admin", "admin@mail.com", "$2b$10$7io89FC0T16oI4cuZf5A.eKUlNHmPHWhqbZAjZwG2.l/q4jOt54xO", "$2b$10$7io89FC0T16oI4cuZf5A.e", 1); # password = admin
INSERT INTO tbl_utilizadores (visible, login, email, password, salt, roleFK) values (true, "tecnico1", "tecnico1@mail.com", "$2b$10$/xQxm72q/9uIYcdRzD1leeQsoAfxy2k2nliWx9EBsMpUlFyvbQp4.", "$2b$10$/xQxm72q/9uIYcdRzD1lee", 3); # password = tecnico
INSERT INTO tbl_utilizadores (visible, login, email, password, salt, roleFK) values (true, "tecnico2", "tecnico2@mail.com", "$2b$10$2Y9iK6yq7bkaVlSxs2/4x.xmh.Bc6/pqaH7EIegtz0oiox04OmnCu", "$2b$10$2Y9iK6yq7bkaVlSxs2/4x.", 3); # password = tecnico
INSERT INTO tbl_utilizadores (visible, login, email, password, salt, roleFK) values (true, "tecnico3", "tecnico3@mail.com", "$2b$10$Uy6VqpjOVVJqJE/u/7JmIuygnFDtFHtluuakXhdNH1Xa54ZLkwr1q", "$2b$10$Uy6VqpjOVVJqJE/u/7JmIu", 3); # password = tecnico
INSERT INTO tbl_utilizadores (visible, login, email, password, salt, roleFK) values (true, "aluno", "aluno@mail.com", "$2b$10$xZ8KFZkeA0sLNhGBanV9Ueb6m7GNihxL8JjzmRqNtXBWzirwG1NCK", "$2b$10$xZ8KFZkeA0sLNhGBanV9Ue", 2); # password = aluno
INSERT INTO tbl_tecnicos (nome, habilitacoes, nivelProfissional, userFK) values ("Aníbal Teste", "Bom em tudo", 9, 1);
INSERT INTO tbl_tecnicos (nome, habilitacoes, nivelProfissional, userFK) values ("João Teste", "Primitivo", 2, 2);
INSERT INTO tbl_tecnicos (nome, habilitacoes, nivelProfissional, userFK) values ("Xico Teste", "Razoavel em tudo", 6, 3);
INSERT INTO tbl_tecnicos (nome, habilitacoes, nivelProfissional, userFK) values ("Maria Teste", "Bastante boa", 8, 4);
INSERT INTO tbl_tecnicos (nome, habilitacoes, nivelProfissional, userFK) values ("Zeca Teste", "Excelente", 10, 5);
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