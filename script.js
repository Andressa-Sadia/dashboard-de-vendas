const salesData = [
  { date: '2026-01-05', order: 'PED-1001', client: 'Mercadinho Sol', region: 'Nordeste', seller: 'Andressa', category: 'Software', value: 4200 },
  { date: '2026-01-09', order: 'PED-1002', client: 'Loja Nobre', region: 'Sudeste', seller: 'Carlos', category: 'Serviços', value: 2800 },
  { date: '2026-01-13', order: 'PED-1003', client: 'Atacado Lima', region: 'Sul', seller: 'Bianca', category: 'Software', value: 5100 },
  { date: '2026-01-17', order: 'PED-1004', client: 'Distribuidora Real', region: 'Nordeste', seller: 'Andressa', category: 'Consultoria', value: 3900 },
  { date: '2026-02-02', order: 'PED-1005', client: 'Mercado Ponto Certo', region: 'Centro-Oeste', seller: 'Diego', category: 'Software', value: 4700 },
  { date: '2026-02-07', order: 'PED-1006', client: 'Grupo Atlas', region: 'Sudeste', seller: 'Carlos', category: 'Consultoria', value: 6500 },
  { date: '2026-02-11', order: 'PED-1007', client: 'Rede União', region: 'Nordeste', seller: 'Andressa', category: 'Serviços', value: 3100 },
  { date: '2026-02-19', order: 'PED-1008', client: 'Comercial Prado', region: 'Sul', seller: 'Bianca', category: 'Software', value: 5800 },
  { date: '2026-03-03', order: 'PED-1009', client: 'Armazém Azul', region: 'Norte', seller: 'Diego', category: 'Software', value: 4500 },
  { date: '2026-03-08', order: 'PED-1010', client: 'Grupo Nativa', region: 'Nordeste', seller: 'Andressa', category: 'Consultoria', value: 7300 },
  { date: '2026-03-14', order: 'PED-1011', client: 'Casa Oliveira', region: 'Sudeste', seller: 'Carlos', category: 'Software', value: 5200 },
  { date: '2026-03-18', order: 'PED-1012', client: 'Varejo Prime', region: 'Centro-Oeste', seller: 'Bianca', category: 'Serviços', value: 2600 },
  { date: '2026-04-02', order: 'PED-1013', client: 'Mercadinho Sol', region: 'Nordeste', seller: 'Andressa', category: 'Software', value: 6100 },
  { date: '2026-04-06', order: 'PED-1014', client: 'Loja Nobre', region: 'Sudeste', seller: 'Carlos', category: 'Consultoria', value: 3400 },
  { date: '2026-04-09', order: 'PED-1015', client: 'Comercial Prado', region: 'Sul', seller: 'Bianca', category: 'Software', value: 7600 },
  { date: '2026-04-15', order: 'PED-1016', client: 'Rede União', region: 'Nordeste', seller: 'Andressa', category: 'Serviços', value: 2900 },
  { date: '2026-05-04', order: 'PED-1017', client: 'Grupo Atlas', region: 'Sudeste', seller: 'Carlos', category: 'Software', value: 6900 },
  { date: '2026-05-10', order: 'PED-1018', client: 'Armazém Azul', region: 'Norte', seller: 'Diego', category: 'Consultoria', value: 4100 },
  { date: '2026-05-13', order: 'PED-1019', client: 'Atacado Lima', region: 'Sul', seller: 'Bianca', category: 'Serviços', value: 3300 },
  { date: '2026-05-22', order: 'PED-1020', client: 'Distribuidora Real', region: 'Nordeste', seller: 'Andressa', category: 'Software', value: 8800 },
];

const formatCurrency = (value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const monthLabel = (dateString) => new Date(dateString + 'T00:00:00').toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' });

const filterMonth = document.getElementById('filterMonth');
const filterRegion = document.getElementById('filterRegion');
const filterSeller = document.getElementById('filterSeller');
const salesTable = document.getElementById('salesTable');
const tableCount = document.getElementById('tableCount');

const charts = {};

function uniqueValues(key) {
  return [...new Set(salesData.map(item => item[key]))].sort((a, b) => a.localeCompare(b, 'pt-BR'));
}

function populateFilters() {
  const months = [...new Set(salesData.map(item => monthLabel(item.date)))];
  filterMonth.innerHTML = ['Todos', ...months].map(value => `<option value="${value}">${value}</option>`).join('');
  filterRegion.innerHTML = ['Todas', ...uniqueValues('region')].map(value => `<option value="${value}">${value}</option>`).join('');
  filterSeller.innerHTML = ['Todos', ...uniqueValues('seller')].map(value => `<option value="${value}">${value}</option>`).join('');
}

function getFilteredData() {
  return salesData.filter(item => {
    const byMonth = filterMonth.value === 'Todos' || monthLabel(item.date) === filterMonth.value;
    const byRegion = filterRegion.value === 'Todas' || item.region === filterRegion.value;
    const bySeller = filterSeller.value === 'Todos' || item.seller === filterSeller.value;
    return byMonth && byRegion && bySeller;
  });
}

function groupSum(data, key) {
  return data.reduce((acc, item) => {
    acc[item[key]] = (acc[item[key]] || 0) + item.value;
    return acc;
  }, {});
}

function updateKPIs(data) {
  const totalRevenue = data.reduce((sum, item) => sum + item.value, 0);
  const totalOrders = data.length;
  const averageTicket = totalOrders ? totalRevenue / totalOrders : 0;

  const sellerTotals = groupSum(data, 'seller');
  const topSellerEntry = Object.entries(sellerTotals).sort((a, b) => b[1] - a[1])[0];

  document.getElementById('kpiRevenue').textContent = formatCurrency(totalRevenue);
  document.getElementById('kpiOrders').textContent = totalOrders;
  document.getElementById('kpiAverage').textContent = formatCurrency(averageTicket);
  document.getElementById('kpiTopSeller').textContent = topSellerEntry ? topSellerEntry[0] : '-';
  document.getElementById('kpiTopSellerValue').textContent = topSellerEntry ? formatCurrency(topSellerEntry[1]) : 'Sem vendas no filtro';
}

function buildChart(chartId, type, labels, values, label) {
  const ctx = document.getElementById(chartId);
  if (charts[chartId]) charts[chartId].destroy();

  charts[chartId] = new Chart(ctx, {
    type,
    data: {
      labels,
      datasets: [{
        label,
        data: values,
        borderRadius: 10,
        tension: 0.35,
        fill: type === 'line',
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: type === 'doughnut' },
      },
      scales: type === 'doughnut' ? {} : {
        y: {
          ticks: {
            callback: value => 'R$ ' + Number(value).toLocaleString('pt-BR'),
          }
        }
      }
    }
  });
}

function updateCharts(data) {
  const byMonth = salesData.reduce((acc, item) => {
    const label = monthLabel(item.date);
    acc[label] = (acc[label] || 0) + (data.includes(item) ? item.value : 0);
    return acc;
  }, {});

  const byRegion = groupSum(data, 'region');
  const bySeller = groupSum(data, 'seller');
  const byCategory = groupSum(data, 'category');

  buildChart('revenueChart', 'line', Object.keys(byMonth), Object.values(byMonth), 'Faturamento');
  buildChart('regionChart', 'bar', Object.keys(byRegion), Object.values(byRegion), 'Região');
  buildChart('sellerChart', 'bar', Object.keys(bySeller), Object.values(bySeller), 'Vendedor');
  buildChart('categoryChart', 'doughnut', Object.keys(byCategory), Object.values(byCategory), 'Categoria');
}

function updateTable(data) {
  salesTable.innerHTML = data
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .map(item => `
      <tr>
        <td>${new Date(item.date + 'T00:00:00').toLocaleDateString('pt-BR')}</td>
        <td>${item.order}</td>
        <td>${item.client}</td>
        <td>${item.region}</td>
        <td>${item.seller}</td>
        <td>${item.category}</td>
        <td>${formatCurrency(item.value)}</td>
      </tr>
    `)
    .join('');

  tableCount.textContent = `${data.length} registro${data.length !== 1 ? 's' : ''}`;
}

function render() {
  const filtered = getFilteredData();
  updateKPIs(filtered);
  updateCharts(filtered);
  updateTable(filtered);
}

[filterMonth, filterRegion, filterSeller].forEach(element => element.addEventListener('change', render));

document.getElementById('resetFilters').addEventListener('click', () => {
  filterMonth.value = 'Todos';
  filterRegion.value = 'Todas';
  filterSeller.value = 'Todos';
  render();
});

populateFilters();
render();
