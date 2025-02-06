const Product = require('../schema/productSchema');
const InternalServerError = require('../utils/internalServerError');
const BadRequestError = require("../utils/BadRequestError");

async function createProduct(productdetails){
    try{
        const response = await Product.create(productdetails);
        return response;
    }catch(error){
        
        if(error.name == 'ValidationError'){

            const errorMessageList = Object.keys(error.errors).map((property)=>{
                return error.errors[property].message;
            })
            throw new BadRequestError(errorMessageList);
        }
        console.log(error);
        throw new InternalServerError();
    }
}

async function getProductById(productId){
    try{
        const product = await Product.findById(productId);
        return product;
    }catch(error){
        console.log(error);
        throw new InternalServerError();
    }
}


async function deleteProductById(productId){
    try{
        const response = await Product.findByIdAndDelete(productId);
        return response;
    }catch(error){
        console.log(error);
        throw new InternalServerError();
    }
}
module.exports = {
    createProduct,
    getProductById,
    deleteProductById
}