import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { CreateProductDto } from 'src/product/Dtos/CreateProduct.dto';
import { ObjectIdDto } from 'src/product/Dtos/ObjectId.dto';
import { UpdateProductDto } from 'src/product/Dtos/UpdateProduct.dto';
import { ProductService } from 'src/product/services/product/product.service';

@Controller('product')
export class ProductController {

    constructor(private productService: ProductService){}

    @Get()
    getAllProducts(@Query('offset') offset?: number, @Query('limit') limit?: number, @Query('text') text?: string) {
        return this.productService.getAllProducts(offset, limit, text)
    }

    @Post()
    createProduct(@Body() prodData: CreateProductDto) {
        return this.productService.createProduct(prodData)
    }

    @Put(':id')
    editProduct(@Body() prodData: UpdateProductDto, @Param('id') prodId: ObjectIdDto ) {
        return this.productService.updateProduct(prodId, prodData)
    }

    @Delete('id')
    deleteProduct(@Param('id') prodId: ObjectIdDto) {
        return this.productService.deleteProduct(prodId)
    }

}
