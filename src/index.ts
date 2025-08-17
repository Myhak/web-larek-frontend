import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants';
import { WebLarekApi } from './components/WebLarekApi';
import { AppState } from './components/AppState';
import { Page } from './components/Page';
import { Card } from './components/Card';
import { Modal } from './components/Modal';
import { Basket } from './components/Basket';
import { Order } from './components/Order';
import { Contacts } from './components/Contacts';
import { Success } from './components/Success';
import { EventEmitter } from './components/base/events';
import { cloneTemplate, ensureElement } from './utils/utils';
import { IProduct } from './types';

const events = new EventEmitter();
const api = new WebLarekApi(CDN_URL, API_URL);
const appState = new AppState();

// Чтобы мониторить все события, для отладки
events.onAll(({ eventName, data }) => {
    console.log(eventName, data);
});

// Получаем шаблоны из HTML
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

// Создаем компоненты
const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

// Изменения данных
events.on('items:changed', () => {
    page.catalog = appState.catalog.map(item => {
        const card = new Card(cloneTemplate(cardCatalogTemplate), events, {
            onClick: () => events.emit('product:selected', item)
        });
        card.title = item.title;
        card.image = item.image;
        card.category = item.category;
        card.price = item.price;
        return card.render();
    });
    page.counter = appState.getBasketCount();
});

events.on('preview:changed', (product: IProduct) => {
    const card = new Card(cloneTemplate(cardPreviewTemplate), events, {
        onClick: () => {
            if (appState.basket.items.some(item => item.id === product.id)) {
                appState.removeFromBasket(product.id);
            } else {
                appState.addToBasket(product);
            }
        }
    });
    card.title = product.title;
    card.image = product.image;
    card.category = product.category;
    card.price = product.price;
    card.description = product.description;
    card.buttonText = appState.basket.items.some(item => item.id === product.id) 
        ? 'Убрать из корзины' 
        : 'В корзину';
    modal.render({ content: card.render() });
});

events.on('basket:changed', () => {
    page.counter = appState.getBasketCount();
});

events.on('basket:open', () => {
    const basket = new Basket(cloneTemplate(basketTemplate), events, {
        onClick: () => events.emit('order:open')
    });
    basket.items = appState.basket.items.map((item, index) => {
        const card = new Card(cloneTemplate(cardBasketTemplate), events, {
            onClick: () => events.emit('basket:remove', item.id)
        });
        card.title = item.title;
        card.price = item.price;
        card.index = index + 1;
        return card.render();
    });
    basket.total = appState.basket.total;
    basket.buttonDisabled = appState.basket.items.length === 0;
    modal.render({ content: basket.render() });
});

events.on('basket:remove', (id: string) => {
    appState.removeFromBasket(id);
});

events.on('order:open', () => {
    const order = new Order(cloneTemplate(orderTemplate), events, {
        onClick: () => {
            // Проверяем валидность формы
            const isValid = appState.order.payment !== null && appState.order.address.trim() !== '';
            order.submitButtonDisabled = !isValid;
        },
        onSubmit: (event: Event) => {
            event.preventDefault();
            if (appState.order.payment !== null && appState.order.address.trim() !== '') {
                events.emit('order:submit');
            }
        }
    });
    order.address = appState.order.address;
    order.submitButtonDisabled = true;
    modal.render({ content: order.render() });
});

events.on('order:payment-change', (method: string) => {
    appState.setOrderField('payment', method as 'online' | 'cash' | null);
});

events.on('order:field-change', (data: { field: string, value: string }) => {
    appState.setOrderField(data.field as keyof typeof appState.order, data.value);
});

events.on('order:submit', () => {
    const contacts = new Contacts(cloneTemplate(contactsTemplate), events, {
        onSubmit: (event: Event) => {
            event.preventDefault();
            if (appState.order.email.trim() !== '' && appState.order.phone.trim() !== '') {
                events.emit('contacts:submit');
            }
        }
    });
    contacts.email = appState.order.email;
    contacts.phone = appState.order.phone;
    contacts.submitButtonDisabled = true;
    modal.render({ content: contacts.render() });
});

events.on('contacts:submit', () => {
    const total = appState.basket.total;
    api.orderProducts(appState.getOrderData())
        .then(() => {
            const success = new Success(cloneTemplate(successTemplate), events, {
                onClick: () => {
                    modal.close();
                    appState.clearBasket();
                }
            });
            success.total = total;
            modal.render({ content: success.render() });
        })
        .catch(error => {
            console.error(error);
        });
});

// Блокировка страницы при открытии модального окна
events.on('modal:open', () => {
    page.locked = true;
});

events.on('modal:close', () => {
    page.locked = false;
});

// Инициализация приложения
api.getProductList()
    .then(products => {
        appState.setCatalog(products);
    })
    .catch(error => {
        console.error('Ошибка загрузки каталога товаров:', error);
    });