export const ROUTES = {
  ADMIN: { label: 'Admin', path: '/admin' },
  ADMIN_DETAILS: { label: null, path: '/admin/:id' },
  ACCOUNT: { label: 'Account', path: '/account' },
  HOME: { label: 'Home', path: '/' },
  PASSWORD_FORGET: {
    label: 'Forgot Password?',
    path: '/account/password-forget'
  },
  SIGN_IN: { label: 'Sign In', path: '/account/sign-in' },
  SIGN_UP: { label: 'Sign Up', path: '/account/sign-up' }
};
