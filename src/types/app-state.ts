import { IProduct } from './product';
import { IBasket } from './basket';
import { IOrderForm } from './order';

export interface IAppState {
    catalog: IProduct[];
    basket: IBasket;
    order: IOrderForm;
    preview: IProduct | null;
    
    setCatalog(products: IProduct[]): void;
    setPreview(product: IProduct): void;
    addToBasket(product: IProduct): void;
    removeFromBasket(productId: string): void;
    clearBasket(): void;
    setOrderField<T extends keyof IOrderForm>(field: T, value: IOrderForm[T]): void;
    validateOrder(): boolean;
    getOrderData(): IOrderForm;
}