import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import RegisterPage from './MasterComponents/RegisterPage';
import LoginPage from './MasterComponents/LoginPage';
import AboutPage from './MasterComponents/AboutPage';
import ContactPage from './MasterComponents/ContactPage';
import CreateFichaTecnica from './MasterComponents/Ficha Tecnica/CreateFichaTecnica';
import DetailsFichaTecnica from './MasterComponents/Ficha Tecnica/DetailsFichaTecnica';
import IndexFichaTecnica from './MasterComponents/Ficha Tecnica/IndexFichaTecnica';
import CreateFichaRI from './MasterComponents/FichaRegistoIdentificacao/CreateFichaRI';
import DetailsFichaRI from './MasterComponents/FichaRegistoIdentificacao/DetailsFichaRI';


ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={LoginPage}/>
            <Route path="/registar" component={RegisterPage} />
            <Route path="/sobre" component={AboutPage} />
            <Route path="/contactos" component={ContactPage} />
            <Route path="/fichaTecnica/criar" component={CreateFichaTecnica}/>
            <Route path="/fichaTecnica/details/:id" component={DetailsFichaTecnica} />
            <Route path="/fichaTecnica" component={IndexFichaTecnica}/>
            {/* Ficha Registo Identificacao */}
            <Route path="/fichaRI/criar" component={CreateFichaRI}/>
            <Route path="/fichaRI/:id" component={DetailsFichaRI}/>
        </Switch>
    </ BrowserRouter>
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
