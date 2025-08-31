import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({
  userName,
  constructorLink,
  feedLink,
  profileLink,
  logoLink
}) => {
  // Значения по умолчанию для обратной совместимости
  const defaultLink = {
    to: '#',
    isActive: false,
    onClick: (e: React.MouseEvent) => {
      e.preventDefault();
      console.log(
        'Link clicked - implement navigation logic in parent component'
      );
    }
  };

  const links = {
    constructor: constructorLink || defaultLink,
    feed: feedLink || defaultLink,
    profile: profileLink || defaultLink,
    logo: logoLink || defaultLink
  };

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          {/* Конструктор */}
          <a
            href={links.constructor.to}
            className={`${styles.link} ${links.constructor.isActive ? styles.link_active : ''}`}
            onClick={links.constructor.onClick}
          >
            <BurgerIcon
              type={links.constructor.isActive ? 'primary' : 'secondary'}
            />
            <span className='text text_type_main-default ml-2 mr-10'>
              Конструктор
            </span>
          </a>

          {/* Лента заказов */}
          <a
            href={links.feed.to}
            className={`${styles.link} ${links.feed.isActive ? styles.link_active : ''}`}
            onClick={links.feed.onClick}
          >
            <ListIcon type={links.feed.isActive ? 'primary' : 'secondary'} />
            <span className='text text_type_main-default ml-2'>
              Лента заказов
            </span>
          </a>
        </div>

        {/* Логотип */}
        <div className={styles.logo}>
          <a
            href={links.logo.to}
            className={styles.link}
            onClick={links.logo.onClick}
          >
            <Logo className='' />
          </a>
        </div>

        {/* Личный кабинет */}
        <div className={styles.link_position_last}>
          <a
            href={links.profile.to}
            className={`${styles.link} ${links.profile.isActive ? styles.link_active : ''}`}
            onClick={links.profile.onClick}
          >
            <ProfileIcon
              type={links.profile.isActive ? 'primary' : 'secondary'}
            />
            <span className='text text_type_main-default ml-2'>
              {userName || 'Личный кабинет'}
            </span>
          </a>
        </div>
      </nav>
    </header>
  );
};
