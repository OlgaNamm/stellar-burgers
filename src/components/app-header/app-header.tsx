import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppHeaderUI } from '@ui';

export const AppHeader: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userName = '';

  const handleLinkClick = (path: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(path);
  };

  const isActive = (path: string, isProfile: boolean = false) => {
    if (isProfile) {
      return location.pathname.startsWith('/profile');
    }
    return location.pathname === path;
  };

  return (
    <AppHeaderUI
      userName={userName}
      constructorLink={{
        to: '/',
        isActive: isActive('/'),
        onClick: handleLinkClick('/')
      }}
      feedLink={{
        to: '/feed',
        isActive: isActive('/feed'),
        onClick: handleLinkClick('/feed')
      }}
      profileLink={{
        to: '/profile',
        isActive: isActive('/profile', true),
        onClick: handleLinkClick('/profile')
      }}
      logoLink={{
        to: '/',
        isActive: false,
        onClick: handleLinkClick('/')
      }}
    />
  );
};
