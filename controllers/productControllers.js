const { ProductService } = require('../services');
const productService = new ProductService();

async function createProduct(req, res){
    const { count } = req.body;
    const productDetails = {...req.body};
    if (count){
        productDetails.count = +count;
    }
    const createdProduct = await productService.createProduct(productDetails);
    res.status(201).send(createdProduct);
}

async function productList(req, res){
    const { page, count } = req.query;
    const products = await productService.retrieveProductsWithPagination(page, count);
    res.status(200).send(products);
}

async function productDetails(req, res){
    const { productId } = req.params;
    const product = await productService.getProductById(productId);
    res.status(200).send(product);
}

async function updateProduct(req, res){
    const { count } = req.body;
    const fieldsforUpdate = {...req.body};
    if (count){
        fieldsforUpdate.count = +count;
    }
    const updatedProduct = await productService.updateProductById(req.params.productId, fieldsforUpdate);
    res.status(201).send(`updateProduct: ${JSON.stringify(updatedProduct)}`);
}

async function deleteProduct(req, res){
    await productService.deleteProductById(req.params.productId);
    res.status(204).send('Successfully Deleted!');
}

module.exports = {
    createProduct,
    productList,
    productDetails,
    updateProduct,
    deleteProduct
}