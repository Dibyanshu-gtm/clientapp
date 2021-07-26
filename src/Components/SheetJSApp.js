/* xlsx.js (C) 2013-present  SheetJS -- http://sheetjs.com */
/* Notes:
   - usage: `ReactDOM.render( <SheetJSApp />, document.getElementById('app') );`
   - xlsx.full.min.js is loaded in the head of the HTML page
   - this script should be referenced with type="text/babel"
   - babel.js in-browser transpiler should be loaded before this script
*/
import React from "react";
import XLSX from "xlsx";
import authHeader from "../Services/auth-header";
export default class SheetJSApp extends React.Component {
    emptyItem={
        "pricePerShare":"",
    "exchangeName":"",
    "CompanyCode":"",
    "Date":"",
    "Time":""
    };
    emptyResp={
      "CompanyCode":"",
      "companyName":"",
      "exchangeName":"",
      "records":""
    }
  constructor(props) {
    super(props);
    this.state = {
      data: [] /* Array of Arrays e.g. [["a","b"],[1,2]] */,
      cols: [], /* Array of column objects e.g. { name: "C", K: 2 } */
      item: this.emptyItem,
      resp:this.emptyResp,
      isLoaded:false
    };
    this.handleFile = this.handleFile.bind(this);
    this.exportFile = this.exportFile.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }
  handleFile(file /*:File*/) {
    /* Boilerplate to set up FileReader */
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = e => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array", cellDates:true, cellNF: false, cellText:false});
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      console.log(rABS, wb);
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, { header: 1,raw:false,dateNF:"YYYY-MM-DD" });
      //console.log(JSON.stringify(data)+"this data needs to be passed to rest endpoint to save prices");
      /* Update state */
      this.setState({ data: data, cols: make_cols(ws["!ref"]) });
      //console.log(data);
    };
    
    if (rABS) reader.readAsBinaryString(file);
    else reader.readAsArrayBuffer(file);
  }
  exportFile() {
    /* convert state to workbook */
    const ws = XLSX.utils.aoa_to_sheet(this.state.data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    /* generate XLSX file and send to client */
    XLSX.writeFile(wb, "sheetjs.xlsx");
  }
   handleSubmit(){
        const {data}= this.state;
        const{resp}=this.state;
        let x=0;
        var exname={};
        var ccode={};
        var name={};
        console.log(data);
        data.map(async(d)=>{
            const {item}=this.state;
           if(d[0] && d[0]!="Company Code"){
           ccode=d[0];
            exname=d[1];
           item["CompanyCode"]=d[0];
           item["exchangeName"]=d[1];
           item["pricePerShare"]=d[2];
           item["Date"]=d[3];
           item["Time"]=d[4];
            x=x+1;
            //const API_URL='http://localhost:8080/';
            const API_URL='https://stockexchangebackend.herokuapp.com/'
           await fetch(API_URL+'price',{
            method: 'POST',
            headers:authHeader(),
            body:JSON.stringify(item),

        });
           }
           //console.log(item);
        
        })
        //let API_URL="http://127.0.0.1:8080/getcompanyname"
        let API_URL="https://stockexchangebackend.herokuapp.com/getcompanyname"
        fetch(API_URL+'/'+ccode+'?'+'exchangename='+exname,{
          headers:authHeader()
        })
        .then(response=>{return response.json()})
        .then(response=>{
          
          //console.log(response.companyName);
          //resp.CompanyName=response.companyName;
          name=response.companyName;
          resp.companyName=name;
          var x=resp;
          this.setState({resp:x});
        })
        this.setState({isLoaded:true});
        
        
        resp.exchangeName=exname;
        resp.records=x;
        resp.CompanyCode=ccode;
        
        //this.setState(this.state.resp.exchangeName=exname);
        //this.setState(this.state.resp.records=x);
        //this.setState(this.state.resp.CompanyCode=ccode);
  }
  
  render() {
    const{resp}=this.state;
    const {isLoaded}=this.state;
    return (
      <DragDropFile handleFile={this.handleFile}>
        <div className="row">
          <div className="col-xs-12">
            <DataInput handleFile={this.handleFile} />
          </div>
        </div>
        <div className="row" class="mx-auto" >
          <div className="col-sm-12 ">
            {'   '}
            <button
              disabled={!this.state.data.length}
              className="btn btn-primary"
              onClick={this.exportFile}
            >
              Download
            </button>{'  '}
            <button
              disabled={!this.state.data.length}
              className="btn btn-success"
              onClick={this.handleSubmit}
              
            >
              Upload
            </button>{'  '}
            <a href="https://github.com/Dibyanshu-gtm/resources/blob/master/sample_stock_data.xlsx" class="btn btn-danger" role="button" target="_blank" >Sample Excel Format</a>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            {!isLoaded&&(<OutTable data={this.state.data} cols={this.state.cols} />)}
            {isLoaded&&(<div class="col-sm-5 offset-md-3">
              <h3>Upload Summary</h3>
              <ul>
              <li>No of Records Uploaded: {resp.records}</li>
              <li>Company name : {resp.companyName}</li>
              <li>Exchange Name: {resp.exchangeName}</li>
              </ul>
              </div>)}
          </div>
        </div>
      </DragDropFile>
    );
  }
}

/* -------------------------------------------------------------------------- */

/*
  Simple HTML5 file drag-and-drop wrapper
  usage: <DragDropFile handleFile={handleFile}>...</DragDropFile>
    handleFile(file:File):void;
*/
class DragDropFile extends React.Component {
  constructor(props) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
  }
  suppress(evt) {
    evt.stopPropagation();
    evt.preventDefault();
  }
  onDrop(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    const files = evt.dataTransfer.files;
    if (files && files[0]) this.props.handleFile(files[0]);
  }
  render() {
    return (
      <div
        onDrop={this.onDrop}
        onDragEnter={this.suppress}
        onDragOver={this.suppress}
      >
        {this.props.children}
      </div>
    );
  }
}

/*
  Simple HTML5 file input wrapper
  usage: <DataInput handleFile={callback} />
    handleFile(file:File):void;
*/
class DataInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    const files = e.target.files;
    if (files && files[0]) this.props.handleFile(files[0]);
  }
  render() {
    return (
      <div class="col-md-8 mb-5 mt-5 offset-md-3">
      <form className="form-inline">
        <div className="form-group">
          <label htmlFor="file">Spreadsheet</label>
          <input
            type="file"
            className="form-control"
            id="file"
            accept={SheetJSFT}
            onChange={this.handleChange}
          />
        </div>
      </form>
      </div>
    );
  }
}

/*
  Simple HTML Table
  usage: <OutTable data={data} cols={cols} />
    data:Array<Array<any> >;
    cols:Array<{name:string, key:number|string}>;
*/
class OutTable extends React.Component {
  render() {
    return (
      <div className="table-responsive">
        <h3>Table Preview</h3>
        <table className="table ">
          <thead>
            <tr>
              {this.props.cols.map(c => (
                <th key={c.key}>{c.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.props.data.map((r, i) => (
              <tr key={i}>
                {this.props.cols.map(c => (
                  <td key={c.key}>{r[c.key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

/* list of supported file types */
const SheetJSFT = [
  "xlsx",
  "xlsb",
  "xlsm",
  "xls",
  "xml",
  "csv",
  "txt",
  "ods",
  "fods",
  "uos",
  "sylk",
  "dif",
  "dbf",
  "prn",
  "qpw",
  "123",
  "wb*",
  "wq*",
  "html",
  "htm"
]
  .map(function(x) {
    return "." + x;
  })
  .join(",");

/* generate an array of column objects */
const make_cols = refstr => {
  let o = [],
    C = XLSX.utils.decode_range(refstr).e.c + 1;
  for (var i = 0; i < C; ++i) o[i] = { name: XLSX.utils.encode_col(i), key: i };
  return o;
};
