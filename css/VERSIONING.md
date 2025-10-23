# Versionamento Semântico (SemVer)

Este projeto segue o padrão de Versionamento Semântico 2.0.0 (SemVer).

## Formato da Versão

```
X.Y.Z
```

Onde:
- **X** = Versão Maior (Major)
- **Y** = Versão Menor (Minor)
- **Z** = Correção (Patch)

## Regras

1. **Versão Maior (X)**: Incrementada quando há mudanças incompatíveis com versões anteriores
2. **Versão Menor (Y)**: Incrementada quando há adição de funcionalidades compatíveis com versões anteriores
3. **Correção (Z)**: Incrementada quando há correções de bugs compatíveis com versões anteriores

## Exemplos

- **1.0.0**: Primeira versão estável
- **1.1.0**: Adição de nova funcionalidade (modo escuro)
- **1.1.1**: Correção de bug no modo escuro
- **2.0.0**: Mudança na API que quebra compatibilidade

## Pré-lançamentos

Para versões em desenvolvimento ou testes:

```
X.Y.Z-alfa.N
X.Y.Z-beta.N
X.Y.Z-rc.N
```

Onde:
- **alfa**: Versão inicial, instável, para testes internos
- **beta**: Versão para testes externos, com funcionalidades completas mas possíveis bugs
- **rc**: Release Candidate, versão candidata a lançamento final
- **N**: Número sequencial (1, 2, 3...)

## Processo de Versionamento

### Início do Projeto
- Comece com a versão **0.1.0** durante o desenvolvimento inicial

### Primeira Versão Estável
- Lance como **1.0.0** quando o produto estiver pronto para produção

### Novas Funcionalidades
- Incremente a versão menor (Y): **1.1.0**, **1.2.0**, etc.

### Correções de Bugs
- Incremente a correção (Z): **1.0.1**, **1.0.2**, etc.

### Mudanças Incompatíveis
- Incremente a versão maior (X): **2.0.0**, **3.0.0**, etc.

## Tags Git

As versões são marcadas no Git usando tags:

```bash
git tag -a v1.0.0 -m "Versão 1.0.0"
git push origin v1.0.0
```

## Changelog

Cada versão deve ser documentada no arquivo CHANGELOG.md, detalhando:
- Novas funcionalidades
- Correções de bugs
- Mudanças incompatíveis
- Depreciações

## Exemplo de Ciclo de Vida

1. Desenvolvimento inicial: **0.1.0** → **0.2.0** → **0.9.0**
2. Versão beta: **1.0.0-beta.1** → **1.0.0-beta.2**
3. Release candidate: **1.0.0-rc.1**
4. Lançamento: **1.0.0**
5. Correção de bug: **1.0.1**
6. Nova funcionalidade: **1.1.0**
7. Grande atualização incompatível: **2.0.0**