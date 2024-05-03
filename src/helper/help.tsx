import * as React from "react";
import {
  DataGrid,
  GridColumnMenu,
  GridColumnMenuProps,
} from "@mui/x-data-grid";

export function CustomColumnMenu(props: GridColumnMenuProps) {
  return (
    <GridColumnMenu
      {...props}
      slots={{
        // Hide `columnMenuColumnsItem`
        columnMenuColumnsItem: null,
      }}
    />
  );
}

export function numberWithCommas(x: number | string) {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

export function getUserName() {
  const tokenData = localStorage.getItem("sb-afhvocspeeserasytprs-auth-token");

  var userName = "xxxxxxx-xxxxxxx-xxxxxxxx-xxxxxxx";

  if (tokenData) {
    const tokenDataJSON = JSON.parse(tokenData);

    // check if tokenDataJSON.user.email is exists
    if (tokenDataJSON.user.email) {
      // get username from email without domain name
      var nameMatch = tokenDataJSON.user.email.match(/^([^@]+)/);
      userName = nameMatch[0].toUpperCase();
    }
  }

  return userName;
}
