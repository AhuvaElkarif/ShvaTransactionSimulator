import type { ReactNode } from 'react';
import { LanguageToggle } from '../../common/LanguageToggle/LanguageToggle';
import { Logo } from '../../common/Logo/Logo';
import { Center, Panel, Screen, TopBar } from './AuthLayout.styles';

/** Minimal shell for the auth screens: brand + language toggle above a centered card. */
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
