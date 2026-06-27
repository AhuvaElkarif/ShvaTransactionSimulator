import { AuthForm } from '../../components/auth/AuthForm/AuthForm';
import { AuthLayout } from '../../components/layout/AuthLayout/AuthLayout';

export const LoginPage = () => (
  <AuthLayout>
    <AuthForm mode="login" />
  </AuthLayout>
);
