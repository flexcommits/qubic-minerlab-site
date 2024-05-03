import React from "react";
import { Typography } from "@mui/material";

const listing1 = [
  {
    label: (
      <>
        <h3 className="text-lg primary mb-5 font-medium">Network Analysis</h3>
      </>
    ),
  },
  { label: "No. Of Ticks: ", key: "numberOfTicks" },
  { label: "No. Of Empty Ticks: ", key: "numberOfEmptyTicks" },
  { label: "No. Of Entities: ", key: "numberOfEntities" },
];

const listing2 = [
  {
    label: (
      <>
        <h3 className="text-lg primary mb-5 font-medium">Network Details</h3>
      </>
    ),
  },
  { label: "Supply: ", key: "supply" },
  { label: "Price: ", key: "price" },
  { label: "Capitalization: ", key: "marketCapitalization" },
];

const listing3 = [
  {
    label: (
      <>
        <h3 className="text-lg primary mb-5 font-medium">Score Analysis</h3>
      </>
    ),
  },
  { label: "Min Score: ", key: "minScore" },
  { label: "Max Score: ", key: "maxScore" },
  { label: "Average Score: ", key: "averageScore", ceil: true },
];

export { listing1, listing2, listing3 };
