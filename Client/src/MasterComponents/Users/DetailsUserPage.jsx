import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Details from '../../Components/Users/Details';
import Header from "../../Components/Globais/Header";
import Footer from "../../Components/Globais/Footer";

class DetailsUserPage extends Component {
    render() {
      return (
        <div className="EditPage">
          <Header/>
          <Details id={this.props.id}/>
          <Footer/>
        </div>
      );
    }
  }

export default DetailsUserPage;