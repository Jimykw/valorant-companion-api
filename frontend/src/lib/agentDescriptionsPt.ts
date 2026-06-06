/** Descrições em português (origem: lore oficial resumida). */
const AGENT_DESCRIPTIONS_PT: Record<string, string> = {
  'e370fa57-4757-3604-3648-499e1f642d3f':
    'Gekko lidera uma equipe de criaturas caóticas que avançam pelo mapa, dispersam inimigos e voltam para repetir o ataque.',
  'dade69b4-4f5a-8528-247b-219e5a1facd6':
    'Fade, caçadora de recompensas turca, usa pesadelos para expor segredos inimigos e eliminar alvos na escuridão.',
  '5f8d3a7f-467b-97f3-062c-13acf203c006':
    'Breach dispara explosões cinéticas precisas para abrir caminho pelo campo inimigo com força bruta.',
  'cc8b64c8-4b25-4ff9-6e7f-37b4da43d235':
    'Deadlock usa nanofios de ponta para fechar rotas, prender adversários e defender posições-chave.',
  'b444168c-4e35-8076-db47-ef9bf368f384':
    'Tejo, consultor colombiano, guia ataques balísticos que forçam o time rival a ceder terreno.',
  'f94c3b30-42be-e959-889c-5aa313dba261':
    'Raze, do Brasil, combina personalidade explosiva e armamento pesado para limpar ângulos fechados.',
  '22697a3d-45bf-8dd7-4fec-84a9e28c69d7':
    'Chamber, designer francês, elimina ameaças com precisão usando armas e armadilhas estratégicas.',
  '601dbbe7-43ce-be57-2a40-4abd24953621':
    'KAY/O é uma máquina de combate criada para neutralizar Radiantes e suprimir habilidades inimigas.',
  '6f2a04ca-43e0-be17-7f36-b3908627744d':
    'Skye, da Austrália, avança com criaturas que curam aliados, revelam inimigos e abrem espaço no mapa.',
  '117ed9e3-49f3-6512-3ccf-0cada7e3823b':
    'Cypher, informante marroquino, monta uma rede de vigilância que expõe cada movimento adversário.',
  '320b2a48-4d9b-a075-30f1-1f93a9b638fa':
    'Sova, da Rússia, rastreia, localiza e elimina inimigos com eficiência e precisão de arco.',
  '7c8a4701-4de6-9355-b254-e09bc2a34b72':
    'Miks canaliza energia sonora para controlar o ritmo da partida e dominar o campo de batalha.',
  '1e58de9c-4950-5125-93e9-a0aee9f98746':
    'Killjoy, alemã, trava posições com drones, torretas e armadilhas que punem avanços inimigos.',
  '95b78ed7-4637-86d9-7e41-71ba8c293152':
    'Harbor, da Índia, comanda água e tecnologia antiga para bloquear rotas e proteger o time.',
  'efba5359-4016-a1e5-7626-b1ae76895940':
    'Vyse manipula metal líquido para isolar, prender e desarmar oponentes com astúcia.',
  '707eab51-4836-f488-046a-cda6bf494859':
    'Viper espalha venenos e barreiras químicas para controlar o mapa e sufocar o time rival.',
  'eb93336a-449b-9c1b-0a54-a891f7921d69':
    'Phoenix, do Reino Unido, incendeia o campo com fogo curativo e habilidades agressivas de duelo.',
  '92eeef5d-43b5-1d4a-8d03-b3927a09034b':
    'Veto, do Senegal, anula habilidades inimigas e impõe combate corpo a corpo desleal.',
  '41fb69c1-4189-7b37-f117-bcaf1e96f1bf':
    'Astra, de Gana, molda o campo com energia cósmica e controle global do mapa.',
  '9f0d8ba9-4140-b941-57d3-a7ad57c6b417':
    'Brimstone coordena ataques orbitais e utilitários de área para dar vantagem tática ao esquadrão.',
  '0e38b510-41a8-5780-5e8f-568b2a4f2d6c':
    'Iso entra em estado de fluxo e transforma energia ambiente em tiros letais e duelos decisivos.',
  '1dbf2edd-4729-0984-3115-daa5eed44993':
    'Clove, escocesa, provoca caos no combate e continua influenciando a rodada mesmo após cair.',
  'bb2a4828-46eb-8cd1-e765-15848195d751':
    'Neon, filipina, avança em alta velocidade e descarrega raios bioelétricos sobre os inimigos.',
  '7f94d92c-4234-0a36-9646-3a87eb8b5c89':
    'Yoru abre fendas na realidade para flanquear, enganar e surpreender adversários desprevenidos.',
  'df1cb487-4902-002e-5c17-d28e83e78588':
    'Waylay, da Tailândia, move-se como luz pura para atacar rápido e desorientar o time inimigo.',
  '569fdd95-4d10-43ab-ca70-79becc718b46':
    'Sage, da China, cura aliados, ressuscita queda e cria barreiras que seguram avanços.',
  'a3bfb853-43b2-7238-a4f1-ad90e9e46bcc':
    'Reyna, do México, domina duelos individuais e fica mais forte a cada eliminação.',
  '8e253930-4c05-31dd-1b6c-968525494517':
    'Omen, espectro das sombras, cega inimigos, se teletransporta e semeia paranoia no mapa.',
  'add6443a-41bd-e414-f6ad-e58d267f4e95':
    'Jett, da Coreia do Sul, usa mobilidade extrema para entrar, eliminar e sair de combates arriscados.',
}

export function getAgentDescriptionPt(uuid: string, fallback: string): string {
  return AGENT_DESCRIPTIONS_PT[uuid] ?? fallback
}
