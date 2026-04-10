import React, { useState } from 'react';
import { topProducts } from '../data/mockData';
import { formatCurrency, formatNumber } from '../utils/formatters';
import { TrendingUp, TrendingDown, ArrowUpDown } from 'lucide-react';

const TopProducts = () => {
  const [sortKey, setSortKey] = useState('receita');
  const [sortDir, setSortDir] = useState('desc');

  const sorted = [...topProducts].sort((a, b) => {
    return sortDir === 'desc' ? b[sortKey] - a[sortKey] : a[sortKey] - b[sortKey];
  });

  const handleSort = (key) => {
    if (key === sortKey) setSortDir(d => d === 'desc' ? 'asc' : 'desc');
    else { setSortKey(key); setSortDir('desc'); }
  };

  return (
    <div className="chart-card wide">
      <div className="chart-header">
        <div>
          <h3 className="chart-title">Top Produtos</h3>
          <p className="chart-subtitle">Ranking por performance de receita</p>
        </div>
      </div>
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Produto</th>
              <th>Categoria</th>
              <th className="sortable" onClick={() => handleSort('vendas')}>
                Vendas <ArrowUpDown size={12} />
              </th>
              <th className="sortable" onClick={() => handleSort('receita')}>
                Receita <ArrowUpDown size={12} />
              </th>
              <th className="sortable" onClick={() => handleSort('crescimento')}>
                Crescimento <ArrowUpDown size={12} />
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((p, i) => (
              <tr key={p.id} className={i === 0 ? 'top-row' : ''}>
                <td><span className="rank">{i + 1}</span></td>
                <td><span className="product-name">{p.name}</span></td>
                <td><span className="category-badge">{p.category}</span></td>
                <td>{formatNumber(p.vendas)}</td>
                <td><strong>{formatCurrency(p.receita)}</strong></td>
                <td>
                  <span className={`growth-badge ${p.crescimento >= 0 ? 'pos' : 'neg'}`}>
                    {p.crescimento >= 0 ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                    {p.crescimento > 0 ? '+' : ''}{p.crescimento}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopProducts;
