type EventName = string | RegExp;
type Subscriber<T = any> = (data?: T) => void;

export interface IEvents {
    on<T>(event: EventName, callback: Subscriber<T>): void;
    emit<T>(event: string, data?: T): void;
    off(event: EventName, callback: Subscriber): void;
    trigger<T>(event: string, context?: Partial<T>): (data?: T) => void;
}

export type EmitterEvent<T = any> = {
    eventName: string;
    data: T;
};

export class EventEmitter implements IEvents {
    private _events: Map<EventName, Set<Subscriber>> = new Map();

    on<T>(eventName: EventName, callback: Subscriber<T>) {
        if (!this._events.has(eventName)) {
            this._events.set(eventName, new Set());
        }
        this._events.get(eventName)!.add(callback as Subscriber);
    }

    off(eventName: EventName, callback: Subscriber) {
        const subscribers = this._events.get(eventName);
        if (!subscribers) return;
        subscribers.delete(callback);
        if (subscribers.size === 0) this._events.delete(eventName);
    }

    emit<T>(eventName: string, data?: T) {
        this._events.forEach((subscribers, name) => {
            if (name === '*' || (name instanceof RegExp && name.test(eventName)) || name === eventName) {
                subscribers.forEach(callback => callback(data));
            }
        });
    }

    onAll<T>(callback: (event: EmitterEvent<T>) => void) {
        this.on('*', callback as Subscriber<T>);
    }

    offAll() {
        this._events.clear();
    }

    trigger<T>(eventName: string, context?: Partial<T>) {
        return (data?: T) => {
            this.emit(eventName, { ...(data || {}), ...(context || {}) } as T);
        };
    }
}


