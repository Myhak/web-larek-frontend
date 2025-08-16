import { EventEmitter } from './events';
import { ensureElement } from '../../utils/utils';

interface IComponent {
    render(data?: object): HTMLElement;
}

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
        if (element) {
            element.textContent = text;
        }
    }

    protected setImage(element: HTMLImageElement, src: string, alt?: string) {
        if (element) {
            element.src = src;
            if (alt) {
                element.alt = alt;
            }
        }
    }

    protected setDisabled(element: HTMLElement, state: boolean) {
        if (element) {
            if (state) element.setAttribute('disabled', 'disabled');
            else element.removeAttribute('disabled');
        }
    }

    protected setHidden(element: HTMLElement) {
        if (element) {
            element.style.display = 'none';
        }
    }

    protected setVisible(element: HTMLElement) {
        if (element) {
            element.style.removeProperty('display');
        }
    }

    protected render(data?: Partial<T>): HTMLElement {
        Object.assign(this as object, data || {});
        return this.container;
    }
}