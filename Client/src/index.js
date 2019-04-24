import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import RegisterPage from './MasterComponents/Users/RegisterPage';
import IndexPage from './MasterComponents/Users/IndexPage';
import EditUserPage from "./MasterComponents/Users/EditPage";
import DetailsUserPage from "./MasterComponents/Users/DetailsUserPage";
import LoginPage from './MasterComponents/LoginPage';
import AboutPage from './MasterComponents/AboutPage';
import ContactPage from './MasterComponents/ContactPage';
import ProfilePage from './MasterComponents/ProfilePage';
// FICHAS TÉCNICAS
import CreateFichaTecnica from './MasterComponents/Ficha Tecnica/CreateFichaTecnica';
import DetailsFichaTecnica from './MasterComponents/Ficha Tecnica/DetailsFichaTecnica';
import IndexFichaTecnica from './MasterComponents/Ficha Tecnica/IndexFichaTecnica';
// FICHAS RI
import IndexFichaRI from './MasterComponents/FichaRegistoIdentificacao/IndexFichaRI';
import CreateFichaRI from './MasterComponents/FichaRegistoIdentificacao/CreateFichaRI';
import DetailsFichaRI from './MasterComponents/FichaRegistoIdentificacao/DetailsFichaRI';



ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={LoginPage} />
            <Route path="/sobre" component={AboutPage} />
            <Route path="/contactos" component={ContactPage} />
            <Route path="/perfil" component={ProfilePage} />
            {/* Utilizadores */}
            <Route path="/utilizadores/registar" component={RegisterPage} />
            <Route path="/utilizadores/:id/editar" component={(r) => <EditUserPage id={r.match.params.id} />} />
            <Route path="/utilizadores/:id/detalhes" component={(r) => <DetailsUserPage id={r.match.params.id} />} />
            <Route path="/utilizadores/listar:query?" component={(r) => <IndexPage query={r.match.params.query} />} />
            {/* Ficha Técnica */}
            <Route path="/fichaTecnica/:id/details" component={DetailsFichaTecnica} />
            <Route path="/fichaTecnica/criar" component={CreateFichaTecnica} />
            <Route path="/fichaTecnica" component={IndexFichaTecnica} />
            {/* Ficha Registo Identificacao */}
            <Route path="/fichaRI/criar" component={CreateFichaRI} />
            <Route path="/fichaRI/:id/detalhes:query?" component={(r) => <DetailsFichaRI id={r.match.params.id} query={r.match.params.query} />} />
            <Route path="/fichaRI/:query?" component={(r) => <IndexFichaRI query={r.match.params.query} />} />
            {/* Default */}
            <Route component={LoginPage} />
        </Switch>
    </ BrowserRouter>
    , document.getElementById('root')
);

serviceWorker.unregister();