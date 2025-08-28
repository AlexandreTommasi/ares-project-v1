import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { MainLayout } from '@/shared/components/layouts/MainLayout';

// Lazy loading das páginas para code splitting
const HomePage = lazy(() => import('@/pages/HomePage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

const AppLoading = () => <div>Carregando...</div>;

/**
 * Componente que define as rotas da aplicação.
 * Utiliza um layout principal que pode ser compartilhado entre as páginas.
 */
export const AppRoutes = () => {
  return (
    <MainLayout>
      <Suspense fallback={<AppLoading />}>
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* Rota para página não encontrada */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </MainLayout>
  );
};
