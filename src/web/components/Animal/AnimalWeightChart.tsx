import { LineChart } from '@mantine/charts';
import { useWeightsForAnimal } from '../../useApi';

type AnimalWeightChartProps = {
  animalId: number;
};

export function AnimalWeightChart({ animalId }: AnimalWeightChartProps) {
  const animalWeights = useWeightsForAnimal(animalId);

  const lineData =
    animalWeights.data?.map((weight) => ({
      date: new Date(weight.weight_date).toLocaleDateString('en-US', {
        month: 'short', // "Jan", "Feb", "Mar", etc.
        day: 'numeric', // "1", "2", "3", ...
      }),
      weight: weight.weight_value_kg,
    })) ?? [];

  console.log('lineData:', lineData);

  return (
    <LineChart
      h={300}
      data={lineData}
      dataKey="date"
      series={[{ name: 'weight', color: 'indigo.6' }]}
      curveType="linear"
    />
  );
}
