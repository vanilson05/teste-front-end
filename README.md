Deploy: [link]

# Teste Front-End Econverse

Página de e-commerce desenvolvida a partir do layout do Figma do teste técnico da Econverse. A vitrine consome o JSON de produtos fornecido e, ao clicar em um produto, abre um modal com os detalhes dele.

## Tecnologias

- React 19
- TypeScript
- Vite
- Sass (SCSS), sem bibliotecas de UI

## Como rodar

Pré-requisito: Node.js 20.19 ou superior.

```bash
npm install
npm run dev
```

O projeto abre em `http://localhost:5173`.

Para gerar o build de produção:

```bash
npm run build
```

## Decisões técnicas

- **JSON via proxy, com cópia local como reserva:** o servidor da Econverse não envia o cabeçalho de CORS, então o navegador bloqueia a requisição direta. Por isso o JSON é buscado em `/api/produtos`, que aponta para a URL original pelo proxy do `vite.config.ts` (em desenvolvimento) e pelo rewrite do `vercel.json` (em produção). Se essa chamada falhar, o service usa a cópia em `public/data/produtos.json`.
- **Abas que não filtram:** o JSON não informa a categoria dos produtos. As abas da vitrine mudam o estado visual e voltam o carrossel para o início, mas exibem sempre a mesma lista.
- **Preço antigo e parcelamento calculados:** o JSON traz apenas o preço atual, em centavos. O preço riscado é o atual mais 10%, e o parcelamento é em 2x sem juros, calculados em `src/utils/price.ts`.
- **Componentes reutilizados:** a vitrine (`ProductShelf`) aparece três vezes e os banners de parceiros (`PartnerBanners`) duas vezes, cada um configurado por props. Os produtos são buscados uma única vez no `App` e repassados às três vitrines.

## Notas do Lighthouse

Medido no build de produção (`npm run build` + `npm run preview`):

| | Performance | Acessibilidade | Boas práticas | SEO |
|---|---|---|---|---|
| Desktop | 99 | 97 | 100 | 100 |
| Mobile | 79 | 97 | 100 | 100 |

- No mobile, o Lighthouse simula um celular com CPU lenta. Como a página é renderizada pelo React no navegador, a imagem principal espera o JavaScript ser executado. Para passar de 90 seria preciso renderizar no servidor, o que foge do escopo do teste.
- Os pontos de acessibilidade que faltam são de contraste em cores do próprio Figma (cinza `#9F9F9F` da barra superior e do menu, e `#808080` do preço riscado), mantidas para respeitar o layout.
