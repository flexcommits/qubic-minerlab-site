import { BarChart } from '@mui/x-charts/BarChart';
import { BaseRecord } from '@refinedev/core';
import { useEffect, useState } from 'react';

interface Props {
  data: BaseRecord[] | undefined;
  selectedChart: number;
}

export const EpochRpt:React.FC<Props> = ({ data, selectedChart }) => {
  const [epochRptXLabels, setEpochRptXLabels] = useState<number[]>([]);
  const [epochRptSolData, setEpochRptSolData] = useState<number[]>([]);
  const [epochRptItsData, setEpochRptItsData] = useState<number[]>([]);

  useEffect(() => {
    const formattedData = data?.map(item => ({
      xLabel: item.epoch,
      solData: item.total_sol,
      itsData: item.total_its / 100,
    }));

    if (formattedData) {
      const sortedData = formattedData.reverse();
      const xLabels = sortedData.map(item => item.xLabel);
      const solData = sortedData.map(item => item.solData);
      const itsData = sortedData.map(item => item.itsData);

      setEpochRptXLabels(xLabels);
      setEpochRptSolData(solData);
      setEpochRptItsData(itsData);
    }
  }, [data])

  return (
    <BarChart
      width={700}
      height={400}
      series={[selectedChart === 3 ? 
        { data: epochRptSolData, label: 'sol', id: 'sol' } :
        { data: epochRptItsData, label: 'it/s', id: 'its' }
      ]}
      xAxis={[{ data: epochRptXLabels, scaleType: 'band' }]}
      grid={{horizontal: true}}
    />
  );
}
