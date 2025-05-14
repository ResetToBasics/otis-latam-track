
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search,
  Plus,
  Filter,
  ArrowUpDown
} from "lucide-react";

const projectsList = [
  {
    id: "BR-2023-001",
    name: "Torre Corporativa São Paulo",
    client: "Grupo Empresarial Brasileiro",
    location: "São Paulo, Brasil",
    status: "on-track",
    progress: 75,
    startDate: "10/01/2023",
    endDate: "15/09/2023",
  },
  {
    id: "MX-2023-042",
    name: "Plaza Central Ciudad de México",
    client: "Inversiones Mexicanas S.A.",
    location: "Cidade do México, México",
    status: "at-risk",
    progress: 45,
    startDate: "15/03/2023",
    endDate: "30/11/2023",
  },
  {
    id: "AR-2023-018",
    name: "Torre Libertador Buenos Aires",
    client: "Consorcio Argentino",
    location: "Buenos Aires, Argentina",
    status: "delayed",
    progress: 30,
    startDate: "22/02/2023",
    endDate: "10/10/2023",
  },
  {
    id: "CL-2023-007",
    name: "Centro Costanera Santiago",
    client: "Desarrollos Chilenos Ltda.",
    location: "Santiago, Chile",
    status: "completed",
    progress: 100,
    startDate: "05/12/2022",
    endDate: "20/04/2023",
  },
  {
    id: "CO-2023-023",
    name: "Edificio Central Bogotá",
    client: "Constructora Colombiana",
    location: "Bogotá, Colômbia",
    status: "on-track",
    progress: 60,
    startDate: "18/02/2023",
    endDate: "25/08/2023",
  },
  {
    id: "PE-2023-012",
    name: "Torre Miraflores Lima",
    client: "Inversiones Peruanas",
    location: "Lima, Peru",
    status: "on-track",
    progress: 50,
    startDate: "07/04/2023",
    endDate: "15/12/2023",
  },
];

const statusMap = {
  "on-track": { label: "No Prazo", class: "status-on-track" },
  "at-risk": { label: "Em Risco", class: "status-at-risk" },
  "delayed": { label: "Atrasado", class: "status-delayed" },
  "completed": { label: "Concluído", class: "status-completed" },
};

const Projects = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Projetos</h1>
        <p className="text-muted-foreground mt-1">
          Gerencie todos os projetos de instalação de elevadores OTIS
        </p>
      </div>

      <div className="flex flex-wrap gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input 
            type="search" 
            placeholder="Buscar projetos..." 
            className="pl-8 w-full bg-white dark:bg-sidebar"
          />
        </div>
        
        <Button>
          <Filter className="h-4 w-4 mr-2" />
          Filtros
        </Button>

        <Button className="bg-otis-500 hover:bg-otis-600">
          <Plus className="h-4 w-4 mr-2" />
          Novo Projeto
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Lista de Projetos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto">
            <table className="w-full data-table">
              <thead>
                <tr>
                  <th className="whitespace-nowrap">
                    <Button variant="ghost" size="sm" className="p-0 font-medium text-sm -ml-3">
                      ID <ArrowUpDown className="h-3 w-3 ml-1" />
                    </Button>
                  </th>
                  <th>
                    <Button variant="ghost" size="sm" className="p-0 font-medium text-sm text-left -ml-3">
                      Nome do Projeto <ArrowUpDown className="h-3 w-3 ml-1" />
                    </Button>
                  </th>
                  <th className="hidden md:table-cell whitespace-nowrap">Cliente</th>
                  <th className="hidden md:table-cell whitespace-nowrap">Localização</th>
                  <th>
                    <Button variant="ghost" size="sm" className="p-0 font-medium text-sm -ml-3">
                      Status <ArrowUpDown className="h-3 w-3 ml-1" />
                    </Button>
                  </th>
                  <th className="hidden md:table-cell whitespace-nowrap">Progresso</th>
                  <th className="text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {projectsList.map((project) => (
                  <tr key={project.id} className="hover:bg-muted/50">
                    <td className="font-medium text-sm">{project.id}</td>
                    <td>
                      <div className="font-medium">{project.name}</div>
                      <div className="text-xs text-muted-foreground md:hidden">
                        {project.client}
                      </div>
                    </td>
                    <td className="hidden md:table-cell">{project.client}</td>
                    <td className="hidden md:table-cell">{project.location}</td>
                    <td>
                      <Badge
                        variant="outline"
                        className={statusMap[project.status as keyof typeof statusMap].class}
                      >
                        {statusMap[project.status as keyof typeof statusMap].label}
                      </Badge>
                    </td>
                    <td className="hidden md:table-cell">
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className={
                            project.status === "on-track" ? "bg-green-500 h-full rounded-full" :
                            project.status === "at-risk" ? "bg-yellow-500 h-full rounded-full" :
                            project.status === "delayed" ? "bg-red-500 h-full rounded-full" :
                            "bg-blue-500 h-full rounded-full"
                          }
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <div className="text-xs text-right mt-1">
                        {project.progress}%
                      </div>
                    </td>
                    <td className="text-right">
                      <Button variant="ghost" size="sm">
                        Detalhes
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Projects;
