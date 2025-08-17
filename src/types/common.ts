export type ProductCategory = 'софт-скил' | 'другое' | 'дополнительное' | 'кнопка' | 'хард-скил';
export type PaymentMethod = 'online' | 'cash';

// События приложения
export interface IEvents {
    on<T extends object>(event: string, callback: ( arg0: T) => void): void;
    emit<T extends object>(event: string, data?: T): void;
    off(event: string, callback: Function): void;
    trigger<T extends object>(event: string, context?: Partial<T>): ( arg0: T) => void;
}