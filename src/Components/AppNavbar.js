import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {Collapse,Nav,Navbar,NavbarBrand,NavbarToggler,NavItem,NavLink} from 'reactstrap';

export default class AppNavbar extends Component{
    constructor(props){
        super(props);
        this.state={isOpen:false};
        this.toggle=this.toggle.bind(this);
    }
    toggle(){
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render(){
        return <Navbar color="dark" dark expand="md">
            <NavbarBrand tag={Link} to="/">Stock App</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink
                        href="/">Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                        href="/upload">Upload</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                        href="/companies">Companies</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                        href="/exchanges">Exchanges</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                        href="/ipodetails">IPO</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>;
    }
}