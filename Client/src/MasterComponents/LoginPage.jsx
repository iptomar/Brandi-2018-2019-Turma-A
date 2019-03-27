import React, { Component } from 'react';
import Header from '../Components/Header';
import Login from '../Components/Login';
import Footer from '../Components/Footer';

class LoginPage extends Component {
    render() {
      return (
        <div className="LoginPage">
          <Header/>
          <Login/>
          <Footer/>
        </div>
      );
    }
  }

export default LoginPage;