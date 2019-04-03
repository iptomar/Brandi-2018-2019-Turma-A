import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Header from '../../Components/Header';
import Edit from '../../Components/Users/Edit';
import Footer from '../../Components/Footer';

class EditPage extends Component {
    render() {
      return (
        <div className="EditPage">
          <Header/>
          <Edit id={this.props.id}/>
          <Footer/>
        </div>
      );
    }
  }

export default EditPage;