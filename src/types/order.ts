import { PaymentMethod } from './common';

export interface IOrderData {
    payment: PaymentMethod | null;
    address: string;
    email: string;
    phone: string;
}

export interface IOrder {
    payment: PaymentMethod;
    address: string;
    email: string;
    phone: string;
    items: string[];    // id товаров из корзины
    total: number;      // сумма из корзины
}

export interface IOrderResult {
    id: string;
    total: number;
}