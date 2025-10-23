# Estratégia GitFlow

Este projeto utiliza a estratégia GitFlow para gerenciamento de branches e versionamento. Abaixo estão as diretrizes para contribuir com o projeto seguindo este padrão.

## Branches Principais

- **main**: Contém o código em produção. Cada merge nesta branch representa uma nova versão de produção.
- **develop**: Branch de desenvolvimento onde as features são integradas antes de irem para produção.

## Branches de Suporte

- **feature/**: Para desenvolvimento de novas funcionalidades
  - Exemplo: `feature/dark-mode`, `feature/form-validation`
  - Criada a partir de: `develop`
  - Merge para: `develop`

- **release/**: Para preparação de uma nova versão de produção
  - Exemplo: `release/1.0.0`, `release/2.1.0`
  - Criada a partir de: `develop`
  - Merge para: `main` e `develop`

- **hotfix/**: Para correções urgentes em produção
  - Exemplo: `hotfix/login-bug`, `hotfix/security-issue`
  - Criada a partir de: `main`
  - Merge para: `main` e `develop`

## Fluxo de Trabalho

### Desenvolvimento de Nova Funcionalidade

1. Crie uma branch a partir de `develop`:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/nome-da-feature
   ```

2. Desenvolva a funcionalidade com commits semânticos

3. Quando finalizar, faça merge para `develop`:
   ```bash
   git checkout develop
   git pull origin develop
   git merge --no-ff feature/nome-da-feature
   git push origin develop
   ```

### Preparação de Release

1. Crie uma branch de release a partir de `develop`:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b release/X.Y.Z
   ```

2. Faça ajustes finais, correções de bugs e atualize a versão

3. Finalize a release:
   ```bash
   git checkout main
   git pull origin main
   git merge --no-ff release/X.Y.Z
   git tag -a vX.Y.Z -m "Versão X.Y.Z"
   git push origin main --tags
   
   git checkout develop
   git pull origin develop
   git merge --no-ff release/X.Y.Z
   git push origin develop
   ```

### Correção Urgente (Hotfix)

1. Crie uma branch de hotfix a partir de `main`:
   ```bash
   git checkout main
   git pull origin main
   git checkout -b hotfix/descricao-do-problema
   ```

2. Faça a correção e atualize a versão (incrementando o patch)

3. Finalize o hotfix:
   ```bash
   git checkout main
   git pull origin main
   git merge --no-ff hotfix/descricao-do-problema
   git tag -a vX.Y.Z+1 -m "Versão X.Y.Z+1"
   git push origin main --tags
   
   git checkout develop
   git pull origin develop
   git merge --no-ff hotfix/descricao-do-problema
   git push origin develop
   ```

## Comandos Úteis

- Listar todas as branches:
  ```bash
  git branch -a
  ```

- Ver histórico de commits:
  ```bash
  git log --oneline --graph --decorate
  ```

- Ver tags:
  ```bash
  git tag
  ```