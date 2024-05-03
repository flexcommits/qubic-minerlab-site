import { LineChart } from '@mui/x-charts/LineChart';
import { BaseRecord } from '@refinedev/core';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

interface Props {
  data: BaseRecord[] | undefined;
}

export const HourlySol:React.FC<Props> = ({data}) => {
  const [xAxis, setXAixs] = useState<string[]>([]);
  const [series, setSeries] = useState<number[]>([]);

  useEffect(() => {
    const formattedData = data?.map(item => ({
      xAxis: dayjs(item.time).format("MM-DD HH:mm"),
      series: item.Sol
    }));

    if (formattedData) {
      const sortedData = formattedData.reverse();
      const xAxisValues = sortedData.map(item => item.xAxis);
      const seriesValues = sortedData.map(item => item.series);
      setXAixs(xAxisValues);
      setSeries(seriesValues);
    }
  }, [data])

  return (
    <LineChart
      xAxis={[{ scaleType: 'point', data: xAxis }]}
      series={[
        {
          data: series,
          label: "Sol",
        },
      ]}
      width={700}
      height={400}
      grid={{horizontal: true}}
    />
  )
}
