# Aetheris Crônicas — versão 2

Seu espaço para construir mundos, escrever histórias e reunir uma mesa. Interface em violeta, azul-noturno e marfim, com ilustrações dos livros de Aetheris.

## O que mudou

- **Acervo privado para cada conta:** personagens, escrita, lore, NPCs, cidades, mapas e árvores genealógicas. Todos têm acesso às ferramentas de criação.
- **Campanhas por convite:** qualquer usuário pode criar uma campanha, convidar participantes e compartilhar registros. Entrar em uma campanha não revela o acervo pessoal.
- **Editor visual com 30 fontes incorporadas**, tamanho, negrito, itálico, sublinhado, tachado, cores, marca-texto, alinhamento, entrelinhas, listas, tabelas, desfazer/refazer, modo foco e impressão/PDF.
- Novo nome **Aetheris Crônicas** e nova identidade visual.
- Link de fichas pré-configurado: https://aetherissistema2.onrender.com.

## Atualizar seu site atual no GitHub e Render

1. Faça backup do banco Turso antes de atualizar. O backup JSON da aplicação é útil para conteúdo, mas não substitui o backup do banco com contas e campanhas.
2. Extraia este ZIP. Envie **o conteúdo da pasta Aetheris-Cronicas** para a mesma raiz do repositório, substituindo os arquivos existentes. Não envie o próprio ZIP nem crie uma pasta adicional dentro do projeto.
3. Atualize especialmente `package.json`, `package-lock.json`, `src/`, `server/`, `app/globals.css`, `components/ui/sidebar.tsx` e `index.html`. O pacote completo contém menos de 100 arquivos para facilitar o envio pelo navegador.
4. Preserve as variáveis já configuradas no Render e o **mesmo banco Turso**. Não é necessário criar outro mestre.
5. No Render: Root Directory vazio (se `package.json` estiver na raiz), Build Command `npm ci --include=dev && npm run build`, Start Command `npm start`.
6. Execute Deploy latest commit. Se necessário, recarregue a página após o deploy.

O servidor cria as tabelas de campanhas e acrescenta o vínculo de campanha aos registros existentes. Textos, contas e imagens são preservados. Conteúdo que antes tinha liberação global fica inacessível para outras contas até você selecionar uma campanha e compartilhar novamente. Notas antigas do mestre em registros pertencentes a jogadores são preservadas em páginas privadas separadas do mestre, sem expô-las ao autor do personagem.

Esta atualização não muda as tabelas do FichaAetheris nem exige apagar o banco. Componentes antigos sem uso podem permanecer no repositório; não interferem na execução.

## Campanhas e privacidade

Cada pessoa pode criar, editar, ilustrar, excluir e exportar seus próprios registros de qualquer categoria. O administrador da instalação não recebe acesso automático ao conteúdo pessoal de outras contas pela aplicação. Ele continua responsável por criar contas, redefinir senhas e configurar a integração. A proteção é de acesso na aplicação, não criptografia ponta a ponta: o operador com acesso direto ao banco continua tendo acesso técnico aos dados.

Para reunir a mesa:

1. Abra **Campanhas → Criar campanha** e informe nome e premissa.
2. Selecione **Gerar convite** e envie o código ao participante por um meio de sua escolha.
3. Quem já tem conta usa **Campanhas → Aceitar convite**. Quem ainda não tem usa **Tenho um convite** na tela de entrada para criar a conta.
4. Convites duram sete dias e podem ser usados por mais de uma pessoa. Gerar outro invalida o anterior. Revogar impede novas entradas, sem expulsar membros atuais.
5. O criador pode remover participantes. Os participantes podem sair. A remoção corta o acesso à campanha na próxima solicitação.

Para compartilhar uma página, abra o registro, escolha a **Campanha** e depois **Toda a campanha** ou **Participantes selecionados**, e salve. Um registro pertence a uma campanha por vez. Em **Somente eu**, apenas o autor vê, mesmo com campanha selecionada. O autor continua sendo o único editor. Entrar na campanha não torna outros participantes coautores.

As **Notas privadas**, marcadores secretos e pessoas ocultas na árvore não são enviados aos outros participantes. Os livros de referência completos e os 52 resumos iniciais permanecem no acervo do administrador; os resumos podem ser compartilhados em campanhas. A biblioteca completa fica restrita por conter todos os segredos do universo.

O conteúdo publicado por um participante permanece compartilhado até o autor alterar sua visibilidade, mesmo se o autor sair da campanha. Remover um membro impede esse membro de consultar páginas de outros autores; não apaga o acervo de ninguém.

## Escrever

Abra qualquer registro → **Escrever**. Selecione um trecho e use a barra de ferramentas. A formatação é salva junto do texto; o campo textual simples continua disponível para busca. Textos antigos são convertidos visualmente ao abrir o editor e permanecem no banco até salvar.

As 30 fontes são distribuídas com as dependências Fontsource, carregadas do próprio site após o build. Não dependem do Google Fonts nem da instalação de fontes no dispositivo. O conjunto Latin inclui os acentos usados em português. Negrito e itálico podem ser sintetizados pelo navegador quando a família não inclui aquele arquivo de estilo neste pacote.

Salve pelo botão ou **Ctrl/⌘ + S**. Não há salvamento automático. A aplicação avisa sobre texto pendente ao sair e evita que uma janela sobrescreva uma versão mais recente de outra.

O botão de impressora abre a impressão do navegador, onde é possível salvar como PDF. A interface é inspirada em editores como Word; não inclui importação/exportação DOCX, revisão com comentários, paginação automática no editor ou edição simultânea entre usuários.

Fontes disponíveis: Roboto, Open Sans, Lato, Montserrat, Raleway, Oswald, Lora, Merriweather, Playfair Display, Cormorant Garamond, Cinzel, EB Garamond, Crimson Pro, Literata, Source Serif 4, Nunito, Quicksand, Josefin Sans, Work Sans, DM Sans, Manrope, Space Grotesk, Source Code Pro, Fira Code, JetBrains Mono, Caveat, Dancing Script, Shantell Sans, Bitter e Abril Fatface.

## Instalação nova e execução local

Requer Node.js 22.13 ou superior:

```sh
npm ci
npm run dev
```

Abra http://localhost:3000. Na primeira execução, copie a chave de instalação exibida no terminal e crie o administrador. Senhas exigem pelo menos 12 caracteres. Não há contas ou credenciais prontas no pacote.

Sem Turso, o banco fica em `data/aetheris.db`. Preserve a pasta. Para configurar o ambiente, copie `.env.example` para `.env`. Nunca envie `.env`, `data` ou `node_modules` ao GitHub.

## Render e Turso

Use repositório privado: os arquivos incluem os livros e a lore completa. GitHub Pages não executa este servidor; crie um Web Service Node no Render.

| Campo | Valor |
| --- | --- |
| Root Directory | Vazio se `package.json` estiver na raiz |
| Build Command | `npm ci --include=dev && npm run build` |
| Start Command | `npm start` |
| Health Check | `/api/health` |

| Variável | Valor |
| --- | --- |
| `NODE_VERSION` | `22.22.0` ou outra versão compatível |
| `NODE_ENV` | `production` |
| `TURSO_DATABASE_URL` | URL do banco da lore |
| `TURSO_AUTH_TOKEN` | Token de leitura e escrita desse banco |
| `SETUP_KEY` | Chave aleatória com pelo menos 24 caracteres, para primeira instalação |
| `APP_ORIGIN` | Endereço HTTPS exato de Crônicas, sem barra final; não é o site de fichas |
| `TRUST_PROXY` | `1` |
| `COOKIE_SECURE` | `true` |

No Render, configure o Turso: o disco local do serviço não é persistente por padrão. As tabelas da aplicação usam o prefixo `lore_`. O arquivo `render.yaml` também permite instalação nova via Blueprint, no plano gratuito. Para atualizar o serviço existente, mantenha o serviço e as variáveis atuais.

## Fichas técnicas

O botão usa https://aetherissistema2.onrender.com. Uma configuração salva anteriormente pelo administrador prevalece sobre esse padrão e pode ser alterada na Administração. Cada personagem pode ter um ID e um link de ficha próprio. As contas dos dois sites continuam independentes.

A importação opcional pelo administrador usa `FICHA_DATABASE_URL` e `FICHA_AUTH_TOKEN` no servidor, preferencialmente com token somente de leitura. Lê nome, jogador, raça, região, profissão, nível e versão no formato do repositório `DaviCnd/FichaAetheris`. Não altera o banco do site de fichas. Registros importados pertencem a quem importou e precisam ser compartilhados explicitamente. Não há sincronização automática nem login único. O link funciona sem configurar a importação.

## Backups e limites

Todas as contas têm **Conta & backup → Meu backup**; o administrador encontra a aba na Administração. O JSON inclui somente registros próprios e imagens desses registros, inclusive notas privadas. Não inclui contas, senhas, sessões ou campanhas. Para restauração integral, use o backup do banco Turso.

A importação adiciona apenas páginas ausentes, privadas e sem vínculo de campanha. Não sobrescreve páginas existentes nem importa sobre IDs pertencentes a outra conta. Limites: 45 MB de JSON, 5.000 registros, 500 imagens. Imagens enviadas na interface: PNG, JPEG ou WebP de até 5 MB.

## Verificação

```sh
npm run typecheck
npm test
npm run build
```

Testes cobrem acervos isolados, categorias, campanhas, convites, revogação, notas privadas, imagens, sanitização do editor, concorrência e migração da versão anterior. Não foram usadas suas credenciais reais do Turso nos testes locais.

## Conteúdo e créditos

Os 52 registros iniciais são resumos editáveis dos livros fornecidos, com referência de página; consulte o original para detalhes. As ilustrações são recortes do Livro de Lore, usados conforme autorização para a mesa. O Livro de Lore incluído é uma cópia visual otimizada de 61 páginas; os originais não foram alterados. A genealogia de Nyx não presume paternidade não confirmada.

Fontes abertas distribuídas pelos pacotes Fontsource, com licenças nos respectivos pacotes. Interface usa React, Tiptap e componentes shadcn; servidor Express e libSQL/Turso.

Referências: [Tiptap React](https://tiptap.dev/docs/editor/getting-started/install/react), [Fontsource](https://fontsource.org/docs/getting-started/install), [Express no Render](https://render.com/docs/deploy-node-express-app).
