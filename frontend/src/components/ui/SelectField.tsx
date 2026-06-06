const selectClass =
  'rounded border border-app-border bg-app-surface px-3 py-2 text-sm text-app-text outline-none focus:border-neutral-500'

interface SelectFieldProps {
  label?: string
  value: string
  onChange: (value: string) => void
  children: React.ReactNode
}

export function SelectField({ label, value, onChange, children }: SelectFieldProps) {
  return (
    <label className="flex flex-col gap-1 text-left">
      {label && <span className="text-sm text-app-muted">{label}</span>}
      <select value={value} onChange={(e) => onChange(e.target.value)} className={selectClass}>
        {children}
      </select>
    </label>
  )
}

export { selectClass }
