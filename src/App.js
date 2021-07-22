import React,{Component} from 'react';
import Home from './Components/Home';
import SheetJSApp from './Components/SheetJSApp';
import CompanyEdit from './Components/CompanyEdit';
import AppNavbar from './Components/AppNavbar';
import CompanyList from './Components/CompanyList';
import CompanyPost from './Components/CompanyPost';
import ExchangeList from './Components/ExchangeList';
import ExchangePost from './Components/ExchangePost';
import IPOAdminList from './Components/IPOAdminList';
import IPOAdminEdit from './Components/IPOAdminEdit';
import IPOUserList from './Components/IPOUserList';
import Login from './Components/Login';
import Register from './Components/Register';
import IPOUserMChart from './Components/IPOUserMChart';
import SectorEdit from './Components/SectorEdit';
import SectorList from './Components/SectorList';
import SectorPost from './Components/SectorPost';
import "./App.css";
import { BrowserRouter as Router, Route, Switch ,Link} from 'react-router-dom'; 
import AuthService from './Services/auth.service';
import {Collapse,Nav,Navbar,NavbarBrand,NavbarToggler,NavItem,NavLink} from 'reactstrap';
class App extends Component{
  constructor(props){
    super(props);
    this.state={
      isOpen:false,
      isAdmin:false,
      currentUser:undefined
    };
    this.toggle=this.toggle.bind(this);
    this.logOut=this.logOut.bind(this);
}
toggle(){
    this.setState({
        isOpen: !this.state.isOpen
    });
}
logOut() {
  AuthService.logout();
}
componentDidMount(){
  const user = AuthService.getCurrentUser();
  if(user){
    this.setState({
      currentUser:user,
      isAdmin:user.admin
    })
  }
  
}
  render(){
    const {currentUser,isAdmin}=this.state;
    
    return(
      
        <div>  
          <Navbar color="dark" dark expand="md">
            <NavbarBrand tag={Link} to="/">Stock App</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink
                        href="/">Home</NavLink>
                    </NavItem>
                    {isAdmin &&(<NavItem>
                        <NavLink
                        href="/upload">Upload</NavLink>
                    </NavItem>)}
                    {isAdmin &&(<NavItem>
                        <NavLink
                        href="/companies">Companies</NavLink>
                    </NavItem>)}
                    {isAdmin &&(<NavItem>
                        <NavLink
                        href="/exchanges">Exchanges</NavLink>
                    </NavItem>)}
                    {isAdmin &&(<NavItem>
                        <NavLink
                        href="/sectors">Sectors</NavLink>
                    </NavItem>)}
                    {isAdmin &&(<NavItem>
                        <NavLink
                        href="/ipodetails">IPO</NavLink>
                    </NavItem>)}
                    {
                      !isAdmin &&currentUser &&(<NavItem>
                        <NavLink
                        href="/ipouser">IPO</NavLink>
                    </NavItem>)
                    }
                    {
                      !isAdmin &&currentUser &&(<NavItem>
                        <NavLink
                        href="/chart">Chart</NavLink>
                    </NavItem>)
                    }
                    
                    {currentUser ?(
                      <NavItem>
                        <NavLink><a href="/login" onClick={this.logOut}>LogOut</a></NavLink>
                      </NavItem>
                    ):(
                      <NavItem>
                        <NavLink
                        href="/login">Login</NavLink>
                      </NavItem>
                    )}
                    {
                      currentUser?(<p></p>):(
                        <NavItem>
                        <NavLink
                        href="/register">Register</NavLink>
                    </NavItem>
                    )
                    }
                    

                </Nav>
            </Collapse>
        </Navbar>

      <div>
        <Switch>
        <Route path='/' exact={true} component={Home}/>
        <Route path="/upload" exact={true} component={SheetJSApp} />
        <Route path="/companies" exact={true} component={CompanyList}/>
        <Route path='/companies/:id' component={CompanyEdit}></Route>
        <Route path="/addcompany" component={CompanyPost} />
        <Route path="/exchanges" exact={true} component={ExchangeList}/>
        <Route path="/addexchange" component={ExchangePost} />
        <Route path="/ipodetails" component={IPOAdminList} />
        <Route path="/ipoedit/:id" component={IPOAdminEdit} />
        <Route path="/ipouser" component={IPOUserList}/>
        <Route path="/login" component={Login} />
        <Route path="/chart" component={IPOUserMChart} />
        <Route path="/register" component={Register} />
        <Route path="/sectors" component={SectorList} />
        <Route path="/addsector" component={SectorPost} />
        <Route path="/sector/:id" component={SectorEdit} />
        </Switch>
        </div>
  
      </div>
      
    );
  }
}

export default App;
