import React, { Component } from "react";
import AConsRest from "../../Images/AConsRest.jpg";


class About extends Component {
  render() {
    return (
      <div>
        <h2 className="container">Sobre</h2>
        <h6 className="container">No âmbito da unidade curricular Projeto de Sistemas de Informação, do 2º Semestre, do 3º ano, inserida na licenciatura em Engenharia Informática, foi requesitada uma aplicação para o Laboratório de Conservação e Restauro do Instituto Politécnico de Tomar.</h6>
        <h6 className="container">Esta aplicação tem o intuito de gerir todo o trabalho realizado no Laboratório de Conservação e Restauro</h6>
        <br/>
        <div align="center"> 
          <img 
            src={AConsRest} 
            alt=""
            width="900" 
            height="120" 
            border="0" 
            usemap="#Map"
          />
          <map name="Map" id="Map">
            <area shape="poly" coords="409,1,409,83,535,83,535,53,689,53,689,82,796,82,797,2" href="http://www.estt.ipt.pt" target="_blank"/>
            <area shape="rect" coords="447,84,761,120" href="http://portal2.ipt.pt/pt/cursos/licenciaturas/l_-_cr"/>
            <area shape="rect" coords="537,54,688,80" href="http://www.ipt.pt" target="_blank"/>
          </map>
        </div>
        <br/>
        <br/>
      </div>
    );
  }
}

export default About;
