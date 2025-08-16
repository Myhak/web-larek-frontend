export interface IOrderForm {
    payment: string | null;
    address: string;
    email: string;
    phone: string;
    total: number;
    items: string[];
    isValid: boolean;
    validateField(field: keyof Omit<IOrderForm, 'isValid' | 'total' | 'items'>): boolean;
    validate(): boolean;
}

export interface IOrder extends IOrderForm {
    id: string;
}

export interface IOrderResult {
    id: string;
    total: number;
}