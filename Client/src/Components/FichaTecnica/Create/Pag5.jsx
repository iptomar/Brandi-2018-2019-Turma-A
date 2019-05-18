import React, { Component } from "react";

class Pag5 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            alertText: '',
            alertisNotVisible: true,
            alertColor: '',
        };
    }

    eliminaUltimaLinha = () => {
        var table = document.getElementById("tabela");
        var numRows = table.rows.length;
        if (numRows > 2) {
            table.deleteRow(-1);
        }
    }

    adicionaNovaLinha = () => {
        var table = document.getElementById("tabela");
        //inserir nova linha
        var row = table.insertRow(-1);
        //parametros textArea
        for (var i = 0; i < 4; i++) {
            var novaCelula = row.insertCell(i);
            var param = document.createElement('textarea');
            param.className = "form-control";
            param.setAttribute("type", "text");
            param.style.resize = "none";
            param.setAttribute("rows", "2");
            novaCelula.appendChild(param);
        }

        //parametro input
        //técnico
        var cellTecnico = row.insertCell(4);
        var paramTecnico = document.createElement('textarea');
        paramTecnico.className = "form-control";
        paramTecnico.setAttribute("type", "text")
        paramTecnico.readOnly = true;
        paramTecnico.value = "Name";
        paramTecnico.style.resize = "none";
        paramTecnico.setAttribute("rows", "2");

        cellTecnico.appendChild(paramTecnico);

        //parametro date
        //data
        var cellDate = row.insertCell(5);
        var paramData = document.createElement('input');
        paramData.className = "form-control text-center";
        paramData.style.width = "170px";
        paramData.style.height = "63px"
        paramData.setAttribute("type", "date")

        cellDate.appendChild(paramData);

    }




    render() {
        return (
            <div className="Inicio container">
                 <div className="container">
                 <div className="pt-3 py-3 text-center">
                        <h4>Estado de Conservação</h4>
                    </div>
                    
                    <div className="pt-3 py-3 text-center">
                        <h5>Deterioração Fisica, Quimica e Mecânica dos Materiais:</h5>
                        <small>Alterabilidade: decorrente de envelhecimento natural  |
                            Alteração: decorrente de fatores físicos, químicos, biológicos e antrópicos
                        </small>
                    </div>
                    <div className="row">     
                        <div className="col d-flex justify-content-center">
                            <label className="align-middle">Estrutura</label>
                           

                        </div>
                        <div className="col d-flex justify-content-center">
                            <label className="align-middle">Superfície</label>

                        
                        </div>
                        
                        <div className="col d-flex justify-content-center">
                            <label className="align-middle">Elementos Acessórios</label>
                        
                        
                        </div>
                    </div>

                    <div className="row">     
                        <div className="col d-flex justify-content-center">
                            <textarea type="text" style={{ resize: "none" }} rows="3" className="form-control" placeholder="" />
                

                        </div>
                        <div className="col d-flex justify-content-center">
                            <textarea type="text" style={{ resize: "none" }} rows="3" className="form-control" placeholder="" />
                
                        
                        </div>
                        
                        <div className="col d-flex justify-content-center">
                            <textarea type="text" style={{ resize: "none" }} rows="3" className="form-control" placeholder="" />
                
                        
                        </div>
                    </div>
                    <hr></hr>
                    <div className="pt-3 py-3 text-center">
                        <h5>Deterioração Biológica dos Materiais:</h5>
                        <small>Identificação de Patologias e Agentes de Biodeterioração – Diagnóstico
                        </small>
                    </div>
                    
                    <div className="row">     
                        <div className="col d-flex justify-content-center">
                            <label className="align-middle">Estrutura</label>
                           

                        </div>
                        <div className="col d-flex justify-content-center">
                            <label className="align-middle">Superfície</label>

                        
                        </div>
                        
                        <div className="col d-flex justify-content-center">
                            <label className="align-middle">Elementos Acessórios</label>
                        
                        
                        </div>
                    </div>

                    <div className="row">     
                        <div className="col d-flex justify-content-center">
                            <textarea type="text" style={{ resize: "none" }} rows="3" className="form-control" placeholder="" />
                

                        </div>
                        <div className="col d-flex justify-content-center">
                            <textarea type="text" style={{ resize: "none" }} rows="3" className="form-control" placeholder="" />
                
                        
                        </div>
                        
                        <div className="col d-flex justify-content-center">
                            <textarea type="text" style={{ resize: "none" }} rows="3" className="form-control" placeholder="" />
                
                        
                        </div>
                    </div>
                    <hr></hr>
                    <div className="pt-3 py-3 text-center">
                        <h5>Observações / Conclusões:</h5>
                       </div>
                    <textarea type="text" style={{ resize: "none" }} rows="3" className="form-control" placeholder="" />

                 </div>
            </div>              
        );
    }
}
export default Pag5;

