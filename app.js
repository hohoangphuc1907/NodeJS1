var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



const mongoose=require('mongoose');
require('./components/users/model');
require('./components/categories/model');
require('./components/products/model');

var indexRouter = require('./routes/index');

var productRouter = require('./routes/product');
var CategoriesRouter = require('./routes/categories');
var apiRouter = require('./routes/api');
const { Session } = require('inspector');
const session = require('express-session');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret:'iloveyou',
  resave:true,
  saveUninitialized:true,
  cookie:{secure:false}
}));

mongoose.connect('mongodb+srv://phuc:123@cluster0.tjber.mongodb.net/Spring2022?retryWrites=true&w=majority', {  
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('>>>>>>>>>> DB Connected!!!!!!'))
.catch(err => console.log('>>>>>>>>> DB Error: ', err));

//
app.use('/', indexRouter);
app.use('/san-pham', productRouter);
app.use('/categories', CategoriesRouter);
app.use('/api', apiRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
//http://localhost:3000/dang-nhap
//get: chạy ra login
//post: thực hiện login

//2.đăng xuất
//http://localhost:3000/dang-xuat

//3.sản phẩm
//http://localhost:3000/san-pham
//get: xuất danh sách sản phẩm
//post: thêm mới sản phẩm

//4.Chi tiết 1 sản phẩm
//http://localhost:3000/san-pham/:id/edit
//get: lấy thông tin chi tiết 1 sản phẩm
//put: cập nhật thông tin sp

//5.xóa sản phẩm
//http://localhost:3000/san-pham/:id/delete
//delete: xóa 1 sản phẩm

//6. thống kê
//http://localhost:3000/san-pham/thong-ke
//get: lấy thống kê sản phẩm vẽ biểu đồ


