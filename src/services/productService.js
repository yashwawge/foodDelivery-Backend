const cloudinary = require("cloudinary");
const productRepository = require("../repositories/productRepository")
const fs = require("fs/promises");
const internalServerError = require("../utils/internalServerError");
const notFoundError = require("../utils/notFoundError");

async function createProduct(productdetails){

    //1.we should check if the image is comming then we should upload it on cloudinary first

    const imagePath = productdetails.imagePath;
    if(imagePath){
        try{
            const cloudinaryResponse = await cloudinary.uploader.upload(imagePath);
            var productImage = cloudinaryResponse.secure_url;
            await fs.unlink(imagePath);
        }
        catch(error){
            console.log(error);
            throw new internalServerError();
        }
        
    }

    //2. then use the url from cloudinary and other product details to create the product
    const product = await productRepository.createProduct({
        ...productdetails,
        productImage : productImage
    });

    return product;
}

async function getProductById(productId) {
    const response = await productRepository.getProductById(productId);
    if(!response){
        throw new notFoundError('Product');
    }
    return response;
}

async function deleteProductById(productId) {
    const response = await productRepository.deleteProductById(productId);
    if(!response){
        throw new notFoundError('Product');
    }
    return response;
}
module.exports = {
    createProduct,
    deleteProductById,
    getProductById
}