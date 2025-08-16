export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}

export interface IProductsData {
    products: IProduct[];
    getProduct(id: string): IProduct;
}