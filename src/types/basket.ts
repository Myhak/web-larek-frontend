export interface ICartItem {
    id: string;
    title: string;
    price: number;
    index: number;
}

export interface IBasket {
    items: ICartItem[];
    total: number;
    add(item: ICartItem): void;
    remove(id: string): void;
    clear(): void;
}