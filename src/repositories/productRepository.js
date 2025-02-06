const Product = require('../schema/productSchema');

async function createProduct(productdetails){
    try{
        const response = await Product.create(productdetails);
        return response;
    }catch(error){
        console.log(error);
    }
}

module.exports = {
    createProduct
}