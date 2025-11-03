import { useMemo } from 'react';
import { LineChart } from '@mantine/charts';
import { useWeightsForAnimal } from '../../useApi';

type AnimalWeightChartProps = {
  animalId: number;
};

export function AnimalWeightChart({ animalId }: AnimalWeightChartProps) {
  const animalWeights = useWeightsForAnimal(animalId);

  const lineData = useMemo(() => {
    return (
      animalWeights.data
        ?.map((weight) => ({
          rawDate: new Date(weight.weight_date),
          date: new Date(weight.weight_date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          }),
          weight: weight.weight_value_kg,
        }))
        .sort((a, b) => a.rawDate.getTime() - b.rawDate.getTime()) ?? []
    );
  }, [animalWeights.data]);

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
