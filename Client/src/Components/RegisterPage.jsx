import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './Header';
import Register from './Register';
import Footer from './Footer';

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