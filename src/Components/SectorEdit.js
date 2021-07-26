import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import authHeader from '../Services/auth-header';


class SectorEdit extends Component{
    sectorItem={
        sectorName:'',
        brief:''
    };
    constructor(props){
        super(props);
        this.state={
            sector:this.sectorItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
    }
    async componentDidMount(){
        if(this.props.match.params.id!=='')
        {
            //const API_URL='http://localhost:8080/';
            const API_URL='https://stockexchangebackend.herokuapp.com/'
            const sect=await(await fetch(API_URL+`getsector/${this.props.match.params.id}`,{
                headers:authHeader()
            })).json();
            this.setState({sector:sect});
        }
    }
    handleChange(event){
        const target=event.target;
        const value=target.value;
        const name=target.name;
        let sector={...this.state.sector};
        sector[name]=value;
        this.setState({sector});
        
    }
    async handleSubmit(event){
        event.preventDefault();
        const{sector}=this.state;
        //const API_URL='http://localhost:8080/';
        const API_URL='https://stockexchangebackend.herokuapp.com/'
        await fetch(API_URL+'sector'+'/'+sector.id,{
            method:'PUT',
            headers: authHeader(),
            body:JSON.stringify(sector),
        });
        this.props.history.push('/sectors');
    }
    render(){
        const {sector}=this.state;
        const title=<h2>Edit Sector</h2>
        return <div>
        <Container>
            {title}
            
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label for="sectorName">Sector Name</Label>
                    <Input type="text" name="sectorName" id="sectorName" value={sector.sectorName || ''}
                    onChange={this.handleChange} autoComplete="sectorName"/>
                </FormGroup>
                <FormGroup>
                    <Label for="brief">Brief</Label>
                    <Input type="text"  name="brief" id="brief" value={sector.brief || ''}
                    onChange={this.handleChange} autoComplete="brief" />
                </FormGroup>
                
                <Input type="hidden" name="id" id="id" value={sector.id}></Input>
                <FormGroup>
        <Button color="primary" className="mt-5 mr-3" type="submit">Save</Button>{' '}
        <Button color="secondary" className="mt-5 mr-3" tag={Link} to="/sectors">Cancel</Button>
      </FormGroup>
            </Form>
        </Container>
    </div>
    }
}
export default SectorEdit;