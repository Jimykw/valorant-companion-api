export function Spinner({ className = '' }: { className?: string }) {
  return (
    <div
      className={`mx-auto h-8 w-8 animate-spin rounded-full border-2 border-app-border border-t-neutral-400 ${className}`}
    />
  )
}
