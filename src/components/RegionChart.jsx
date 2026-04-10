import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';
import { salesByRegion } from '../data/mockData';

const RegionChart = () => {
  return (
    <div className="chart-card">
      <div className="chart-header">
        <div>
          <h3 className="chart-title">Vendas por Região</h3>
          <p className="chart-subtitle">Participação no total</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <RadarChart data={salesByRegion}>
          <PolarGrid stroke="rgba(255,255,255,0.1)" />
          <PolarAngleAxis dataKey="region" tick={{ fill: '#888', fontSize: 11 }} />
          <Radar name="Vendas %" dataKey="vendas" stroke="#FF9100" fill="#FF9100" fillOpacity={0.2} strokeWidth={2} />
          <Tooltip
            contentStyle={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: 8, color: '#fff' }}
            formatter={(v) => [`${v}%`, 'Participação']}
          />
        </RadarChart>
      </ResponsiveContainer>
      <div className="region-list">
        {salesByRegion.map((r, i) => (
          <div key={i} className="region-row">
            <span className="region-name">{r.region}</span>
            <div className="region-bar-wrap">
              <div className="region-bar-fill" style={{ width: `${r.vendas}%`, background: `hsl(${i * 40 + 20}, 100%, 55%)` }} />
            </div>
            <span className="region-pct">{r.vendas}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegionChart;
