import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";



export type CategoryDocument = HydratedDocument<Category>;

@Schema({
    timestamps: true
})
export class Category {
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


}

export const CategorySchema = SchemaFactory.createForClass(Category)