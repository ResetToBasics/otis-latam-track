import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  BarChart,
  LineChart,
  PieChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Bar,
  Line,
  ResponsiveContainer,
  Cell,
  Pie
} from 'recharts';
import {
  DownloadIcon,
  FilterIcon,
  RefreshCw,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

// Mock data para análise comparativa entre países
const countryComparisonData = {
  performance: [
    { country: 'Brasil', onTimeDelivery: 87, costVariance: -2.3, qualityIndex: 92, satisfaction: 4.6 },
    { country: 'México', onTimeDelivery: 82, costVariance: 1.5, qualityIndex: 88, satisfaction: 4.3 },
    { country: 'Colômbia', onTimeDelivery: 79, costVariance: 0.8, qualityIndex: 85, satisfaction: 4.4 },
    { country: 'Chile', onTimeDelivery: 91, costVariance: -3.1, qualityIndex: 94, satisfaction: 4.7 },
    { country: 'Argentina', onTimeDelivery: 76, costVariance: 2.7, qualityIndex: 83, satisfaction: 4.2 },
    { country: 'Peru', onTimeDelivery: 81, costVariance: 0.5, qualityIndex: 86, satisfaction: 4.3 }
  ],
  installationTime: [
    { country: 'Brasil', residential: 45, commercial: 75, highRise: 120 },
    { country: 'México', residential: 42, commercial: 78, highRise: 125 },
    { country: 'Colômbia', residential: 48, commercial: 82, highRise: 130 },
    { country: 'Chile', residential: 40, commercial: 72, highRise: 115 },
    { country: 'Argentina', residential: 47, commercial: 80, highRise: 128 },
    { country: 'Peru', residential: 46, commercial: 79, highRise: 127 }
  ],
  costEfficiency: [
    { country: 'Brasil', value: 92 },
    { country: 'México', value: 88 },
    { country: 'Colômbia', value: 85 },
    { country: 'Chile', value: 95 },
    { country: 'Argentina', value: 82 },
    { country: 'Peru', value: 86 }
  ],
  marketShare: [
    { country: 'Brasil', value: 42 },
    { country: 'México', value: 35 },
    { country: 'Colômbia', value: 28 },
    { country: 'Chile', value: 38 },
    { country: 'Argentina', value: 25 },
    { country: 'Peru', value: 30 }
  ],
  monthlyTrends: {
    installations: [
      { month: 'Jan', Brasil: 32, México: 28, Colômbia: 21, Chile: 24, Argentina: 18, Peru: 20 },
      { month: 'Fev', Brasil: 35, México: 30, Colômbia: 22, Chile: 26, Argentina: 19, Peru: 21 },
      { month: 'Mar', Brasil: 30, México: 25, Colômbia: 20, Chile: 28, Argentina: 17, Peru: 19 },
      { month: 'Abr', Brasil: 40, México: 32, Colômbia: 24, Chile: 30, Argentina: 20, Peru: 22 },
      { month: 'Mai', Brasil: 38, México: 33, Colômbia: 25, Chile: 29, Argentina: 21, Peru: 24 },
      { month: 'Jun', Brasil: 42, México: 35, Colômbia: 26, Chile: 31, Argentina: 22, Peru: 25 }
    ],
    satisfaction: [
      { month: 'Jan', Brasil: 4.3, México: 4.1, Colômbia: 4.2, Chile: 4.5, Argentina: 4.0, Peru: 4.1 },
      { month: 'Fev', Brasil: 4.4, México: 4.2, Colômbia: 4.3, Chile: 4.6, Argentina: 4.1, Peru: 4.2 },
      { month: 'Mar', Brasil: 4.5, México: 4.2, Colômbia: 4.3, Chile: 4.7, Argentina: 4.1, Peru: 4.2 },
      { month: 'Abr', Brasil: 4.6, México: 4.3, Colômbia: 4.4, Chile: 4.7, Argentina: 4.2, Peru: 4.3 },
      { month: 'Mai', Brasil: 4.5, México: 4.3, Colômbia: 4.4, Chile: 4.8, Argentina: 4.2, Peru: 4.3 },
      { month: 'Jun', Brasil: 4.6, México: 4.4, Colômbia: 4.5, Chile: 4.8, Argentina: 4.3, Peru: 4.4 }
    ]
  },
  qualityMetrics: {
    defects: [
      { country: 'Brasil', category: 'Mecânico', value: 12 },
      { country: 'Brasil', category: 'Elétrico', value: 8 },
      { country: 'Brasil', category: 'Acabamento', value: 5 },
      { country: 'México', category: 'Mecânico', value: 14 },
      { country: 'México', category: 'Elétrico', value: 9 },
      { country: 'México', category: 'Acabamento', value: 7 },
      { country: 'Colômbia', category: 'Mecânico', value: 10 },
      { country: 'Colômbia', category: 'Elétrico', value: 6 },
      { country: 'Colômbia', category: 'Acabamento', value: 4 },
      { country: 'Chile', category: 'Mecânico', value: 8 },
      { country: 'Chile', category: 'Elétrico', value: 5 },
      { country: 'Chile', category: 'Acabamento', value: 3 },
      { country: 'Argentina', category: 'Mecânico', value: 15 },
      { country: 'Argentina', category: 'Elétrico', value: 10 },
      { country: 'Argentina', category: 'Acabamento', value: 8 },
      { country: 'Peru', category: 'Mecânico', value: 11 },
      { country: 'Peru', category: 'Elétrico', value: 7 },
      { country: 'Peru', category: 'Acabamento', value: 6 }
    ]
  }
};

// Cores para os países
const countryColors = {
  'Brasil': '#4CAF50',
  'México': '#2196F3',
  'Colômbia': '#FFC107',
  'Chile': '#9C27B0',
  'Argentina': '#F44336',
  'Peru': '#FF5722'
};

// Componente principal para Analytics avançado com comparativo entre países
const CountryComparisonAnalytics = () => {
  const [selectedMetric, setSelectedMetric] = useState('performance');
  const [selectedPeriod, setSelectedPeriod] = useState('lastYear');
  const [selectedCountries, setSelectedCountries] = useState(['Brasil', 'México', 'Chile']);
  const [isLoading, setIsLoading] = useState(false);

  // Simular carregamento de dados
  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  // Filtra os dados com base nos países selecionados
  const getFilteredData = (dataArray) => {
    return dataArray.filter(item => selectedCountries.includes(item.country));
  };

  // Configuração de normalização para comparação mais justa entre países
  const normalizeData = (data, metric) => {
    // Simulação de normalização - no mundo real, isso seria mais complexo
    // e levaria em conta fatores locais como tamanho do mercado, regulamentações, etc.
    return data.map(item => ({
      ...item,
      [metric]: item[metric] * (1 + (Math.random() * 0.1 - 0.05)) // Ajuste de +/- 5%
    }));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Analytics Comparativo entre Países</h1>
        <p className="text-muted-foreground mt-1">
          Análise de desempenho detalhada entre os diferentes mercados da OTIS LATAM
        </p>
      </div>

      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-2">
          <Select
            value={selectedMetric}
            onValueChange={setSelectedMetric}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Métrica" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="performance">KPIs Gerais</SelectItem>
              <SelectItem value="installationTime">Tempo de Instalação</SelectItem>
              <SelectItem value="costEfficiency">Eficiência de Custo</SelectItem>
              <SelectItem value="marketShare">Participação de Mercado</SelectItem>
              <SelectItem value="monthlyTrends">Tendências Mensais</SelectItem>
              <SelectItem value="qualityMetrics">Métricas de Qualidade</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={selectedPeriod}
            onValueChange={setSelectedPeriod}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lastMonth">Último Mês</SelectItem>
              <SelectItem value="lastQuarter">Último Trimestre</SelectItem>
              <SelectItem value="lastYear">Último Ano</SelectItem>
              <SelectItem value="custom">Personalizado</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline">
            <FilterIcon className="h-4 w-4 mr-2" />
            Mais Filtros
          </Button>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={refreshData} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Atualizar Dados
          </Button>
          <Button variant="outline">
            <DownloadIcon className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      <div className="border rounded-md p-4">
        <h3 className="font-medium mb-4">Países para Comparação</h3>
        <div className="flex flex-wrap gap-2">
          {Object.keys(countryColors).map(country => (
            <Button
              key={country}
              variant={selectedCountries.includes(country) ? "default" : "outline"}
              onClick={() => {
                if (selectedCountries.includes(country)) {
                  if (selectedCountries.length > 1) { // Sempre manter ao menos um país selecionado
                    setSelectedCountries(selectedCountries.filter(c => c !== country));
                  }
                } else {
                  setSelectedCountries([...selectedCountries, country]);
                }
              }}
              style={{
                backgroundColor: selectedCountries.includes(country) ? countryColors[country] : 'transparent',
                color: selectedCountries.includes(country) ? 'white' : 'inherit',
                borderColor: countryColors[country]
              }}
            >
              {country}
            </Button>
          ))}
        </div>
      </div>

      {/* Conteúdo baseado na métrica selecionada */}
      {selectedMetric === 'performance' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>KPIs de Desempenho por País</CardTitle>
              <CardDescription>
                Comparativo dos principais indicadores de performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={getFilteredData(countryComparisonData.performance)}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="country" type="category" width={80} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="onTimeDelivery" name="Entrega no Prazo (%)" fill="#8884d8" />
                    <Bar dataKey="qualityIndex" name="Índice de Qualidade" fill="#82ca9d" />
                    <Bar dataKey="satisfaction" name="Satisfação (x20)" fill="#ffc658"
                         // Multiplicar por 20 para escala no gráfico
                         dataKey={data => data.satisfaction * 20} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Variação de Custo (%)</CardTitle>
                <CardDescription>
                  Desvio percentual em relação ao orçamento previsto
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={getFilteredData(countryComparisonData.performance)}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="country" />
                      <YAxis domain={[-5, 5]} />
                      <Tooltip />
                      <Bar dataKey="costVariance" name="Variação de Custo (%)">
                        {getFilteredData(countryComparisonData.performance).map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.costVariance < 0 ? '#4CAF50' : '#F44336'}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Análise de Satisfação do Cliente</CardTitle>
                <CardDescription>
                  Pontuação média de satisfação (0-5)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={getFilteredData(countryComparisonData.performance)}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="country" />
                      <YAxis domain={[0, 5]} />
                      <Tooltip />
                      <Bar dataKey="satisfaction" name="Satisfação (0-5)">
                        {getFilteredData(countryComparisonData.performance).map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={countryColors[entry.country]}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {selectedMetric === 'installationTime' && (
        <Card>
          <CardHeader>
            <CardTitle>Tempo Médio de Instalação por Tipo de Projeto</CardTitle>
            <CardDescription>
              Comparativo do tempo médio (em dias) para conclusão de instalações
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={getFilteredData(countryComparisonData.installationTime)}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="country" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="residential" name="Residencial" fill="#8884d8" />
                  <Bar dataKey="commercial" name="Comercial" fill="#82ca9d" />
                  <Bar dataKey="highRise" name="Arranha-céu" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {selectedMetric === 'costEfficiency' && (
        <Card>
          <CardHeader>
            <CardTitle>Índice de Eficiência Operacional</CardTitle>
            <CardDescription>
              Métrica composta que equilibra custo, prazo e qualidade para comparação justa entre países
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={getFilteredData(countryComparisonData.costEfficiency)}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="country" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="value" name="Índice de Eficiência (0-100)">
                    {getFilteredData(countryComparisonData.costEfficiency).map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={countryColors[entry.country]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {selectedMetric === 'marketShare' && (
        <Card>
          <CardHeader>
            <CardTitle>Participação de Mercado</CardTitle>
            <CardDescription>
              Percentual de mercado em cada país
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row items-center">
            <div className="h-80 w-full md:w-1/2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip />
                  <Legend />
                  <Pie
                    data={getFilteredData(countryComparisonData.marketShare)}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {getFilteredData(countryComparisonData.marketShare).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={countryColors[entry.country]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full md:w-1/2 mt-4 md:mt-0">
              <div className="space-y-2 p-4">
                <h3 className="font-medium">Análise de Mercado</h3>
                <p className="text-sm text-muted-foreground">
                  Comparativo da presença da OTIS nos diferentes mercados da América Latina.
                  O Chile destaca-se com a maior participação relativa, enquanto o Brasil representa
                  o maior volume absoluto devido ao tamanho do mercado.
                </p>
                <div className="space-y-1 mt-4">
                  {getFilteredData(countryComparisonData.marketShare).map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: countryColors[item.country] }}
                        ></div>
                        <span>{item.country}</span>
                      </div>
                      <span className="font-medium">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {selectedMetric === 'monthlyTrends' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tendência de Instalações Mensais</CardTitle>
              <CardDescription>
                Número de instalações concluídas por país ao longo do tempo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={countryComparisonData.monthlyTrends.installations}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {selectedCountries.map((country, index) => (
                      <Line
                        key={country}
                        type="monotone"
                        dataKey={country}
                        stroke={countryColors[country]}
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 8 }}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tendência de Satisfação do Cliente</CardTitle>
              <CardDescription>
                Evolução da pontuação de satisfação (0-5) por país
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={countryComparisonData.monthlyTrends.satisfaction}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[3.5, 5]} />
                    <Tooltip />
                    <Legend />
                    {selectedCountries.map((country, index) => (
                      <Line
                        key={country}
                        type="monotone"
                        dataKey={country}
                        stroke={countryColors[country]}
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 8 }}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {selectedMetric === 'qualityMetrics' && (
        <Card>
          <CardHeader>
            <CardTitle>Análise de Não Conformidades por Categoria</CardTitle>
            <CardDescription>
              Comparativo de defeitos reportados por tipo e país
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={countryComparisonData.qualityMetrics.defects.filter(
                    item => selectedCountries.includes(item.country)
                  )}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="country" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" name="Número de Defeitos">
                    {countryComparisonData.qualityMetrics.defects
                      .filter(item => selectedCountries.includes(item.country))
                      .map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            entry.category === 'Mecânico' ? '#8884d8' :
                            entry.category === 'Elétrico' ? '#82ca9d' : '#ffc658'
                          }
                        />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Benchmark Competitivo por Mercado</CardTitle>
          <CardDescription>
            Análise de posicionamento da OTIS versus concorrentes em cada mercado
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="brasil" className="w-full">
            <TabsList className="grid grid-cols-6 w-full">
              {Object.keys(countryColors).map(country => (
                <TabsTrigger
                  key={country}
                  value={country.toLowerCase()}
                  disabled={!selectedCountries.includes(country)}
                >
                  {country}
                </TabsTrigger>
              ))}
            </TabsList>
            {selectedCountries.map(country => (
              <TabsContent key={country} value={country.toLowerCase()} className="p-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Análise Competitiva: {country}</h3>
                  <p className="text-sm text-muted-foreground">
                    Comparativo de desempenho da OTIS versus principais concorrentes no mercado de {country}.
                    Dados baseados em métricas de mercado e pesquisas com clientes.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="border rounded-md p-4">
                      <div className="text-sm text-muted-foreground">Participação de Mercado</div>
                      <div className="text-2xl font-bold mt-2">
                        {countryComparisonData.marketShare.find(item => item.country === country)?.value}%
                      </div>
                      <div className="text-xs text-green-600 flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-4 h-4 mr-1"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 7a1 1 0 01-1 1H5a1 1 0 010-2h6a1 1 0 011 1zM5 11a1 1 0 011-1h4a1 1 0 110 2H6a1 1 0 01-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>+2.3% em relação ao ano anterior</span>
                      </div>
                    </div>
                    <div className="border rounded-md p-4">
                      <div className="text-sm text-muted-foreground">Índice de Qualidade</div>
                      <div className="text-2xl font-bold mt-2">
                        {countryComparisonData.performance.find(item => item.country === country)?.qualityIndex}/100
                      </div>
                      <div className="text-xs text-green-600">
                        5% acima da média do mercado
                      </div>
                    </div>
                    <div className="border rounded-md p-4">
                      <div className="text-sm text-muted-foreground">Posição Competitiva</div>
                      <div className="text-2xl font-bold mt-2">
                        {['1º', '2º', '3º'][Math.floor(Math.random() * 3)]} lugar
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Entre as principais empresas do setor
                      </div>
                      </div>
                 </div>
                 <div className="border rounded-md p-4 mt-4">
                   <h4 className="font-medium mb-3">Análise SWOT do Mercado de {country}</h4>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                       <h5 className="font-medium text-green-800">Forças</h5>
                       <ul className="mt-2 space-y-1 text-sm">
                         <li>• Reconhecimento da marca OTIS no mercado</li>
                         <li>• Qualidade superior em produtos de alta velocidade</li>
                         <li>• Equipe técnica altamente capacitada</li>
                         <li>• Rede de suporte abrangente no território</li>
                       </ul>
                     </div>
                     <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                       <h5 className="font-medium text-yellow-800">Fraquezas</h5>
                       <ul className="mt-2 space-y-1 text-sm">
                         <li>• Preço premium em relação aos concorrentes locais</li>
                         <li>• Tempos de entrega mais longos em projetos específicos</li>
                         <li>• Menor flexibilidade em customizações</li>
                       </ul>
                     </div>
                     <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                       <h5 className="font-medium text-blue-800">Oportunidades</h5>
                       <ul className="mt-2 space-y-1 text-sm">
                         <li>• Crescimento do mercado de edifícios inteligentes</li>
                         <li>• Demanda por soluções eco-eficientes</li>
                         <li>• Expansão urbana em cidades secundárias</li>
                         <li>• Projetos governamentais de infraestrutura</li>
                       </ul>
                     </div>
                     <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                       <h5 className="font-medium text-red-800">Ameaças</h5>
                       <ul className="mt-2 space-y-1 text-sm">
                         <li>• Entrada de competidores asiáticos com preços agressivos</li>
                         <li>• Instabilidade econômica regional</li>
                         <li>• Mudanças nas regulamentações de segurança</li>
                         <li>• Dificuldades logísticas em regiões específicas</li>
                       </ul>
                     </div>
                   </div>
                 </div>
               </div>
             </TabsContent>
           ))}
         </Tabs>
       </CardContent>
     </Card>

     <Card>
       <CardHeader>
         <CardTitle>Detecção de Anomalias por Região</CardTitle>
         <CardDescription>
           Identificação automática de desvios significativos de performance entre países
         </CardDescription>
       </CardHeader>
       <CardContent>
         <div className="space-y-4">
           <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50 rounded-r-md">
             <div className="flex items-start">
               <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-2" />
               <div>
                 <h3 className="font-medium text-yellow-800">Anomalia Detectada: Tempo de Instalação em Colômbia</h3>
                 <p className="text-sm text-yellow-800 mt-1">
                   O tempo médio de instalação para projetos comerciais na Colômbia está 15.3% acima da média regional.
                   Possíveis fatores incluem dificuldades logísticas e regulamentações locais mais rigorosas.
                 </p>
                 <div className="mt-2">
                   <Button size="sm" variant="outline" className="text-yellow-800 border-yellow-500 hover:bg-yellow-100">
                     Ver Análise Detalhada
                   </Button>
                 </div>
               </div>
             </div>
           </div>

           <div className="p-4 border-l-4 border-red-500 bg-red-50 rounded-r-md">
             <div className="flex items-start">
               <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 mr-2" />
               <div>
                 <h3 className="font-medium text-red-800">Anomalia Crítica: Taxa de Defeitos na Argentina</h3>
                 <p className="text-sm text-red-800 mt-1">
                   A taxa de defeitos mecânicos reportados na Argentina é significativamente maior (+37.5%) que a média
                   regional. Recomenda-se uma investigação imediata e possível revisão dos processos de controle de qualidade.
                 </p>
                 <div className="mt-2">
                   <Button size="sm" className="bg-red-600 text-white hover:bg-red-700">
                     Criar Plano de Ação
                   </Button>
                 </div>
               </div>
             </div>
           </div>

           <div className="p-4 border-l-4 border-green-500 bg-green-50 rounded-r-md">
             <div className="flex items-start">
               <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-2" />
               <div>
                 <h3 className="font-medium text-green-800">Destaque Positivo: Eficiência Operacional no Chile</h3>
                 <p className="text-sm text-green-800 mt-1">
                   O Chile apresenta os melhores indicadores de eficiência operacional da região, com desempenho 12.8%
                   acima da média. Recomenda-se documentar e compartilhar as práticas adotadas neste mercado.
                 </p>
                 <div className="mt-2">
                   <Button size="sm" variant="outline" className="text-green-800 border-green-500 hover:bg-green-100">
                     Documentar Melhores Práticas
                   </Button>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </CardContent>
     </Card>

     <Card>
       <CardHeader>
         <CardTitle>Taxa de Adoção de Melhores Práticas</CardTitle>
         <CardDescription>
           Métrica que avalia como cada país implementa procedimentos padronizados
         </CardDescription>
       </CardHeader>
       <CardContent>
         <div className="h-80">
           <ResponsiveContainer width="100%" height="100%">
             <BarChart
               data={getFilteredData(countryComparisonData.costEfficiency)}
               margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
             >
               <CartesianGrid strokeDasharray="3 3" />
               <XAxis dataKey="country" />
               <YAxis domain={[0, 100]} />
               <Tooltip />
               <Legend />
               <Bar
                 dataKey="value"
                 name="Taxa de Adoção (%)"
                 fill="#8884d8"
               >
                 {getFilteredData(countryComparisonData.costEfficiency).map((entry, index) => (
                   <Cell
                     key={`cell-${index}`}
                     fill={countryColors[entry.country]}
                   />
                 ))}
               </Bar>
             </BarChart>
           </ResponsiveContainer>
         </div>
         <div className="mt-4 p-4 border rounded-md bg-muted/20">
           <h3 className="font-medium mb-2">Análise de Transferência de Conhecimento</h3>
           <p className="text-sm text-muted-foreground">
             A análise de adoção de melhores práticas mostra que o Chile tem a maior taxa de implementação
             de procedimentos padronizados OTIS, seguido pelo Brasil. A implementação consistente de
             melhores práticas correlaciona-se diretamente com melhores índices de qualidade e satisfação
             do cliente em todos os mercados analisados.
           </p>
           <div className="mt-4">
             <h4 className="text-sm font-medium">Recomendações:</h4>
             <ul className="mt-2 space-y-1 text-sm">
               <li>• Estabelecer programa de intercâmbio de conhecimento entre equipes do Chile e Argentina</li>
               <li>• Documentar procedimentos bem-sucedidos do Brasil para compartilhamento regional</li>
               <li>• Implementar workshops trimestrais de melhores práticas com representantes de todos os países</li>
             </ul>
           </div>
         </div>
       </CardContent>
     </Card>

     <Card>
       <CardHeader>
         <CardTitle>Índice de Complexidade de Instalação Ajustado</CardTitle>
         <CardDescription>
           Análise que considera diferenças em tipos de edificações e requisitos por região
         </CardDescription>
       </CardHeader>
       <CardContent className="space-y-4">
         <div className="p-4 border rounded-md bg-muted/20">
           <h3 className="font-medium mb-2">Sobre o Índice de Complexidade</h3>
           <p className="text-sm text-muted-foreground">
             Este índice foi desenvolvido para permitir comparações mais justas entre mercados com características
             distintas. Ele considera fatores como: tipos predominantes de edificações, regulamentações locais,
             condições sísmicas, requisitos de segurança, e particularidades climáticas que afetam a instalação
             e manutenção. Um índice mais alto indica maior complexidade média dos projetos.
           </p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
           {selectedCountries.map(country => (
             <div key={country} className="border rounded-md p-4">
               <div className="flex justify-between items-start">
                 <h3 className="font-medium">{country}</h3>
                 <div
                   className="w-4 h-4 rounded-full"
                   style={{ backgroundColor: countryColors[country] }}
                 ></div>
               </div>
               <div className="mt-4">
                 <div className="flex justify-between text-sm mb-1">
                   <span>Índice de Complexidade</span>
                   <span className="font-medium">{
                     // Valores fictícios para simulação
                     Math.round(65 + Math.random() * 25)
                   }/100</span>
                 </div>
                 <div className="w-full bg-muted rounded-full h-2">
                   <div
                     className="h-full rounded-full"
                     style={{
                       width: `${Math.round(65 + Math.random() * 25)}%`,
                       backgroundColor: countryColors[country]
                     }}
                   />
                 </div>
               </div>
               <div className="mt-4 space-y-2">
                 <div className="flex justify-between text-xs">
                   <span>Regulamentações</span>
                   <span>{Math.round(3 + Math.random() * 2)}/5</span>
                 </div>
                 <div className="flex justify-between text-xs">
                   <span>Condições Sísmicas</span>
                   <span>{Math.round(1 + Math.random() * 4)}/5</span>
                 </div>
                 <div className="flex justify-between text-xs">
                   <span>Complexidade Arquitetônica</span>
                   <span>{Math.round(2 + Math.random() * 3)}/5</span>
                 </div>
                 <div className="flex justify-between text-xs">
                   <span>Desafios Logísticos</span>
                   <span>{Math.round(2 + Math.random() * 3)}/5</span>
                 </div>
               </div>
             </div>
           ))}
         </div>
       </CardContent>
     </Card>
   </div>
 );
};

export default CountryComparisonAnalytics;