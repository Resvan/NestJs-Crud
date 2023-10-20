import mongoose from "mongoose";

export type SearchCriteria = {
    title?: RegExp;
    startDate?: string;
    endDate?: string;
}
export class Stock {
    small: number;
    medium: number;
    large: number;
    xl: number;
}

export type createProduct = {
    title: string;
    description: string;
    price: number;
    images: Array<string>;
    stock: Stock
}

export type ObjectIdType = {
    id: mongoose.Types.ObjectId;
}

export type UpdateProduct = {
    title: string;
    description: string;
    price: number;
    images: Array<string>;
    stock: Stock
}

