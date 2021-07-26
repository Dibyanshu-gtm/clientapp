import React,{Component} from 'react';
import Home from './Components/Home';
import SheetJSApp from './Components/SheetJSApp';
import CompanyEdit from './Components/CompanyEdit';
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
import IPOUserSChart from './Components/IPOUserSChart';
import CompanyUserList from './Components/CompanyUserList';
import SectorUserList from './Components/SectorUserList';
import "./App.css";
import { BrowserRouter as Router, Route, Switch ,Link} from 'react-router-dom'; 
import AuthService from './Services/auth.service';
import { Navbar, Container,Nav } from 'react-bootstrap';
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
      
        <div class="bg-image"> 
        <div class="mask"> 
          
      <div>
      <Navbar className="color-nav"  variant="dark" expand="lg">
      <p> </p>
    <Navbar.Brand href="/">
    <img src="./stockapp.png" width="30" height="30" />{' '}
      Stock App</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="container-fluid" >
      {isAdmin &&(<Nav.Link href="/upload">Upload</Nav.Link>)}
      {isAdmin &&(<Nav.Link href="/companies">Companies</Nav.Link>)}
      {isAdmin &&(<Nav.Link href="/exchanges">Exchanges</Nav.Link>)}
      {isAdmin &&(<Nav.Link href="/ipodetails">IPO</Nav.Link>)}
      {isAdmin &&(<Nav.Link href="/sectors">Sectors</Nav.Link>)}
      {!isAdmin && currentUser &&(<Nav.Link href="/ipouser">IPO</Nav.Link>)}
      {!isAdmin && currentUser &&(<Nav.Link href="/chart">Compare Companies</Nav.Link>)}
      {!isAdmin && currentUser &&(<Nav.Link href="/schart">Compare Sectors</Nav.Link>)}
      {!isAdmin && currentUser &&(<Nav.Link href="/companieslist">Companies</Nav.Link>)}
      {!isAdmin && currentUser &&(<Nav.Link href="/sectorlist">Sectors</Nav.Link>)}
      
      {currentUser?(
        
        <Nav.Link    href="/login" onClick={this.logOut}>Logout {currentUser.username}</Nav.Link>
      ):(
        <Nav.Link href="/login">Login</Nav.Link>
      )}
      {currentUser?(
        <p></p>
      ):(
        <Nav.Link href="/register">Register</Nav.Link>
      )}
    
    </Nav>
    </Navbar.Collapse>
    
  </Navbar>
      </div>
        
        <div >
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
        <Route path="/schart" component={IPOUserSChart} />
        <Route path="/register" component={Register} />
        <Route path="/sectors" component={SectorList} />
        <Route path="/addsector" component={SectorPost} />
        <Route path="/sector/:id" component={SectorEdit} />
        <Route path="/companieslist" component={CompanyUserList} />
        <Route path="/sectorlist" component={SectorUserList} />
        </Switch>
        </div>
        </div>
      </div>
      
    );
  }
}

export default App;
