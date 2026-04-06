import { lazy, Suspense, type ReactNode } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const AuthLayout = lazy(() => import('@/layouts/AuthLayout'));
const AppLayout = lazy(() => import('@/layouts/AppLayout'));

const SplashScreen = lazy(() => import('@/flows/splash/screens/SplashScreen'));
const WelcomeScreen = lazy(() => import('@/flows/welcome/screens/WelcomeScreen'));
const OnboardingScreen = lazy(() => import('@/flows/onboarding/screens/OnboardingScreen'));
const RegisterScreen = lazy(() => import('@/flows/register/screens/RegisterScreen'));
const LoginScreen = lazy(() => import('@/flows/login/screens/LoginScreen'));

const HomeScreen = lazy(() => import('@/flows/home/screens/HomeScreen'));
const TrackScreen = lazy(() => import('@/flows/track/screens/TrackScreen'));
const WalletScreen = lazy(() => import('@/flows/wallet/screens/WalletScreen'));
const InsightsScreen = lazy(() => import('@/flows/insights/screens/InsightsScreen'));
const ProfileScreen = lazy(() => import('@/flows/profile/screens/ProfileScreen'));

const NotificationsScreen = lazy(() => import('@/flows/notifications/screens/NotificationsScreen'));
const AllTransactionsScreen = lazy(() => import('@/flows/transactions/screens/AllTransactionsScreen'));
const TransactionDetailsScreen = lazy(() => import('@/flows/transactions/screens/TransactionDetailsScreen'));
const VoiceEntryScreen = lazy(() => import('@/flows/voice-entry/screens/VoiceEntryScreen'));
const ExpenseAddedScreen = lazy(() => import('@/flows/track/screens/ExpenseAddedScreen'));
const IncomeAddedScreen = lazy(() => import('@/flows/track/screens/IncomeAddedScreen'));

const NotFound = lazy(() => import('@/components/NotFound'));

function withSuspense(node: ReactNode) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto flex min-h-[100dvh] max-w-md items-center justify-center">
          <span className="text-sm text-gray-400">Loading…</span>
        </div>
      }
    >
      {node}
    </Suspense>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: withSuspense(<AuthLayout />),
    children: [
      { index: true, element: withSuspense(<SplashScreen />) },
      { path: 'welcome', element: withSuspense(<WelcomeScreen />) },
      { path: 'onboarding', element: withSuspense(<OnboardingScreen />) },
      { path: 'register', element: withSuspense(<RegisterScreen />) },
      { path: 'login', element: withSuspense(<LoginScreen />) },
    ],
  },
  {
    path: '/app',
    element: withSuspense(<AppLayout />),
    children: [
      { index: true, element: withSuspense(<HomeScreen />) },
      { path: 'track', element: withSuspense(<TrackScreen />) },
      { path: 'track/expense-added', element: withSuspense(<ExpenseAddedScreen />) },
      { path: 'track/income-added', element: withSuspense(<IncomeAddedScreen />) },
      { path: 'wallet', element: withSuspense(<WalletScreen />) },
      { path: 'insights', element: withSuspense(<InsightsScreen />) },
      { path: 'profile', element: withSuspense(<ProfileScreen />) },
      { path: 'notifications', element: withSuspense(<NotificationsScreen />) },
      { path: 'transactions', element: withSuspense(<AllTransactionsScreen />) },
      { path: 'transaction/:id', element: withSuspense(<TransactionDetailsScreen />) },
      { path: 'voice-entry', element: withSuspense(<VoiceEntryScreen />) },
    ],
  },
  { path: '*', element: withSuspense(<NotFound />) },
]);
