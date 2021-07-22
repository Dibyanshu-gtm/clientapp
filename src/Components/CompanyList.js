import React,{ Component } from 'react';
import {Button, ButtonGroup,Container,Table} from 'reactstrap';
import {Link} from 'react-router-dom';

class CompanyList extends Component{
    constructor(props){
        super(props);
        this.state={companies:[],isLoading:true};
    }
    async componentDidMount(){
        this.setState({isLoading:true});
        await fetch('/company')
        .then(response=>response.json())
        .then(data=>this.setState({companies:data,isLoading:false}));
    }
    render(){
        const {companies,isLoading}=this.state;
        if(isLoading){
            return<div> <p>.....Loading</p>
            <div className="float-right">
                        <Button color="success" tag={Link} to="/addcompany">Add Group</Button>
                    </div>
            </div>
        }
        const compList= companies.map(company=>{
            console.log(company.companyName);
            return <tr key={company.id}>
                <td>{company.companyName}</td>
                <td>{company.ceo}</td>
                <td>{company.companyBrief}</td>
                <td>
                    <Button size="sm" color="primary" tag={Link} to={"/companies/"+company.id}>Edit</Button>
                </td>
            </tr>
        });
        return(
            <div>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/addcompany">Add Group</Button>
                    </div>
                    <h3>Companies</h3>
                    <Table className="mt-4">
                    <thead>
                    <tr>
                    <th width="20%">Name</th>
                    <th width="20%">CEO</th>
                    <th>Brief</th>
                    <th width="10%">Actions</th>
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
export default CompanyList;