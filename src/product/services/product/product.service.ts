import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from '../../schema/product.schema';
import { Model } from 'mongoose';
import { ObjectIdType, SearchCriteria, UpdateProduct, createProduct } from 'src/types/types';

@Injectable()
export class ProductService {

    constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) { }
    
    async getAllProducts(offset: number = 0, limit: number = 10, text: string) {

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

        const products = await this.productModel.aggregate([
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

        
        return products;
    }

    async createProduct(prodData: createProduct): Promise<ProductDocument> {
        const createdProduct = new this.productModel({
            ...prodData
        })
        return await createdProduct.save()
    }

    async updateProduct(id: ObjectIdType, prodData: UpdateProduct): Promise<ProductDocument> {
        return await this.productModel.findByIdAndUpdate(id, prodData, {
            new: true,
            runValidators: true
        });
    }

    async deleteProduct(id: ObjectIdType): Promise<ProductDocument> {
        return this.productModel.findByIdAndDelete(id)
    }
}
