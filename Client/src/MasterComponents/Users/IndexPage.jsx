import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Index from '../../Components/Users/Index';
import Header from "../../Components/Globais/Header";
import Footer from "../../Components/Globais/Footer";

class RegisterPage extends Component {
    render() {
      return (
        <div className="RegisterPage">
          <Header/>
          <Index query={this.props.query}/>
          <Footer/>
        </div>
      );
    }
  }

export default RegisterPage;