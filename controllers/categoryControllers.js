const { CategoryService } = require('../services');
const categoryService = new CategoryService();

async function createCategory(req, res){
    const { title, parentId } = req.body;
    const createdCategory = await categoryService.createCategory(title, parentId);
    res.status(201).send(createdCategory);
}

async function retrieveAllCategories(req, res){
    const allCategories = await categoryService.retrieveAllCategories();
    res.status(200).send(allCategories);
}

async function retrieveSpecificCategory(req, res){
    const category = await categoryService.getCategoryById(req.params.categoryId);
    res.status(200).send(category);
}

async function updateCategory(req, res){
    const fieldsforUpdate = {...req.body};
    const updatedCategory = await categoryService.updateCategoryById(req.params.categoryId, fieldsforUpdate);
    res.status(201).send(`updateCategory: ${JSON.stringify(updatedCategory)}`);
}

async function deleteCategory(req, res){
    await categoryService.deleteCategoryById(req.params.categoryId);
    res.status(204).send('Successfully Deleted!');
}

module.exports = {
    createCategory,
    retrieveAllCategories,
    retrieveSpecificCategory,
    updateCategory,
    deleteCategory
}