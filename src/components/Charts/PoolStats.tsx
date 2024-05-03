import { LineChart } from '@mui/x-charts/LineChart';
import { BaseRecord } from '@refinedev/core';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

interface Props {
  data: BaseRecord[] | undefined;
}

export const PoolStats:React.FC<Props> = ({ data }) => {
  const [poolStatsXLabels, setPoolStatsXLabels] = useState<string[]>([]);
  const [poolStatsSolData, setPoolStatsSolData] = useState<number[]>([]);
  const [poolStatsItsData, setPoolStatsItsData] = useState<number[]>([]);

  useEffect(() => {
    const formattedData = data?.map(item => ({
      xLabel: dayjs(item.date).format("MM-DD"),
      solData: item.total_sol,
      itsData: item.total_its
    }));

    if (formattedData) {
      const sortedData = formattedData.reverse();
      const xLabels = sortedData.map(item => item.xLabel);
      const solData = sortedData.map(item => item.solData);
      const itsData = sortedData.map(item => item.itsData);

      setPoolStatsXLabels(xLabels);
      setPoolStatsSolData(solData);
      setPoolStatsItsData(itsData);
    }
  }, [data])

  return (
    <LineChart
      width={700}
      height={400}
      series={[
        { data: poolStatsSolData, label: 'sol', area: true, stack: 'total', showMark: false },
        { data: poolStatsItsData, label: 'it/s', area: true, stack: 'total', showMark: false },
      ]}
      xAxis={[{ scaleType: 'point', data: poolStatsXLabels }]}
      yAxis={[{ disableTicks: true}]}
      sx={{
        '.MuiChartsAxis-directionY': {
          display: 'none',
        }
      }}
      grid={{horizontal: true}}
    />
  );
}
