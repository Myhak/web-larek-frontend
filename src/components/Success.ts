import { Component } from './base/Component';
import { EventEmitter } from './base/events';
import { ensureElement } from '../utils/utils';

interface ISuccessActions {
    onClick: (event: MouseEvent) => void;
}

export class Success extends Component<any> {
    protected _close: HTMLButtonElement;
    protected _total: HTMLElement;

    constructor(container: HTMLElement, events: EventEmitter, actions: ISuccessActions) {
        super(container, events);

        this._close = ensureElement<HTMLButtonElement>('.order-success__close');
        this._total = ensureElement<HTMLElement>('.order-success__description');

        if (actions?.onClick) {
            this._close.addEventListener('click', actions.onClick);
        }
    }

    set total(value: number) {
        this.setText(this._total, `Списано ${value} синапсов`);
    }
}