import { Component } from './base/Component';
import { EventEmitter } from './base/events';
import { ensureElement } from '../utils/utils';

interface IOrderActions {
    onClick: (event: MouseEvent) => void;
    onSubmit: (event: Event) => void;
}

interface IOrderState {
    address: string;
    submitButtonDisabled: boolean;
    errors: string[];
}

export class Order extends Component<IOrderState> {
    protected _submit: HTMLButtonElement;
    protected _buttonOnline: HTMLButtonElement;
    protected _buttonCash: HTMLButtonElement;
    protected _addressInput: HTMLInputElement;
    protected _errors: HTMLElement;

    constructor(container: HTMLElement, events: EventEmitter, actions: IOrderActions) {
        super(container, events);

        this._submit = ensureElement<HTMLButtonElement>('.order__button', container);
        this._buttonOnline = ensureElement<HTMLButtonElement>('[name=card]', container);
        this._buttonCash = ensureElement<HTMLButtonElement>('[name=cash]', container);
        this._addressInput = ensureElement<HTMLInputElement>('[name=address]', container);
        this._errors = ensureElement<HTMLElement>('.form__errors', container);

        if (actions?.onClick) {
            this._buttonOnline.addEventListener('click', (event) => {
                this.setPaymentMethod('online');
                actions.onClick(event);
            });
            this._buttonCash.addEventListener('click', (event) => {
                this.setPaymentMethod('cash');
                actions.onClick(event);
            });
        }

        if (actions?.onSubmit) {
            this.container.addEventListener('submit', actions.onSubmit);
        }

        this._addressInput.addEventListener('input', (event) => {
            this.events.emit('order:field-change', {
                field: 'address',
                value: (event.target as HTMLInputElement).value
            });
        });
    }

    setPaymentMethod(method: string) {
        this.events.emit('order:payment-change', method);
    }

    set address(value: string) {
        this._addressInput.value = value;
    }

    set submitButtonDisabled(state: boolean) {
        this.setDisabled(this._submit, state);
    }

    set errors(errors: string[]) {
        this.setText(this._errors, errors.join('; '));
    }
}
