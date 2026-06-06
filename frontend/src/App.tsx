import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'
import { AuthProvider } from './contexts/AuthContext'
import { CatalogPage } from './pages/CatalogPage'
import { CompositionsPage } from './pages/CompositionsPage'
import { DashboardPage } from './pages/DashboardPage'
import { DocsPage } from './pages/DocsPage'
import { FavoritesPage } from './pages/FavoritesPage'
import { LoginPage } from './pages/LoginPage'
import { NotesPage } from './pages/NotesPage'
import { RegisterPage } from './pages/RegisterPage'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/app/catalog" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/app" element={<AppLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="catalog" element={<CatalogPage />} />
            <Route path="favorites" element={<FavoritesPage />} />
            <Route path="compositions" element={<CompositionsPage />} />
            <Route path="notes" element={<NotesPage />} />
            <Route path="docs" element={<DocsPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/app/catalog" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
