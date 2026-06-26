import { AuthForm } from '../../components/auth/AuthForm/AuthForm';
import { AuthLayout } from '../../components/layout/AuthLayout/AuthLayout';

/** Signup route. */
export const SignupPage = () => (
  <AuthLayout>
    <AuthForm mode="signup" />
  </AuthLayout>
);
