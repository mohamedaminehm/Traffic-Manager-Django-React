import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import TrafficIcon from '@material-ui/icons/Traffic';
import TheatersIcon from '@material-ui/icons/Theaters';

import BarChartIcon from '@material-ui/icons/BarChart';

import { Navbar, Nav,Button, NavItem, NavDropdown, MenuItem }  from 'react-bootstrap';


export class Header extends Component {
   

    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout : PropTypes.func.isRequired
    }
    
    

    render() {

        

        const { isAuthenticated, user } = this.props.auth;

        const authlink2 = (
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand ><Link to="/"><TrafficIcon style={{ fontSize: 40 }} /> </Link>  </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Item><Link to="/" className="nav-link"> Profile </Link></Nav.Item>
                    <Nav.Item><Link to="/posts" className="nav-link"> Publications </Link></Nav.Item>
                    
                    <Nav.Item ><Link to="/analytics" className="nav-link"><BarChartIcon/> Analytics </Link> </Nav.Item>
                    <Nav.Item ><Link to="/Visualization" className="nav-link"><BarChartIcon/>Visualization</Link> </Nav.Item>
                   <Nav.Item  ><Link to="/post" className="nav-link">Ajouter pub</Link> </Nav.Item>
                    <Nav.Item  ><Link to="/controle" className="nav-link">Centre de controle</Link> </Nav.Item>
                    <NavDropdown title="Streamings" id="collasible-nav-dropdown">
                        
                        <NavDropdown.Item ><NavLink to ="/chaine1"><TheatersIcon/>Chaine1</NavLink></NavDropdown.Item>
                        <NavDropdown.Item ><NavLink to='/chaine2'><TheatersIcon/>chaine2</NavLink></NavDropdown.Item>
                        <NavDropdown.Item ><TheatersIcon/>chaine3</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item ><NavLink to ='/realstat'>Visualization</NavLink></NavDropdown.Item>
                    </NavDropdown>
                                
                    </Nav>
                    <Nav>
                    
                    
                    <Nav.Item  ><Link to="/mapalert" className="nav-link">Votre Trajet!  </Link> </Nav.Item>
                    <Nav.Link  >
                        <Button variant="info" onClick={this.props.logout}>
                           Logout
                        </Button>
                    </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
                
        );

        const guestlinks2 = (
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand ><Link to="/"><TrafficIcon style={{ fontSize: 40 }} /></Link>  </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Item  > <Link to="/analytics" className="nav-link"><BarChartIcon/> Analytics </Link></Nav.Item>
                    </Nav>
                    <Nav>
                    <Nav.Item  ><Link to="/register" className="nav-link">Register</Link>
                                    </Nav.Item>
                    <Nav.Item  ><Link to="/login" className="nav-link"> Login </Link>
                                   </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
        );
       

       

        return (
                <div>
                    {isAuthenticated ? authlink2 : guestlinks2}
                </div>
                
                    
                
            
        );
    }
}
const mapStateToProps = state => ({
    auth : state.auth
});

export default connect(mapStateToProps, { logout })(Header);


//<Link to="/analytics" className="nav-link">