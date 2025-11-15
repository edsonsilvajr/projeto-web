# Projeto Web - Esperança Solidária

Projeto de site institucional para ONG desenvolvido com HTML5 semântico puro.

## Estrutura do Projeto

```
projeto-web/
├── index.html          # Página inicial com informações da organização
├── projetos.html       # Página de projetos sociais e como ajudar
├── cadastro.html       # Formulário de cadastro com validação
├── imagens/           # Pasta para armazenar as imagens
└── README.md          # Este arquivo
```

## Páginas Desenvolvidas

### 1. index.html

Página inicial contendo:

- Informações sobre a organização (missão, visão, valores)
- História e linha do tempo
- Conquistas e impacto social
- Estrutura da equipe
- Relatórios de transparência
- Informações de contato completas

### 2. projetos.html

Página de projetos sociais:

- Detalhamento dos projetos em andamento
- Informações sobre voluntariado
- Formas de doar
- Parcerias corporativas
- Depoimentos
- Galeria de fotos

### 3. cadastro.html

Formulário de cadastro completo com:

- Validação nativa HTML5
- Campos com tipos específicos (email, tel, date, number)
- Máscaras nos campos de CPF, telefone e CEP
- Agrupamento lógico com fieldsets
- Campos obrigatórios e opcionais
- Múltiplas opções de seleção (checkboxes e radio buttons)

## Características Técnicas

### Estrutura Semântica

- Tags HTML5 semânticas: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`
- Hierarquia correta de títulos (h1 a h6)
- Uso adequado de listas ordenadas e não ordenadas
- Tags `<figure>` e `<figcaption>` para imagens com legenda
- Tag `<address>` para informações de contato

### Formulário com Validação

O formulário em `cadastro.html` possui:

- Validação nativa com atributos HTML5: `required`, `pattern`, `min`, `max`, `minlength`, `maxlength`
- Tipos de input específicos: `email`, `tel`, `date`, `number`, `url`
- Máscaras de formatação nos placeholders para CPF, telefone e CEP
- Agrupamento lógico de campos com `<fieldset>` e `<legend>`
- Autocomplete configurado para melhor experiência do usuário

### Meta Tags e SEO

- Meta tags de charset, viewport e description
- Meta keywords para SEO
- Títulos descritivos para cada página
- Atributos alt em todas as imagens
- Links com rel="noopener" para segurança

## Como Visualizar

1. Abra qualquer arquivo HTML diretamente no navegador
2. A navegação entre páginas está funcionando através dos links no menu
3. Teste o formulário preenchendo os campos

## Entrega II - Estilização e Leiautes (CSS3)

### Sistema de Design Implementado

**Paleta de Cores:**

- Primária: Azul (#2563eb) - Confiança e solidariedade
- Secundária: Laranja (#f97316) - Ação e energia
- Terciária: Verde (#10b981) - Crescimento e esperança
- Neutras: 10 tons de cinza

**Tipografia Hierárquica:**

- 9 tamanhos de fonte (xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl)
- 5 pesos de fonte (light, normal, medium, semibold, bold)
- Font-family: Segoe UI e fallbacks

**Espaçamento Modular:**

- Sistema baseado em múltiplos de 8px
- 9 níveis de espaçamento (0.5rem até 6rem)

### Leiautes Responsivos

**Grid System:**

- Grid de 12 colunas customizado
- Suporte para 1, 2, 3, 4 colunas
- Auto-fit e auto-fill para responsividade
- Grids especializados: projects-grid, gallery-grid, stats-grid

**Flexbox:**

- Utilizado para navegação, cards internos e alinhamentos
- Direção de coluna e linha conforme necessário
- Gap e justify/align para distribuição perfeita

**5 Breakpoints Responsivos:**

1. Mobile: < 480px
2. Mobile Large: 480px - 767px
3. Tablet: 768px - 1023px
4. Desktop: 1024px - 1279px
5. Desktop Large: ≥ 1280px

### Navegação Sofisticada

**Menu Principal:**

- Responsivo com gradiente azul
- Sticky header que acompanha o scroll
- Transições suaves em todos os links
- Estados visuais (hover, focus, active)

**Menu Mobile:**

- Hambúrguer menu para telas < 768px
- Animação slideDown ao abrir
- Implementado com CSS puro (checkbox hack)
- Sem necessidade de JavaScript

### Componentes de Interface

**Cards Responsivos:**

- Sistema de cards para projetos
- Hover com elevação e transformação
- Imagens otimizadas com object-fit
- Shadow e border-radius suaves

**Botões Estilizados:**

- Estados: hover, focus, active, disabled
- Variantes: primary, reset
- Transições de 300ms
- Shadow e transformações

**Formulários com Validação Visual:**

- Inputs com validação por cores (verde/vermelho)
- Focus ring de 3px
- Fieldsets com hover effect
- Labels associados corretamente

**Componentes de Feedback:**

- Alerts: info, success, warning, error
- Badges para categorização
- Blockquotes estilizados
- Cards com estatísticas

**Sistema de Badges & Tags:**

- Badge primary, secondary, success, warning
- Border-radius circular
- Cores consistentes com o sistema

### Recursos Adicionais

**Animações e Transições:**

- fadeIn, slideDown
- Animações CSS com @keyframes
- Transições: fast (150ms), base (300ms), slow (500ms)

**Acessibilidade:**

- Focus visível em todos elementos interativos
- Labels semânticos associados aos inputs
- Navegação por teclado funcional
- Contraste de cores adequado (WCAG 2.1 AA)

**Modo de Impressão:**

- CSS otimizado para impressão
- Remoção de elementos não essenciais
- Cores em preto e branco
- Tamanhos de fonte adequados

## Entrega III - Interatividade e Funcionalidades (JavaScript)

### Manipulação do DOM

**Estrutura Modular JavaScript:**

- Código organizado por funcionalidade
- 6 módulos especializados
- Padrão de arquitetura limpa
- Separação de responsabilidades

### Funcionalidades Implementadas

**1. Sistema de Templates JavaScript (`templates.js`):**

- Geração dinâmica de cards de projetos
- Templates para alertas e notificações
- Helpers DOM para manipulação de elementos
- Animações de fadeIn, fadeOut, slideUp, slideDown

**2. Máscaras de Input (`masks.js`):**

- CPF: formato automático (000.000.000-00)
- Telefone: formato (00) 00000-0000
- CEP: formato 00000-000
- Validação de CPF com algoritmo real
- Feedback visual em tempo real

**3. Validação de Formulário (`form-validator.js`):**

- Validação em tempo real de todos os campos
- Mensagens de erro customizadas
- Feedback visual com cores (verde/vermelho)
- Scroll automático para campo com erro
- Validação de e-mail, telefone, data, CPF
- Prevenção de envio com erros

**4. Integração com API ViaCEP (`cep-service.js`):**

- Busca automática de endereço pelo CEP
- Preenchimento automático dos campos
- Loading state durante busca
- Tratamento de erros
- Feedback visual de sucesso/erro

**5. LocalStorage (`form-storage.js`):**

- Auto-save a cada alteração no formulário
- Recuperação automática ao voltar à página
- Expiração de 30 minutos
- Notificação de rascunho recuperado
- Opção de limpar rascunho

**6. Aplicação Principal (`app.js`):**

- Inicialização coordenada de módulos
- Menu mobile com fechamento ao clicar em link
- Animações ao scroll (Intersection Observer)
- Atualização automática do ano no footer
- Gerenciamento do ciclo de vida da aplicação

### Eventos e Interações

**Eventos Implementados:**

- `input` - máscaras e auto-save
- `blur` - validação de campos
- `submit` - validação completa e envio
- `change` - checkboxes e selects
- `click` - navegação e ações
- `scroll` - animações de entrada
- `DOMContentLoaded` - inicialização

**Armazenamento Local:**

- LocalStorage para persistência de dados
- Expiração automática (30 minutos)
- Limpeza ao enviar formulário com sucesso
- Recuperação inteligente de rascunhos

**Integração com Framework (conceitual):**

- Sistema de templates modular
- Separação de lógica e apresentação
- Componentização do código
- Facilita migração futura para React/Vue

### API Externa

**ViaCEP Integration:**

- Endpoint: `https://viacep.com.br/ws/{cep}/json/`
- Método: `fetch` API nativa
- Async/await para código limpo
- Error handling robusto
- Timeout implícito

## Tecnologias Utilizadas

### Frontend

- HTML5 semântico
- CSS3 avançado (Custom Properties, Grid, Flexbox)
- JavaScript ES6+ (Vanilla)
- Fetch API para requisições HTTP
- LocalStorage API
- Intersection Observer API

### Padrões e Boas Práticas

- Código modular e organizado
- Separação de responsabilidades
- Event delegation
- Async/await para operações assíncronas
- Error handling robusto
- Progressive enhancement
- Mobile-first approach

## Estrutura de Arquivos

```
projeto-web/
├── index.html
├── projetos.html
├── cadastro.html
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   ├── templates.js
│   ├── masks.js
│   ├── form-validator.js
│   ├── cep-service.js
│   └── form-storage.js
├── imagens/
│   ├── logo.png
│   ├── equipe.jpg
│   ├── historia.jpg
│   ├── impacto.jpg
│   ├── equipe-gestao.jpg
│   ├── contato.jpg
│   ├── projeto-educacao.jpg
│   ├── projeto-capacitacao.jpg
│   ├── projeto-alimentacao.jpg
│   ├── projeto-saude.jpg
│   ├── projeto-moradia.jpg
│   ├── voluntarios.jpg
│   ├── doacoes.jpg
│   └── parcerias.jpg
├── README.md
└── DESIGN-SYSTEM.md
```

## Autor

Projeto desenvolvido para disciplina de Desenvolvimento Web
