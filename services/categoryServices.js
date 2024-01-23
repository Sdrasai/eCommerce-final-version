const prisma = require('../db.js');

class CategoryService {
    db = prisma;

    async createCategory(title, parentId){
        return await this.db.category.create({data: {title, parentId}});
    }

    async retrieveAllCategories(){
        const selectObject = { title: true, parentId: true, categoryId: true };
        return await this.db.category.findMany({select: selectObject});
    }

    async getCategoryById(id){
        return await this.db.category.findUnique({where: {categoryId: id}});
    }

    async updateCategoryById(id, fieldsforUpdate){
        return await this.db.category.update({where: {categoryId: id}, data: {...fieldsforUpdate}});
    }

    async deleteCategoryById(id){
        return await this.db.category.delete({where: {categoryId: id}});
    }
}

module.exports = CategoryService;