import React, { FC } from 'react';
import {
  Button,
  ConstructorElement,
  CurrencyIcon
} from '@zlden/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { BurgerConstructorUIProps } from './type';
import { BurgerConstructorElement, Modal } from '@components';
import { Preloader, OrderDetailsUI } from '@ui';

export const BurgerConstructorUI: FC<BurgerConstructorUIProps> = ({
  constructorItems,
  orderRequest,
  price,
  orderModalData,
  onOrderClick,
  closeOrderModal
}) => (
  <section
    className={styles.burger_constructor}
    data-testid='burger-constructor'
  >
    {constructorItems.bun ? (
      <div
        className={`${styles.element} mb-4 mr-4`}
        data-testid='constructor-bun-top'
      >
        <ConstructorElement
          type='top'
          isLocked
          text={`${constructorItems.bun.name} (верх)`}
          price={constructorItems.bun.price}
          thumbnail={constructorItems.bun.image}
        />
      </div>
    ) : (
      <div
        className={`${styles.noBuns} ${styles.noBunsTop} ml-8 mb-4 mr-5 text text_type_main-default`}
        data-testid='no-buns-top'
      >
        Выберите булки
      </div>
    )}
    <ul className={styles.elements} data-testid='constructor-ingredients'>
      {constructorItems.ingredients.length > 0 ? (
        constructorItems.ingredients.map((item, index) => (
          <BurgerConstructorElement
            ingredient={item}
            index={index}
            totalItems={constructorItems.ingredients.length}
            key={item.id}
          />
        ))
      ) : (
        <div
          className={`${styles.noBuns} ml-8 mb-4 mr-5 text text_type_main-default`}
          data-testid='no-ingredients'
        >
          Выберите начинку
        </div>
      )}
    </ul>
    {constructorItems.bun ? (
      <div
        className={`${styles.element} mt-4 mr-4`}
        data-testid='constructor-bun-bottom'
      >
        <ConstructorElement
          type='bottom'
          isLocked
          text={`${constructorItems.bun.name} (низ)`}
          price={constructorItems.bun.price}
          thumbnail={constructorItems.bun.image}
        />
      </div>
    ) : (
      <div
        className={`${styles.noBuns} ${styles.noBunsBottom} ml-8 mb-4 mr-5 text text_type_main-default`}
        data-testid='no-buns-bottom'
      >
        Выберите булки
      </div>
    )}
    <div
      className={`${styles.total} mt-10 mr-4`}
      data-testid='constructor-total'
    >
      <div className={`${styles.cost} mr-10`}>
        <p className={`text ${styles.text} mr-2`}>{price}</p>
        <CurrencyIcon type='primary' />
      </div>
      <Button
        htmlType='button'
        type='primary'
        size='large'
        children='Оформить заказ'
        onClick={onOrderClick}
        data-testid='order-button'
      />
    </div>

    {orderRequest && (
      <Modal
        onClose={closeOrderModal}
        title={'Оформляем заказ...'}
        data-testid='order-loading-modal'
      >
        <Preloader />
      </Modal>
    )}

    {orderModalData && (
      <Modal
        onClose={closeOrderModal}
        title={orderRequest ? 'Оформляем заказ...' : ''}
        data-testid='order-details-modal'
      >
        <OrderDetailsUI orderNumber={orderModalData.number} />
      </Modal>
    )}
  </section>
);
