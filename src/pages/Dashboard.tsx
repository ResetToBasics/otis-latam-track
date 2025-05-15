
import { 
  BarChart,
  CheckCircle, 
  Clock, 
  Users
} from 'lucide-react';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { CountryComparisonChart } from '@/components/dashboard/CountryComparisonChart';
import { ProjectStatusChart } from '@/components/dashboard/ProjectStatusChart';
import { CustomerSatisfactionChart } from '@/components/dashboard/CustomerSatisfactionChart';
import { InstallationsChart } from '@/components/dashboard/InstallationsChart';
import { RecentProjects } from '@/components/dashboard/RecentProjects';
import { DashboardFilters } from '@/components/dashboard/DashboardFilters';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Dashboard Executivo</h1>
        <p className="text-muted-foreground mt-1">
          Visão geral de KPIs e métricas de desempenho da OTIS LATAM
        </p>
      </div>

      <DashboardFilters />

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Projetos em Andamento"
          value="143"
          trend={5.2}
          trendLabel="vs. mês passado"
          icon={<BarChart className="h-6 w-6" />}
        />
        <StatsCard 
          title="Taxa de Entrega no Prazo"
          value="85.2%"
          trend={2.4}
          trendLabel="vs. mês passado"
          icon={<Clock className="h-6 w-6" />}
        />
        <StatsCard 
          title="Índice de Qualidade"
          value="92.8%"
          trend={-1.3}
          trendLabel="vs. mês passado"
          icon={<CheckCircle className="h-6 w-6" />}
        />
        <StatsCard 
          title="Satisfação do Cliente"
          value="4.7/5"
          trend={0.3}
          trendLabel="vs. mês passado"
          icon={<Users className="h-6 w-6" />}
        />
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <CountryComparisonChart />
        <ProjectStatusChart />
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <CustomerSatisfactionChart />
        <InstallationsChart />
      </div>

      <div>
        <RecentProjects />
      </div>
    </div>
  );
};

export default Dashboard;
