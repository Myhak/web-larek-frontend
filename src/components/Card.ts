import { Component } from './base/Component';
import { EventEmitter } from './base/events';
import { ensureElement } from '../utils/utils';

interface ICardActions {
    onClick: (event: MouseEvent) => void;
}

interface ICardState {
    title: string;
    image: string;
    category: string;
    price: number | null;
    description?: string;
    buttonText?: string;
    buttonDisabled?: boolean;
    index?: number;
}

export class Card extends Component<ICardState> {
    protected _title: HTMLElement;
    protected _image: HTMLImageElement;
    protected _category: HTMLElement;
    protected _price: HTMLElement;
    protected _button?: HTMLButtonElement;
    protected _description?: HTMLElement;
    protected _index?: HTMLElement;

    constructor(container: HTMLElement, events: EventEmitter, actions?: ICardActions) {
        super(container, events);

        this._title = ensureElement<HTMLElement>('.card__title', container);
        this._image = ensureElement<HTMLImageElement>('.card__image', container);
        this._category = ensureElement<HTMLElement>('.card__category', container);
        this._price = ensureElement<HTMLElement>('.card__price', container);

        // дополнительные элементы — опциональные
        this._button = container.querySelector<HTMLButtonElement>('.card__button') || undefined;
        this._description = container.querySelector<HTMLElement>('.card__description') || undefined;
        this._index = container.querySelector<HTMLElement>('.basket__item-index') || undefined;

        if (actions?.onClick) {
            if (this._button) {
                this._button.addEventListener('click', actions.onClick);
            } else {
                container.addEventListener('click', actions.onClick);
            }
        }
    }

    set title(value: string) {
        this.setText(this._title, value);
    }

    set image(value: string) {
        this.setImage(this._image, value);
    }

    set category(value: string) {
        this.setText(this._category, value);
        this._category.className = 'card__category';
        this._category.classList.add(`card__category_${value}`);
    }

    set price(value: number | null) {
        this.setText(this._price, value ? `${value} синапсов` : 'Бесценно');
    }

    set description(value: string) {
        if (this._description) {
            this.setText(this._description, value);
        }
    }

    set buttonText(value: string) {
        if (this._button) {
            this.setText(this._button, value);
        }
    }

    set buttonDisabled(state: boolean) {
        if (this._button) {
            this.setDisabled(this._button, state);
        }
    }

    set index(value: number) {
        if (this._index) {
            this.setText(this._index, String(value));
        }
    }
}
