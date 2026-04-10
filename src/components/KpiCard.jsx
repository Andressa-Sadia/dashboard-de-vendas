import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const KpiCard = ({ title, value, growth, icon: Icon, color }) => {
  const isPositive = growth >= 0;

  return (
    <div className="kpi-card" style={{ '--accent': color }}>
      <div className="kpi-top">
        <span className="kpi-title">{title}</span>
        <div className="kpi-icon" style={{ background: color + '22', color }}>
          <Icon size={18} />
        </div>
      </div>
      <div className="kpi-value">{value}</div>
      <div className={`kpi-growth ${isPositive ? 'positive' : 'negative'}`}>
        {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
        <span>{growth > 0 ? '+' : ''}{growth.toFixed(1)}% vs. mês anterior</span>
      </div>
      <div className="kpi-bar">
        <div className="kpi-bar-fill" style={{ width: `${Math.min(Math.abs(growth) * 5, 100)}%`, background: color }} />
      </div>
    </div>
  );
};

export default KpiCard;
