import React,{ Component } from 'react';
import {Button, Container,Table} from 'reactstrap';
import { Modal } from 'react-bootstrap';
import authHeader from '../Services/auth-header';
class CompanyUserList extends Component{
    constructor(props){
        super(props);
        this.state={companies:[],isLoading:true,showHide:false,current:{}};
        
        
    }
    async componentDidMount(){
        this.setState({isLoading:true});
        //const API_URL='http://localhost:8080/';
        const API_URL='https://stockexchangebackend.herokuapp.com/'
        await fetch(API_URL+'companies',{
            headers: authHeader()
        })
        .then(response=>response.json())
        .then(data=>this.setState({companies:data,isLoading:false}));
    }
    handleModalShowHide(x) {
        this.setState({ showHide: !this.state.showHide })
        this.setState({current:x});
        
    }
    render(){
        const {companies,isLoading}=this.state;
        if(isLoading){
            return <div><p>No Companies Found</p></div>
        }
        const compList=companies.map(company=>{
            const {current}=this.state;
            return <tr key={company.id}>
                <td>{company.companyName}</td>
                <td>{company.ceo}</td>
                <td>{company.companyBrief}</td>
                <td>{company.boardOfDirectors}</td>
                <td><Button variant="primary" onClick={() => this.handleModalShowHide(company)}>
                    More Info
                </Button><Modal class="modal" show={this.state.showHide}>
                    <Modal.Header  >
                    <Modal.Title>{current.companyName}</Modal.Title>
                    <Button className="btn-close" onClick={() => this.handleModalShowHide(company)}></Button>
                    </Modal.Header>
                    <Modal.Body><h6>Details</h6>
                    <ul>
                        <li>CEO: {current.ceo}</li>
                        <li>Turnover: {current.turnover}</li>
                        <li>Brief: {current.companyBrief}</li>
                        <li>Board: {current.boardOfDirectors}</li>
                    </ul>
                    <h6>IPO Details</h6>
                    <ul>
                        <li>Exchanges registered: {current.exchange}</li>
                        <li>Price of Share: {current.pricePerShare}</li>
                        <li>No of Shares: {current.totalNumberOfShares}</li>
                        <li>Open Date Time: {current.openDateTime}</li>
                    </ul>
                    
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal></td>
            </tr>
            
        });
        
        return(
            <div>
                <Container fluid>
                    
                    <h3>Companies</h3>
                    <Table className="mt-4">
                    <thead>
                    <tr>
                    <th width="10%">Name</th>
                    <th width="10%">CEO</th>
                    <th width="20%">Brief</th>
                    <th width="20%">Board Of Directors</th>
                    <th>Information</th>
                    </tr>
                    </thead>
                    <tbody>
                    {compList}
                    </tbody>
          </Table>
          
          
          
                </Container>
            </div>
        );
    }
}
export default CompanyUserList;