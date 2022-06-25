var express = require('express');
var router = express.Router();

const productController= require('../components/products/controller');
const categoryController =require('../components/categories/controller');
const upload=require('../middle/upload');
const authenication=require('../middle/authenication');
/* GET home page. */
//http://localhost:3000/san-pham/
//method:get
//detail: lấy danh sách sp
//author:phúc
//date: 17/03/2022
router.get('/',async function(req, res, next) {
  //lấy danh sách sp từ database
  const data=await productController.getProducts();
  res.render('products', {products:data});
});

//http://localhost:3000/san-pham/
//method:post
//detail: thêm mới sp
//author:phúc
//date: 17/03/2022



router.post('/', [upload.single('image')], async function(req, res, next) {
  //lấy danh sách sp từ database
  let{body ,file} =req;
  let image ="";
  if(file){
    image =`http://192.168.43.111:3000/images/${file.filename}`
  }
  body={ ...body, image:image}
  await productController.insert(body);
  res.redirect('/san-pham');
});
//http://localhost:3000/san-pham/them-moi
//method:post
//detail: thêm mới sp
//author:phúc
//date: 17/03/2022
router.get('/them-moi', async function(req, res, next) {
  //lấy danh sách sp từ database
  const categories=await categoryController.getCategories();
  res.render('product_insert', {categories:categories});
});


//http://localhost:3000/san-pham/:id/edit
//method:get
//detail: lấy thông tin chi tiết 1 sản phẩm
//author:phúc
//date: 17/03/2022
router.get('/:id/edit', async function(req, res, next) {
  //lấy thông tin chi tiết 1 sản phẩm
  const {id} =req.params;
  const product=await productController.getProductById(id);
  const categories=await categoryController.getCategoriesForOneProduct(product.category_id._id);
  res.render('product_update', {product:product, categories:categories});
});


//http://localhost:3000/san-pham/:id/edit
//method:post
//detail: cập nhật thông tin  1 sản phẩm
//author:phúc
//date: 17/03/2022
router.post('/:id/edit',[upload.single('image')], async function(req, res, next) {
  //cập nhật thông tin  1 sản phẩm
  let{body ,file, params} =req;
  delete body.image;
  if(file){
    let image =`http://192.168.43.111:3000/images/${file.filename}`
    body={...body, image:image}
  }

  await productController.update(params.id,body);
  res.redirect('/san-pham');
});


//http://localhost:3000/san-pham/:id/delete
//method: delete
//detail: xóa  1 sản phẩm khỏi database
//author:phúc
//date: 17/03/2022
router.delete('/:id/delete', async function(req, res, next) {
  //xóa  1 sản phẩm khỏi database
  const {id} = req.params;
  await productController.delete(id);
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