


  const categoryModel=require('./model');
/**
 * lấy ds các thể loại danh mục
 * @returns data
 */


exports.getCategories = async () =>{
    // return data;
    const categories=await categoryModel.find();
    return categories;
}
/**
 * 
 * @param {*mã danh mục} id 
 * @returns danh mục
 */
exports.getCategoryById = async (id) =>{
   // const category= data.filter(item =>item._id == id)[0];
   const category=await categoryModel.findById(id).populate('id');
    return category;
}

exports.insert= async (category) =>{
  //data.push(product);
  const p=new categoryModel(category);
  await p.save();
}

exports.update = async (id,category) =>{
  
  await categoryModel.findByIdAndUpdate(id,category);
}
exports.delete= async (id) =>{
  //  data=data.filter(item => item._id !=id);
  await categoryModel.findByIdAndDelete(id);
}



var data=[{
    "_id": 1,
    "name": "Pork - European Side Bacon",
    "description": "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl."
  }, 
  {
    "_id": 2,
    "name": "Duck - Fat",
    "description": "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui."
  }, 
  {
    "_id": 3,
    "name": "Tomatoes - Grape",
    "description": "Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst."
  }, {
    "_id": 4,
    "name": "Bread - Sour Sticks With Onion",
    "description": "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum."
  }, {
    "_id": 5,
    "name": "Spaghetti Squash",
    "description": "Phasellus in felis. Donec semper sapien a libero. Nam dui."
  }, {
    "_id": 6,
    "name": "Tortillas - Flour, 12",
    "description": "Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus."
  }, {
    "_id": 7,
    "name": "Nut - Pumpkin Seeds",
    "description": "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus."
  }, {
    "_id": 8,
    "name": "Hersey Shakes",
    "description": "Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus."
  }, {
    "_id": 9,
    "name": "Vermouth - Sweet, Cinzano",
    "description": "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit."
  }, {
    "_id": 10,
    "name": "Nut - Hazelnut, Whole",
    "description": "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem."
  }]