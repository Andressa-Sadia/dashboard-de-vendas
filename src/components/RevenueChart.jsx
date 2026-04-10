import React, { useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine
} from 'recharts';
import { monthlySales } from '../data/mockData';
import { formatCurrency } from '../utils/formatters';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="tooltip-label">{label}</p>
        {payload.map((entry, i) => (
          <p key={i} style={{ color: entry.color }}>
            {entry.name}: {formatCurrency(entry.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const RevenueChart = () => {
  const [view, setView] = useState('all');

  const filtered = view === 'h1'
    ? monthlySales.slice(0, 6)
    : view === 'h2'
    ? monthlySales.slice(6)
    : monthlySales;

  return (
    <div className="chart-card wide">
      <div className="chart-header">
        <div>
          <h3 className="chart-title">Receita vs Meta</h3>
          <p className="chart-subtitle">Desempenho mensal de vendas em 2024</p>
        </div>
        <div className="view-toggle">
          {['all', 'h1', 'h2'].map(v => (
            <button key={v} className={`toggle-btn ${view === v ? 'active' : ''}`} onClick={() => setView(v)}>
              {v === 'all' ? 'Ano Todo' : v === 'h1' ? '1º Sem.' : '2º Sem.'}
            </button>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={filtered} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="receitaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF3D00" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#FF3D00" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="despesasGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#00E5FF" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="month" tick={{ fill: '#888', fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tickFormatter={(v) => `R$${v / 1000}k`} tick={{ fill: '#888', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ paddingTop: 16, fontSize: 12 }} />
          <Area type="monotone" dataKey="meta" name="Meta" stroke="#555" strokeDasharray="4 4" fill="none" strokeWidth={1.5} dot={false} />
          <Area type="monotone" dataKey="despesas" name="Despesas" stroke="#00E5FF" fill="url(#despesasGrad)" strokeWidth={2} dot={false} />
          <Area type="monotone" dataKey="receita" name="Receita" stroke="#FF3D00" fill="url(#receitaGrad)" strokeWidth={2.5} dot={{ fill: '#FF3D00', r: 3 }} activeDot={{ r: 6 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
