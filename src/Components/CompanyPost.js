import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import authHeader from '../Services/auth-header';
class CompanyPost extends Component{
    postItem={
        "companyName":"",
    "turnover":"",
    "ceo":"",
    "boardOfDirectors": "",
    "companyBrief":"",
    "openDateTime":"",
    "pricePerShare":"",
    "totalNumberOfShares":"",
    "exchangeName":"",
    "sector":"",
    "CompanyCode":""
    };
    constructor(props){
        super(props);
        this.state={
            item:this.postItem,
            exchanges:[],
            sectors:[]
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
    }
    componentDidMount(){
        //const API_URL='http://localhost:8080/';
      const API_URL='https://stockexchangebackend.herokuapp.com/'
        fetch(API_URL+'exchange',{
          headers: authHeader()
        })
        .then(response=>response.json())
        .then(data=>this.setState({exchanges:data}));
        fetch(API_URL+'sector',{
          headers: authHeader()
        })
        .then(response=>response.json())
        .then(data=>this.setState({sectors:data}));
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
        await fetch(API_URL+'company' , {
            method: 'POST',
            headers: authHeader(),
            body: JSON.stringify(item),
          });
          this.props.history.push('/companies');
    }
    render(){
        const{item,exchanges,sectors}=this.state;
        const optionItems=exchanges.map((exchange)=>
          
          <option value={exchange.name}>{exchange.name}</option>
        );

        const optionsec=sectors.map((sector)=>
        <option value={sector.sectorName}>{sector.sectorName}</option>
        );
        const title=<h2>Add Group</h2>
        return <div>
            <Container>
                {title}
                
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="companyName">Company Name</Label>
                        <Input type="text" name="companyName" id="companyName" value={item.companyName || ''}
                        onChange={this.handleChange} autoComplete="companyName"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="turnover">TurnOver</Label>
                        <Input type="number" step="any" name="turnover" id="turnover" value={item.turnover || ''}
                        onChange={this.handleChange} autoComplete="turnover" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="ceo">CEO</Label>
                        <Input type="text" name="ceo" id="ceo" value={item.ceo || ''}
                        onChange={this.handleChange} autoComplete="ceo"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="boardOfDirectors">BoardOfDirectors</Label>
                        <Input type="text" name="boardOfDirectors" id="boardOfDirectors" value={item.boardOfDirectors || ''}
                        onChange={this.handleChange} autoComplete="boardOfDirectors"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="companyBrief">Brief</Label>
                        <Input type="text" name="companyBrief" id="companyBrief" value={item.companyBrief || ''}
                        onChange={this.handleChange} autoComplete="companyBrief"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="openDateTime">Open Date Time ("yyyy-mm-dd HH:mm:ss")</Label>
                        <Input type="text" name="openDateTime" id="openDateTime" value={item.openDateTime || ''}
                        onChange={this.handleChange} autoComplete="openDateTime"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="pricePerShare">Price Per Share</Label>
                        <Input type="number" step="any" name="pricePerShare" id="pricePerShare" value={item.pricePerShare || ''}
                        onChange={this.handleChange} autoComplete="pricePerShare"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="totalNumberOfShares">Total Number of Shares</Label>
                        <Input type="number" step="any" name="totalNumberOfShares" id="totalNumberOfShares" value={item.totalNumberOfShares || ''}
                        onChange={this.handleChange} autoComplete="totalNumberOfShares"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exchangeName">Exchange Name</Label>
                        {/* <Input type="text" name="exchangeName" id="exchangeName" value={item.exchangeName || ''}
                        onChange={this.handleChange} autoComplete="exchangeName"/> */}
                        <Input type="select" name="exchangeName" id="exchangeName" onChange={this.handleChange}>
                        <option value="none" selected disabled hidden>
                            Select an Option
                            </option>
                          {optionItems}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="sector">Sector</Label>
                        {/* <Input type="text" name="sector" id="sector" value={item.sector || ''}
                        onChange={this.handleChange} autoComplete="sector"/> */}
                        <Input type="select" name="sector" id="sector" onChange={this.handleChange}>
                    <option value="none" selected disabled hidden>
                            Select an Option
                            </option>
                            {optionsec}
                    </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="CompanyCode">Company Code</Label>
                        <Input type="text" name="CompanyCode" id="CompanyCode" value={item.CompanyCode || ''}
                        onChange={this.handleChange} autoComplete="CompanyCode"/>
                    </FormGroup>
                    <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/companies">Cancel</Button>
          </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default CompanyPost;
