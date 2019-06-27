import React, { Component } from "react";

class Contacts extends Component {
  render() {
    return (
      <div className="container">
        <h2>Contactos</h2>
        <div class="colum3">
          <div class="column2_n">
            <div class="row2">
              <span class="fa fa-home btn_edit" aria-hidden="true">
                <label><a href="https://www.google.com/maps/place/Tomar+Technology+School/@39.5998239,-8.3930173,17z/data=!4m12!1m6!3m5!1s0xd187eace68bd519:0xe54af0a150b8190d!2sUni%C3%A3o+Associativa+de+Estudantes+de+Tomar!8m2!3d39.5998198!4d-8.3908286!3m4!1s0xd18795693983331:0x5bea5d07bbead527!8m2!3d39.5991505!4d-8.3903273?hl=en" target="_blank">Quinta do Contador  Estrada da Serra  2300-313  Tomar  Portugal</a></label>
              </span>
            </div>
            <div class="row2">
              <span class="fa fa-phone btn_edit " aria-hidden="true">
                <label><a href="tel:+1-829-395-2064" target="_blank">+1-829-395-2064</a></label>
              </span>
            </div>
            <div class="row2">
              <span class="fa fa-envelope btn_edit" aria-hidden="true">
                <label><a href="mailto:geral@ipt.pt" target="_blank">geral@ipt.pt</a></label>
              </span>
            </div>
          </div>

        </div>
        <br/>
      </div>
    );
  }
}

export default Contacts;
