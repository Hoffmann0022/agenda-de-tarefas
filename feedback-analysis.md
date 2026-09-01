# Análise de feedbacks e especificação — Agenda de Tarefas

> **Base da análise:** há um único formulário de avaliação. Repetições de um mesmo ponto em campos diferentes foram tratadas como uma observação do mesmo avaliador, e não como opiniões de pessoas distintas.

## 1. Resumo geral dos feedbacks

A avaliação aponta uma experiência já sólida: aparência, entendimento, organização, cores, legibilidade, botões, ícones e fluxos principais receberam nota **4/4**. O avaliador descreveu o produto como minimalista, simples e acessível, especialmente para pessoas idosas. O principal problema recorrente é técnico-visual: a alternância entre temas claro e escuro desloca elementos da interface. Também foi solicitado mais cuidado com o contraste no modo escuro. Assim, a evolução deve ser incremental: preservar a simplicidade da proposta original e corrigir estabilidade visual, contraste, responsividade e feedback das ações.

## 2. Pontos positivos que devem ser mantidos

| Elemento positivo | Evidência do feedback | Decisão |
| --- | --- | --- |
| Interface minimalista | A primeira impressão destacou poucas informações competindo entre si. | Manter uma única coluna de tarefas e controles essenciais. |
| Compreensão dos fluxos | Facilidade de uso geral e operações principais avaliadas em 4/4. | Preservar os padrões de busca, filtro, checkbox e botão flutuante. |
| Organização e legibilidade | Organização visual, cores e tamanho de textos avaliados em 4/4. | Manter hierarquia curta, texto direto e boa separação entre tarefas. |
| Modal de nova tarefa | Clareza do modal e posição dos botões foram consideradas boas. | Preservar o fluxo modal com ações de cancelar e confirmar. |
| Estado vazio | Mensagem e ilustração foram consideradas claras e adequadas. | Manter um estado vazio ilustrado, agora com variações para filtro e busca. |

## 3. Problemas identificados

| Problema | Menções de usuários | Impacto na experiência | Melhoria definida |
| --- | ---: | --- | --- |
| Deslocamento de elementos ao alternar o tema | 1 avaliador, citado em 2 respostas | A troca de tema parece instável e diminui a percepção de qualidade. | Temas devem mudar somente tokens de cor; dimensões, bordas, espaçamentos e tipografia serão idênticos. |
| Contraste potencialmente insuficiente no modo escuro | 1 avaliador | Pode reduzir legibilidade de textos, ícones e contornos. | Aplicar superfícies de ardósia distintas, texto claro de alto contraste, bordas perceptíveis e foco violeta. |
| Áreas de atenção em botões, ícones e ações | 1 avaliador assinalou essas áreas como melhorias, embora as tenha avaliado como fáceis | Há oportunidade de tornar ações mais seguras e evidentes em diferentes dispositivos. | Garantir alvos de 44 px, rótulos acessíveis, tooltips e confirmação antes de excluir. |
| Responsividade como área de melhoria | 1 avaliador | Risco de controles comprimidos e ações difíceis de tocar em telas pequenas. | Reorganizar busca e filtro, preservar o botão flutuante e evitar rolagem horizontal. |

## 4. Melhorias de prioridade alta

| Melhoria | Justificativa | Critério de aceite |
| --- | --- | --- |
| Estabilizar a troca de tema | É o único defeito relatado explicitamente. | Alternar o tema não altera posição, largura, altura ou espaçamento de qualquer componente. |
| Reforçar contraste do modo escuro | O avaliador recomendou cuidado específico. | Texto, bordas, ícones, campos e estados de foco permanecem legíveis no fundo escuro. |
| Garantir ações essenciais em todos os tamanhos de tela | As funcionalidades existentes devem ser mantidas. | Adicionar, editar, concluir, pesquisar, filtrar e excluir funcionam com mouse, toque e teclado. |

## 5. Melhorias de prioridade média

| Melhoria | Justificativa | Comportamento esperado |
| --- | --- | --- |
| Confirmação de exclusão e desfazer | Reduz o risco de remoção acidental e torna uma ação crítica mais segura. | Excluir pede confirmação; após confirmar, uma mensagem permite desfazer temporariamente. |
| Persistência local | Evita perda da organização durante recarga do navegador. | Lista e preferência de tema são recuperadas automaticamente no mesmo navegador. |
| Contador e progresso | Reforça o retorno visual da conclusão sem poluir a lista. | O cabeçalho indica itens concluídos e total, atualizando ao marcar/desmarcar. |
| Mensagens de sucesso e validação | Melhora a percepção de resposta do sistema. | Adição, edição, conclusão e exclusão exibem feedback; campo vazio é explicado. |

## 6. Melhorias de prioridade baixa

| Melhoria | Justificativa | Decisão |
| --- | --- | --- |
| Atalho para abrir nova tarefa | Acelera o uso recorrente, mas não é necessário para entender a interface. | Tecla `N` abre a nova tarefa quando o foco não estiver em campo de texto. |
| Variações do estado vazio | Complementa a clareza já aprovada. | Ilustração e texto adequados para lista vazia, busca sem resultados e filtro de concluídas vazio. |
| Refinamento de microinterações | Melhora a sensação de qualidade sem alterar os fluxos. | Transições curtas, respeitando preferência de redução de movimento. |

## 7. Melhorias de UX/UI

A área de tarefas deve ter uma largura estável e previsível em ambos os temas. O cabeçalho organiza marca, nome, contador e alternador de tema sem competir com a lista. Busca e filtros ficam na mesma faixa em telas maiores e se empilham em telas pequenas. As linhas de tarefa terão checkbox destacado, título com boa área clicável e ações de editar/excluir sempre disponíveis. O botão flutuante recebe contraste, sombra moderada e rótulo acessível. O modal mantém os botões da proposta original, melhora o rótulo do campo e apresenta validação textual.

## 8. Melhorias funcionais

| Recurso | Regra de funcionamento |
| --- | --- |
| Adicionar | Abre diálogo, exige título não vazio e adiciona a tarefa no início da lista. |
| Editar | Abre o mesmo diálogo com o valor existente; salvar substitui o título. |
| Excluir | Abre confirmação com o nome da tarefa; confirmada a ação, exibe opção de desfazer. |
| Concluir | Checkbox altera o estado, aplica texto riscado e atualiza o progresso. |
| Pesquisa | Filtra pelo texto da tarefa enquanto o usuário digita, sem exigir botão de busca. |
| Filtro | Opções: Todas, Pendentes e Concluídas. Trabalha em conjunto com a pesquisa. |
| Tema | Alterna claro/escuro e grava a preferência localmente. |
| Persistência | As tarefas são gravadas no armazenamento local do navegador. |

## 9. Melhorias de acessibilidade

Todos os campos terão `label` associado ou rótulo visualmente oculto. Botões de ícone terão `aria-label` e tooltip explicativo. O contraste será reforçado especialmente no tema escuro. O foco por teclado será sempre visível, e os alvos interativos terão dimensões adequadas para toque. Conclusão não será comunicada apenas pela cor: checkbox marcado, texto riscado e texto auxiliar indicam o estado. Diálogos poderão ser fechados com `Esc`, preservarão o foco e oferecerão botões de ação claros.

## 10. Melhorias de responsividade

| Faixa | Regra de layout |
| --- | --- |
| Smartphones | Conteúdo ocupa a largura disponível com margens de 16 px; busca e filtro empilham; os ícones mantêm área de toque; botão flutuante não cobre conteúdo. |
| Tablets | A faixa de controles volta a ficar horizontal quando houver espaço; a coluna de tarefas conserva largura confortável. |
| Notebooks e desktop | A área de trabalho mantém largura máxima e respiro lateral amplo; o botão flutuante se mantém ancorado no canto inferior direito. |

## Especificação final pronta para implementação

### Manter

Preservar o nome **Agenda de Tarefas**, a proposta minimalista, a lista vertical, busca, filtros, tema claro/escuro, checkbox de conclusão, edição, exclusão, modal de tarefa e estado vazio ilustrado. Não remover nenhuma funcionalidade existente.

### Alterar componentes

| Componente | Alteração necessária |
| --- | --- |
| Estrutura principal | Usar largura, espaçamentos e tipografia invariáveis entre os temas. |
| Busca e filtro | Incluir rótulos acessíveis, foco perceptível e empilhamento em telas pequenas. |
| Linha de tarefa | Ampliar áreas clicáveis, adicionar tooltip a ícones, mostrar estado concluído por mais de um sinal visual. |
| Alternador de tema | Trocar apenas variáveis de cor; conservar dimensões e posição. |
| Botão flutuante | Ter tamanho mínimo de toque, `aria-label`, alto contraste e sombra coerente. |
| Modal | Reutilizar para adicionar/editar, incluir label, validação e foco inicial no campo. |
| Estado vazio | Diferenciar lista sem tarefas, filtro vazio e pesquisa sem resultado com ilustração e texto específicos. |

### Funcionalidades adicionais

Implementar persistência local, contador/progresso, confirmação de exclusão, desfazer exclusão, mensagens de sucesso/erro e atalho `N` para abrir a criação de tarefa. Não introduzir recursos de prioridades, prazos ou categorias nesta iteração, pois não foram justificados diretamente pelo feedback.

### Regras de tema

No modo claro, utilizar fundo claro levemente frio, texto grafite e violeta como ação principal. No modo escuro, utilizar fundo ardósia, cartões um pouco mais claros que o fundo e texto claro com contraste suficiente. Ambos os modos devem usar exatamente a mesma estrutura, métrica tipográfica, bordas e espaçamentos.

### Regras de responsividade e acessibilidade

Não permitir rolagem horizontal. Em qualquer largura, preservar controle total da busca, filtro, alternador e ações de cada tarefa. Todos os controles devem ser navegáveis por teclado, ter foco visível e indicação textual acessível. Botões apenas com ícone exigem rótulos para leitores de tela.

### Ordem de implementação

1. Corrigir tokens de tema, contraste e estabilidade geométrica.
2. Implementar e validar operações obrigatórias, pesquisa, filtro e persistência.
3. Adicionar confirmação/desfazer e mensagens de feedback.
4. Ajustar responsividade e navegação por teclado.
5. Refinar ilustrações, motion e contador de progresso.
