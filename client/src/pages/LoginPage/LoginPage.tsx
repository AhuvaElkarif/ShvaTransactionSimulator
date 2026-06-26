import { AuthForm } from '../../components/auth/AuthForm/AuthForm';
import { AuthLayout } from '../../components/layout/AuthLayout/AuthLayout';

/** Login route. */
export const LoginPage = () => (
  <AuthLayout>
    <AuthForm mode="login" />
  </AuthLayout>
);
