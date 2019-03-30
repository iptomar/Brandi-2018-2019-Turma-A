import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import RegisterPage from './MasterComponents/RegisterPage';
import LoginPage from './MasterComponents/LoginPage';
import AboutPage from './MasterComponents/AboutPage';
import ContactPage from './MasterComponents/ContactPage';
// FICHAS TÉCNICAS
// import CreateFichaTecnica from './MasterComponents/Ficha Tecnica/CreateFichaTecnica';
// import DetailsFichaTecnica from './MasterComponents/Ficha Tecnica/DetailsFichaTecnica';
// import IndexFichaTecnica from './MasterComponents/Ficha Tecnica/IndexFichaTecnica';
// FICHAS RI
import IndexFichaRI from './MasterComponents/FichaRegistoIdentificacao/IndexFichaRI';
import CreateFichaRI from './MasterComponents/FichaRegistoIdentificacao/CreateFichaRI';
import DetailsFichaRI from './MasterComponents/FichaRegistoIdentificacao/DetailsFichaRI';



ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={LoginPage} />
            <Route path="/registar" component={RegisterPage} />
            <Route path="/sobre" component={AboutPage} />
            <Route path="/contactos" component={ContactPage} />
            {/* FICHA TÉCNICA */}
            {/* <Route path="/fichaTecnica" component={IndexFichaTecnica}/>
            <Route path="/fichaTecnica/criar" component={CreateFichaTecnica}/>
            <Route path="/fichaTecnica/details/:id" component={DetailsFichaTecnica} /> */}
            {/* Ficha Registo Identificacao */}
            <Route path="/fichaRI/criar" component={CreateFichaRI} />
            <Route path="/fichaRI/:id/detalhes" component={(r) => <DetailsFichaRI id={r.match.params.id}/>} />
            <Route path="/fichaRI/" component={IndexFichaRI } />
        </Switch>
    </ BrowserRouter>
    , document.getElementById('root')
);

serviceWorker.unregister();