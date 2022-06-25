var express = require('express');
var router = express.Router();

const productController= require('../components/products/controller');
const categoryController =require('../components/categories/controller');
const upload=require('../middle/upload');

/* GET home page. */
//http://localhost:3000/san-pham/
//method:get
//detail: lấy danh sách sp
//author:phúc
//date: 17/03/2022
router.get('/', async function(req, res, next) {
  //lấy danh sách sp từ database
  const data=await categoryController.getCategories();
  const product=await productController.getProducts();
  res.render('categories', {category:data, product:product});
});

//http://localhost:3000/san-pham/
//method:post
//detail: thêm mới sp
//author:phúc
//date: 17/03/2022



router.post('/', async function(req, res, next) {
  //lấy danh sách sp từ database
  let{body ,file} =req;
  await categoryController.insert(body);
  console.log("body : ",body);
  res.redirect('/categories');
});
//http://localhost:3000/san-pham/them-moi
//method:post
//detail: thêm mới sp
//author:phúc
//date: 17/03/2022
router.get('/them-moi', async function(req, res, next) {
  //lấy danh sách sp từ database
 
  res.render('categories_insert');
});


//http://localhost:3000/san-pham/:id/edit
//method:get
//detail: lấy thông tin chi tiết 1 sản phẩm
//author:phúc
//date: 17/03/2022
router.get('/:id/edit', async function(req, res, next) {
  //lấy thông tin chi tiết 1 sản phẩm
  const {id} =req.params;
 
  const categories=await categoryController.getCategoryById(id);
  res.render('categories_update', {categories:categories});
});


//http://localhost:3000/san-pham/:id/edit
//method:post
//detail: cập nhật thông tin  1 sản phẩm
//author:phúc
//date: 17/03/2022
router.post('/:id/edit',async function(req, res, next) {
  //cập nhật thông tin  1 sản phẩm
  let{body ,file, params} =req;
 
  await categoryController.update(params.id,body);
  
  res.redirect('/categories');
});


//http://localhost:3000/san-pham/:id/delete
//method: delete
//detail: xóa  1 sản phẩm khỏi database
//author:phúc
//date: 17/03/2022
router.delete('/:id/delete', async function(req, res, next) {
  //xóa  1 sản phẩm khỏi database
  const {id} = req.params;
  await categoryController.delete(id);
  res.json({ result:true });
});


//http://localhost:3000/san-pham/thong-ke
//method: delete
//detail: thống kê sp
//author:phúc
//date: 17/03/2022
router.get('/thong-ke', function(req, res, next) {
  //thống kê sp
  res.render('form');
});












//http://localhost:3000/product/123/detail
router.get('/:id/detail', function(req, res, next) {
    const {id} =req.params;
    res.render('product', { id:id});
  });
  //http://localhost:3000/product/abc/detail/def
  router.get('/abc/detail/def', function(req, res, next) {
    const {id} =req.params;
    res.render('product', { id:id});
  });

  




module.exports = router;