# Web-ларёк - Интернет-магазин для веб-разработчиков

## Описание проекта
Интернет-магазин с товарами для веб-разработчиков. Позволяет просматривать каталог товаров, добавлять товары в корзину и оформлять заказ.

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
- **Model** - классы данных (AppState, Product, Basket, OrderForm)
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
1. **AppState** - основная модель состояния приложения
   - Хранит каталог товаров, корзину, форму заказа
   - Реализует бизнес-логику приложения
   - Управляет взаимодействием между различными частями данных

2. **Product** - модель товара
   - Представляет информацию о товаре

3. **Basket** - модель корзины
   - Управляет добавлением/удалением товаров
   - Рассчитывает общую сумму

4. **OrderForm** - модель формы заказа
   - Управляет данными формы и их валидацией

#### Компоненты отображения
1. **Page** - главная страница с каталогом товаров
2. **Card** - карточка товара
3. **Basket** - модальное окно корзины
4. **Order** - форма оформления заказа (шаг 1)
5. **Contacts** - форма контактов (шаг 2)
6. **Success** - сообщение об успешном заказе

### Программный интерфейс компонентов

#### Базовый компонент Component<T>
```typescript
abstract class Component<T> {
    protected container: HTMLElement;
    protected events: EventEmitter;
    
    // Утилиты для работы с DOM
    protected onClick(element: HTMLElement, callback: Function): void;
    protected onChange(element: HTMLElement, callback: Function): void;
    protected setText(element: HTMLElement, text: string): void;
    protected setImage(element: HTMLImageElement, src: string, alt?: string): void;
    protected setDisabled(element: HTMLElement, state: boolean): void;
    protected toggleClass(element: HTMLElement, className: string, force?: boolean): void;
    
    // Рендеринг компонента
    protected render(data?: Partial<T>): HTMLElement;
}