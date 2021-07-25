import React,{ Component } from 'react';
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';

import Column2D from "fusioncharts/fusioncharts.charts";

import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import authHeader from '../Services/auth-header';

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);
let chartConfigsitem={
    type: 'msline',
    renderAt: 'chart-container',
    width: '700',
    height: '400',
    dataFormat: 'json',
    dataSource: {
      "chart": {
        "theme": "fusion",
        "showBorder": "1",
        "borderColor": "#666666",
        "borderThickness": "4",
        "borderAlpha": "80",
        "caption": "Stock Prices of Companies",
        "subCaption": "All prices are in Rupees",
        "xAxisName": "Time",
        "yAxisName":"Price in Rupees"
      },
      "categories": [],
      "dataset": [
      ]
    
    }
  };

  class IPOUserMChart extends Component{
    postItem={
      "companyName":"",
      "exchangename":"",
      "timetype":"",
      "from":"",
      "todate":""
    };
    constructor(props)
    {
        super(props);
        this.state={chartConfigs:chartConfigsitem,item:this.postItem,
          exchanges:[],companies:[],text:'',suggestions:[]};
         this.handleSubmit=this.handleSubmit.bind(this);
         this.handleChange=this.handleChange.bind(this);
         this.remove=this.remove.bind(this);
         
    }
    componentDidMount()
    {
      //const API_URL='http://localhost:8080/';
        const API_URL='https://stockexchangebackend.herokuapp.com/'
        fetch(API_URL+'exchange',{
          headers: authHeader()
        })
        .then(response=>response.json())
        .then(data=>this.setState({exchanges:data}));

        fetch(API_URL+'company',{
          headers: authHeader()
        })
        .then(response=>response.json())
        .then(data=>this.setState({companies:data}));
    }
    onChangeHandler(x){
      let matches=[];
      const {companies}=this.state;
      if(x.length>0)
      {
        matches=companies.filter(company=>{
          const regex= new RegExp(`${x}`,"gi");
            return company.companyName.match(regex);
        })
      }
      //console.log('matches',matches);
      let suggestions=this.state.suggestions;
      this.setState({suggestions:matches});
      let text =this.state.text;
      this.setState({text:x});
    }
    onSuggestHandler(x){
      let text =this.state.text;
      let suggestions=this.state.suggestions;
      this.setState({text:x});
      this.setState({suggestions:[]});
    }
    handleChange(event){
      const target = event.target;
      const value = target.value;
      const name= target.name;
      let item ={...this.state.item};
      item[name]= value;
      this.setState({item});
  }
    handleSubmit(event){
      event.preventDefault();
      //let API_URL="http://127.0.0.1:8080"
      let API_URL="https://stockexchangebackend.herokuapp.com"
      const{item}=this.state;
      const{text}=this.state;
      item.companyName=text;
      if(item.timetype=="Yearly")
      {
        
        fetch(API_URL+'/getpriceyear/'+item.companyName+'?from='+item.from+'&todate='+item.todate+'&exchangename='+item.exchangename,{
          headers: authHeader()
        })
        .then(response=>{return response.json()})
        .then(response=>{
          const{chartConfigs}=this.state;
          var cs={};
          const newDataset={
            "seriesname": item.companyName,
                "data": [
                ]
          }
          const newCat={
            "category":[]
          }
          response.forEach((value,key)=>{
            newCat.category[key]={
              'label':response[key].label
            }
            newDataset.data[key]={
              'value':(response[key].price==0)?'':response[key].price
            }
          });
          chartConfigs.dataSource.categories.push(newCat);
            chartConfigs.dataSource.dataset.push(newDataset);
            cs=chartConfigs;
            this.setState({chartConfigs:cs})
            //console.log('chart'+JSON.stringify(chartConfigs));
        })
      }
      else if(item.timetype=="Date")
      {
        
        fetch(API_URL+'/getpricedate/'+item.companyName+'?from='+item.from+'&todate='+item.todate+'&exchangename='+item.exchangename,{
          headers: authHeader()
        })
        .then(response=>{return response.json()})
        .then(response=>{
          const{chartConfigs}=this.state;
          var cs={};
          const newDataset={
            "seriesname": item.companyName,
                "data": [
                ]
          }
          const newCat={
            "category":[]
          }
          response.forEach((value,key)=>{
            newCat.category[key]={
              'label':response[key].label
            }
            newDataset.data[key]={
              'value':(response[key].price==0)?'':response[key].price
            }
          });
          chartConfigs.dataSource.categories.push(newCat);
            chartConfigs.dataSource.dataset.push(newDataset);
            cs=chartConfigs;
            this.setState({chartConfigs:cs})
            //console.log('chart'+JSON.stringify(chartConfigs));
        })
      }
      else{
        
        fetch(API_URL+'/getpricetime/'+item.companyName+'?from='+item.from+'&exchangename='+item.exchangename,{
          headers: authHeader()
        })
        .then(response=>{return response.json()})
        .then(response=>{
          const{chartConfigs}=this.state;
          var cs={};
          const newDataset={
            "seriesname": item.companyName,
                "data": [
                ]
          }
          const newCat={
            "category":[]
          }
          response.forEach((value,key)=>{
            newCat.category[key]={
              'label':response[key].label
            }
            newDataset.data[key]={
              'value':(response[key].price==0)?'':response[key].price
            }
          });
          chartConfigs.dataSource.categories.push(newCat);
            chartConfigs.dataSource.dataset.push(newDataset);
            cs=chartConfigs;
            this.setState({chartConfigs:cs})
            //console.log('chart'+JSON.stringify(chartConfigs));
        })
      }

    }
    remove(){
      var cs= {}
      const{chartConfigs}=this.state;
      chartConfigs.dataSource.dataset.pop();
      
      chartConfigs.dataSource.categories.pop()
      cs=chartConfigs;
      this.setState({chartConfigs:cs})

    }
    render(){
        const {chartConfigs}=this.state;
        const{item,exchanges,text}=this.state;
        const {suggestions}=this.state;
        const title=<h1>STOCK COMPARISION</h1>
        const optionItems=exchanges.map((exchange)=>
          
          <option value={exchange.name}>{exchange.name}</option>
        );
        
          return (
              <div>{title}
              <div class="card">
              <h3>Things to remember while using the compare tool</h3>
              <div class="card-body">
              <ul>
                <li>You can only compare companies in the same time frame </li>
                <li>After you add the first company , you cannot change the other options until you remove everything</li>
              </ul>
              </div>
              </div>
              <Container>
                  <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="companyName">Company Name</Label>
                        {/* <Input type="text" name="companyName" id="companyName" value={item.companyName || ''} onChange={this.handleChange} /> */}
                        <Input type="text" name="companyName" id="companyName"  onChange={e=>this.onChangeHandler(e.target.value)} value={text}
                    onBlur={()=>{
                      setTimeout(()=>{
                        let suggestions=this.state.suggestions;
                        this.setState({suggestions:[]})
                      },300);
                    }}
                    ></Input>
                    {suggestions && suggestions.map((suggestion,i)=>
                    <div key={i} onClick={()=>this.onSuggestHandler(suggestion.companyName)} className="suggestion justify-content-md-center" ><center>{suggestion.companyName}</center></div>)}
                    </FormGroup>
                    {chartConfigs.dataSource.dataset.length==0 &&(<FormGroup>
                        <Label for="exchangename">Exchange Name</Label>
                        {/* <Input type="text" name="exchangename" id="exchangename" value={item.exchangename || ''} onChange={this.handleChange} /> */}
                        <Input type="select" name="exchangename" id="exchangename" onChange={this.handleChange}>
                        <option value="none" selected disabled hidden>
                            Select an Option
                            </option>
                          {optionItems}
                        </Input>
                    </FormGroup>)}
                    {chartConfigs.dataSource.dataset.length==0 &&(<FormGroup>
                        <Label for="timetype">Periodicity</Label>
                        <Input type="select" name="timetype" id="timetype"  onChange={this.handleChange}>
                          <option value="none" selected disabled hidden>
                            Select an Option
                            </option>
                          <option value="Yearly">Yearly</option>
                          <option value="Date">Date</option>
                          <option value="Daily">Single Day </option>
                        </Input>
                    </FormGroup>)}
                    {chartConfigs.dataSource.dataset.length==0 &&(<FormGroup>
                        <Label for="from">From (If Date then format - YYYY-MM-DD)</Label>
                        <Input type="text" name="from" id="from" value={item.from || ''}  onChange={this.handleChange} autoComplete="off" />
                    </FormGroup>)}
                    {item.timetype!="Daily" && chartConfigs.dataSource.dataset.length==0 &&(<FormGroup>
                        <Label for="todate">To</Label>
                        <Input type="text" name="todate" id="todate" value={item.todate || ''} onChange={this.handleChange} autoComplete="off"/>
                    </FormGroup>)}
                    <FormGroup>
                      <Button color="primary" type="submit">Add</Button>
                      <Button color="danger" onClick={this.remove}>Remove</Button>
                    </FormGroup>
                  </Form>
                  {/* <Form>
                    
                    <Input type="text" onChange={e=>this.onChangeHandler(e.target.value)} value={text}
                    onBlur={()=>{
                      setTimeout(()=>{
                        let suggestions=this.state.suggestions;
                        this.setState({suggestions:[]})
                      },100);
                    }}
                    ></Input>
                    {suggestions && suggestions.map((suggestion,i)=>
                    <div key={i} onClick={()=>this.onSuggestHandler(suggestion.companyName)} className="suggestion justify-content-md-center">{suggestion.companyName}</div>)}
                  </Form> */}
              </Container>
          
          <div class="col-md-8 mb-5 offset-md-3">
          {chartConfigs.Chart}
          <ReactFC {...chartConfigs} />
          </div>
          </div>
          );
    }
  }
  export default IPOUserMChart;