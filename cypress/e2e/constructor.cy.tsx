import type {} from '../support/commands';
import ingredients from '../fixtures/ingredients.json';
import order from '../fixtures/order.json';
import user from '../fixtures/user.json';

describe('Конструктор бургеров', () => {
  beforeEach(() => {
    // Мокаем ингредиенты
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', {
      statusCode: 200,
      body: ingredients
    }).as('getIngredients');

    // Мокаем создание заказа
    cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders', {
      statusCode: 200,
      body: order
    }).as('createOrder');

    // Мокаем логин
    cy.intercept('POST', 'https://norma.nomoreparties.space/api/auth/login', {
      statusCode: 200,
      body: {
        success: true,
        accessToken: 'Bearer test-access-token',
        refreshToken: 'test-refresh-token',
        user: user.user
      }
    }).as('login');

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  afterEach(() => {
    // Очищаем localStorage и cookies после каждого теста
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  describe('Добавление ингредиентов в конструктор', () => {
    it('должен добавлять булку и начинку в конструктор', () => {
      // Добавляем булку
      cy.contains('Краторная булка N-200i')
        .scrollIntoView()
        .should('be.visible')
        .parents('li')
        .first()
        .as('bunCard')
        .within(() => {
          cy.get('button').contains('Добавить').click();
        });
      // Добавляем начинку
      cy.contains('Биокотлета из марсианской Магнолии')
        .scrollIntoView()
        .should('be.visible')
        .parents('li')
        .first()
        .as('mainCard')
        .within(() => {
          cy.get('button').contains('Добавить').click();
        });

      // Проверяем конструктор
      cy.get('[data-testid="constructor-bun-top"]')
        .should('be.visible')
        .and('contain', 'Краторная булка N-200i');

      cy.get('[data-testid="constructor-bun-bottom"]')
        .should('be.visible')
        .and('contain', 'Краторная булка N-200i');

      cy.get('[data-testid="constructor-ingredients"]')
        .children()
        .should('have.length.at.least', 1)
        .and('contain', 'Биокотлета из марсианской Магнолии');
    });
  });

  describe('Модальные окна ингредиентов', () => {
    it('должен открывать модальное окно ингредиента при клике и показывать его данные', () => {
      // Кликаем на ингредиент
      cy.contains('Краторная булка N-200i').click();

      // Проверяем что URL изменился (модальное окно открыто)
      cy.url().should('include', '/ingredients/643d69a5c3f7b9001cfa093c');

      // Проверяем что модальное окно открылось И данные внутри него
      cy.get('[data-testid="ingredient-modal"]').should('be.visible');
      cy.get('[data-testid="ingredient-modal"]').within(() => {
        cy.contains('Краторная булка N-200i').should('be.visible');
        cy.contains('Детали ингредиента').should('be.visible');
        cy.contains('420').should('be.visible'); // калории
        cy.contains('80').should('be.visible'); // белки
        cy.contains('24').should('be.visible'); // жиры
        cy.contains('53').should('be.visible'); // углеводы
      });
    });

    it('должен показывать данные разных ингредиентов при переходе по ним', () => {
      // Переходим на первый ингредиент
      cy.contains('Краторная булка N-200i').click();
      cy.get('[data-testid="ingredient-modal"]').within(() => {
        cy.contains('420').should('be.visible'); // калории булки
      });

      // Закрываем модальное окно
      cy.get('[data-testid="modal-close"]').click();

      // Переходим на второй ингредиент
      cy.contains('Биокотлета из марсианской Магнолии').click();
      cy.get('[data-testid="ingredient-modal"]').within(() => {
        cy.contains('4242').should('be.visible'); // калории начинки (другие!)
      });

      // Закрываем модальное окно после теста
      cy.get('[data-testid="modal-close"]').click();
    });

    it('должен закрывать модальное окно при клике на крестик', () => {
      cy.contains('Краторная булка N-200i').click();
      cy.url().should('include', '/ingredients/643d69a5c3f7b9001cfa093c');

      // Проверяем что модальное окно открыто
      cy.get('[data-testid="ingredient-modal"]').should('be.visible');

      // Закрываем модальное окно крестиком
      cy.get('[data-testid="modal-close"]').click();

      // Проверяем что модальное окно закрылось
      cy.get('[data-testid="ingredient-modal"]').should('not.exist');

      // Проверяем что вернулись на главную
      cy.url().should('eq', 'http://localhost:4000/');
    });

    it('должен закрывать модальное окно по клику на оверлей', () => {
      cy.contains('Краторная булка N-200i').click();
      cy.url().should('include', '/ingredients/643d69a5c3f7b9001cfa093c');

      // Проверяем что модальное окно открыто
      cy.get('[data-testid="ingredient-modal"]').should('be.visible');

      // Просто проверяем что оверлей существует
      cy.get('[data-testid="modal-overlay"]').should('exist');

      // Закрываем модальное окно кликом на оверлей
      cy.get('[data-testid="modal-overlay"]').click({ force: true });

      // Проверяем что модальное окно закрылось
      cy.get('[data-testid="ingredient-modal"]').should('not.exist');

      // Проверяем что вернулись на главную
      cy.url().should('eq', 'http://localhost:4000/');
    });
  });

  describe('Создание заказа', () => {
    it('должен создавать заказ и показывать модальное окно с номером', () => {
      // Добавляем ингредиенты
      cy.contains('Краторная булка N-200i')
        .scrollIntoView()
        .should('be.visible')
        .parents('li')
        .first()
        .within(() => {
          cy.get('button').contains('Добавить').click();
        });

      cy.contains('Биокотлета из марсианской Магнолии')
        .scrollIntoView()
        .should('be.visible')
        .parents('li')
        .first()
        .within(() => {
          cy.get('button').contains('Добавить').click();
        });

      // Проверяем что ингредиенты добавились в конструктор
      cy.get('[data-testid="constructor-bun-top"]')
        .should('be.visible')
        .and('contain', 'Краторная булка N-200i');

      cy.get('[data-testid="constructor-bun-bottom"]')
        .should('be.visible')
        .and('contain', 'Краторная булка N-200i');

      cy.get('[data-testid="constructor-ingredients"]')
        .children()
        .should('have.length', 1) // одна начинка
        .and('contain', 'Биокотлета из марсианской Магнолии');

      // Пытаемся оформить заказ - редирект на логин
      cy.get('button').contains('Оформить заказ').click();
      cy.url().should('include', '/login');

      // Логинимся
      cy.get('input[type="email"]').type('test@example.com');
      cy.get('input[type="password"]').type('password123');
      cy.get('button').contains('Войти').click();

      // Ждем успешного логина
      cy.wait('@login');

      // Проверяем что вернулись на главную
      cy.url().should('eq', 'http://localhost:4000/');

      // Ждем для восстановления состояния конструктора
      cy.wait(1000);

      // Проверяем что ингредиенты остались в конструкторе после логина
      cy.get('[data-testid="constructor-bun-top"]')
        .should('be.visible')
        .and('contain', 'Краторная булка N-200i');

      cy.get('[data-testid="constructor-bun-bottom"]')
        .should('be.visible')
        .and('contain', 'Краторная булка N-200i');

      cy.get('[data-testid="constructor-ingredients"]')
        .children()
        .should('have.length', 1) // одна начинка
        .and('contain', 'Биокотлета из марсианской Магнолии');

      // Оформляем заказ
      cy.get('button').contains('Оформить заказ').click();

      // Ждем создания заказа
      cy.wait('@createOrder', { timeout: 10000 });

      // Проверяем модальное окно заказа
      cy.get('[data-testid="order-details"]', { timeout: 15000 })
        .should('be.visible')
        .within(() => {
          cy.get('[data-testid="order-number"]').should('contain', '12345');
        });

      // Закрываем модальное окно через кнопку закрытия
      cy.get('[data-testid="ingredient-modal"]').within(() => {
        cy.get('[data-testid="modal-close"]').click();
      });

      // Проверяем что модальное окно закрылось
      cy.get('[data-testid="order-details"]').should('not.exist');
      cy.get('[data-testid="ingredient-modal"]').should('not.exist');

      // Проверяем очистку конструктора
      cy.get('[class*="constructor-element"]').should('have.length', 0);
    });
  });
});
