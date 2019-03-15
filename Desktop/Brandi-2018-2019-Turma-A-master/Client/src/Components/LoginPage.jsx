import React, { Component } from 'react';
import Header from './Header';
import Login from './Login';
import Footer from './Footer';

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