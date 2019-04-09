import React, { Component } from "react";
import '../../CssComponents/footer.css';

class Footer extends Component {
	render() {
		return (
			<footer className="footer-distributed">

				<div className="footer-left">

					<p className="footer-company-name">Instituto Politécnico de Tomar</p>


					<p className="footer-company-name">Laboratório de Conservação e Restauro</p>

				</div>

				<div className="footer-center">

					<div>
						<i className="fa fa-map-marker"></i>
						<p><span>Quinta do Contador, Estrada da Serra</span>Tomar, Portugal</p>
					</div>

					<div>
						<i className="fa fa-phone"></i>
						<p>+351 249 328 100</p>
					</div>

					<div>
						<i className="fa fa-envelope"></i>
						<p><a href="mailto:helpdesk@ipt.pt">helpdesk@ipt.pt</a></p>
					</div>

				</div>

				<div className="footer-right">

					<p className="footer-company-about">
						<span>Redes Sociais</span>

					</p>

					<div className="footer-icons">

						<a href="https://www.facebook.com/iptomar"><i className="fa fa-facebook"></i></a>

					</div>

				</div>



				<p className="footer" align="center">Brandi &copy; 2019</p>
			</footer>

		);
	}
}

export default Footer;
