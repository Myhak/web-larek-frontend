import { Api } from './base/api';
import { IProduct, IOrder, IOrderResult } from '../types';

export class WebLarekApi extends Api {
    private cdn: string;

    constructor(cdn: string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);
        this.cdn = cdn;
    }

    getProductList(): Promise<IProduct[]> {
        return this.get('/product').then((data: { items: IProduct[] }) => {
            return data.items.map(item => ({
                ...item,
                image: this.cdn + item.image
            }));
        });
    }

    getProduct(id: string): Promise<IProduct> {
        return this.get(`/product/${id}`).then((item: IProduct) => ({
            ...item,
            image: this.cdn + item.image
        }));
    }

    orderProducts(order: IOrder): Promise<IOrderResult> {
        return this.post('/order', order).then((result: IOrderResult) => result);
    }
}