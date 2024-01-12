import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { ObjectIdDto } from 'src/Product/Dtos/ObjectId.dto';
import { UpdateCategory, createCategory } from 'src/types/types';

@Controller('category')
export class CategoryController {
    constructor(private categoryService:CategoryService ) { }

    @Get()
    getAllCategories(@Query('offset') offset?: number, @Query('limit') limit?: number, @Query('text') text?: string) {
        return this.categoryService.getAllCategories(offset, limit, text)
    }

    @Post()
    createCategory(@Body() categData: createCategory) {
        return this.categoryService.createCategory(categData)
    }

    @Put(':id')
    editCategory(@Body() prodData: UpdateCategory, @Param('id') prodId: ObjectIdDto) {
        return this.categoryService.updateCategory(prodId, prodData)
    }

    @Delete('id')
    deleteCategory(@Param('id') prodId: ObjectIdDto) {
        return this.categoryService.deleteCategory(prodId)
    }
}
