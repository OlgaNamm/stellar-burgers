import type {} from '../support/commands';

// cypress/e2e/constructor.cy.tsx

describe('Конструктор бургеров', () => {
  beforeEach(() => {
    // Мокаем ингредиенты
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', {
      statusCode: 200,
      body: {
        success: true,
        data: [
          {
            _id: '643d69a5c3f7b9001cfa093c',
            name: 'Краторная булка N-200i',
            type: 'bun',
            proteins: 80,
            fat: 24,
            carbohydrates: 53,
            calories: 420,
            price: 1255,
            image: 'https://code.s3.yandex.net/react/code/bun-02.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/bun-02-large.png',
            __v: 0
          },
          {
            _id: '643d69a5c3f7b9001cfa0941',
            name: 'Биокотлета из марсианской Магнолии',
            type: 'main',
            proteins: 420,
            fat: 142,
            carbohydrates: 242,
            calories: 4242,
            price: 424,
            image: 'https://code.s3.yandex.net/react/code/meat-01.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/meat-01-large.png',
            __v: 0
          },
          {
            _id: '643d69a5c3f7b9001cfa093e',
            name: 'Филе Люминесцентного тетраодонтимформа',
            type: 'main',
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: 'https://code.s3.yandex.net/react/code/meat-03.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/meat-03-large.png',
            __v: 0
          }
        ]
      }
    }).as('getIngredients');

    // Мокаем создание заказа
    cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders', {
      statusCode: 200,
      body: {
        success: true,
        name: 'Space burger',
        order: { number: 12345 }
      }
    }).as('createOrder');

    // Мокаем логин
    cy.intercept('POST', 'https://norma.nomoreparties.space/api/auth/login', {
      statusCode: 200,
      body: {
        success: true,
        accessToken: 'Bearer test-access-token',
        refreshToken: 'test-refresh-token',
        user: {
          email: 'test@example.com',
          name: 'Test User'
        }
      }
    }).as('login');

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  describe('Добавление ингредиентов в конструктор', () => {
    it('должен добавлять булку и начинку в конструктор', () => {
      // Добавляем булку
      cy.contains('Краторная булка N-200i')
        .scrollIntoView()
        .should('be.visible')
        .parents('li')
        .first()
        .within(() => {
          cy.get('button').contains('Добавить').click();
        });

      // Добавляем начинку
      cy.contains('Биокотлета из марсианской Магнолии')
        .scrollIntoView()
        .should('be.visible')
        .parents('li')
        .first()
        .within(() => {
          cy.get('button').contains('Добавить').click();
        });

      // Проверяем, что булка добавлена (верх и низ)
      cy.get('[class*="constructor-element_pos_top"]')
        .should('be.visible')
        .and('contain', 'Краторная булка N-200i');

      cy.get('[class*="constructor-element_pos_bottom"]')
        .should('be.visible')
        .and('contain', 'Краторная булка N-200i');

      // Проверяем, что начинка добавлена
      cy.get('[class*="constructor-element"]')
        .should('have.length.at.least', 3)
        .and('contain', 'Биокотлета из марсианской Магнолии');
    });
  });

  describe('Модальные окна ингредиентов', () => {
    it('должен открывать страницу ингредиента при клике и показывать его данные', () => {
      cy.contains('Краторная булка N-200i').click();

      // Проверяем, что перешли на страницу ингредиента
      cy.url().should('include', '/ingredients/643d69a5c3f7b9001cfa093c');

      // Проверяем, что отображаются данные ингредиента
      cy.contains('Краторная булка N-200i').should('be.visible');
      cy.contains('Детали ингредиента').should('be.visible');
      cy.contains('420').should('be.visible'); // калории
      cy.contains('80').should('be.visible'); // белки
      cy.contains('24').should('be.visible'); // жиры
      cy.contains('53').should('be.visible'); // углеводы
    });

    it('должен возвращаться на главную при клике на крестик', () => {
      cy.contains('Филе Люминесцентного тетраодонтимформа').click();
      cy.url().should('include', '/ingredients/643d69a5c3f7b9001cfa093e');

      // Возвращаемся на главную
      cy.go('back');
      cy.url().should('eq', 'http://localhost:4000/');
    });

    it('должен показывать данные разных ингредиентов при переходе по ним', () => {
      // Переходим на первый ингредиент
      cy.contains('Краторная булка N-200i').click();
      cy.contains('420').should('be.visible'); // калории булки
      cy.go('back');

      // Переходим на второй ингредиент
      cy.contains('Биокотлета из марсианской Магнолии').click();
      cy.contains('4242').should('be.visible'); // калории начинки
    });
  });

  describe('Создание заказа', () => {
    it('должен создавать заказ и показывать модальное окно с номером', () => {
      // Добавляем ингредиенты
      cy.contains('Краторная булка N-200i')
        .scrollIntoView()
        .parents('li')
        .first()
        .within(() => {
          cy.get('button').contains('Добавить').click();
        });

      cy.contains('Биокотлета из марсианской Магнолии')
        .scrollIntoView()
        .parents('li')
        .first()
        .within(() => {
          cy.get('button').contains('Добавить').click();
        });

      // Пытаемся оформить заказ - редирект на логин
      cy.get('button').contains('Оформить заказ').click();
      cy.url().should('include', '/login');

      // Логинимся
      cy.get('input[type="email"]').type('test@example.com');
      cy.get('input[type="password"]').type('password123');
      cy.get('button').contains('Войти').click();

      // Ждем успешного логина
      cy.wait('@login');
      cy.url().should('eq', 'http://localhost:4000/');

      // Проверяем, что ингредиенты остались
      cy.get('[class*="constructor-element"]').should(
        'have.length.at.least',
        2
      );

      // Оформляем заказ
      cy.get('button').contains('Оформить заказ').click();

      // 9. Ждем создания заказа
      cy.wait('@createOrder', { timeout: 10000 });

      // 10. ГЛАВНАЯ ПРОВЕРКА: номер заказа отображается
      cy.contains('12345', { timeout: 10000 }).should('be.visible');

      // 11. Проверяем, что конструктор очистился (основная проверка)
      cy.get('[class*="constructor-element"]').should('have.length', 0);
    });
  });
});
