import { useTranslation } from 'react-i18next';
import { Button } from '../../common/Button/Button';
import { LanguageToggle } from '../../common/LanguageToggle/LanguageToggle';
import { Logo } from '../../common/Logo/Logo';
import { useAuth } from '../../../hooks/useAuth';
import { Greeting, HeaderActions, HeaderBar, UserArea } from './Header.styles';

export const Header = () => {
  const { t } = useTranslation();
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <HeaderBar>
      <Logo />
      <HeaderActions>
        <LanguageToggle />
        {isAuthenticated && user && (
          <UserArea>
            <Greeting>{t('nav.greeting', { email: user.email })}</Greeting>
            <Button variant="secondary" onClick={logout}>
              {t('nav.logout')}
            </Button>
          </UserArea>
        )}
      </HeaderActions>
    </HeaderBar>
  );
};
