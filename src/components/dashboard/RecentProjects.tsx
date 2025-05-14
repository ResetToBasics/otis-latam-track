
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Project {
  id: string;
  name: string;
  country: string;
  status: 'on-track' | 'at-risk' | 'delayed' | 'completed';
  progress: number;
  lastUpdated: string;
}

const projects: Project[] = [
  {
    id: 'BR-2023-001',
    name: 'Torre Corporativa São Paulo',
    country: 'Brasil',
    status: 'on-track',
    progress: 75,
    lastUpdated: '2023-05-12',
  },
  {
    id: 'MX-2023-042',
    name: 'Plaza Central Ciudad de México',
    country: 'México',
    status: 'at-risk',
    progress: 45,
    lastUpdated: '2023-05-10',
  },
  {
    id: 'AR-2023-018',
    name: 'Torre Libertador Buenos Aires',
    country: 'Argentina',
    status: 'delayed',
    progress: 30,
    lastUpdated: '2023-05-08',
  },
  {
    id: 'CL-2023-007',
    name: 'Centro Costanera Santiago',
    country: 'Chile',
    status: 'completed',
    progress: 100,
    lastUpdated: '2023-05-05',
  },
];

const statusMap = {
  'on-track': { label: 'No Prazo', class: 'status-on-track' },
  'at-risk': { label: 'Em Risco', class: 'status-at-risk' },
  'delayed': { label: 'Atrasado', class: 'status-delayed' },
  'completed': { label: 'Concluído', class: 'status-completed' },
};

export function RecentProjects() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">Projetos Recentes</CardTitle>
        <Button variant="ghost" size="sm">
          Ver todos
        </Button>
      </CardHeader>
      <CardContent>
        <div className="data-table">
          <table className="w-full">
            <thead>
              <tr>
                <th>ID</th>
                <th>Projeto</th>
                <th className="hidden md:table-cell">País</th>
                <th>Status</th>
                <th className="hidden md:table-cell">Progresso</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-muted/50">
                  <td className="font-medium text-sm">{project.id}</td>
                  <td>
                    <div>
                      <div className="font-medium">{project.name}</div>
                      <div className="text-xs text-muted-foreground md:hidden">
                        {project.country}
                      </div>
                    </div>
                  </td>
                  <td className="hidden md:table-cell">{project.country}</td>
                  <td>
                    <Badge
                      variant="outline"
                      className={cn(statusMap[project.status].class)}
                    >
                      {statusMap[project.status].label}
                    </Badge>
                  </td>
                  <td className="hidden md:table-cell">
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className={cn(
                          "h-full rounded-full",
                          project.status === 'on-track' && "bg-green-500",
                          project.status === 'at-risk' && "bg-yellow-500",
                          project.status === 'delayed' && "bg-red-500",
                          project.status === 'completed' && "bg-blue-500"
                        )}
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <div className="text-xs text-right mt-1">
                      {project.progress}%
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
