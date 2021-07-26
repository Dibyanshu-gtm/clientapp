import React,{ Component } from 'react';
import {Button,Container,Table} from 'reactstrap';
import { Modal } from 'react-bootstrap';
import authHeader from '../Services/auth-header';

class SectorUserList extends Component{
    
    constructor(props){
        super(props);
        this.state={sectors:[],isLoading:true,showHide:false,current:{}};
    }

    async componentDidMount(){
        this.setState({isLoading:true});
        //const API_URL='http://localhost:8080/';
        const API_URL='https://stockexchangebackend.herokuapp.com/'
        await fetch(API_URL+'sector',{
            headers:authHeader()
        })
        .then(response=>response.json())
        .then(data=>this.setState({sectors:data,isLoading:false}));
    }
    handleModalShowHide(x) {
        this.setState({ showHide: !this.state.showHide })
        this.setState({current:x});
    }
    render(){
        const{sectors,isLoading}=this.state;
        if(isLoading){
            return <p>No Sectors Found</p>
        }
        const secList=sectors.map(sector=>{
            const {current}= this.state;
            return <tr key={sector.id}>
                <td>{sector.sectorName}</td>
                <td>{sector.brief}</td>
                <td><Button variant="primary" onClick={() => this.handleModalShowHide(sector)}>
                    More Info
                </Button><Modal show={this.state.showHide}>
                    <Modal.Header  >
                    <Modal.Title>SECTOR DETAILS</Modal.Title>
                    <Button className="btn-close" onClick={() => this.handleModalShowHide(sector)}></Button>
                    </Modal.Header>
                    <Modal.Body><h6>Details</h6>
                    <ul>
                        <li>Name: {current.sectorName}</li>
                        <li>Brief: {current.brief}</li>
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
                    
                    <h3>Sectors</h3>
                    <Table className="mt-4">
                    <thead>
                    <tr>
                    <th width="20%">Name</th>
                    <th>Brief</th>
                    <th width="20%">Information</th>
                    
                    </tr>
                    </thead>
                    <tbody>
                    {secList}
                    </tbody>
          </Table>

                </Container>
            </div>
        );
    }
    
}

export default SectorUserList;