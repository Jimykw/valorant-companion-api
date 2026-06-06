const ROLE_LABELS: Record<string, string> = {
  initiator: 'Iniciador',
  duelist: 'Duelista',
  controller: 'Controlador',
  sentinel: 'Sentinela',
}

const WEAPON_CATEGORY_LABELS: Record<string, string> = {
  heavy: 'Arma pesada',
  rifle: 'Rifle',
  smg: 'Submetralhadora',
  shotgun: 'Escopeta',
  sidearm: 'Pistola',
  sniper: 'Precisão',
  melee: 'Corpo a corpo',
}

function normalizeKey(value: string): string {
  const raw = value.includes('::') ? value.split('::').pop()! : value
  return raw.trim().toLowerCase()
}

export function translateRole(role: string | null | undefined): string {
  if (!role) return ''
  return ROLE_LABELS[normalizeKey(role)] ?? role
}

export function translateWeaponCategory(category: string | null | undefined): string {
  if (!category) return ''
  return WEAPON_CATEGORY_LABELS[normalizeKey(category)] ?? category
}
