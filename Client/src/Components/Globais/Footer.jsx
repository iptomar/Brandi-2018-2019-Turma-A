import React, { Component } from "react";
import '../../CssComponents/footer.css';

class Footer extends Component {
	render() {
		return (
			<footer>
       
       <div class="container-footer-all">
        
            <div class="container-body">

                <div class="colum1">
                    <h1>Informação da aplicação</h1>

                    <p>Esta aplicação foi criada para o Laboratório de Conservação e Restauro
						do Instuto Politecnico de Tomar</p>

                </div>

                <div class="colum2">

                    <h1>Redes Sociais</h1>
				<div class="column2_n">
                    <div class="row">
					<a href="https://www.facebook.com/iptomar" class="btn btn-block btn-social btn-twitter btn_edit">
    					<span class="fa fa-facebook">Segue o IPT no Facebook</span> 
  					</a>
                    </div>

                    <div class="row">
					<a href="https://www.instagram.com/ipt.politecnicodetomar/" class="btn btn-block btn-social btn-twitter btn_edit">
    					<span class="fa fa-instagram"> Segue o IPT no Instagram</span>
  					</a>
                    </div>
                    <div class="row">
                    
						<a href="https://twitter.com/iptomar" class="btn btn-block btn-social btn-twitter btn_edit">
    					<span class="fa fa-twitter">Segue o IPT no Twitter </span> 
  						</a>
                    </div>
					
				</div>


                </div>

                <div class="colum3">

                    <h1>Informações de Contacto</h1>
					<div class="column2_n">
						<div class="row2">
							<span class="fa fa-home btn_edit" aria-hidden="true"><label>Quinta do Contador . 
							Estrada da Serra . 2300-313 . 
							Tomar . Portugal</label></span>
                   		</div>

                   		<div class="row2">
                       
                        	<span class="fa fa-phone btn_edit " aria-hidden="true" ><label>+1-829-395-2064</label></span>
                    	</div>

                    	<div class="row2">
							<span class="fa fa-envelope btn_edit" aria-hidden="true"> <label>geral@ipt.pt</label></span> 
                    	</div>
					
				
					</div>

                  
                </div>

            </div>
        
        </div>
        
        {/*<div class="container-footer">
               <div class="footer">
                    <div class="copyright">
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
