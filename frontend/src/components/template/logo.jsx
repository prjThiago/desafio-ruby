import React from 'react';
import {Link} from 'react-router-dom';
import './logo.css';
import logo from '../../assets/images/logo.svg'

export default props => (
    <aside className="logo">
        <Link to="/" className="logo">
            <img src={logo} alt="Logo React" />
        </Link>
    </aside>
)