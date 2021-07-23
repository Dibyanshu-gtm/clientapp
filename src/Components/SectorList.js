import React,{ Component } from 'react';
import {Button, ButtonGroup,Container,Table} from 'reactstrap';
import {Link} from 'react-router-dom';

class SectorList extends Component{
    constructor(props){
        super(props);
        this.state={sectors:[],isLoading:true};
    }

    async componentDidMount(){
        this.setState({isLoading:true});
        await fetch('https://stockexchangebackend.herokuapp.com/sector')
        .then(response=>response.json())
        .then(data=>this.setState({sectors:data,isLoading:false}));
    }
    render(){
        const{sectors,isLoading}=this.state;
        if(isLoading){
            return <div>
                <p>...... Loading</p>
                <div className="float-right">
                <Button color="success" tag={Link} to="/addsector">Add Sector</Button>
                </div>
            </div>
        }
        const secList=sectors.map(sector=>{
            return <tr key={sector.id}>
                <td>{sector.sectorName}</td>
                <td>{sector.brief}</td>
                <td>
                <Button size="sm" color="primary" tag={Link} to={"/sector/"+sector.id}>Edit</Button> 
                </td>
            </tr>
        });
        return(
            <div>
                <Container fluid>
                <div className="float-right">
                <Button color="success" tag={Link} to="/addsector">Add Sector</Button>
                </div>
                <h3>Sectors</h3>
                <Table className="mt-4">
                    <thead>
                        <tr>
                            <th width="20%">Name</th>
                            <th width="30%">Brief</th>
                            <th>Actions</th>
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
export default SectorList;