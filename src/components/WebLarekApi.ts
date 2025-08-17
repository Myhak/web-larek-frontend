import { Api } from './base/api';
import { IProduct, IOrder, IOrderResult } from '../types';

export class WebLarekApi extends Api {
    private cdn: string;

    constructor(cdn: string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);
        this.cdn = cdn;
    }

    getProductList(): Promise<IProduct[]> {
        return this.get('/product')
            .then((data: { items: IProduct[] }) => {
                // Проверяем, что данные действительно JSON
                if (Array.isArray(data.items)) {
                    return data.items.map(item => ({
                        ...item,
                        image: this.cdn + item.image
                    }));
                }
                throw new Error('Неверный формат данных');
            })
            .catch(error => {
                console.error('Ошибка получения каталога:', error);
                throw error;
            });
    }

    getProduct(id: string): Promise<IProduct> {
        return this.get(`/product/${id}`)
            .then((item: IProduct) => ({
                ...item,
                image: this.cdn + item.image
            }))
            .catch(error => {
                console.error('Ошибка получения товара:', error);
                throw error;
            });
    }

    orderProducts(order: IOrder): Promise<IOrderResult> {
        return this.post('/order', order)
            .then((result: IOrderResult) => result)
            .catch(error => {
                console.error('Ошибка оформления заказа:', error);
                throw error;
            });
    }
}