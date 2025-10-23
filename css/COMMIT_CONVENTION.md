# Convenção de Commits Semânticos

Este projeto segue a convenção de commits semânticos para manter um histórico de alterações claro e organizado.

## Formato do Commit

```
<tipo>(<escopo>): <descrição>

[corpo]

[rodapé]
```

## Tipos de Commit

- **feat**: Nova funcionalidade
- **fix**: Correção de bug
- **docs**: Alterações na documentação
- **style**: Alterações que não afetam o código (espaços, formatação, etc)
- **refactor**: Refatoração de código
- **perf**: Melhorias de performance
- **test**: Adição ou correção de testes
- **chore**: Alterações no processo de build, ferramentas, etc.
- **ci**: Alterações nos arquivos de CI/CD

## Exemplos

```
feat(acessibilidade): adiciona suporte para navegação por teclado

Implementa navegação completa por teclado em todos os componentes interativos
para atender aos requisitos WCAG 2.1 AA.

Closes #123
```

```
fix(formulário): corrige validação de CPF

Corrige expressão regular para validação de CPF que estava aceitando
formatos inválidos.
```

```
docs(readme): atualiza instruções de instalação
```

```
style(css): formata arquivos CSS
```

```
refactor(js): simplifica lógica de validação de formulários
```

## Commits Atômicos

- Cada commit deve representar uma única alteração lógica
- Evite commits com múltiplas alterações não relacionadas
- Mantenha os commits pequenos e focados

## Integração com Issues

Vincule commits a issues usando palavras-chave:

- `Fixes #123`: Corrige a issue
- `Closes #123`: Fecha a issue
- `Relates to #123`: Relacionado à issue

## Ferramentas Recomendadas

- **Commitizen**: Ferramenta CLI para criar commits formatados
- **Commitlint**: Verifica se os commits seguem a convenção

## Exemplos de Commits para Este Projeto

```
feat(dark-mode): implementa alternância de tema escuro

Adiciona botão de alternância de tema e salva preferência do usuário
no localStorage.
```

```
fix(menu): corrige comportamento do menu hambúrguer em dispositivos móveis

Resolve problema onde o menu não fechava ao clicar em um item.
```

```
docs(acessibilidade): adiciona documentação sobre recursos de acessibilidade

Detalha os recursos implementados para atender WCAG 2.1 AA.
```

```
perf(imagens): otimiza tamanho das imagens

Reduz o tamanho dos arquivos de imagem em 40% sem perda perceptível
de qualidade.
```