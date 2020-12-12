import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import './img/style.css';
import './img/login.css';

//import image1 from './img/tri1.jpg';
//import image2 from './img/tri2.jpg';
//import safeImage from '/static/tri2.jpg';



export class Login extends Component {
    state = {
        username: '',
        password: ''
        
    };

    static propTypes = {
        login : PropTypes.func.isRequired,
        isAuthenticated : PropTypes.bool
    };

    onSubmit = e => {
        e.preventDefault();
        this.props.login(this.state.username , this.state.password)
        
    };

    onChange = e => this.setState({
        [e.target.name]: e.target.value
    });

    render() {
        if (this.props.isAuthenticated){
            return <Redirect to="/" />
        }
        const { username, password} = this.state;
        return (
            <div className="login-container"  >
            
            <div className="col-md-6 m-auto">
                <div className="card card-body mt-5" style={{ marginTop: '20px' }} >
                    <h2 className="text-center">Login</h2>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Username</label>
                            <input 
                                type="text"
                                className="form-control"
                                name="username"
                                onChange={this.onChange}
                                value={username}
                            />
                        </div>
                        
                        <div className="form-group">
                            <label>Password</label>
                            <input 
                                type="password"
                                className="form-control"
                                name="password"
                                onChange={this.onChange}
                                value={password}
                            />
                        </div>
                        
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">
                                Login
                            </button>
                        </div>
                        <p>
                            Créer un compte !   
                            <Link to="/Register">  Register</Link><br/>  <br/> 
                        </p><br/>  <br/>  <br/>  
                        

                    </form>
                </div> 
                <br/>  <br/>  <br/>  <br/>  <br/> <br/>  <br/>  
                <h2 style={{ backgroundColor : 'white' }} >lien pour l'administrateur  <a href="http://127.0.0.1:8000/admin">ICI</a> </h2>  
                <br/>  <br/>  <br/>        
            </div>
            </div>
           
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated : state.auth.isAuthenticated
});
export default connect(mapStateToProps , { login })(Login) ;
