import { Link, NavLink, Outlet } from 'react-router-dom'
import { LogIn, LogOut } from 'lucide-react'
import { mainNav } from '../../config/navigation'
import { useAuth } from '../../contexts/AuthContext'

export function AppLayout() {
  const { user, isAuthenticated, logout } = useAuth()

  return (
    <div className="flex min-h-screen">
      <aside className="flex w-56 shrink-0 flex-col border-r border-app-border bg-app-surface">
        <div className="border-b border-app-border px-4 py-4">
          <h1 className="text-sm font-medium">Valorant Companion</h1>
        </div>

        <nav className="flex flex-1 flex-col gap-0.5 p-2">
          {mainNav.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded px-3 py-2 text-sm transition ${
                  isActive
                    ? 'bg-app-surface-hover font-medium text-app-text'
                    : 'text-app-muted hover:bg-app-surface-hover hover:text-app-text'
                }`
              }
            >
              <Icon size={16} strokeWidth={1.75} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-app-border p-3 text-sm">
          {isAuthenticated && user ? (
            <>
              <p className="truncate font-medium">{user.username}</p>
              <p className="truncate text-xs text-app-muted">{user.email}</p>
              <button
                type="button"
                onClick={logout}
                className="mt-2 flex items-center gap-1.5 text-app-muted hover:text-app-text"
              >
                <LogOut size={14} />
                Sair
              </button>
            </>
          ) : (
            <>
              <p className="text-xs text-app-muted">Visitante</p>
              <Link
                to="/login"
                className="mt-2 flex items-center gap-1.5 text-app-text hover:underline"
              >
                <LogIn size={14} />
                Entrar
              </Link>
            </>
          )}
        </div>
      </aside>

      <main className="flex flex-1 flex-col overflow-hidden bg-app-bg">
        <Outlet />
      </main>
    </div>
  )
}
