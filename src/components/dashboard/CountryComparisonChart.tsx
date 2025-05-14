
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Brasil',
    prazo: 85,
    custo: 90,
    qualidade: 88,
  },
  {
    name: 'México',
    prazo: 75,
    custo: 82,
    qualidade: 90,
  },
  {
    name: 'Colômbia',
    prazo: 80,
    custo: 85,
    qualidade: 82,
  },
  {
    name: 'Chile',
    prazo: 92,
    custo: 78,
    qualidade: 94,
  },
  {
    name: 'Argentina',
    prazo: 70,
    custo: 75,
    qualidade: 85,
  },
];

export function CountryComparisonChart() {
  return (
    <Card className="h-[400px]">
      <CardHeader>
        <CardTitle className="text-lg">Comparação entre Países</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} />
            <Tooltip 
              formatter={(value) => [`${value}%`, null]}
              contentStyle={{ borderRadius: '8px' }}
            />
            <Legend />
            <Bar dataKey="prazo" name="Prazo" fill="#0073C0" radius={[4, 4, 0, 0]} />
            <Bar dataKey="custo" name="Custo" fill="#22C55E" radius={[4, 4, 0, 0]} />
            <Bar dataKey="qualidade" name="Qualidade" fill="#F59E0B" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
