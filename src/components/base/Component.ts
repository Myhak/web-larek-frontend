import { EventEmitter } from './events';

export abstract class Component<T> {
    protected container: HTMLElement;
    protected events: EventEmitter;

    constructor(container: HTMLElement, events: EventEmitter) {
        this.container = container;
        this.events = events;
    }

    protected onClick(element: HTMLElement, callback: (event: MouseEvent) => void) {
        element.addEventListener('click', callback);
    }

    protected onChange(element: HTMLElement, callback: (event: Event) => void) {
        element.addEventListener('input', callback);
    }

    protected toggleClass(element: HTMLElement, className: string, force?: boolean) {
        element.classList.toggle(className, force);
    }

    protected setText(element: HTMLElement, text: string) {
        element && (element.textContent = text);
    }

    protected setImage(element: HTMLImageElement, src: string, alt?: string) {
        if (element) {
            element.src = src;
            if (alt) element.alt = alt;
        }
    }

    protected setDisabled(element: HTMLElement, state: boolean) {
        if (!element) return;
        state ? element.setAttribute('disabled', 'disabled') : element.removeAttribute('disabled');
    }

    protected setHidden(element: HTMLElement) {
        if (element) element.style.display = 'none';
    }

    protected setVisible(element: HTMLElement) {
        if (element) element.style.removeProperty('display');
    }

    /**
     * Обновляет свойства компонента на основе переданных данных
     */
    render(data?: Partial<T>): HTMLElement {
        if (data) {
            Object.keys(data).forEach(key => {
                if (key in this) {
                    // @ts-ignore — безопасно, потому что ключ проверен
                    (this as any)[key] = (data as any)[key];
                }
            });
        }
        return this.container;
    }
}
