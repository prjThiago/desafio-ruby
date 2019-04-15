import React, {Component} from 'react';
import Main from '../template/main';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { userInfo } from 'os';

const headerProps = {
        icon: 'users',
        title: 'Usuários',
        subtitle: 'Cadastro de usuários'
    },
    URL_BASE = 'http://localhost:3001/usuarios';

export default class UserList extends Component{

    state = {list:[]}

    componentWillMount() {
        axios(URL_BASE)
            .then(resp => {
                this.setState({list:resp.data})
            })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Rua</th>
                        <th>Complemento</th>
                        <th>Cidade</th>
                        <th>CEP</th>
                        <th>Telefone</th>
                        <th>Ações</th>                     
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }
    
    renderRows(){
        return this.state.list.map(usuario => {
            return(
                <tr key={usuario.id}>
                    <td>{usuario.id}</td>
                    <td>{usuario.name}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.address.street}</td>
                    <td>{usuario.address.suite}</td>
                    <td>{usuario.address.city}</td>
                    <td>{usuario.address.zipcode}</td>
                    <td>{usuario.phone}</td>
                    <td>
                        <Link className="btn btn-warning"
                            to={`usuarios/${usuario.id}`}>
                            <i className="fa fa-pencil"></i>
                        </Link>
                        <Link className="btn btn-danger ml-2"
                            onClick={() => this.remove(usuario)}>
                            <i className="fa fa-trash"></i>
                        </Link>
                    </td>
                </tr>
            )
        })
    }
    
    getUpdatedList(usuario, add = true) {
        const list = this.state.list.filter(usu => usu.id !== usuario.id);
        
        if(add)     
            list.unshift(usuario);

        return list;
    }

    remove(usuario){
        axios.delete(`${URL_BASE}/${usuario.id}`)
            .then(resp =>{
                const list = this.getUpdatedList(usuario, false);
                this.setState({list});
            });
    }

    render(){
        return(
            <Main  {...headerProps}>
                <Link className="btn btn-primary" to="/usuarios/0">
                    <i className="fa fa-user"></i> Adicionar Usuário
                </Link>
                {this.renderTable()}
            </Main>
        )
    }
}

