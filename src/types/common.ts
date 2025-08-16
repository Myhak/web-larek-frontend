export type ProductCategory = 'софт-скил' | 'другое' | 'дополнительное' | 'кнопка' | 'хард-скил';

export type PaymentMethod = 'online' | 'cash';

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IEvents {
    on<T extends object>(event: string, callback: (data: T) => void): void;
    emit<T extends object>(event: string, data?: T): void;
    off(event: string, callback: Function): void;
    trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void;
}