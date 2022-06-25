var express = require('express');
var router = express.Router();
const userController=require('../components/users/controller');
const authenication=require('../middle/authenication');
const jwt = require('jsonwebtoken');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});
//http://localhost:3000/dang-nhap
//method:get
//detail: hiển thị trang login
//author:phúc
//date: 17/03/2022
//thực hiện đăng nhập
router.get('/dang-nhap', function(req, res, next) {

  res.render('login');
});
router.get('/dang-nhap/chart', function(req, res, next) {

  res.render('chart');
});

router.get('/dang-ky', function(req, res, next) {

  res.render('register');
});


//http://localhost:3000/dang-nhap
//method:post
//detail: hiển thị trang login
//author:phúc
//date: 17/03/2022
//thực hiện đăng nhập
router.post('/dang-nhap',[authenication.checkLogin] ,async function(req, res, next) {
  const {email, password} =req.body;
  const result=await userController.login(email, password)
  let message=' ';
  if(result){
    //nếu đúng chuyển qua sản phẩm
    const token=jwt.sign({ id: result._id, username: result.username}, 'iloveyou')
    req.session.token=token;
    res.redirect('/san-pham');
  }else{
    //nếu sai thì quay trở lại đăng nhập
    res.redirect('/dang-nhap');
  }
  //thực hiện đăng nhập
  
  
 
});


//http://localhost:3000/dang-xuat
//method:get
//detail: thực hiện đăng xuất
//author:phúc
//date: 17/03/2022
//thực hiện đăng nhập



// router.get('/dang-xuat', function(req, res, next) {
//   //nếu đăng xuất thành công qua đăng nhập
//   res.redirect('/dang-nhap');
// });
router.get('/dang-xuat', function(req, res, next) {
  req.session.destroy(function(err){
   //nếu đăng xuất thành công chuyển qua đăng nhập
   res.redirect('dang-nhap');
  })
});





























//http://localhost:3000/tinh-the-tich?chieuDai=68&chieuRong=98&chieuCao=10
router.get('/tinh-the-tich', function(req, res, next) {
  const {chieuDai,chieuRong,chieuCao}=req.query;
  const ketQua=Number(chieuDai)+Number(chieuRong)*Number(chieuCao)/3;
  res.render('ketqua', { ketQua: ketQua });
});



router.post('/gui-thong-tin', function(req, res, next) {
  const {name}=req.body;
 
  res.json({name: `Xin chào bạn ${name}`})
});


// http://localhost:3000/bac1/giai-pt?a=1&b=2
router.get('/:bac/giai-pt', function(req, res, next) {
 
  const {bac} =req.params;
  if(bac=='bac1'){
    // gọi hàm giải bậc 1
    const {a,b}=req.query;
    const ketQua=-Number(b)/Number(a);
    res.render('ketqua', { ketQua: ketQua });
  }else if(bac=='bac2'){
    const {a,b,c}=req.query;
    
    const delta=Number(b)*Number(b)-4*Number(a)*Number(c)
    if(delta==0){
      const ketQua=-Number(b)/2*Number(a);
      res.render('ketqua', { ketQua: ketQua });
    }else if(delta<0){
      const ketQua='Pt vô nghiệm';
      res.render('ketqua', { ketQua: ketQua });
    }else if(delta>0){
      const ketQua=(-Number(b)+Math.sqrt(delta))/2*Number(a) +'and '+(-Number(b)-Math.sqrt(delta))/2*Number(a);
      res.render('ketqua', { ketQua: ketQua });
    }
    
  }else if(bac=='bac3'){
    const {a,b,c,d}=req.query;

    const  ketQua=0 +'and';
    const delta=Number(b)*Number(b)-4*Number(a)*Number(c)
    // if(delta==0){
    //   ketQua+=-Number(b)/2*Number(a);
    //   res.render('ketqua', { ketQua: ketQua });
    // }else if(delta<0){
    //   ketQua+='Pt vô nghiệm';
    //   res.render('ketqua', { ketQua: ketQua });
    // }else if(delta>0){
    //   ketQua+=(-Number(b)+Math.sqrt(delta))/2*Number(a) +'and '+(-Number(b)-Math.sqrt(delta))/2*Number(a);
    //   res.render('ketqua', { ketQua: ketQua });
    // }
   
  }else if(bac=='bac4'){

  }
 
  
});
// http://localhost:3000/bac2/giai-pt?a=1&b=2&c=3
// http://localhost:3000/bac3/giai-pt?a=1&b=2&c=3&d=4
// http://localhost:3000/bac4/giai-pt?a=1&b=2&c=3&d=4&e=5


//http://localhost:3000/canh-day/10/chieu-cao/5
router.get('/canh-day/:cd/chieu-cao/:chc', function(req, res, next) {
  const {cd} =req.params;
  const {chc} =req.params;
  const ketQua=Number(cd)*Number(chc)/2;
  res.render('ketqua', { ketQua:ketQua});
});

//req.body :submit form
//req.query: ?a=10&b=2
//req.params: /:id/submit
//res.render: tải ra 1 trang html,giao diện
//res.json: trả về dữ liệu dạng json
//dùng cho API(giao diện lập trình ứng dụng):


module.exports = router;
