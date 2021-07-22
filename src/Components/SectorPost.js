import React,{ Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';

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
        await fetch('/sector' , {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
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
        <Button color="primary" type="submit">Save</Button>{' '}
        <Button color="secondary" tag={Link} to="/sectors">Cancel</Button>
      </FormGroup>
            </Form>
        </Container>
    </div>
    }

}
export default SectorPost;