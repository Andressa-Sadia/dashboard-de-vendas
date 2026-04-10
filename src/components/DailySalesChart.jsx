import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { dailySales } from '../data/mockData';

const DailySalesChart = () => {
  const max = Math.max(...dailySales.map(d => d.vendas));

  return (
    <div className="chart-card">
      <div className="chart-header">
        <div>
          <h3 className="chart-title">Vendas por Dia</h3>
          <p className="chart-subtitle">Última semana</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={dailySales} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
          <XAxis dataKey="dia" tick={{ fill: '#888', fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#888', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: 8, color: '#fff' }}
            cursor={{ fill: 'rgba(255,255,255,0.03)' }}
          />
          <Bar dataKey="vendas" name="Vendas" radius={[4, 4, 0, 0]}>
            {dailySales.map((entry, i) => (
              <Cell key={i} fill={entry.vendas === max ? '#FF3D00' : '#333'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="daily-stats">
        <div className="daily-stat">
          <span>Melhor dia</span>
          <strong style={{ color: '#FF3D00' }}>Sábado</strong>
        </div>
        <div className="daily-stat">
          <span>Média/dia</span>
          <strong>{Math.round(dailySales.reduce((a, b) => a + b.vendas, 0) / dailySales.length)}</strong>
        </div>
        <div className="daily-stat">
          <span>Total semana</span>
          <strong>{dailySales.reduce((a, b) => a + b.vendas, 0)}</strong>
        </div>
      </div>
    </div>
  );
};

export default DailySalesChart;
