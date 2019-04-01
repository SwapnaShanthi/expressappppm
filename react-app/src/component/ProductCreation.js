import React, { Component } from 'react';
import "react-router";
import {
  BrowserRouter,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";
import { withRouter } from 'react-router';

import '../style/ppmcreate.css';

class ProductCreation extends Component {
  constructor(props){
    super(props);
    this.state={ error:"" ,
                 title:"",
                 price:"",
                 imageurl:"",
                 titleerror:"",
                 priceerror:""
               }
}
validateInput=(name,value)=>{
  
  if(name==="title"){
      if(typeof(value)==='string'){
          
          if(value.length>=4){
              
              return true;
          }else{
              
              return false;
          }
      }else{
          return false;
      }

  }else if(name==="price"){
          if(value>0){
           return true;
          }else{
            return false;
          }
  }


}
createProduct=()=>{
   if(this.state.title !== "" && this.state.price!== "" ){
     console.log("test");
        this.props.createProduct({title:this.state.title,price:this.state.price,imageurl:this.state.imageurl});
        this.setState({title:""});
        this.setState({price:""});
        this.setState({imageurl:""});
   }else{
        this.setState({error:"Please fill in all  required  fields"})
   }
  
}
handleChange=(e)=>{
  console.log(e.target.name);
  if(e.target.name==="title"){

      this.setState({[e.target.name]:e.target.value});
      if(!this.validateInput(e.target.name,e.target.value)){
       
        this.setState({titleerror:"Title length should be greater than 4 characters",error:""});
      }else{
        
        this.setState({titleerror:"",error:""});
      }
   }else if(e.target.name==="price"){
      this.setState({[e.target.name]:parseInt(e.target.value)});
      if(!this.validateInput(e.target.name,parseInt(e.target.value))){
     
        this.setState({priceerror:"Price should be greater than 0",error:""});
      }else{
        
        this.setState({priceerror:"",error:""});
      }

   }else{

    this.setState({[e.target.name]:e.target.value});
   
  }
  if( this.state.priceerror==="" && this.state.titleerror==="" && (parseInt(this.state.price)>0) && this.state.title!==""){
    
    this.setState({error:""});
  
  }else{
    
    this.setState({error:"Please fill in all required fields"})
  }
 
  
}
  
  render() {

    const displayButton=()=>{

      if(this.state.titleerror ==="" && this.state.priceerror ==="" && this.state.title!== "" && this.state.price!==""){
          return <div className="bottondiv"><Link className="createbuttonstyle" to={`/productlist`} onClick={this.createProduct}>Create</Link></div>
          
        }else{
          return<div className="bottondiv"><Link  className="createdisable"to={`/productlist`}>Create</Link></div>
      }
    }
    
  
   const displayError=()=>{
    if( this.state.error!=="" && ((parseInt(this.state.price)===0) || this.state.titleerror!=="") ){
        return <div className="errormessage">{this.state.error}</div>
      }
    }
    const priceError=()=>{
      if(this.state.priceerror!==""){
        return <div >{this.state.priceerror}</div>
      }

    }
    const titleError=()=>{
      if(this.state.titleerror!==""){
        return <div >{this.state.titleerror}</div>
      }

    }
    
   
    return (
      <div className="outerdiv"> 
     <h2>Create a new Product</h2>
       
        <div className="formdiv">
        <div className="displaycommonerror"> {displayError()}</div>
        <div className="inputstyle">
          <div >Tile  <input className="inputboxtitle" type="text" name="title" onChange={this.handleChange} value={this.state.title}/></div>
          <div className="errormessagediv">{titleError()}</div>
         </div>
         <div className="inputstyle">
          <div>Price<input  className="inputboxprice" type="number" name="price" onChange={this.handleChange} value={this.state.price}/></div>
          
          <div className="errormessagediv">{priceError()}</div>
         </div>
         <div className="inputstyle">Image Url <input className="inputboximageurl" type="text" name="imageurl" onChange={this.handleChange} value={this.state.imageurl}/></div>
        
          {displayButton()}
         
          </div >
        
    </div>
    );
  }
}

export default ProductCreation;