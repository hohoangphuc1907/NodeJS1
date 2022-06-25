var express = require('express');
var router = express.Router();
const authenication=require('../middle/authenication');
const jwt = require('jsonwebtoken');
const userController=require('../components/users/controller')
const productController=require('../components/products/controller')
// http://localhost:3000/api/login
router.post('/login',async function(req, res, next) {
    const {email, password} =req.body;
    const result=await userController.login(email, password)
    if(result){
     
      const token=jwt.sign({ id: result._id, username: result.username}, 'iloveyou')
      res.json({status: true, result,token})
    }else{
  
      res.json({status: false});
    }

  });

  // http://localhost:3000/api/register
router.post('/register',async function(req, res, next) {
    const {email, password, confirm_password} =req.body;
    const result=await userController.register(email, password, confirm_password)
   
    if(result){
      res.json({status: true})
    }else{
  
      res.json({status: false});
    }

  });
  router.post('/insert',async function(req, res, next) {
    const {name, price} =req.body;
    return await productController.insertApp(name, price)
   
  });


// http://localhost:3000/api/products
  router.get('/products',[authenication.checkToken],async function(req, res, next) {
    const products=await productController.getProducts();
    res.json(products);
    
   
  });

  // http://localhost:3000/api/products/:id/detail
  router.get('/products/:id/detail',[authenication.checkToken],async function(req, res, next) {
    const {id} = req.params;
    const products=await productController.getProductById(id);
    res.json(products);
    
   
  });












module.exports = router;