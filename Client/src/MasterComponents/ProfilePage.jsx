import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Header from '../Components/Header';
import Profile from '../Components/Profile';
import Footer from '../Components/Footer';

class ProfilePage extends Component {
    render() {
      return (
        <div className="RegisterPage">
          <Header/>
          <Profile/>
          <Footer/>
        </div>
      );
    }
  }

export default ProfilePage;