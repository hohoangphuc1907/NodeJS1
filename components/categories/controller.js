


const categoryController = require('./service');
exports.getCategories = async () =>{
    return await categoryController.getCategories();
}
exports.getCategoryById = async (id) =>{
    const categories=await categoryController.getCategoryById(id)
    return categories;
}

exports.getCategoriesForOneProduct= async (selectedId) =>{
    let categories=await categoryController.getCategories();
    categories=categories.map(item =>{
        // if(item._id ==selectedId){
        //     item={...item,selected:true}
        // }else{
        //     item={...item,selected:false}
        // }
        item ={
            _id: item._id,
            name:item.name,
            description:item.description,
            selected:item._id == selectedId
        }
        return item;
    })
    return categories;
}
exports.update = async (id, category) =>{
    await categoryController.update(id, category);
}
exports.insert= async (body) =>{
    await categoryController.insert(body);
  }
  exports.delete = async (id) =>{
    await categoryController.delete(id);
}