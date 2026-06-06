import type { DocParam } from '../../docs/types'

export function ParamsTable({ params }: { params: DocParam[] }) {
  return (
    <div className="overflow-x-auto rounded border border-app-border">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-app-border bg-app-surface text-app-muted">
          <tr>
            <th className="px-3 py-2 font-medium">Nome</th>
            <th className="px-3 py-2 font-medium">Tipo</th>
            <th className="px-3 py-2 font-medium">Descrição</th>
            <th className="px-3 py-2 font-medium">Padrão</th>
            <th className="px-3 py-2 font-medium">Obrigatório</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-app-border">
          {params.map((p) => (
            <tr key={p.name}>
              <td className="px-3 py-2 font-mono text-xs">{p.name}</td>
              <td className="px-3 py-2 text-app-muted">{p.type}</td>
              <td className="px-3 py-2">{p.description}</td>
              <td className="px-3 py-2 text-app-muted">{p.defaultValue ?? '—'}</td>
              <td className="px-3 py-2">{p.required ? 'sim' : 'não'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
