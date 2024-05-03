import Button, { ButtonProps } from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';

interface Props {
  SelectedChartChange: (chartType: number) => void;
  selectedChart: number;
}

export default function SelectButton({ 
  SelectedChartChange
}
  : {
    SelectedChartChange: (chartType: number) => void,
  }
) {
  const [rpt, setRpt] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setRpt(event.target.value as string);
    if(event.target.value.toString() === '10') SelectedChartChange(3);
    else SelectedChartChange(4);
  };

  return (
    <Box sx={{ minWidth: 130 }}>
      <FormControl fullWidth>
        <InputLabel id="select-label">Weekly RPT</InputLabel>
        <Select
          labelId="select-label"
          id="select"
          value={rpt}
          label="Weekly RPT"
          onChange={handleChange}
        >
          <MenuItem value={10}>Sol</MenuItem>
          <MenuItem value={20}>it/s(×100)</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export const SelectChartButton = ({sx, ...props}: ButtonProps) => {
  return (
    <Button
      sx={{
        width: '100px',
        ...sx,
      }}
      {...props}
    />
  )
}

export const SelectChartButtonGroup = ({
  SelectedChartChange,
  selectedChart,
}: Props) => {

  return (
    <ButtonGroup variant="outlined" aria-label="Basic button group">
      <SelectChartButton onClick={() => SelectedChartChange(2)} sx={selectedChart === 2 ? {background: "linear-gradient(180deg, #86cee4 0%, #265b67 100%)", color: "black"}: {}}>Daily Rpt</SelectChartButton>
      <SelectButton SelectedChartChange={SelectedChartChange}/>
    </ButtonGroup>
  );
}
