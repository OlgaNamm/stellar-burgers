import React, { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const location = useLocation();

  const isActive = (path: string, isProfile: boolean = false) => {
    if (isProfile) {
      return location.pathname.startsWith('/profile');
    }
    return location.pathname === path;
  };

  const linkClass = (isActive: boolean) =>
    `${styles.menu_link} text text_type_main-default ml-2 ${isActive ? styles.active : ''}`;

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <NavLink
            to='/'
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.link_active : ''}`
            }
          >
            <BurgerIcon type={'primary'} />
            <span className='text text_type_main-default ml-2 mr-10'>
              Конструктор
            </span>
          </NavLink>

          <NavLink
            to='/feed'
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.link_active : ''}`
            }
          >
            <ListIcon type={'primary'} />
            <span className='text text_type_main-default ml-2'>
              Лента заказов
            </span>
          </NavLink>
        </div>

        <div className={styles.logo}>
          <NavLink to='/' className={styles.link}>
            <Logo className='' />
          </NavLink>
        </div>

        <div className={styles.link_position_last}>
          <NavLink
            to='/profile'
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.link_active : ''}`
            }
          >
            <ProfileIcon type={'primary'} />
            <span className='text text_type_main-default ml-2'>
              {userName || 'Личный кабинет'}
            </span>
          </NavLink>
        </div>
      </nav>
    </header>
  );
};
