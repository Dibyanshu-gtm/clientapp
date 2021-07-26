import React,{ Component } from 'react';
import {Button,Container,Table} from 'reactstrap';
import {Link} from 'react-router-dom';
import authHeader from '../Services/auth-header';
class IPOAdminList extends Component{
    constructor(props){
        super(props);
        this.state={ipos:[],isLoading:true};
    }
    async componentDidMount()
    {
        this.setState({isLoading:true});
        //const API_URL='http://localhost:8080/';
        const API_URL='https://stockexchangebackend.herokuapp.com/'
        await fetch(API_URL+'ipodetails',{
            headers: authHeader()
        })
        .then(response=>response.json())
        .then(data=>this.setState({ipos:data,isLoading:false}));
    }
    render(){
        const {ipos,isLoading}=this.state;
        if(isLoading){
            return <div><p>NO IPO found. Create a Company first</p>
            <div class="d-flex justify-content-center">
  <div class="spinner-border text-light" role="status">
    <span class="sr-only"></span>
  </div>
</div>
            </div>
            
        }
        const ipoList= ipos.map(ipo=>{
            
            return <tr key={ipo.id}>
                <td>{ipo.companyName}</td>
                <td>{ipo.exchange}</td>
                <td>{ipo.pricePerShare}</td>
                <td>{ipo.totalNumberOfShares}</td>
                <td>{ipo.openDateTime}</td>
                <td>
                    <Button size="sm" color="primary" tag={Link} to={"/ipoedit/"+ipo.id}>Edit</Button>
                </td>
            </tr>
        });
        return(
            <div>
                <Container fluid>
                    
                    <h3>IPO DETAILS</h3>
                    <Table className="mt-4">
                    <thead>
                    <tr>
                    <th width="20%">Company Name</th>
                    <th>Stock Exchanges</th>
                    <th width="10%">Price</th>
                    <th width="20%">Total Shares</th>
                    <th width="20%">Opening Time</th>
                    <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {ipoList}
                    </tbody>
          </Table>
                </Container>
            </div>
        );
    }
}

export default IPOAdminList;

