import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';

class ExchangePost extends Component{
    exchangeitem={
        "name":""
    };
    constructor(props){
        super(props);
        this.state={
            item:this.exchangeitem
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
        const API_URL='/api/'
        await fetch(API_URL+'exchange' , {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
          });
          this.props.history.push('/exchanges');
    }
    render(){
        const{item}=this.state;
        const title= <h2>Add Exchange</h2>
        return <div>
            <Container>
            {title}
            <Form onSubmit={this.handleSubmit}>
            <FormGroup>
                        <Label for="name">Exchange Name</Label>
                        <Input type="text" name="name" id="name" value={item.name || ''}
                        onChange={this.handleChange} autoComplete="name"/>
            </FormGroup>
            <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/exchanges">Cancel</Button>
          </FormGroup>
            </Form >
            </Container>
        </div>
    }
}
export default ExchangePost;