import React,{ Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import authHeader from '../Services/auth-header';
import { Row,Col } from 'react-bootstrap';
class IPOAdminEdit extends Component{
    ipoItem={
        id: '',
    companyName: '',
    pricePerShare: '',
    totalNumberOfShares: '',
    openDateTime: "",
    exchange: ""
    };
    ipoPost={
        "companyName":"",
    "exchangename":"",
    "pricePerShare":"",
    "totalNumberOfShares":"",
    "openDateTime":""
    }
    constructor(props){
        super(props);
        this.state={
            ipo:this.ipoItem,
            ipop:this.ipoPost
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
    }
    async componentDidMount(){
        if(this.props.match.params.id!==''){
            //const API_URL='http://localhost:8080/';
            const API_URL='https://stockexchangebackend.herokuapp.com/'
            const ip= await(await fetch(API_URL+`ipodetails/${this.props.match.params.id}`,{
                headers: authHeader()
            })).json();
            this.setState({ipo:ip});
            const ipop1=this.state.ipop;
            ipop1["companyName"]=this.state.ipo.companyName;
            ipop1["pricePerShare"]=this.state.ipo.pricePerShare;
            ipop1["totalNumberOfShares"]=this.state.ipo.totalNumberOfShares;
            ipop1["openDateTime"]=this.state.ipo.openDateTime;
            this.setState({ipop:ipop1});
        }
    }
    handleChange(event){
        const target=event.target;
        const value=target.value;
        const name=target.name;
        let ipop={...this.state.ipop};
        let ipo={...this.state.ipo};
        ipo[name]=value;
        ipop[name]=value;
        this.setState({ipop});
        this.setState({ipo});
    }
    async handleSubmit(event){
        event.preventDefault();
        const{ipop}=this.state;
        if(ipop.exchangename=='')
        {
            ipop.exchangename='BSE';
        }
        //const API_URL='http://localhost:8080/';
        const API_URL='https://stockexchangebackend.herokuapp.com/'
        await fetch(API_URL+'ipo',{
            method:'POST',
            headers: authHeader(),
            body:JSON.stringify(ipop),
        });
        this.props.history.push('/ipodetails');
    }
    render(){
        const {ipo}= this.state;
        const {ipop}=this.state;
        const title=<h2>Edit IPO</h2>;
        return <div>
            <Container>
                {title}
                
                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col md={6}>
                    <FormGroup>
                        <Label for="companyName">Company Name</Label>
                        <Input type="text" name="companyName" id="companyName" value={ipo.companyName || ''}
                        onChange={this.handleChange} autoComplete="companyName" readOnly/>
                    </FormGroup>
                    </Col>
                    <Col md={6}>
                    <FormGroup>
                        <Label for="exchangeshow">Exchange Names Registered</Label>
                        <Input type="text" name="exchangeshow" id="exchangeshow" value={ipo.exchange || ''}
                        onChange={this.handleChange} autoComplete="exchangeshow" readOnly/>
                    </FormGroup>
                    </Col>
                    </Row>
                    <FormGroup>
                        <Label for="exchangename">Exchange Name to be Registered (If any left)</Label>
                        <Input type="text" name="exchangename" id="exchangename" value={ipop.exchangename ||''}
                        onChange={this.handleChange} autoComplete="exchangename"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="pricePerShare">Price Per Share</Label>
                        <Input type="number" step="any" name="pricePerShare" id="pricePerShare" value={ipo.pricePerShare || ''}
                        onChange={this.handleChange} autoComplete="pricePerShare"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="totalNumberOfShares">Total Number of Shares</Label>
                        <Input type="number" step="any" name="totalNumberOfShares" id="totalNumberOfShares" value={ipo.totalNumberOfShares || ''}
                        onChange={this.handleChange} autoComplete="totalNumberOfShares"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="openDateTime">Open Date Time ("yyyy-mm-dd HH:mm:ss")</Label>
                        <Input type="text" name="openDateTime" id="openDateTime" value={ipo.openDateTime || ''}
                        onChange={this.handleChange} autoComplete="openDateTime"/>
                    </FormGroup>
                    <Input type="hidden" name="id" id="id" value={ipo.id}></Input>
                    <FormGroup>
            <Button color="primary" className="mt-3" type="submit">Save</Button>{' '}
            <Button color="secondary" className="mt-3" tag={Link} to="/ipodetails">Cancel</Button>
          </FormGroup>
                </Form>
            </Container>
        </div>
    }

}
export default withRouter(IPOAdminEdit);