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

import '../style/ppmproductedit.css';
import axios from 'axios';

class ProductEdit extends Component {
  constructor(props){
      super(props);
      this.state={ error:"" ,
                   productid:"",
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
  componentDidMount(){
  
      axios.get(`http://localhost:5000/getproduct/${this.props.match.params.id}`)
           .then((response) => {
             
              
            console.log("product",response.data.data.id);
              this.setState({productid:response.data.data.id,
                            title:response.data.data.productdetails.title,
                            price:response.data.data.productdetails.price,
                            imageurl:response.data.data.productdetails.imageurl});
              
              
              
           })
           .catch((error) => {
               console.log(error);
               this.setState({error:"Server connection failed"});
           });
  }

  updateProduct=()=>{
    console.log( "updtae",this.state.price)
    console.log( "updtae",this.state.title)
    if(this.state.title !== "" && this.state.price!== "" ){
        let product={id:"",productdetails:{title:"",price:"",imageurl:""}};
                    product.id=this.state.productid;
                    product.productdetails.title=this.state.title;
                    product.productdetails.price=this.state.price;
                    product.productdetails.imageurl=this.state.imageurl;
                  console.log("newly build",product);
        console.log("editting")
        axios.post(`http://localhost:5000/updateproduct/`,{product})
            .then((response) => {
              
              console.log("edited the product",response.data);
              this.props.getProductList();
              
            })
            .catch((error) => {
              this.setState({error:"Server connection failed"});
            });
    }else{
      this.setState({error:"Please fill in all  required  fields"});
    }
     
  }
  deleteProduct=()=>{
   
    console.log("deleting")
    axios.delete(`http://localhost:5000/deleteproduct/${this.state.productid}`)
         .then((response) => {
          
          console.log("deleted the product",response.data);
          this.props.getProductList();
          
         })
         .catch((error) => {
          this.setState({error:"Server connection failed"});
         });

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
      
      this.setState({error:"Please fill in all required fields for Update"})
    }
   

  }
  render() {

      const displayButton=()=>{

        if(this.state.titleerror ==="" && this.state.priceerror ==="" && this.state.title!== "" && this.state.price!==""){
              return <div className="outerbuttondiv">
                       <div className="buttondiv"><Link className="editupdatebuttonstyle" to={`/productlist`} onClick={this.updateProduct}>Update</Link></div>
                       <div className="buttondiv"><Link className="editbuttonstyle" to={`/productlist`} onClick={this.deleteProduct}>Delete</Link></div>
                       
                    </div>
            
          }else{
              return<div className="outerbuttondiv">
                      <div className="bottondiv"><Link className="editupdatedisable" to={`/productlist`} onClick={this.updateProduct}>Update</Link></div>
                      <div className="bottondiv"><Link className="editbuttonstyle" to={`/productlist`} onClick={this.deleteProduct}>Delete</Link></div>
                        
                  </div>
         }
      }
        const displayError=()=>{
          if( this.state.error!=="" && ((parseInt(this.state.price)===0) || this.state.titleerror!=="") ){
            return <div className="errormessage">{this.state.error}</div>
          }
        }
        const priceError=()=>{
          if(this.state.priceerror!==""){
            return <div>{this.state.priceerror}</div>
          }
    
        }
        const titleError=()=>{
          if(this.state.titleerror!==""){
            return <div>{this.state.titleerror}</div>
          }
        }
        return (
                <div className="outerdiv"> 
                <h2>Product Edit</h2>
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

export default ProductEdit;