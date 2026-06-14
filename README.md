# Finance Dashboard

Dashboard de controle financeiro com Vue.js, Quasar, TypeScript e TailwindCSS.

## Funcionalidades

- Visualizacao de multiplas carteiras/cartoes por mes
- Cadastro de transacoes com nome, valor, parcela, carteira e descricao
- Resumo mensal (receitas, despesas e saldo)
- Persistencia de dados via LocalStorage

## Tecnologias

- Vue.js 3 (Composition API)
- Quasar Framework
- TypeScript
- TailwindCSS
- Pinia (gerenciamento de estado)
- Composables (logica reutilizavel)

## Composables

- `useFormatters` - Formatacao de moeda e datas
- `useMonthNavigator` - Navegacao entre meses
- `useFinance` - Logica de transacoes e carteiras

## Como executar

```bash
npm install
npm run dev
```
