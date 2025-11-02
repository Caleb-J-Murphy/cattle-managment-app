import { useMemo, useState } from 'react';
import { RadarChart } from '@mantine/charts';
import {
  Box,
  Button,
  Divider,
  MantineStyleProp,
  Paper,
  Popover,
  Stack,
  Switch,
  Text,
  Title,
} from '@mantine/core';

const displayContainerStyles: MantineStyleProp = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
  minWidth: 148,
  margin: '0 auto',
  height: 'min-content',
};

const containerStyles: MantineStyleProp = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  justifyItems: 'center',
  gap: '0rem',
  width: 'fit-content',
};

const chartContainerStyles: MantineStyleProp = {
  flex: 1,
  minWidth: 340,
};

type EbvRadarChartProps = {
  data: Record<string, number | string>[];
  series: { name: string; color: string; opacity?: number }[];
  title?: string;
  height?: number;
};

export const EbvRadarChart = ({
  data,
  series,
  title = 'EBV Weight Values',
  height = 300,
}: EbvRadarChartProps) => {
  const [show1Perc, setShow1Perc] = useState(true);
  const [show10Perc, setShow10Perc] = useState(true);
  const [show50Perc, setShow50Perc] = useState(true);

  const allValues = useMemo(
    () =>
      data.flatMap((d) =>
        Object.entries(d)
          .filter(([key]) => key !== 'trait')
          .map(([, value]) => value as number)
      ),
    [data]
  );

  const maxValue = Math.ceil(Math.max(...allValues) / 10) * 10;
  const minValue = Math.floor(Math.min(...allValues) / 10) * 10;

  const filteredSeries = useMemo(
    () =>
      series.filter((s) =>
        s.name.includes('Top 1%')
          ? show1Perc
          : s.name.includes('Top 10%')
            ? show10Perc
            : s.name.includes('Top 50%')
              ? show50Perc
              : true
      ),
    [series, show1Perc, show10Perc, show50Perc]
  );

  return (
    <Paper p="md" style={containerStyles}>
      <Box style={chartContainerStyles}>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Title order={4}>{title}</Title>

          <Popover width={220} position="right" withArrow shadow="md">
            <Popover.Target>
              <Button variant="outline" size="sm">
                Display options
              </Button>
            </Popover.Target>
            <Popover.Dropdown>
              <Stack>
                <Switch
                  checked={show1Perc}
                  onChange={() => setShow1Perc((v) => !v)}
                  label="Top 1%"
                />
                <Switch
                  checked={show10Perc}
                  onChange={() => setShow10Perc((v) => !v)}
                  label="Top 10%"
                />
                <Switch
                  checked={show50Perc}
                  onChange={() => setShow50Perc((v) => !v)}
                  label="Top 50%"
                />
              </Stack>
            </Popover.Dropdown>
          </Popover>
        </Box>

        <RadarChart
          h={height}
          data={data}
          dataKey="trait"
          withPolarRadiusAxis
          withTooltip
          series={filteredSeries}
          polarRadiusAxisProps={{
            domain: [minValue, maxValue],
            axisLine: false,
            tick: false,
            tickLine: false,
          }}
        />
      </Box>
    </Paper>
  );
};
