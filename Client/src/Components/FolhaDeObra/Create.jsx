import React, { Component } from "react";
import AlertMsg from "../Globais/AlertMsg";
import $ from "jquery";

/**
 * Componente de criação de uma nova folha de obra
 */
class Create extends Component {

    /**
     *  Contém apenas o container AlertMsg no this.state 
     */
    constructor(props) {
        super(props);
        this.state = {
            alertText: '',
            alertisNotVisible: true,
            alertColor: '',
        };
    }

    /**
     * Adiciona uma nova linha no fim da tabela da folha de obra
     */
    adicionaNovaLinha = () => {
        let linha = $('#linha').clone(this);
        linha.find("input").get(0).value = "";
        let textArea = linha.find('textarea');
        for(let i=0; i<textArea.length; i++){
            textArea.get(i).value = "";
        }
        $('tbody').append(linha);
    };

    /**
     * Elimina a última linha na tabela da folha de obra
     */
    eliminaUltimaLinha = () => {
        var table = document.getElementById("tabela");
        var numRows = table.rows.length;
        if (numRows >= 3) {
            table.deleteRow(-1);
        }
    }

    /**
     * Verifica se a tabela está preenchida. Cria um array com os conteúdos da tabela e submete-o. Trata a resposta do servidor
     */
    submit = async e => {
        e.preventDefault();
        /* Seleciona todos os inputs da tabela */
        let inputs = document.querySelectorAll('.input');
        for(let i = 0; i<inputs.length; i++){
            /* Se os inputs estiverem vazios */
            if(inputs[i].value === ""){
                this.setState({
                    alertText: "Existem campos da Folha de Obra que não foram preenchidos!",
                    alertisNotVisible: false,
                    alertColor: "warning"
                });
                return;
            }
        }
        /* Neste momento, todos os inputs estão preenchidos */
        let tab = [];
        /* Iterar da 2.ª linha da tabela até ao fim */
        for (let i = 0; i < document.getElementById("tabela").children[1].childElementCount; i++) {
            let content = document.getElementById("tabela").children[1].children[i];
            tab.push(
                {
                    /* Campos da tabela */
                    data: content.children[0].children[0].value,
                    designacaoDoProcedimento: content.children[1].children[0].value,
                    materiaisProdutos: content.children[2].children[0].value,
                    quantidades: content.children[3].children[0].value,
                    duracao: content.children[4].children[0].value,
                    tecnico: content.children[5].children[0].value,
                    observacoes: content.children[6].children[0].value
                }
            );
        }
        /* Enviar para a API */
        const response = await fetch(`/api/folhaDeObra/${this.props.id}/criar`, {
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json',
                "x-auth-token": sessionStorage.getItem("token")
            },
            body: JSON.stringify(tab)
        });
        /* Aguardar a resposta da API e avaliar o que fazer */
        await response.json().then(resp => {
            let status = resp.stat;
            switch (status) {
                case "Registed":
                    window.location = `/fichaRI/${this.props.id}/detalhes/&createobra`;
                    break;
                case "Error":
                    this.setState({
                        alertText: "Erro",
                        alertisNotVisible: false,
                        alertColor: "warning"
                    });
                    break;
                default:
                    console.log("Ocorreu um erro, contacte o administrador do sistema");
            }
        });
    }

    /**
     * Formulário de criação da folha de obra com botões de adição e remoção de linha e de criação de folha
     */
    render() {
        return (
            <div className="container mb-3">
                {/* Título */}
                <div className="pt-3 py-3 text-center">
                    <h2>Folha de Obra</h2>
                </div>
                {/* Tabela */}
                <table className="table table-bordered table-secondary text-center" id="tabela">
                    <thead>
                        <tr>
                            <th className="align-middle">Data</th>
                            <th className="align-middle">Designação do procedimento</th>
                            <th className="align-middle">Materiais e produtos</th>
                            <th className="align-middle">Quantidades</th>
                            <th className="align-middle">Duração</th>
                            <th className="align-middle">Técnico</th>
                            <th className="align-middle">Observações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr id="linha">
                            <td><input type="date" className="form-control input" style={{ height: "63px" }}/></td>
                            <td><textarea className="form-control input" style={{ resize: "none" }} rows="2" placeholder="Designação do procedimento"/></td>
                            <td><textarea className="form-control input" style={{ resize: "none" }} rows="2" placeholder="Materiais e produtos"/></td>
                            <td><textarea className="form-control input" style={{ resize: "none" }} rows="2" placeholder="Quantidades"/></td>
                            <td><textarea className="form-control input" style={{ resize: "none" }} rows="2" placeholder="HH:MM"/></td>
                            <td><textarea className="form-control input" style={{ resize: "none" }} rows="2" placeholder="Técnico"/></td>
                            <td><textarea className="form-control input" style={{ resize: "none" }} rows="2" placeholder="Observações"/></td>
                        </tr>
                    </tbody>
                </table>
                {/* Botões */}
                <div className="row">
                    <div className="col-md-12">
                        <div className="col-md-x">
                            <button type="button" className="btn m-1 btn-primary" onClick={this.adicionaNovaLinha}>Adicionar linha</button>
                            <button type="button" className="btn m-1 btn-secondary" onClick={this.eliminaUltimaLinha}>Remover linha</button>
                            <AlertMsg text={this.state.alertText} isNotVisible={this.state.alertisNotVisible} alertColor={this.state.alertColor} />
                        </div>
                    </div>
                    <div className="col-md-12 mt-2">
                        <button type="button" className="btn btn-success btn-lg btn-block mb-5" onClick={this.submit}>Criar</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default Create;