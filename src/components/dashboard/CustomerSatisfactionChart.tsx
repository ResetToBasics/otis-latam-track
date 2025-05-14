
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', satisfação: 75 },
  { name: 'Fev', satisfação: 78 },
  { name: 'Mar', satisfação: 80 },
  { name: 'Abr', satisfação: 79 },
  { name: 'Mai', satisfação: 82 },
  { name: 'Jun', satisfação: 85 },
  { name: 'Jul', satisfação: 87 },
  { name: 'Ago', satisfação: 86 },
  { name: 'Set', satisfação: 89 },
  { name: 'Out', satisfação: 90 },
  { name: 'Nov', satisfação: 91 },
  { name: 'Dez', satisfação: 92 },
];

export function CustomerSatisfactionChart() {
  return (
    <Card className="h-[400px]">
      <CardHeader>
        <CardTitle className="text-lg">Tendência de Satisfação do Cliente</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
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
            <YAxis domain={[70, 100]} />
            <Tooltip formatter={(value) => [`${value}%`, 'Satisfação']} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="satisfação" 
              name="Satisfação" 
              stroke="#0073C0" 
              strokeWidth={3}
              dot={{ stroke: '#0073C0', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
