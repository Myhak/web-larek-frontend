import { IProduct } from './product';
import { IBasket } from './basket';
import { IOrder, IOrderData } from './order';

export interface IAppState {
    catalog: IProduct[];
    basket: IBasket;
    order: IOrderData;
    preview: IProduct | null;
    
    setCatalog(products: IProduct[]): void;
    setPreview(product: IProduct): void;
    addToBasket(product: IProduct): void;
    removeFromBasket(productId: string): void;
    clearBasket(): void;
    setOrderField<T extends keyof IOrderData>(field: T, value: IOrderData[T]): void;
    validateOrder(): boolean;
    getOrderData(): IOrder;
}