import React,{ Component } from 'react';
import {Container,Table} from 'reactstrap';

class IPOUserList extends Component{
    constructor(props){
        super(props);
        this.state={ipos:[],isLoading:true};
    }
    async componentDidMount()
    {
        this.setState({isLoading:true});
        //const API_URL='http://localhost:8080/';
        const API_URL='https://stockexchangebackend.herokuapp.com/'
        await fetch(API_URL+'ipodetails')
        .then(response=>response.json())
        .then(data=>this.setState({ipos:data,isLoading:false}));
    }
    render(){
        const {ipos,isLoading}=this.state;
        if(isLoading){
            return <p>.....Loading</p>
        }
        const ipoList= ipos.map(ipo=>{
            
            return <tr key={ipo.id}>
                <td>{ipo.companyName}</td>
                <td>{ipo.exchange}</td>
                <td>{ipo.pricePerShare}</td>
                <td>{ipo.totalNumberOfShares}</td>
                <td>{ipo.openDateTime}</td>
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

export default IPOUserList;