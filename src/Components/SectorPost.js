import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import authHeader from '../Services/auth-header';
class SectorPost extends Component{
    postItem={
        sectorName:"",
        brief:""
    };
    constructor(props){
        super(props);
        this.state={
            item:this.postItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
    }
    handleChange(event){
        const target = event.target;
        const value = target.value;
        const name= target.name;
        let item ={...this.state.item};
        item[name]= value;
        this.setState({item});
    }
    async handleSubmit(event){
        event.preventDefault();
        const {item}= this.state;
        //const API_URL='http://localhost:8080/';
        const API_URL='https://stockexchangebackend.herokuapp.com/'
        await fetch(API_URL+'sector' , {
            method: 'POST',
            headers: authHeader(),
            body: JSON.stringify(item),
          });
          this.props.history.push('/sectors');
    }
    render(){
        const {item}=this.state;
        const title=<h2>Add Sector</h2>
        return <div>
        <Container>
            {title}
            
            <Form onSubmit={this.handleSubmit}>
            <FormGroup>
                    <Label for="sectorName">Sector Name</Label>
                    <Input type="text" name="sectorName" id="sectorName" value={item.sectorName || ''}
                    onChange={this.handleChange} autoComplete="sectorName"/>
                </FormGroup>
                <FormGroup>
                    <Label for="brief">Brief</Label>
                    <Input type="text"  name="brief" id="brief" value={item.brief || ''}
                    onChange={this.handleChange} autoComplete="brief" />
                </FormGroup>
                <FormGroup>
        <Button color="primary" className="mt-5 mr-3" type="submit">Save</Button>{' '}
        <Button color="secondary" className="mt-5 ml-3" tag={Link} to="/sectors">Cancel</Button>
      </FormGroup>
            </Form>
        </Container>
    </div>
    }

}
export default SectorPost;