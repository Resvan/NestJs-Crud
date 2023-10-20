import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Stock } from "src/types/types";


export type ProductDocument = HydratedDocument<Product>;

@Schema({
    timestamps: true
})
export class Product {
    @Prop({
        required: true,
        unique: true,
        type: String
    })
    title: string;

    @Prop({
        required: true,
        type: String
    })
    description: string;

    @Prop({
        required: true,
        type: [String],
    })
    images: Array<string>;

    @Prop({
        required: true,
        type: Number
    })
    price: number;


    @Prop({
        required: true,
        type: Stock
    })
    stock: Stock
}

export const ProductSchema = SchemaFactory.createForClass(Product)