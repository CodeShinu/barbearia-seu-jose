# Auditoria técnica — Barbearia Seu José

Data: 11/09/2026. Auditoria local do código e do build Cloudflare, sem publicação.

## Resumo

Projeto React 19, TanStack Start/Router, Vite 8, Tailwind 4 e Framer Motion. A página é definida em `src/routes/index.tsx`; estilos em `src/styles.css`; metadados e shell em `src/routes/__root.tsx`. O build usa a configuração Lovable com Nitro e destino Cloudflare. Dados comerciais são locais; não existe backend de agendamento: os CTAs abrem WhatsApp.

Foram preservados preços, horários, telefone, mensagens, endereço, fotografias, vídeos, fontes, cores e ordem das seções. A comparação das constantes por AST não encontrou alterações comerciais. A troca anterior de “Plano” para “Plano disponível” e de “Club Seu José” para “Planos de assinatura” no destaque foi mantida, conforme solicitação anterior.

## Problemas críticos

- **Prévia de produção quebrada:** `vite preview` retornava erro 500 ao procurar `dist/server/server.js`, embora o build gere `.output/server/index.mjs`. O script foi corrigido para `nitro preview`, com Wrangler fixado como ferramenta de desenvolvimento para executar o build Cloudflare localmente.
- O build inicial já passava. O problema estava na execução da prévia, não na compilação.

## Problemas importantes

- **Menu bloqueava rolagem no desktop:** abrir o menu no celular e aumentar a largura para 1280 px mantinha `body.style.overflow = hidden`. Agora a mudança de breakpoint fecha o menu e restaura o scroll.
- **Foco do menu:** foco inicial explícito, ciclo de Tab/Shift+Tab, fechamento por Escape e retorno ao botão. Conteúdo atrás do menu fica `inert`; atalhos fixos desse conteúdo deixam de aparecer sobre o menu.
- **Conteúdo mobile:** título “Impecável” excedia a largura em 320 px; CTAs e controles do hero se sobrepunham em telas pequenas/baixas. Ajustes limitados aos breakpoints afetados, altura mínima `svh` e espaço para a navegação.
- **Acessibilidade:** idioma corrigido para `pt-BR`, landmark `main`, nome acessível do agendamento móvel, hierarquia dos títulos de endereço/horários e papel semântico das estrelas. O `aria-label` das estrelas em um `div` sem papel causava 182 ocorrências no axe.
- **Segurança:** PostCSS 8.5.3 atualizado pontualmente para 8.5.28. A instalação da ferramenta de prévia expôs dependências transitivas vulneráveis; `sharp` e `undici` foram fixados em versões corrigidas, sem atualizar o framework.
- **Link externo:** adicionado `rel="noopener noreferrer"` ao WhatsApp flutuante.

Referência do alerta PostCSS: [GitHub Advisory](https://github.com/advisories/GHSA-fxqj-rqcc-2cmp). A exposição depende de processamento de CSS não confiável; não foi encontrado esse fluxo no site. A correção protege a cadeia de ferramentas.

## Otimizações

- Lazy loading e decodificação assíncrona das imagens abaixo da dobra que ainda carregavam imediatamente; logo do cabeçalho preservado.
- Vídeo da galeria com `preload="none"` e reprodução controlada pela visibilidade. A requisição desse vídeo não acontece na entrada da página.
- Hero e galeria pausam fora da viewport, em aba oculta ou com redução de movimento.
- Vídeos de serviços mantêm a fonte após o primeiro carregamento; removido `load()` que reiniciava o vídeo a cada reentrada na viewport.
- Carrossel pausa fora da viewport, mantém os controles e passa a permitir navegação horizontal por teclado/toque.
- Listener de scroll passivo, com estado inicial sincronizado.
- O fade de entrada do hero passou a iniciar via CSS, com a mesma duração de 1 segundo, sem aguardar a hidratação JavaScript e respeitando redução de movimento.
- Nenhum asset foi comprimido, substituído ou removido. Não houve troca de biblioteca visual.

## Mobile

Matriz: larguras 320, 360, 375, 390, 412, 430, 480, 600, 768, 820, 1024, 1280, 1366, 1440, 1536 e 1920 px, em alturas de 568 e 900 px. Foram verificadas largura do documento, bordas dos elementos do hero e largura interna dos títulos, para detectar cortes mesmo quando o overflow da página está oculto.

Menu e foco também exercitados em 375×667, 390×844, 412×915, 768×1024, 667×375, 844×390 e 1024×600. Links do menu exercitados em celular, tablet e desktop. Aplicada margem de scroll nas âncoras para o cabeçalho fixo e margem inferior segura nos atalhos fixos.

Esses testes são simulações de viewport em Chromium; não equivalem a testes físicos em todos os aparelhos citados no pedido.

## Desktop

Verificação visual do hero e das assinaturas, navegação pelas sete âncoras, retorno ao topo, categorias de serviço e carrossel. Preservados os tamanhos e a composição fora das faixas com problemas comprovados.

## Links e funcionalidades

- Sete âncoras existentes: Home, Sobre, Serviços, Assinatura, Equipe, Avaliações e Contato.
- Catálogo: 3 serviços de barba, 4 de cabelo, 12 combos e 6 adicionais; total 25.
- Inventário de links inclui 41 ocorrências de WhatsApp considerando navegação, serviços e assinaturas. Conferidos país/número, mensagens decodificadas, acentos e pontuação original.
- WhatsApp respondeu HTTP 200 e redirecionou para `api.whatsapp.com/send` com o número correto. Nenhuma mensagem foi enviada.
- Instagram, Google Maps, Google Play e App Store responderam HTTP 200. Isso comprova resposta do destino, não login, instalação do app ou conclusão de agendamento.
- Mapa incorporado carregou o frame Google Maps com o endereço já existente.
- Imagens da página decodificadas; vídeos de barba, cabelo, combo e galeria carregaram. Controles de som, pausa/continuação do carrossel e redução de movimento exercitados.
- A galeria existente é uma grade de imagens/vídeo; não há lightbox a testar. Não foi adicionada nova funcionalidade.

## Performance

A otimização principal é evitar reprodução e carregamento antecipado de mídias fora da viewport, incluindo o vídeo de aproximadamente 4,3 MB da galeria. O vídeo do hero permanece preservado. Não há comparação de métricas de campo antes/depois, nem dados reais de INP de visitantes.

Primeira medição mobile no build corrigido: performance 71/100, FCP 3,5 s, LCP 4,9 s, TBT 20 ms e CLS 0. O LCP era o H1, com atraso de renderização associado à entrada controlada por JavaScript. Após mover esse mesmo fade para CSS: **performance 70/100**, FCP 3.7 s, LCP 4.9 s, TBT 10 ms, CLS 0 e Speed Index 5.6 s. São duas execuções locais isoladas, com simulação mobile e ambiente compartilhado; não constituem garantia de pontuação em produção.

## Arquivos modificados

| Arquivo | Motivo |
| --- | --- |
| `src/routes/index.tsx` | Menu/foco, mídia, carrossel, semântica, metadados da rota, links e ajustes responsivos pontuais; formatação pelo lint. |
| `src/routes/__root.tsx` | Idioma `pt-BR` e formatação requerida pelo lint. |
| `src/styles.css` | Breakpoints para cortes comprovados, margem das âncoras, carrossel acessível, menu e safe area. |
| `src/assets.d.ts` | Substituição de `any` por `unknown`. |
| `src/data/reviews.ts` | Somente formatação requerida pelo lint; conteúdo preservado. |
| `src/components/ui/button.tsx` | Somente formatação requerida pelo lint. |
| `src/components/ui/card.tsx` | Somente formatação requerida pelo lint. |
| `package.json` | Comando de prévia funcional, ferramenta Wrangler e correções pontuais de dependências. |
| `package-lock.json` | Dependências npm sincronizadas. |
| `bun.lock` | Dependências Bun sincronizadas, respeitando a regra de 24 horas. |
| `AUDITORIA-TECNICA.md` | Este relatório. |

## Testes executados

- `npm run lint`: sem erros; seis avisos `react-refresh/only-export-components` em componentes compartilhados. Não foram suprimidos nem usados como motivo para reestruturar componentes.
- `tsc --noEmit`: passou.
- `npm run build`: passou.
- `npm run preview -- --host 127.0.0.1 --port 4173`: prévia real Cloudflare via Nitro/Wrangler.
- `npm audit --json`: zero vulnerabilidades após as correções.
- `bun install --lockfile-only --ignore-scripts`: lockfile sincronizado.
- `git diff --check`: passou.
- Playwright: **96 verificações aprovadas, zero falhas**, sem erros JavaScript nem respostas HTTP >= 400 durante a rodada de produção. Cancelamentos `ERR_ABORTED` de vídeos ao trocar categorias foram registrados separadamente; os mesmos vídeos carregaram e reproduziram nos testes. Matriz responsiva, âncoras, menu, foco, scroll, categorias, mídias e controles; scripts e evidências temporários em `/tmp/barbershop-qa` e `/tmp/audit-*`.
- agent-browser: abertura, capturas e inspeção da prévia de produção.
- axe: auditoria automatizada de acessibilidade, zero violações detectadas após as correções. Isso não substitui revisão manual em leitores de tela.
- Comparação por AST: dados comerciais preservados; as 182 avaliações também foram comparadas e permaneceram idênticas.
- Após a última mudança do fade, smoke test adicional em 320, 375, 768 e 1366 px: hero visível, sem overflow nem erros JavaScript. Redução de movimento desativa a animação; o conteúdo do hero também aparece com JavaScript desativado.

## Build

**PASSOU.** Executar o build antes de iniciar a prévia. Se recompilar com Wrangler já aberto, reiniciar a prévia para atualizar o índice dos arquivos estáticos.

## Pendências e limites

- Validar em Safari/iOS, Firefox, Edge e Samsung Internet reais. Não foi alegada cobertura de navegadores/aparelhos não executados.
- Validar abertura dos apps de WhatsApp e das lojas em iPhone/Android; nenhuma conversa foi enviada ou assinatura contratada.
- Lighthouse local não substitui métricas de produção (CrUX/RUM); INP de campo indisponível. LCP local de 4,9 s permanece acima do desejável e deve ser acompanhado no domínio final. A troca do fade para CSS não mostrou melhora de LCP nestas execuções; o benefício confirmado é não depender da hidratação para revelar o conteúdo.
- Permanecem seis avisos de Fast Refresh do scaffolding compartilhado e o aviso do plugin Lovable sobre `vite-tsconfig-paths`; não são erros de produção.
- Avaliações e datas relativas são conteúdo estático fornecido anteriormente. “5 estrelas” não é uma consulta em tempo real ao Google. Não foram inventadas datas nem alteradas notas/textos nesta auditoria.
- Não há indicação “Aberto agora” simulando estado ao vivo; os horários são uma tabela estática.
- Canonical e sitemap não foram inventados: o domínio definitivo de publicação precisa ser confirmado. Robots e favicon existentes foram preservados.
- O componente compartilhado de gráfico contém `dangerouslySetInnerHTML` para CSS de configuração interna; não é importado pela página e não recebe conteúdo externo no site atual. Não foi removido.
- Não foram removidas dependências/componentes do template sem necessidade. Somente o Button compartilhado entra diretamente na página; arquivos não usados não justificaram reestruturação.
- Alterações não foram publicadas nem enviadas ao GitHub nesta auditoria.
