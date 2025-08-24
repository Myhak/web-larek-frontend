# Web-ларёк - Интернет-магазин для веб-разработчиков

## Описание проекта
Интернет-магазин с товарами для веб-разработчиков. Позволяет просматривать каталог товаров, добавлять товары в корзину и оформлять заказ.

https://myhak.github.io/web-larek-frontend/

## Стек технологий
- HTML
- SCSS
- TypeScript
- Webpack
- REST API

## Структура проекта
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/ — папка с типами данных
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```


## Архитектура проекта

### Используемый паттерн
Проект реализован с использованием архитектурного паттерна MVP (Model-View-Presenter):
- **Model** - классы данных (AppState)
- **View** - компоненты отображения (Page, Card, Basket, Order, Contacts)
- **Presenter** - логика взаимодействия между Model и View через события

### Структура базового кода

#### Базовые классы

1. **EventEmitter** (`src/components/base/events.ts`)
   - Обеспечивает работу событий в приложении
   - Функции: установка и снятие слушателей событий, вызов слушателей при возникновении события
   - Реализует паттерн Observer для слабой связи между компонентами

2. **Api** (`src/components/base/api.ts`)
   - Обеспечивает взаимодействие с сервером через REST API
   - Функции: выполнение GET и POST запросов, обработка ответов сервера
   - Централизованное управление API-вызовами

3. **Component** (`src/components/base/Component.ts`)
   - Абстрактный базовый класс для всех компонентов интерфейса
   - Функции: управление DOM-элементами, установка слушателей событий, управление состоянием
   - Предоставляет утилиты для работы с DOM (setText, setImage, toggleClass и др.)

#### Модели данных

**AppState** (`src/components/AppState.ts`)
- Основная модель состояния приложения
- Хранит каталог товаров, корзину, данные заказа
- Реализует бизнес-логику приложения

Поля:
- `catalog: IProduct[]` - каталог товаров
- `basket: IBasket` - состояние корзины
- `order: IOrderData` - данные заказа (доставка, контакты)
- `preview: IProduct | null` - текущий просматриваемый товар

Методы:
- `setCatalog(products: IProduct[]): void` - устанавливает каталог товаров
- `setPreview(product: IProduct): void` - устанавливает просматриваемый товар
- `addToBasket(product: IProduct): void` - добавляет товар в корзину
- `removeFromBasket(productId: string): void` - удаляет товар из корзины
- `clearBasket(): void` - очищает корзину
- `setOrderField<T>(field: T, value: IOrderData[T]): void` - устанавливает поле данных заказа
- `validateOrder(): boolean` - валидирует данные заказа
- `getOrderData(): IOrder` - собирает готовый объект заказа для отправки на сервер

**IBasket**
- Модель корзины
- Хранит список товаров и общую сумму

Поля:
- `items: ICartItem[]` - элементы корзины
- `total: number` - общая сумма

Методы:
- `add(item: ICartItem): void` - добавляет товар
- `remove(id: string): void` - удаляет товар
- `clear(): void` - очищает корзину
- `getItems(): ICartItem[]` - возвращает элементы корзины

**IOrderData**
- Данные для формы заказа
- Содержит только информацию о доставке и контактах

Поля:
- `payment: PaymentMethod | null` - способ оплаты
- `address: string` - адрес доставки
- `email: string` - email покупателя
- `phone: string` - телефон покупателя

**IOrder**
- Готовый объект заказа для отправки на сервер
- Собирается из данных корзины и формы заказа

Поля:
- `payment: PaymentMethod` - способ оплаты
- `address: string` - адрес доставки
- `email: string` - email покупателя
- `phone: string` - телефон покупателя
- `items: string[]` - идентификаторы товаров из корзины
- `total: number` - общая сумма из корзины

#### Компоненты отображения

1. **Page** (`src/components/Page.ts`)
2. **Card** (`src/components/Card.ts`)
3. **Basket** (`src/components/Basket.ts`)
4. **Order** (`src/components/Order.ts`)
5. **Contacts** (`src/components/Contacts.ts`)
6. **Success** (`src/components/Success.ts`)
7. **Modal** (`src/components/Modal.ts`)

### Детальное описание классов

#### Базовые классы

**EventEmitter**
Поля:
- `_events: Map<string, Set<Function>>` - хранит зарегистрированные обработчики событий

Методы:
- `on(eventName: string, callback: Function): void` - регистрирует обработчик события
- `off(eventName: string, callback: Function): void` - удаляет обработчик события
- `emit(eventName: string, data?: any): void` - инициирует событие с данными
- `trigger(eventName: string, context?: any): Function` - возвращает функцию-триггер для события

**Api**
Поля:
- `baseUrl: string` - базовый URL API
- `options: RequestInit` - настройки запросов

Методы:
- `get(uri: string): Promise<any>` - выполняет GET запрос
- `post(uri: string,  object, method?: 'POST'|'PUT'|'DELETE'): Promise<any>` - выполняет POST запрос

**Component<T>**
Поля:
- `container: HTMLElement` - корневой DOM-элемент компонента
- `events: EventEmitter` - брокер событий для компонента

Методы:
- `onClick(element: HTMLElement, callback: Function): void` - устанавливает обработчик клика
- `onChange(element: HTMLElement, callback: Function): void` - устанавливает обработчик изменения
- `setText(element: HTMLElement, text: string): void` - устанавливает текстовое содержимое
- `setImage(element: HTMLImageElement, src: string, alt?: string): void` - устанавливает изображение
- `setDisabled(element: HTMLElement, state: boolean): void` - устанавливает состояние disabled
- `toggleClass(element: HTMLElement, className: string, force?: boolean): void` - переключает CSS класс
- `setHidden(element: HTMLElement): void` - скрывает элемент
- `setVisible(element: HTMLElement): void` - показывает элемент
- `render(data?: Partial<T>): HTMLElement` - рендерит компонент с данными

#### Компоненты отображения

**Page**
Поля:
- `counter: HTMLElement` - элемент счетчика товаров в корзине
- `catalog: HTMLElement` - контейнер каталога товаров
- `basket: HTMLElement` - кнопка открытия корзины
- `wrapper: HTMLElement` - обертка страницы

Методы:
- `set counter(value: number)` - устанавливает значение счетчика
- `set catalog(items: HTMLElement[])` - устанавливает элементы каталога
- `set locked(value: boolean)` - блокирует/разблокирует страницу

**Card**
Поля:
- `title: HTMLElement` - заголовок карточки
- `image: HTMLImageElement` - изображение товара
- `category: HTMLElement` - категория товара
- `price: HTMLElement` - цена товара
- `button: HTMLButtonElement` - кнопка действия

Методы:
- `set title(text: string)` - устанавливает заголовок
- `set image(src: string)` - устанавливает изображение
- `set category(text: string)` - устанавливает категорию
- `set price(text: string)` - устанавливает цену
- `set buttonText(text: string)` - устанавливает текст кнопки
- `set buttonDisabled(state: boolean)` - устанавливает состояние кнопки

**Basket**
Поля:
- `list: HTMLElement` - список товаров в корзине
- `total: HTMLElement` - общая сумма
- `button: HTMLButtonElement` - кнопка оформления заказа

Методы:
- `set items(items: HTMLElement[])` - устанавливает список товаров
- `set total(value: number)` - устанавливает общую сумму
- `set buttonDisabled(state: boolean)` - устанавливает состояние кнопки

**Order**
Поля:
- `paymentButtons: HTMLElement[]` - кнопки выбора способа оплаты
- `addressInput: HTMLInputElement` - поле ввода адреса
- `nextButton: HTMLButtonElement` - кнопка перехода к следующему шагу
- `errors: HTMLElement` - контейнер для ошибок

Методы:
- `setPaymentMethod(method: string)` - устанавливает способ оплаты
- `setAddress(value: string)` - устанавливает адрес
- `setNextButtonDisabled(state: boolean)` - устанавливает состояние кнопки
- `setErrors(errors: string[])` - устанавливает ошибки

**Contacts**
Поля:
- `emailInput: HTMLInputElement` - поле ввода email
- `phoneInput: HTMLInputElement` - поле ввода телефона
- `submitButton: HTMLButtonElement` - кнопка отправки
- `errors: HTMLElement` - контейнер для ошибок

Методы:
- `setEmail(value: string)` - устанавливает email
- `setPhone(value: string)` - устанавливает телефон
- `setSubmitButtonDisabled(state: boolean)` - устанавливает состояние кнопки
- `setErrors(errors: string[])` - устанавливает ошибки

**Success**
Поля:
- `total: HTMLElement` - отображение общей суммы заказа
- `closeButton: HTMLButtonElement` - кнопка закрытия

Методы:
- `setTotal(value: number)` - устанавливает отображаемую сумму

**Modal**
Поля:
- `content: HTMLElement` - контейнер содержимого модального окна
- `closeButton: HTMLButtonElement` - кнопка закрытия

Методы:
- `setContent(content: HTMLElement)` - устанавливает содержимое
- `open()` - открывает модальное окно
- `close()` - закрывает модальное окно
- `set onClose(callback: Function)` - устанавливает обработчик закрытия

### Пользовательские события

Список событий, которые используются для взаимодействия между компонентами:

#### События каталога и товаров
- `items:changed` - изменение каталога товаров (передача: массив товаров)
- `product:selected` - выбор товара для просмотра (передача: IProduct)
- `product:add` - добавление товара в корзину (передача: IProduct)

#### События корзины
- `basket:changed` - изменение содержимого корзины (передача: IBasket)
- `basket:open` - открытие корзины
- `basket:remove` - удаление товара из корзины (передача: string - id товара)

#### События оформления заказа
- `order:open` - открытие формы заказа
- `order:submit` - отправка заказа (передача: IOrder)
- `order:payment-change` - изменение способа оплаты (передача: PaymentMethod)
- `order:field-change` - изменение поля формы (передача: { field: string, value: any })

#### События модальных окон
- `modal:open` - открытие модального окна (передача: HTMLElement - содержимое)
- `modal:close` - закрытие модального окна

#### События навигации
- `page:lock` - блокировка страницы (при открытии модальных окон)
- `page:unlock` - разблокировка страницы

#### События успешного завершения
- `order:success` - успешное оформление заказа (передача: IOrderResult)

### Взаимодействие частей приложения

Взаимодействие между компонентами осуществляется через брокер событий (EventEmitter). Это обеспечивает слабую связность и позволяет компонентам не зависеть друг от друга напрямую.

Пример потока данных:
1. Пользователь кликает на товар → генерируется событие `product:selected`
2. AppState получает событие и устанавливает preview товара
3. Компонент модального окна получает обновление и отображает товар
4. Пользователь добавляет товар в корзину → генерируется событие `product:add`
5. AppState обновляет состояние корзины
6. Компоненты Page и Basket получают событие `basket:changed` и обновляют отображение

### Принципы разработки

#### Принцип единственной ответственности
- Каждый класс решает одну задачу
- Модели управляют данными
- Компоненты управляют отображением
- AppState координирует взаимодействие

#### Слабое связывание
- Компоненты не создают экземпляры других компонентов напрямую
- Взаимодействие через события
- Зависимости передаются через конструктор

#### Переиспользуемость
- Базовые классы могут использоваться в других проектах
- Компоненты легко тестируются изолированно
- Утилиты вынесены в отдельные функции