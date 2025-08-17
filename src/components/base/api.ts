export type ApiListResponse<Type> = {
    total: number;
    items: Type[];
};

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export class Api {
    readonly baseUrl: string;
    protected options: RequestInit;

    constructor(baseUrl: string, options: RequestInit = {}) {
        this.baseUrl = baseUrl;
        this.options = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...(options.headers || {})
            }
        };
    }

    protected async handleResponse<T>(response: Response): Promise<T> {
        const data = await response.json();
        if (response.ok) return data as T;
        return Promise.reject(data.error ?? response.statusText);
    }

    get<T>(uri: string): Promise<T> {
        return fetch(this.baseUrl + uri, {
            ...this.options,
            method: 'GET'
        }).then(res => this.handleResponse<T>(res));
    }

    post<T>(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<T> {
        return fetch(this.baseUrl + uri, {
            ...this.options,
            method,
            body: JSON.stringify(data)
        }).then(res => this.handleResponse<T>(res));
    }

    put<T>(uri: string, data: object): Promise<T> {
        return this.post<T>(uri, data, 'PUT');
    }

    delete<T>(uri: string, data?: object): Promise<T> {
        return this.post<T>(uri, data || {}, 'DELETE');
    }
}

