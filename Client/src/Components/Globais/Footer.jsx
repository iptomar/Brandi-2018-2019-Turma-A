import React, { Component } from "react";
import '../../CssComponents/footer.css';

class Footer extends Component {
	render() {
		return (
			<footer>
       
       <div className="container-footer-all">
        
            <div className="container-body-footer">

                <div className="colum1">
                    <h1>Informação da aplicação</h1>

                    <p>Projeto no âmbito da disciplina de Projeto de Sistemas de Informação, lecionada pelos docentes Paulo Santos e Paulo Monteiro, do curso de eng. informática, na Escola Superior de Tecnologia de Tomar, do Instituto Politécnico de Tomar (ESTT-IPT). O Brandi é uma aplicação web que dá suporte ao curso de conservação e restauro e que moderniza e melhora o sistema de workflow das peças para restauro.</p>

                </div>

                <div className="colum2">

                    <h1>Redes Sociais</h1>
				<div className="column2_n" style={{textAlign:"center"}}>
                    <div className="row-footer">
					<a href="https://www.facebook.com/iptomar" target="_blank" rel="noopener noreferrer"  className="btn btn-block btn-social btn-twitter btn_edit">
    					<span className="fa fa-facebook"> Segue o IPT no Facebook</span> 
  					</a>
                    </div>

                    <div className="row-footer">
					<a href="https://www.instagram.com/ipt.politecnicodetomar/" rel="noopener noreferrer"  target="_blank" className="btn btn-block btn-social btn-twitter btn_edit">
    					<span className="fa fa-instagram"> Segue o IPT no Instagram</span>
  					</a>
                    </div>
                    <div className="row-footer">
                    
						<a href="https://twitter.com/iptomar" target="_blank" rel="noopener noreferrer"  className="btn btn-block btn-social btn-twitter btn_edit">
    					<span className="fa fa-twitter"> Segue o IPT no Twitter </span> 
  						</a>
                    </div>
					
				</div>


                </div>

                <div className="colum3">

                    <h1>Informações de Contacto</h1>
					<div className="column2_n" style={{textAlign:"center"}}>
						<div className="row2" style={{textAlign:"center"}}>
							<span className="fa fa-home btn_edit" aria-hidden="true"><label>Quinta do Contador . 
							Estrada da Serra . 2300-313 . 
							Tomar . Portugal</label></span>
                   		</div>

                   		<div className="row2">
                       
                        	<span className="fa fa-phone btn_edit " aria-hidden="true" ><label>+351 249 328 100</label></span>
                    	</div>

                    	<div className="row2">
							<span className="fa fa-envelope btn_edit" aria-hidden="true"> <label>geral@ipt.pt</label></span> 
                    	</div>
					
				
					</div>

                  
                </div>

            </div>
        
        </div>
        
        {/*<div className="container-footer">
               <div className="footer">
                    <div className="copyright">
                        © 2019 | <a href="">Brandi</a>
                    </div>


                </div>

            </div>
        */}
</footer>

		);
	}
}

export default Footer;
