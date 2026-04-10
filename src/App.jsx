import React, { useState } from 'react';
import { DollarSign, ShoppingCart, Target, Percent, BarChart2, Bell, Settings, Search, Menu, X } from 'lucide-react';
import KpiCard from './components/KpiCard';
import RevenueChart from './components/RevenueChart';
import CategoryChart from './components/CategoryChart';
import DailySalesChart from './components/DailySalesChart';
import RegionChart from './components/RegionChart';
import TopProducts from './components/TopProducts';
import { kpiData } from './data/mockData';
import { formatCurrency, formatNumber } from './utils/formatters';

const kpis = [
  {
    title: 'Receita Total',
    value: formatCurrency(kpiData.receitaTotal),
    growth: kpiData.receitaGrowth,
    icon: DollarSign,
    color: '#FF3D00',
  },
  {
    title: 'Total de Vendas',
    value: formatNumber(kpiData.totalVendas),
    growth: kpiData.vendasGrowth,
    icon: ShoppingCart,
    color: '#FF9100',
  },
  {
    title: 'Ticket Médio',
    value: formatCurrency(kpiData.ticketMedio),
    growth: kpiData.ticketGrowth,
    icon: Target,
    color: '#FFD600',
  },
  {
    title: 'Taxa de Conversão',
    value: `${kpiData.taxaConversao}%`,
    growth: kpiData.conversaoGrowth,
    icon: Percent,
    color: '#00E5FF',
  },
];

const navItems = ['Visão Geral', 'Vendas', 'Produtos', 'Clientes', 'Relatórios'];

export default function App() {
  const [activeNav, setActiveNav] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="app">
      {/* Sidebar */}
      <aside className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <BarChart2 size={24} color="#FF3D00" />
          <span>SalesPulse</span>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item, i) => (
            <button
              key={i}
              className={`nav-item ${activeNav === i ? 'active' : ''}`}
              onClick={() => { setActiveNav(i); setMenuOpen(false); }}
            >
              {item}
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="user-avatar">JP</div>
          <div className="user-info">
            <span className="user-name">João Paulo</span>
            <span className="user-role">Gerente de Vendas</span>
          </div>
          <Settings size={16} color="#555" />
        </div>
      </aside>

      {/* Main */}
      <main className="main">
        {/* Topbar */}
        <header className="topbar">
          <button className="menu-toggle" onClick={() => setMenuOpen(m => !m)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="search-bar">
            <Search size={15} color="#666" />
            <input placeholder="Buscar produto, categoria..." />
          </div>
          <div className="topbar-actions">
            <span className="period-badge">Jan – Dez 2024</span>
            <button className="icon-btn"><Bell size={18} /></button>
          </div>
        </header>

        {/* Content */}
        <div className="content">
          <div className="page-header">
            <h1>Visão Geral</h1>
            <p>Acompanhe o desempenho de vendas em tempo real</p>
          </div>

          {/* KPIs */}
          <div className="kpi-grid">
            {kpis.map((kpi, i) => <KpiCard key={i} {...kpi} />)}
          </div>

          {/* Charts Row 1 */}
          <div className="charts-row">
            <RevenueChart />
            <CategoryChart />
          </div>

          {/* Charts Row 2 */}
          <div className="charts-row">
            <DailySalesChart />
            <RegionChart />
          </div>

          {/* Table */}
          <div className="charts-row">
            <TopProducts />
          </div>
        </div>
      </main>
    </div>
  );
}
