import { Component } from './base/Component';
import { EventEmitter } from './base/events';
import { ensureElement } from '../utils/utils';

interface IContactsActions {
    onSubmit: (event: Event) => void;
}

interface IContactsState {
    email: string;
    phone: string;
    submitButtonDisabled: boolean;
    errors: string[];
}

export class Contacts extends Component<IContactsState> {
    protected _submit: HTMLButtonElement;
    protected _emailInput: HTMLInputElement;
    protected _phoneInput: HTMLInputElement;
    protected _errors: HTMLElement;

    constructor(container: HTMLElement, events: EventEmitter, actions: IContactsActions) {
        super(container, events);

        this._submit = ensureElement<HTMLButtonElement>('.button', container);
        this._emailInput = ensureElement<HTMLInputElement>('[name=email]', container);
        this._phoneInput = ensureElement<HTMLInputElement>('[name=phone]', container);
        this._errors = ensureElement<HTMLElement>('.form__errors', container);

        if (actions?.onSubmit) {
            this.container.addEventListener('submit', actions.onSubmit);
        }

        this._emailInput.addEventListener('input', (event) => {
            this.events.emit('order:field-change', {
                field: 'email',
                value: (event.target as HTMLInputElement).value
            });
        });

        this._phoneInput.addEventListener('input', (event) => {
            this.events.emit('order:field-change', {
                field: 'phone',
                value: (event.target as HTMLInputElement).value
            });
        });
    }

    set email(value: string) {
        this._emailInput.value = value;
    }

    set phone(value: string) {
        this._phoneInput.value = value;
    }

    set submitButtonDisabled(state: boolean) {
        this.setDisabled(this._submit, state);
    }

    set errors(errors: string[]) {
        this.setText(this._errors, errors.join('; '));
    }
}
