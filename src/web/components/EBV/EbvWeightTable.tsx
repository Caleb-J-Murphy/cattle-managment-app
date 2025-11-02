import { Paper, ScrollArea, Table, Text, Title } from '@mantine/core';
import { top1PercentEBV, top10PercentEBV, top50PercentEBV } from '../../data/ebvData';
import { EBV } from '../../types';

type EbvTableProps = {
  data: EBV[]; // array of EBVs
};

export const EbvWeightTable = ({ data }: EbvTableProps) => {
  const columnLabels = ['Animal', 'Top 1%', 'Top 10%', 'Top 50%'];

  data.push(top1PercentEBV, top10PercentEBV, top50PercentEBV);

  const traits: { key: keyof EBV; label: string }[] = [
    { key: 'birthWeight', label: 'Birth' },
    { key: 'weight200DaysKg', label: '200 Day' },
    { key: 'weight400DaysKg', label: '400 Day' },
    { key: 'weight600DaysKg', label: '600 Day' },
    { key: 'matureCowWeightKg', label: 'Mature Cow' },
    { key: 'carcusWeightKg', label: 'Carcus' },
  ];

  return (
    <Paper p="md">
      <Title order={4} mb="sm">
        EBV Weights
      </Title>
      <ScrollArea style={{ maxHeight: 400, marginTop: 16 }}>
        <Table striped highlightOnHover withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Trait</Table.Th>
              {columnLabels.map((label) => (
                <Table.Th key={label}>{label}</Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {traits.map((trait) => (
              <Table.Tr key={trait.key}>
                <Table.Td>
                  <Text fw={500}>{trait.label}</Text>
                </Table.Td>
                {data.map((ebv, idx) => (
                  <Table.Td key={idx}>{ebv[trait.key]}</Table.Td>
                ))}
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </ScrollArea>
    </Paper>
  );
};
