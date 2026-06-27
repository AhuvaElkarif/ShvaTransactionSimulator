import type { ReactNode } from 'react';
import { LanguageToggle } from '../../common/LanguageToggle/LanguageToggle';
import { Logo } from '../../common/Logo/Logo';
import { Center, Panel, Screen, TopBar } from './AuthLayout.styles';

export const AuthLayout = ({ children }: { children: ReactNode }) => (
  <Screen>
    <TopBar>
      <Logo />
      <LanguageToggle />
    </TopBar>
    <Center>
      <Panel>{children}</Panel>
    </Center>
  </Screen>
);
