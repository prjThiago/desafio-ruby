import React from 'react';
import {Link} from 'react-router-dom';
import './nav.css';

export default props => (
    <aside className="menu-area">
        <nav className="menu">
            {/* REFATORAR */}
            <Link to="/">
                <i className="fa fa-home"></i> Início
            </Link>
            <Link to="/usuarios/0">
                <i className="fa fa-users"></i> Usuários
            </Link>
            <Link to="/listausuarios">
                <i className="fa fa-book"></i> Lista de Usuários
            </Link>
        </nav>
    </aside>
)