import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Register from '../../Components/Users/Register';
import Header from "../../Components/Globais/Header";
import Footer from "../../Components/Globais/Footer";

class RegisterPage extends Component {
    render() {
      return (
        <div className="RegisterPage">
          <Header/>
          <Register/>
          <Footer/>
        </div>
      );
    }
  }

export default RegisterPage;