import React from "react";
import { List } from "@refinedev/mui";
import { Container, Typography } from "@mui/material";
import { useSelect } from "@refinedev/core";
import { Flex, Group, Paper, SimpleGrid, Text } from "@mantine/core";
import { Card, Grid, Progress, ProgressProps } from "antd";
import { numberWithCommas } from "../../helper/help";

const Earning = () => {
  const { queryResult: earned } = useSelect({
    resource: "epoch_earn_est",
    liveMode: "auto",
  });
  const data = earned?.data?.data[0] ?? {};
  const conicColors: ProgressProps['strokeColor'] = {
    '0%': '#5A6FF0',
    '100%': '#00FFDD',
  };
  return (
    <List title="">
      <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4 items-center">
        <Card
          className="text-center"
          style={{
            background: "linear-gradient(180deg, #86CEE4 0%, #265B67 100%)",
          }}
        >
          <div className="text-[16px] md:text-[20px] lg:text-[26px] text-[#1C2028] font-bold">
            {data?.epoch}
          </div>
          <div className="text-[#1C2028] font-medium">Your Epoch</div>
        </Card>
        <div className="text-bold text-[26px]">:</div>
        <Card
          className="text-center"
          style={{
            background: "linear-gradient(180deg, #86CEE4 0%, #265B67 100%)",
          }}
        >
          <div className="text-[16px] md:text-[20px] lg:text-[26px] text-[#1C2028] font-bold">{numberWithCommas(+data?.sol)}</div>
          <div className="text-[#1C2028] font-medium">Your Solutions</div>
        </Card>
        <div className="text-bold text-[26px]">X</div>
        <div>
            <Progress strokeColor={conicColors} type="circle" percent={+((+data?.sol / +data?.avg_score * 1.06) * 100 ).toFixed(0)} size={110} />
            <div className="pt-2">Your Share</div>
        </div>
        <div className="text-bold text-[26px]">=</div>
        <Card
          className="text-center"
          style={{
            background: "linear-gradient(180deg, #86CEE4 0%, #265B67 100%)",
          }}
        >
          <div className="text-[16px] md:text-[20px] lg:text-[26px] text-[#1C2028] font-bold">{numberWithCommas(+data?.qubic)} Qubics</div>
          <div className="text-[#1C2028] font-medium">Estimated Earnings</div>
        </Card>
        <div className="text-bold text-[26px]">=</div>
        <Card
          className="text-center"
          style={{
            background: "linear-gradient(180deg, #86CEE4 0%, #265B67 100%)",
          }}
        >
          <div className="text-[16px] md:text-[20px] lg:text-[26px] text-[#1C2028] font-bold">{numberWithCommas(+data?.usdt)} USDT</div>
          <div className="text-[#1C2028] font-medium">{data?.price}/qubic</div>
        </Card>
      </div>
    </List>
  );
};

export default Earning;
