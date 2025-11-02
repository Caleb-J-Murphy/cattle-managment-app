import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Tabs, Text, Title } from '@mantine/core';
import {
  convertEBVToRadarReadable,
  EbvWeightRadarChart,
} from '../components/EBV/EbvWeightRadarChart';
import { EbvWeightTable } from '../components/EBV/EbvWeightTable';
import { EBV } from '../web/types';

export const ViewAnimalPage = () => {
  const { id } = useParams<{ id: string }>();

  const exampleEBV: EBV = {
    gestationLengthDays: 0.7,
    birthWeight: 3,
    weight200DaysKg: 28,
    weight400DaysKg: 41,
    weight600DaysKg: 64,
    matureCowWeightKg: 54,
    milkKg: 12,
    scrotalSizeKg: 4.2,
    carcusWeightKg: 54,
    eyeMuscleAreaKg: -0.5,
    rumpFatMm: 2.4,
    retailBeefYeildPerc: -0.2,
    marbleScore: 0,
    marbleFinenessPerc: 0.04,
  };

  const radarData = useMemo(() => convertEBVToRadarReadable(exampleEBV), [exampleEBV]);

  const baseSeries = [
    { name: 'Weight (kg)', color: 'blue.4', opacity: 0.4 },
    { name: 'Top 1% weight (kg)', color: 'green.4', opacity: 0.4 },
    { name: 'Top 10% weight (kg)', color: 'orange.4', opacity: 0.4 },
    { name: 'Top 50% weight (kg)', color: 'red.4', opacity: 0.4 },
  ];

  return (
    <Tabs color="blue" defaultValue="weights">
      <Title>
        Viewing Animal{' '}
        <Text inherit component="span" c="blue">
          {id}
        </Text>
      </Title>
      <Tabs.List>
        <Tabs.Tab value="weights">Weights</Tabs.Tab>
        <Tabs.Tab value="vaccination">Vaccinations</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="weights" pt="xs">
        <Box style={{ display: 'flex', flexDirection: 'row' }}>
          <EbvWeightRadarChart data={radarData} series={baseSeries} />
          <EbvWeightTable data={[exampleEBV]} />
        </Box>
      </Tabs.Panel>

      <Tabs.Panel value="vaccination" pt="xs">
        This is the second panel
      </Tabs.Panel>
    </Tabs>
  );
};
