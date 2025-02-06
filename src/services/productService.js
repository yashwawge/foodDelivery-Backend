const cloudinary = require("cloudinary");
const productRepository = require("../repositories/productRepository")
const fs = require("fs/promises")

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
            throw{reason : 'Not able to create the product',statusCode : 500}
        }
        
    }

    //2. then use the url from cloudinary and other product details to create the product
    const product = await productRepository.createProduct({
        ...productdetails,
        productImage : productImage
    });

    if(!product){
        throw{reason : 'Not able to create the product',statusCode : 500}
    }

    return product;
}

module.exports = {
    createProduct
}