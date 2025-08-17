import { IProduct } from './product';
import { IOrder, IOrderResult } from './order';

export interface IApi {
    getProductList(): Promise<IProduct[]>;
    getProduct(id: string): Promise<IProduct>;
    orderProducts(order: IOrder): Promise<IOrderResult>;
}