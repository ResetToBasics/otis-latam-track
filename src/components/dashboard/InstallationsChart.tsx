
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', planejadas: 40, realizadas: 35 },
  { name: 'Fev', planejadas: 45, realizadas: 40 },
  { name: 'Mar', planejadas: 50, realizadas: 48 },
  { name: 'Abr', planejadas: 55, realizadas: 50 },
  { name: 'Mai', planejadas: 60, realizadas: 56 },
  { name: 'Jun', planejadas: 65, realizadas: 60 },
  { name: 'Jul', planejadas: 70, realizadas: 65 },
  { name: 'Ago', planejadas: 75, realizadas: 72 },
  { name: 'Set', planejadas: 80, realizadas: 78 },
  { name: 'Out', planejadas: 85, realizadas: 80 },
  { name: 'Nov', planejadas: 90, realizadas: 85 },
  { name: 'Dez', planejadas: 95, realizadas: 90 },
];

export function InstallationsChart() {
  return (
    <Card className="h-[400px]">
      <CardHeader>
        <CardTitle className="text-lg">Instalações: Planejadas vs. Realizadas</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="planejadas" name="Planejadas" stroke="#0073C0" fill="#0073C0" fillOpacity={0.3} />
            <Area type="monotone" dataKey="realizadas" name="Realizadas" stroke="#22C55E" fill="#22C55E" fillOpacity={0.3} />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
