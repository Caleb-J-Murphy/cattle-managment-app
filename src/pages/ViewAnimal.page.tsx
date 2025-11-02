import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Text, Title } from '@mantine/core';
import { EbvRadarChart } from '@/components/EBV/EbvRadarChart';
import { EbvTable } from '@/components/EBV/EbvTable';
import { EBV } from '@/web/types';

type RadarReadable = {
  trait: string;
  'Weight (kg)': number;
  'Top 1% weight (kg)': number;
  'Top 10% weight (kg)': number;
  'Top 50% weight (kg)': number;
};

function convertEBVToRadarReadable(
  animalEbv: EBV,
  top1PercEbv: EBV,
  top10PercEbv: EBV,
  top50PercEbv: EBV
): RadarReadable[] {
  return [
    {
      trait: 'Birth',
      'Weight (kg)': animalEbv.birthWeight,
      'Top 1% weight (kg)': top1PercEbv.birthWeight,
      'Top 10% weight (kg)': top10PercEbv.birthWeight,
      'Top 50% weight (kg)': top50PercEbv.birthWeight,
    },
    {
      trait: '200 Day',
      'Weight (kg)': animalEbv.weight200DaysKg,
      'Top 1% weight (kg)': top1PercEbv.weight200DaysKg,
      'Top 10% weight (kg)': top10PercEbv.weight200DaysKg,
      'Top 50% weight (kg)': top50PercEbv.weight200DaysKg,
    },
    {
      trait: '400 Day',
      'Weight (kg)': animalEbv.weight400DaysKg,
      'Top 1% weight (kg)': top1PercEbv.weight400DaysKg,
      'Top 10% weight (kg)': top10PercEbv.weight400DaysKg,
      'Top 50% weight (kg)': top50PercEbv.weight400DaysKg,
    },
    {
      trait: '600 Day',
      'Weight (kg)': animalEbv.weight600DaysKg,
      'Top 1% weight (kg)': top1PercEbv.weight600DaysKg,
      'Top 10% weight (kg)': top10PercEbv.weight600DaysKg,
      'Top 50% weight (kg)': top50PercEbv.weight600DaysKg,
    },
    {
      trait: 'Mature Cow',
      'Weight (kg)': animalEbv.matureCowWeightKg,
      'Top 1% weight (kg)': top1PercEbv.matureCowWeightKg,
      'Top 10% weight (kg)': top10PercEbv.matureCowWeightKg,
      'Top 50% weight (kg)': top50PercEbv.matureCowWeightKg,
    },
    {
      trait: 'Carcus',
      'Weight (kg)': animalEbv.carcusWeightKg,
      'Top 1% weight (kg)': top1PercEbv.carcusWeightKg,
      'Top 10% weight (kg)': top10PercEbv.carcusWeightKg,
      'Top 50% weight (kg)': top50PercEbv.carcusWeightKg,
    },
  ];
}

// Top 1% EBV values
export const top1PercentEBV: EBV = {
  gestationLengthDays: -3.9,
  birthWeight: -3.1,
  weight200DaysKg: 36,
  weight400DaysKg: 60,
  weight600DaysKg: 81,
  matureCowWeightKg: 89,
  milkKg: 10,
  scrotalSizeKg: 2.1,
  carcusWeightKg: 74,
  eyeMuscleAreaKg: 12.6,
  rumpFatMm: 5.1,
  retailBeefYeildPerc: 2.6,
  marbleScore: 3.3,
  marbleFinenessPerc: 0.58,
};

// Top 10% EBV values
export const top10PercentEBV: EBV = {
  gestationLengthDays: -2.2,
  birthWeight: -1.1,
  weight200DaysKg: 24,
  weight400DaysKg: 40,
  weight600DaysKg: 54,
  matureCowWeightKg: 59,
  milkKg: 4,
  scrotalSizeKg: 1.0,
  carcusWeightKg: 49,
  eyeMuscleAreaKg: 8.2,
  rumpFatMm: 2.7,
  retailBeefYeildPerc: 1.6,
  marbleScore: 2.5,
  marbleFinenessPerc: 0.43,
};

// Top 50% EBV values
export const top50PercentEBV: EBV = {
  gestationLengthDays: -0.2,
  birthWeight: 1.3,
  weight200DaysKg: 11,
  weight400DaysKg: 18,
  weight600DaysKg: 25,
  matureCowWeightKg: 26,
  milkKg: 0,
  scrotalSizeKg: -0.2,
  carcusWeightKg: 21,
  eyeMuscleAreaKg: 3.2,
  rumpFatMm: -0.2,
  retailBeefYeildPerc: 0.3,
  marbleScore: 1.4,
  marbleFinenessPerc: 0.24,
};

const exampleEBVAverage: EBV = {
  gestationLengthDays: 0.3,
  birthWeight: 1.3,
  weight200DaysKg: 11,
  weight400DaysKg: 19,
  weight600DaysKg: 26,
  matureCowWeightKg: 26,
  milkKg: 0,
  scrotalSizeKg: -0.2,
  carcusWeightKg: 22,
  eyeMuscleAreaKg: 3.3,
  rumpFatMm: -0.3,
  retailBeefYeildPerc: 0.4,
  marbleScore: 1.4,
  marbleFinenessPerc: 0.24,
};

export const ViewAnimalPage = () => {
  const { id } = useParams<{ id: string }>();

  const exampleEBV: EBV = {
    gestationLengthDays: 0.7,
    birthWeight: 4.2,
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

  const radarData = useMemo(
    () => convertEBVToRadarReadable(exampleEBV, top1PercentEBV, top10PercentEBV, top50PercentEBV),
    [exampleEBV]
  );

  const baseSeries = [
    { name: 'Weight (kg)', color: 'blue.4', opacity: 0.4 },
    { name: 'Top 1% weight (kg)', color: 'green.4', opacity: 0.4 },
    { name: 'Top 10% weight (kg)', color: 'orange.4', opacity: 0.4 },
    { name: 'Top 50% weight (kg)', color: 'red.4', opacity: 0.4 },
  ];

  return (
    <Box>
      <Title>
        Viewing Animal{' '}
        <Text inherit component="span" c="blue">
          {id}
        </Text>
      </Title>
      <Box style={{ display: 'flex', flexDirection: 'row' }}>
        <EbvRadarChart data={radarData} series={baseSeries} />
        <EbvTable data={[exampleEBV, top1PercentEBV, top10PercentEBV, top50PercentEBV]} />
      </Box>
    </Box>
  );
};
