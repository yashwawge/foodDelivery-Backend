const {createProduct} = require("../services/productService")

async function addProduct(req,res){

    // console.log(req.file);
    // const result = await cloudinary.uploader.upload(req.file.path);
    // console.log("result from cloudinary: ",result);
    // await fs.unlink(req.file.path);
    // return res.json({message: 'ok'});

    try{

        const product  = await createProduct({
            productName : req.body.productName,
            description : req.body.description,
            imagePath : req.file.path,
            price : req.body.price,
            category : req.body.category,
            inStock : req.body.inStock
        });

        return res.status(201).json({
            success: true,
            message: "Successfully created the product",
            error: {},
            data: product
        })
    }
    catch(error){
        console.log(error);
        return res.status(error.statusCode).json({
            success : false,
            message: error.reason,
            data:{},
            error: error
        })
    }
    
}

module.exports = {
    addProduct
}