import React, { Component } from 'react';
import "react-router";
import {
  BrowserRouter,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";
import '../style/ppmmain.css';
import ProductList from './ProductList';
import ProductCreation from './ProductCreation';
import ProductEdit from './ProductEdit';
import PPMHome from './PPMHome';
import axios from 'axios';

class PPMAppMain extends Component {
  constructor(props){
      super(props);
      this.state={ productlist:[],
                   product:{},
                   error:"" }
  }  
  createProduct=(productdetails)=>{
    axios.post(`http://localhost:5000/createproduct/`,{productdetails})
         .then((response) => {
           
            console.log("posted new product",response.data);
            this.getProductList();
            
        })
        .catch((error) => {
           this.setState({error:"Server connection failed"});
        });

  }
  getProductList=()=>{
   
        axios.get(`http://localhost:5000/getproductlist/`)
             .then((response) => {
               
                console.log("productlist",response.data.data);
                this.setState({productlist:response.data.data});
                
             })
             .catch((error) => {
                 console.log(error);
                 this.setState({error:"Server connection failed"});
             });
  }
 
  
  
  render() {
   
    return (
      <div> 
       <BrowserRouter>
            <h2>PPM - Project Product Management</h2>
            <div className="naviouterdiv">
                <div className="navibarstyle" ><Link to="/home">Home</Link></div>
                <div className="navibarstyle" ><Link to="/productlist">Product List</Link></div>
                <div className="navibarstyle" ><Link to="/productcreation">Product Creation</Link></div>
            </div>  
            <div className="routerdiv">
               <Switch>
                    <Route exact path="/" render={() => (<Redirect to="/home" /> )} />
                    <Route path="/home" component={PPMHome}/>
                    <Route path="/productlist" render={() => { return <ProductList deleteProduct={this.deleteProduct} getProductList={this.getProductList} productlist={this.state.productlist}/>;}}/>
                    <Route path="/productcreation"  render={() => { return <ProductCreation createProduct={this.createProduct} getProductList={this.getProductList}/>}}/>
                    <Route path="/productedit/:id" render={(props) => { return <ProductEdit {...props} editProduct={this.editProduct} getProductList={this.getProductList} product={this.product} deleteProduct={this.deleteProduct} getProduct={this.getProduct}/>}}/>
                  
                </Switch>            
            </div>
         
       </BrowserRouter>
    
    
      </div>
    );
  }
}

export default PPMAppMain;