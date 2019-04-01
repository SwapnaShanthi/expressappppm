const express = require( 'express');
const app=express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
const axios = require( 'axios');

app.use(express.static("./../react-app/build/")); 

app.post("/createproduct/",(request, response)=>{
    axios.post(`http://5c99215a423656001439321e.mockapi.io/api/v1/productdetails`,request.body)
         .then(function (mockApiCreatePostResponse) {
                        return response.json({
                                data: mockApiCreatePostResponse.data,
                                status:true
                            })
                    
        })
        .catch(error => {
                console.log("create product post call failed"+error);
        });
    

})
app.post("/updateproduct/",(request, response)=>{
    axios.put(`http://5c99215a423656001439321e.mockapi.io/api/v1/productdetails/${request.body.product.id}`,request.body.product)
         .then(function (mockApiEditPostResponse) {
                console.log("got resposnse from product edit post",mockApiEditPostResponse.data)
                        return response.json({
                                data: mockApiEditPostResponse.data,
                                status:true
                            })
                    
        })
        .catch(error => {
                console.log("edit product post call failed"+error);
        });
    

})
app.get("/listproduct/",(request, response)=>{
        axios.get(`http://5c99215a423656001439321e.mockapi.io/api/v1/productdetails`)
             .then(function (mockApiGetproductListResponse) {
                            return response.json({
                                    data: mockApiGetproductListResponse.data,
                                    status:true
                                })
                        
            })
            .catch(error => {
                    console.log("edit product post call failed"+error);
            });
        
    
    })
app.get("/getproductlist/",(request, response)=>{
        axios.get(`http://5c99215a423656001439321e.mockapi.io/api/v1/productdetails`)
             .then(function (mockApiGetproductListResponse) {
                            return response.json({
                                    data: mockApiGetproductListResponse.data,
                                    status:true
                                })
                        
            })
            .catch(error => {
                    console.log("edit product post call failed"+error);
            });
        
    
    })
app.get("/getproduct/:id",(request, response)=>{
        axios.get(`http://5c99215a423656001439321e.mockapi.io/api/v1/productdetails/${request.params.id}`)
             .then(function (mockApiGetproductListResponse) {
                            return response.json({
                                    data: mockApiGetproductListResponse.data,
                                    status:true
                                })
                        
            })
            .catch(error => {
                    console.log("get product post call failed"+error);
            });
        
    
    }) 
app.delete("/deleteproduct/:id",(request, response)=>{
        axios.delete(`http://5c99215a423656001439321e.mockapi.io/api/v1/productdetails/${request.params.id}`)
             .then(function (mockApiGetproductListResponse) {
                            return response.json({
                                    data: mockApiGetproductListResponse.data,
                                    status:true
                                })
                        
            })
            .catch(error => {
                    console.log("get product post call failed"+error);
            });
        
    
    })       
app.listen(5000 ,()=>{

});
