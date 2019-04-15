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
    URL_BASE = 'http://localhost:3001/usuarios',
    initialState = {
        usuario: {
            name: '', 
            email: '',
            address: {
                street: '',
                suite: '',
                city: '',
                zipcode: ''
            },
            phone: ''
        },
        list: [

        ]        
    }

export default class User extends Component {

    state = {...initialState};
    
    clear() {        
        const usuario  = this.emptyUser();
        this.setState({usuario});
    }

    componentWillMount() {
        // axios(URL_BASE)
        //     .then(resp => {
        //         this.setState({list:resp.data})
        //     })
        const idUsuario = this.props.match.params.idusuario;

        if(idUsuario) {
            this.load(idUsuario);
        }        
    }

    emptyUser() {
        return {
            name: '', 
            email: '',
            address: {
                street: '',
                suite: '',
                city: '',
                zipcode: ''
            },
            phone: ''
        }
    }

    save() {
        const usuario = this.state.usuario,
            method = usuario.id ? 'put' : 'post',
            url = usuario.id ? `${URL_BASE}/${usuario.id}` : URL_BASE;

        axios[method](url, usuario)
            .then(resp => {        
                this.setState({usuario:this.emptyUser()});
            });        
    }

    updateFields(event){
        const usuario = {...this.state.usuario};

        if(event.target.name.indexOf('.') > -1){
            usuario[event.target.name.split('.')[0]][event.target.name.split('.')[1]] = event.target.value
        } else {
            usuario[event.target.name] = event.target.value
        }
        
        this.setState({usuario});
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" 
                                className="form-control" 
                                name="name" 
                                value={this.state.usuario.name} 
                                onChange={e => this.updateFields(e)}
                                placeholder="Digite o nome"/>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Email</label>
                            <input type="text" 
                                className="form-control" 
                                name="email" 
                                value={this.state.usuario.email} 
                                onChange={e => this.updateFields(e)}
                                placeholder="Digite o Email"/>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Rua</label>
                            <input type="text" 
                                className="form-control" 
                                name="address.street" 
                                value={this.state.usuario.address.street} 
                                onChange={e => this.updateFields(e)}
                                placeholder="Digite a rua"/>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Complemento</label>
                            <input type="text" 
                                className="form-control" 
                                name="address.suite" 
                                value={this.state.usuario.address.suite} 
                                onChange={e => this.updateFields(e)}
                                placeholder="Digite o complemento"/>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Cidade</label>
                            <input type="text" 
                                className="form-control" 
                                name="address.city" 
                                value={this.state.usuario.address.city} 
                                onChange={e => this.updateFields(e)}
                                placeholder="Digite a cidade"/>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>CEP</label>
                            <input type="text" 
                                className="form-control" 
                                name="address.zipcode" 
                                value={this.state.usuario.address.zipcode} 
                                onChange={e => this.updateFields(e)}
                                placeholder="Digite o CEP"/>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Telefone</label>
                            <input type="text" 
                                className="form-control" 
                                name="phone" 
                                value={this.state.usuario.phone} 
                                onChange={e => this.updateFields(e)}
                                placeholder="Digite o telefone"/>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary" onClick={e => this.save(e)}>
                            Salvar
                        </button>
                        <Link className="btn btn-secondary ml-2" to="/listausuarios">
                            Voltar
                        </Link>
                    </div>
                </div>
            </div>
        )
    }    

    load(idUsuario){

        axios(`${URL_BASE}/${idUsuario}`)
            .then(resp => {
                this.setState({usuario: resp.data});
            })

        
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}                
            </Main>
        )
    }
}