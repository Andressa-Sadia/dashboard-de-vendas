import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Sector } from 'recharts';
import { salesByCategory } from '../data/mockData';

const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent } = props;
  return (
    <g>
      <text x={cx} y={cy - 10} textAnchor="middle" fill="#fff" fontSize={18} fontFamily="Syne" fontWeight={700}>
        {payload.name}
      </text>
      <text x={cx} y={cy + 14} textAnchor="middle" fill={fill} fontSize={14} fontFamily="Space Mono">
        {(percent * 100).toFixed(1)}%
      </text>
      <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius + 8} startAngle={startAngle} endAngle={endAngle} fill={fill} />
      <Sector cx={cx} cy={cy} innerRadius={outerRadius + 12} outerRadius={outerRadius + 16} startAngle={startAngle} endAngle={endAngle} fill={fill} />
    </g>
  );
};

const CategoryChart = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="chart-card">
      <div className="chart-header">
        <div>
          <h3 className="chart-title">Vendas por Categoria</h3>
          <p className="chart-subtitle">Distribuição percentual</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={salesByCategory}
            cx="50%"
            cy="50%"
            innerRadius={65}
            outerRadius={90}
            dataKey="value"
            onMouseEnter={(_, idx) => setActiveIndex(idx)}
          >
            {salesByCategory.map((entry, i) => (
              <Cell key={i} fill={entry.color} stroke="transparent" />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="legend-list">
        {salesByCategory.map((item, i) => (
          <div key={i} className={`legend-item ${activeIndex === i ? 'active' : ''}`} onMouseEnter={() => setActiveIndex(i)}>
            <span className="legend-dot" style={{ background: item.color }} />
            <span className="legend-name">{item.name}</span>
            <span className="legend-value" style={{ color: item.color }}>{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryChart;
