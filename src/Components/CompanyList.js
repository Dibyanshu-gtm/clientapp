import React,{ Component } from 'react';
import {Button,Container,Table} from 'reactstrap';
import {Link} from 'react-router-dom';

class CompanyList extends Component{
    constructor(props){
        super(props);
        this.state={companies:[],isLoading:true};
        this.delete= this.delete.bind(this);
    }
    async componentDidMount(){
        this.setState({isLoading:true});
        //const API_URL='http://localhost:8080/';
        const API_URL='https://stockexchangebackend.herokuapp.com/'
        await fetch(API_URL+'company')
        .then(response=>response.json())
        .then(data=>this.setState({companies:data,isLoading:false}));
    }
    delete(id)
    {
        //const API_URL='http://localhost:8080/';
        const API_URL='https://stockexchangebackend.herokuapp.com/'
        fetch(API_URL+'delete/'+id,{
            method:'DELETE'
        }).then(response=>
            fetch(API_URL+'company')
            .then(response=>{
                if(response.status==204)
                {
                    this.setState({companies:[],isLoading:true});
                }
                else{
                    return response.json();
                }
            })
            .then(data=>
                {
                if(data)
                {
                this.setState({companies:data,isLoading:false})
                }
                else
                {
                    this.setState({companies:[],isLoading:true});
                }
            }
                
                
                )
            );
        

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
            
            return <tr key={company.id}>
                <td>{company.companyName}</td>
                <td>{company.ceo}</td>
                <td>{company.companyBrief}</td>
                <td>
                    <Button size="sm" color="primary" tag={Link} to={"/companies/"+company.id}>Edit</Button>
                    <Button size="sm" color="primary" onClick={()=>this.delete(company.id)} >Delete</Button>
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