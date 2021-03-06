import React,{ Component } from 'react';
import {Button,Container,Table} from 'reactstrap';
import {Link} from 'react-router-dom';
import authHeader from '../Services/auth-header';
class ExchangeList extends Component{
    constructor(props){
        super(props);
        this.state={exchanges:[],isLoading:true};
    }
    async componentDidMount()
    {
        this.setState({isLoading:true});
        //const API_URL='http://localhost:8080/';
        const API_URL='/api/'
        await fetch(API_URL+'exchange',{
            headers:authHeader()
        })
        .then(response=>response.json())
        .then(data=>this.setState({exchanges:data,isLoading:false}));
    }
    render(){
        const {exchanges,isLoading}=this.state;
        if(isLoading){
            
            return<div> <p>No Exchanges Found. Add Some</p>
            <div class="d-flex justify-content-center">
  <div class="spinner-border text-light" role="status">
    <span class="sr-only"></span>
  </div>
</div>
            <div className="float-right">
            {'   '}
                        <Button color="success" tag={Link} to="/addexchange">Add Exchange</Button>
                    </div></div>
        }
        const exList= exchanges.map(exchange=>{
            return <tr key={exchange.id}>
                <td>{exchange.name}</td>
            </tr>
        });
        return(
            <div>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/addexchange">Add Exchange</Button>
                    </div>
                    <h3>Exchanges</h3>
                    <Table className="mt-4">
                    <thead>
                    <tr>
                    <th width="20%">Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {exList}
                    </tbody>
          </Table>
                </Container>
            </div>
        );
    }
}

export default ExchangeList;