import { useState } from 'react';
import type { FormEvent } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { login as loginApi, signup as signupApi } from '../../../api/auth';
import { getApiErrorMessage } from '../../../api/errors';
import { useAuth } from '../../../hooks/useAuth';
import type { AuthCredentials } from '../../../types/auth';
import { Button } from '../../common/Button/Button';
import { Card } from '../../common/Card/Card';
import { TextField } from '../../common/TextField/TextField';
import { ErrorText, Form, Subtitle, SwitchLink, SwitchRow, Title } from './AuthForm.styles';

type AuthMode = 'login' | 'signup';

/** Shared login/signup form. On success it stores the session and routes to the simulator. */
export const AuthForm = ({ mode }: { mode: AuthMode }) => {
  const isLogin = mode === 'login';
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setSession } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const mutation = useMutation({
    mutationFn: (credentials: AuthCredentials) =>
      isLogin ? loginApi(credentials) : signupApi(credentials),
    onSuccess: (response) => {
      setSession(response);
      navigate('/', { replace: true });
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate({ email, password });
  };

  return (
    <Card>
      <Form onSubmit={handleSubmit} noValidate>
        <div>
          <Title>{t(isLogin ? 'auth.loginTitle' : 'auth.signupTitle')}</Title>
          <Subtitle>{t(isLogin ? 'auth.loginSubtitle' : 'auth.signupSubtitle')}</Subtitle>
        </div>

        <TextField
          label={t('auth.email')}
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <TextField
          label={t('auth.password')}
          type="password"
          autoComplete={isLogin ? 'current-password' : 'new-password'}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        {mutation.isError && (
          <ErrorText>{getApiErrorMessage(mutation.error, t('common.error'))}</ErrorText>
        )}

        <Button type="submit" fullWidth isLoading={mutation.isPending}>
          {mutation.isPending ? t('auth.working') : t(isLogin ? 'auth.loginButton' : 'auth.signupButton')}
        </Button>

        <SwitchRow>
          {t(isLogin ? 'auth.noAccount' : 'auth.haveAccount')}{' '}
          <SwitchLink to={isLogin ? '/signup' : '/login'}>
            {t(isLogin ? 'nav.signup' : 'nav.login')}
          </SwitchLink>
        </SwitchRow>
      </Form>
    </Card>
  );
};
