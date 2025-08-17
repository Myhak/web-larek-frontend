import { ProductCategory } from './common';

export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: ProductCategory;
    price: number | null;
}

export interface IProductsData {
    products: IProduct[];
    getProduct(id: string): IProduct;
}

export type ApiListResponse<T> = {
    total: number;
    items: T[];
};