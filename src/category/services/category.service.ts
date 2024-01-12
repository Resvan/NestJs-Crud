import { Injectable } from '@nestjs/common';
import { Category, CategoryDocument } from '../schema/category.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectIdType, SearchCriteria, UpdateCategory, createCategory } from 'src/types/types';

@Injectable()
export class CategoryService {
    constructor(@InjectModel(Category.name) private categoryModel: Model<CategoryDocument>) { }

    async getAllCategories(offset: number = 0, limit: number = 10, text: string) {

        if (isNaN(offset)) {
            offset = 0;
        }
        if (isNaN(limit)) {
            limit = 10;
        }


        if (!text) {
            text = '';
        }

        let criteria: SearchCriteria = {};

        if (text) {
            let regexText = new RegExp(text, 'i');
            criteria.title = regexText;
        }

        const categories = await this.categoryModel.aggregate([
            {
                $match: criteria
            },
            {
                $facet: {
                    allDocs: [{ $group: { _id: null, totalCount: { $sum: 1 } } }],
                    paginationDocs: [
                        { $sort: { createdAt: -1 } },
                        { $skip: offset },
                        { $limit: limit }
                    ]
                }
            }
        ]);


        return categories;
    }

    async createCategory(categData: createCategory): Promise<CategoryDocument> {
        const createdCategory = new this.categoryModel({
            ...categData
        })
        return await createdCategory.save()
    }

    async updateCategory(id: ObjectIdType, categData: UpdateCategory): Promise<CategoryDocument> {
        return await this.categoryModel.findByIdAndUpdate(id, categData, {
            new: true,
            runValidators: true
        });
    }

    async deleteCategory(id: ObjectIdType): Promise<CategoryDocument> {
        return this.categoryModel.findByIdAndDelete(id)
    }
}
