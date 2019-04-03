import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Header from '../../Components/Header';
import Register from '../../Components/Users/Register';
import Footer from '../../Components/Footer';

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