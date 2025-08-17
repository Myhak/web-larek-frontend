import { IProduct, IBasket, ICartItem, IOrderData, IOrder } from '../types';
import { EventEmitter } from './base/events';

export class AppState extends EventEmitter {
    catalog: IProduct[] = [];

    basket: IBasket = {
        items: [],
        total: 0,

        add: (item: ICartItem) => {
            this.basket.items.push(item);
            this.basket.total += item.price;
        },

        remove: (id: string) => {
            const index = this.basket.items.findIndex((item: ICartItem) => item.id === id);
            if (index !== -1) {
                this.basket.total -= this.basket.items[index].price;
                this.basket.items.splice(index, 1);
                // обновляем индексы
                this.basket.items.forEach((item: ICartItem, i: number) => {
                    item.index = i + 1;
                });
            }
        },

        clear: () => {
            this.basket.items = [];
            this.basket.total = 0;
        },

        getItems: () => {
            return [...this.basket.items];
        }
    };

    order: IOrderData = { payment: null, address: '', email: '', phone: '' };
    preview: IProduct | null = null;

    setCatalog(products: IProduct[]): void {
        this.catalog = products;
        this.emit('items:changed', { catalog: this.catalog });
    }

    setPreview(product: IProduct): void {
        this.preview = product;
        this.emit('preview:changed', product);
    }

    addToBasket(product: IProduct): void {
        const item: ICartItem = {
            id: product.id,
            title: product.title,
            price: product.price || 0,
            index: this.basket.items.length + 1
        };
        this.basket.add(item);
        this.emit('basket:changed', this.basket);
    }

    removeFromBasket(productId: string): void {
        this.basket.remove(productId);
        this.emit('basket:changed', this.basket);
    }

    clearBasket(): void {
        this.basket.clear();
        this.emit('basket:changed', this.basket);
    }

    setOrderField<T extends keyof IOrderData>(field: T, value: IOrderData[T]): void {
        this.order[field] = value;
        this.emit('order:changed', this.order);
    }

    validateOrder(): boolean {
        return (
            this.order.payment !== null &&
            (this.order.address?.trim() ?? '') !== '' &&
            (this.order.email?.trim() ?? '') !== '' &&
            (this.order.phone?.trim() ?? '') !== ''
        );
    }

    getOrderData(): IOrder {
        return {
            payment: this.order.payment!, // после validateOrder() гарантировано
            address: this.order.address,
            email: this.order.email,
            phone: this.order.phone,
            items: this.basket.items.map(item => item.id),
            total: this.basket.total
        };
    }

    getBasketCount(): number {
        return this.basket.items.length;
    }
}
