export function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="overflow-x-auto rounded border border-app-border bg-[#0a0a0a] p-3 font-mono text-xs leading-relaxed text-neutral-300">
      <code>{code}</code>
    </pre>
  )
}
