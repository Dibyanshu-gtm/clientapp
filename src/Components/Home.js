import React,{Component} from 'react';
import {Container} from 'reactstrap';
import AuthService from '../Services/auth.service';

class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            isAdmin:false,
            currentUser:undefined
        }
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
                
                <Container fluid>
                    <h1>STOCK APP</h1>
                    {isAdmin &&(<div>
                    <h3>Welcome Admin . Time to Work</h3>
                    <br></br>
                    <div class="col-sm-6 offset-md-3">
                    <h3 class="card-title mb-5"> Profile Details</h3>
                    <p>username: {currentUser.username}</p>
                    <p>Email: {currentUser.email}</p>
                    </div>
                    </div>
                    )}
                    {currentUser&&!isAdmin &&(<div>
                    <h3>Welcome User . Please Explore the Nav links</h3>
                    <br></br>
                    <div class="col-sm-6 offset-md-3">
                    <h3 class="card-title mb-5"> Profile Details</h3>
                    <p>username: {currentUser.username}</p>
                    <p>Email: {currentUser.email}</p>
                    </div>
                    </div>
                    )}
                    {!currentUser&&(<h3>Hello Wanderer . Welcome to this Website . Register/Login to continue</h3>)}
                </Container>
            </div>
        );
    }
}
export default Home;