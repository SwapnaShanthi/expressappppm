import React, { Component } from 'react';
import "react-router";
import "react-router";
import {
  BrowserRouter,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";

import '../style/ppmproductlist.css';
import axios from 'axios';



class ProductList extends Component {
  constructor(props){
      super(props);
      this.state={  }
  }
  componentDidMount()  {
    this.props.getProductList();
  }
  redirect=()=>{
    
  }
  deleteProduct=(productid)=>{
   
    console.log("deleting")
    axios.delete(`http://localhost:5000/deleteproduct/${productid}`)
         .then((response) => {
          
          console.log("deleted the product",response.data);
          this.props.getProductList();
          
         })
         .catch((error) => {
          this.setState({error:"Server connection failed"});
         });

  }
  
  render() {
    const displayProductList=this.props.productlist.map((item,index)=>{
            return (<div className="productouterdiv" >
                        <div><img className="imagestyle" src={item.productdetails.imageurl} alt="image" ></img></div>
                        <div className="titlediv">{item.productdetails.title}</div>
                        <div className="pricediv"> $ {item.productdetails.price}</div>
                        <div className="outerproductbuttondiv">
                        <div className="buttonproductdiv"><Link className="editproductlistbuttonstyle" to={`/productedit/${ item.id }`}>Edit</Link></div>
                        <div className="buttonproductdiv"><Link className="deletebuttonstyle" to={`/productlist`} onClick={()=>this.deleteProduct(item.id)}>Delete</Link></div>
                        </div>
                    </div>)
         
    })
   
    return (
      <div className="outerdiv">
      <div className="productlistouterdiv"> 
       {displayProductList}
    
      </div>
      </div>
    );
  }
}

export default ProductList;