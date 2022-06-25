
const userModel=require('./model');

//tầng giao tiếp với database
exports.login = async(email) =>{
    // const user=data.filter(item => item.email == email)[0];
    // return user;

    //select id,email,password from users where eamil='

    const user=await userModel.findOne({ email:email}, 'id email password');
    return user;

}


exports.register = async (email, password) =>{
    const user = new userModel({email,password});
    return await user.save();
}







//giả lập data(lấy data từ database)
var data=[
    {id: 1, email:'admin@gmail.com', password:'111', name:'Phúc'}
]