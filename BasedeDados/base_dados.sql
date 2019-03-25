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
DROP TABLE IF EXISTS tbl_processos;
CREATE TABLE tbl_processos
(
    processoID INT NOT NULL AUTO_INCREMENT,
	fichaRegisto INT,
	objeto INT,
    dataAberturaLCRM DATE NOT NULL,
    dataEntradaLCRM DATE NOT NULL,
    dataAberturaCEARC DATE NOT NULL,
    dataEntradaCEARC DATE NOT NULL,	
    FOREIGN KEY(fichaRegisto) REFERENCES tbl_fichasRegistos(fichaRegistoID),
    FOREIGN KEY(objeto) REFERENCES tbl_objetos(objetoID),
    PRIMARY KEY(processoID)
);
DROP TABLE IF EXISTS tbl_folhasDeObra;
CREATE TABLE tbl_folhasDeObra
(
    folhaDeObraID INT NOT NULL AUTO_INCREMENT,
    processoCEARCFK VARCHAR(255) NOT NULL,
    designacaoProcesso VARCHAR(255) NOT NULL,
    data DATE NOT NULL,
    designacaoProcedimento VARCHAR(255) NOT NULL,
    duracao VARCHAR(255) NOT NULL,
    observacoes VARCHAR(255),   
    PRIMARY KEY(folhaDeObraID),
    FOREIGN KEY(processoCEARCFK) REFERENCES tbl_fichasRegistos(processoCEARC)
);
DROP TABLE IF EXISTS tbl_equipas;
CREATE TABLE tbl_equipas
(
    equipaID INT NOT NULL AUTO_INCREMENT,
    processoFK INT,
    PRIMARY KEY(equipaID),
    FOREIGN KEY(processoFK) REFERENCES tbl_processos(processoID)
);
DROP TABLE IF EXISTS tbl_equipasTecnicos;
CREATE TABLE tbl_equipasTecnicos
(
    equipaTecnicoID INT NOT NULL AUTO_INCREMENT,
    funcaoDesempenhada VARCHAR(255) NOT NULL,
    tecnicoFK INT,
    equipaFK INT,
    PRIMARY KEY(equipaTecnicoID),
    FOREIGN KEY(tecnicoFK) REFERENCES tbl_tecnicos(tecnicoID),
    FOREIGN KEY(equipaFK) REFERENCES tbl_equipas(equipaID)
);
DROP TABLE IF EXISTS tbl_tecnicosFolhasDeObra;
CREATE TABLE tbl_tecnicosFolhasDeObra
(
    tecnicoFolhaDeObraID INT NOT NULL AUTO_INCREMENT,
    tecnicoFK INT,
    folhaDeObraFK INT,
    PRIMARY KEY(tecnicoFolhaDeObraID),
    FOREIGN KEY(tecnicoFK) REFERENCES tbl_tecnicos(tecnicoID),
    FOREIGN KEY(folhaDeObraFK) REFERENCES tbl_folhasDeObra(folhaDeObraID)
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
    folhaDeObraFK INT,
    materialFK INT,
    PRIMARY KEY(folhaDeObraMaterialID),
    FOREIGN KEY(folhaDeObraFK) REFERENCES tbl_folhasDeObra(folhaDeObraID),
    FOREIGN KEY(materialFK) REFERENCES tbl_materiais(materialID)
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
CREATE TABLE tbl_fichasRegistos
(
    fichaRegistoID INT NOT NULL AUTO_INCREMENT,
	visible bool not null, #EXTRA
    designacao VARCHAR(255) NOT NULL,
    processoLCRM VARCHAR(255) NOT NULL UNIQUE,
    processoCEARC VARCHAR(255) NOT NULL UNIQUE,
    dataEntrada DATE NOT NULL,
    dataConclusao DATE,
    dataSaida DATE,
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
    FOREIGN KEY(fichaRegistoFK) REFERENCES tbl_fichasRegistos(fichaRegistoID),
    FOREIGN KEY(tecnicoFK) REFERENCES tbl_tecnicos(tecnicoID)
);
DROP TABLE IF EXISTS tbl_contactos;
CREATE TABLE tbl_contactos
(
    contactoID INT NOT NULL AUTO_INCREMENT,
    contacto VARCHAR(255) NOT NULL,
    PRIMARY KEY(contactoID)
);
DROP TABLE IF EXISTS tbl_registosContactos;
CREATE TABLE tbl_registosContactos
(
    registoContactoID INT NOT NULL AUTO_INCREMENT,
    fichaRegistoFK INT,
    contactoFK INT,
    PRIMARY KEY(registoContactoID),
    FOREIGN KEY(fichaRegistoFK) REFERENCES tbl_fichasRegistos(fichaRegistoID),
    FOREIGN KEY(contactoFK) REFERENCES tbl_contactos(contactoID)
);
DROP TABLE IF EXISTS tbl_interessadosContactos;
CREATE TABLE tbl_interessadosContactos
(
    interessadoContactoID INT NOT NULL AUTO_INCREMENT,
    contacto VARCHAR(255) NOT NULL,
    interessadoFK INT,
    PRIMARY KEY(interessadoContactoID),
    FOREIGN KEY(interessadoFK) REFERENCES tbl_interessados(interessadoID)
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
    deteriacaoFK INT,
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
    exameAnaliseFK INT,
    PRIMARY KEY(testeEficaciaID),
    FOREIGN KEY(exameAnaliseFK) REFERENCES tbl_examesAnalises(exameAnaliseID)
);
DROP TABLE IF EXISTS tbl_solventes;
CREATE TABLE tbl_solventes
(
    solventeID INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(255),
    observacoes VARCHAR(255),
    testeEficaciaFK INT,
    PRIMARY KEY(solventeID),
    FOREIGN KEY(testeEficaciaFK) REFERENCES tbl_testesEficacia(testeEficaciaID)
);
DROP TABLE IF EXISTS tbl_grausEficaciaSolubilizacao;
CREATE TABLE tbl_grausEficaciaSolubilizacao
(
    grauID INT NOT NULL AUTO_INCREMENT,
    numero INT,
    nome VARCHAR(255),
    solventeFK INT,
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
DROP TABLE IF EXISTS tbl_materiaisEspicificacoes;
CREATE TABLE tbl_materiaisEspicificacoes( 
    materiasID INT NOT NULL AUTO_INCREMENT,
    estrutura VARCHAR(255) NOT NULL,
    superficie VARCHAR(255) NOT NULL,
    especificacoesFK INT,
    PRIMARY KEY(materiasID), 
    FOREIGN KEY (especificacoesFK) REFERENCES tbl_especificacoes(especificacoesID)
    );
DROP TABLE IF EXISTS tbl_Tecnicas;
CREATE TABLE tbl_Tecnicas(
        tecnicasID INT NOT NULL AUTO_INCREMENT,
        estrutura VARCHAR(255) NOT NULL,
        superficie VARCHAR(255) NOT NULL,
        especificacoesFK INT,
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
    valoresIluminacaoFK INT,
        PRIMARY KEY(ilumArtifID),
        FOREIGN KEY(valoresIluminacaoFK) REFERENCES tbl_ValoresIluminacao(valoresIluminacaoID)
);
DROP TABLE IF EXISTS tbl_IluminacaoNatural;
CREATE TABLE tbl_IluminacaoNatural(
        iluminacaoNaturalID INT NOT NULL AUTO_INCREMENT,
        origem VARCHAR(255) NOT NULL,
        valoresIluminacaoFK INT,
        PRIMARY KEY(iluminacaoNaturalID),
        FOREIGN KEY(valoresIluminacaoFK) REFERENCES tbl_ValoresIluminacao(valoresIluminacaoID)
);
DROP TABLE IF EXISTS tbl_CondicoesAmbientaisLocal;
CREATE TABLE tbl_CondicoesAmbientaisLocal(
        condAmbLocalID INT NOT NULL AUTO_INCREMENT,
        descricao VARCHAR(255) NOT NULL,
    cicloEstacaoClimaFK INT,
        poluicaoFK INT,
        iluminacaoArtificalFK INT,
        iluminacaoNaturalFK INT,
        PRIMARY KEY(condAmbLocalID),
        FOREIGN KEY(cicloEstacaoClimaFK) REFERENCES tbl_ciclosEstacoesClimatericas(cicloEstacaoClimaID),
        FOREIGN KEY(poluicaoFK) REFERENCES tbl_Poluicao(poluicaoID),
    FOREIGN KEY(iluminacaoArtificalFK) REFERENCES tbl_IluminacaoArtificial(ilumArtifID),
        FOREIGN KEY(iluminacaoNaturalFK) REFERENCES tbl_IluminacaoNatural(iluminacaoNaturalID)
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
    dataUltimaAlteracao DATE NOT NULL,
    processosFK INT,
    fotografiasFK INT,
    especificacoesFK INT,
    interessadoFK INT,
    outraReferenciaFK INT,
    condAmbLocalFK INT,
    exameAnaliseFK INT,
    estadoConservacaoFK INT,
    intervAnterioresFK INT,
    propIntervFK INT,
    intervRealizadaFK INT,
    vontadeExpressaFK INT,
    documentoProduzidoFK INT,
    fonteFK INT,
    PRIMARY KEY(objetoID),
    FOREIGN KEY(fotografiasFK) REFERENCES tbl_fotografias(fotografiaID),
    FOREIGN KEY(especificacoesFK) REFERENCES tbl_especificacoes(especificacoesID),
    FOREIGN KEY(interessadoFK) REFERENCES tbl_interessados(interessadoID),
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
#ADICIONEI MAIS ISTO
INSERT INTO TBL_ROLES (role) values("Admin");
INSERT INTO TBL_ROLES (role) values("Aluno");
INSERT INTO tbl_utilizadores (login, email, password, salt, roleFK) values ("admin", "admin@mail.com", "$2b$10$WgipzU.uVvoM1nliHmhWu.dDrMuqJzm72yUk248ogM.Y9KLKgtdoS", "$2b$10$WgipzU.uVvoM1nliHmhWu.", 1); # password = admin
