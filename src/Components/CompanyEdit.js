import React,{ Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';

class CompanyEdit extends Component{
    companyItem={
        companyName:'',
        turnover:'',
        ceo: '',
        boardOfDirectors:'',
        companyBrief:''
    };
    constructor(props){
        super(props);
        this.state={
            company:this.companyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
    }
    async componentDidMount(){
        if(this.props.match.params.id!==''){
            const comp= await(await fetch(`https://stockexchangebackend.herokuapp.com/company/${this.props.match.params.id}`)).json();
            this.setState({company:comp});
            
        }
    }
    handleChange(event){
        const target=event.target;
        const value=target.value;
        const name=target.name;
        let company={...this.state.company};
        company[name]=value;
        this.setState({company});
        
    }
    async handleSubmit(event){
        event.preventDefault();
        const{company}=this.state;
        await fetch('https://stockexchangebackend.herokuapp.com/company'+ (company.id ? '/' + company.id : ''),{
            method:'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(company),
        });
        this.props.history.push('/companies');
    }
    render(){
        const {company}= this.state;
        const title=<h2>Edit Group</h2>;
        return <div>
            <Container>
                {title}
                
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="companyName">Company Name</Label>
                        <Input type="text" name="companyName" id="companyName" value={company.companyName || ''}
                        onChange={this.handleChange} autoComplete="companyName"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="turnover">TurnOver</Label>
                        <Input type="number" step="any" name="turnover" id="turnover" value={company.turnover || ''}
                        onChange={this.handleChange} autoComplete="turnover" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="ceo">CEO</Label>
                        <Input type="text" name="ceo" id="ceo" value={company.ceo || ''}
                        onChange={this.handleChange} autoComplete="ceo"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="boardOfDirectors">BoardOfDirectors</Label>
                        <Input type="text" name="boardOfDirectors" id="boardOfDirectors" value={company.boardOfDirectors || ''}
                        onChange={this.handleChange} autoComplete="boardOfDirectors"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="companyBrief">Brief</Label>
                        <Input type="text" name="companyBrief" id="companyBrief" value={company.companyBrief || ''}
                        onChange={this.handleChange} autoComplete="companyBrief"/>
                    </FormGroup>
                    <Input type="hidden" name="id" id="id" value={company.id}></Input>
                    <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/companies">Cancel</Button>
          </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default CompanyEdit;