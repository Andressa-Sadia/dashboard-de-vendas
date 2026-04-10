# 📊 Sales Dashboard

Dashboard de vendas moderno e responsivo construído com React + Recharts.

## 🚀 Tecnologias

- **React 18** — UI framework
- **Recharts** — Gráficos interativos
- **Lucide React** — Ícones
- **Vite** — Build tool

## 📦 Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/sales-dashboard.git
cd sales-dashboard

# 2. Instale as dependências
npm install

# 3. Rode em desenvolvimento
npm run dev

# 4. Build para produção
npm run build
```

Acesse: [http://localhost:5173](http://localhost:5173)

## 📁 Estrutura do Projeto

```
sales-dashboard/
├── src/
│   ├── components/
│   │   ├── KpiCard.jsx          # Cards de métricas
│   │   ├── RevenueChart.jsx     # Gráfico de área (Receita vs Meta)
│   │   ├── CategoryChart.jsx    # Gráfico de pizza (categorias)
│   │   ├── DailySalesChart.jsx  # Gráfico de barras (vendas diárias)
│   │   ├── RegionChart.jsx      # Gráfico radar (regiões)
│   │   └── TopProducts.jsx      # Tabela de produtos
│   ├── data/
│   │   └── mockData.js          # Dados simulados
│   ├── utils/
│   │   └── formatters.js        # Formatação de moeda/números
│   ├── App.jsx                  # Componente raiz
│   ├── main.jsx                 # Ponto de entrada
│   └── index.css                # Estilos globais
├── index.html
├── vite.config.js
└── package.json
```

## 📊 Funcionalidades

- ✅ KPIs com indicadores de crescimento
- ✅ Gráfico de área (Receita x Meta x Despesas)
- ✅ Gráfico de pizza interativo por categoria
- ✅ Gráfico de barras por dia da semana
- ✅ Gráfico radar por região
- ✅ Tabela de top produtos com ordenação
- ✅ Filtros de período (1º Sem / 2º Sem / Ano todo)
- ✅ Layout responsivo (mobile-friendly)
- ✅ Sidebar com navegação
- ✅ Tooltips customizados
