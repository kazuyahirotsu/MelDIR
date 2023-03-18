import { FC } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
export const dummyData: Data[] = [
  { time: '10:33:00', temperature: 60 },
  { time: '10:33:03', temperature: 58 },
  { time: '10:33:06', temperature: 56 },
  { time: '10:33:09', temperature: 52 },
  { time: '10:33:12', temperature: 50 },
  { time: '10:33:15', temperature: 40 },
  { time: '10:33:18', temperature: 38 },
  { time: '10:33:21', temperature: 36 },
  { time: '10:33:24', temperature: 32 },
  { time: '10:33:27', temperature: 30 },
  { time: '10:33:30', temperature: 20 },
  { time: '10:33:33', temperature: 18 },
  { time: '10:33:36', temperature: 16 },
  { time: '10:33:39', temperature: 12 },
  { time: '10:33:42', temperature: 10 },
];

export type Data = {
  time: string;
  temperature: number;
};

interface ChartProps {
  data: Data[];
}

export const Chart: FC<ChartProps> = ({ data }) => {
  return (
    <LineChart width={400} height={300} data={data ? data : dummyData}>
      <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="time" />
      <YAxis domain={[10, 60]} />
    </LineChart>
  );
};
