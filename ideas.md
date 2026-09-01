# Direção de design — Agenda de Tarefas

## Referência como especificação visual

As três imagens fornecidas são a referência visual principal: uma agenda de tarefas compacta, centrada e objetiva, com cabeçalho mínimo, lista de tarefas, modal de criação, estado vazio e equivalência entre temas claro e escuro. A nova implementação deve preservar essa proposta, mas corrigir o desalinhamento percebido durante a alternância de tema e elevar contraste, áreas de toque, feedback de ação e responsividade.

## Abordagem escolhida: Minimalismo funcional com contraste calmo

**Movimento de design.** Minimalismo funcional contemporâneo, inspirado em ferramentas de produtividade pessoais: informação essencial, superfícies leves e uma cor de ação consistente.

**Princípios centrais.** A interface deve manter a atenção na tarefa; usar uma coluna de leitura estável em todos os temas; tornar cada ação explícita por texto, ícone e estado; e reservar contraste alto para conteúdo e ações que exigem decisão.

**Filosofia de cor.** O violeta de ação cria continuidade com a referência e identifica interações primárias, conclusão e foco. O tema claro usa fundo de papel frio e texto grafite para reduzir ofuscamento; o tema escuro usa ardósia profunda e superfícies elevadas para evitar cinzas lavados e preservar legibilidade. Em nenhum modo a mudança de tema pode alterar a geometria do layout.

**Paradigma de layout.** Uma área de trabalho vertical de largura controlada, ancorada por uma faixa de progresso e por controles de busca. A lista é organizada como uma sequência editorial com linhas de separação, e o botão flutuante permanece em uma âncora de canto segura, independente da rolagem.

**Elementos de assinatura.** Um arco/progresso violeta no cabeçalho; caixas de conclusão com contorno quadrado suavemente arredondado; e um botão flutuante circular com sombra violeta. O estado vazio terá uma ilustração geométrica própria em violeta e azul-marinho, sem texto incorporado na imagem.

**Filosofia de interação.** Ações frequentes devem responder de imediato: concluir atualiza o contador, editar abre um diálogo com o texto pré-preenchido e excluir pede confirmação com opção de desfazer. A navegação por teclado é equivalente ao uso por toque e mouse.

**Animação.** Entradas e saídas de diálogos usam opacidade e escala discreta (0,96 a 1) em até 220 ms. Ações de lista usam somente transições curtas de cor, opacidade e transformação. Usuários com redução de movimento recebem interface estática.

**Sistema tipográfico.** `Manrope` para interface, em tamanhos confortáveis e pesos 500–800; `DM Mono` apenas para pequenos números e marcadores de progresso. Títulos são firmes, rótulos claros e o texto de tarefa prioriza 16 px em telas menores.

**Essência da marca.** Uma agenda pessoal direta para quem quer transformar intenções em tarefas concluídas sem distração. Personalidade: serena, precisa e encorajadora.

**Voz da marca.** Clara e acolhedora, sem jargões ou chamadas genéricas. Exemplos: “Qual é a próxima tarefa importante?” e “Tudo em dia por aqui.”

**Logotipo e marca.** Um símbolo de três traços de checklist formando uma página aberta, usado sem texto no cabeçalho e como favicon, acompanhado por um wordmark desenhado com a tipografia Manrope.

**Cor de assinatura.** Violeta Agenda — `#6F4BD8`.

## Decisões guiadas pelos feedbacks

| Sinal dos avaliadores | Decisão de implementação |
| --- | --- |
| A simplicidade, organização e legibilidade foram bem avaliadas | Preservar hierarquia enxuta, uma única coluna e controles familiares. |
| Houve deslocamento visual na troca de temas | Usar as mesmas medidas, bordas e estrutura nos dois temas; apenas os tokens de cor variam. |
| Foi solicitado mais cuidado com contraste no modo escuro | Garantir texto principal claro, superfícies distintas e contornos de foco violetas visíveis. |
| Botões, ícones, operações e responsividade foram apontados como áreas a cuidar | Ampliar alvos interativos, incluir rótulos acessíveis, confirmação de exclusão, toast de ação e comportamento adaptado a telas pequenas. |
