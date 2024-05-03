import { useTheme } from "@mui/material/styles";
import {
  useResource,
  useSelect,
  useTranslate,
  useUserFriendlyName,
} from "@refinedev/core";
import { useParams } from "react-router-dom";
import { RefinePageHeaderClassNames } from "@refinedev/ui-types";
import { List } from "@refinedev/mui";
import { Grid, Typography, useMediaQuery } from "@mui/material";
import {
  List as AntList,
  TagField,
  useTable,
  getDefaultSortOrder,
  RefreshButton,
} from "@refinedev/antd";
import { Spin, Table } from "antd";
import moment from "moment";
import { useState } from "react";

export const MinerStats: React.FC = () => {
  // Get the pubId from the URL
  const { pubId } = useParams<{ pubId: string }>();
  const [isLoading, setIsLoading] = useState(false);

  // const { queryResult: minerStats } = useSelect({
  //   resource: "rpc/get_epoch_rec_by_pubid?pub_id=" + pubId,
  // });

  const dataTable = useTable({
    resource: "rpc/get_epoch_rec_by_pubid?pub_id=" + pubId,
    liveMode: "auto",
    pagination: {
      pageSize: 500,
    },
  });

  console.log("dataTable ", dataTable);

  const theme = useTheme();
  const translate = useTranslate();
  const getUserFriendlyName = useUserFriendlyName();
  const {
    resource,
    action,
    id: idFromParams,
    identifier,
  } = useResource("miner-configurations");

  console.log("pubId", pubId);

  const refreshButtonClick = async () => {
    // await dataTable.tableQueryResult?.refetch();

    await dataTable.tableQueryResult?.refetch();

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  return (
    <List
      breadcrumb={<></>}
      title={
        <Typography
          className={`${RefinePageHeaderClassNames.Title} priamry`}
          sx={{ fontSize: "18px", fontFamily: "inherit" }}
        >
          {translate(
            `${identifier}.titles.list`,
            `${getUserFriendlyName(
              resource?.meta?.label ??
                resource?.options?.label ??
                resource?.label ??
                identifier,
              "plural"
            )}`
          )}
        </Typography>
      }
      headerButtons={[        
        <RefreshButton
          resource="payout"
          className="primary"
          hideText
          onClick={refreshButtonClick}
        />,
      ]}
    >
      {
        <Table
          {...dataTable.tableProps}
          pagination={{
            defaultPageSize: 500,
            pageSizeOptions: [500, 1000, 2000],
          }}
          rowKey="id"
          rowClassName={(record, index) => {
            const providedDateTime = moment(record.lastActive).utc();
            if (providedDateTime.isValid() === false) {
              return "";
            }

            // Get the current datetime
            const currentDateTime = moment().utc();
            // Calculate the difference in minutes
            const timeDifferenceInMinutes = currentDateTime.diff(
              providedDateTime,
              "minutes"
            );

            // Compare with 45 minutes
            const checked = timeDifferenceInMinutes > 45;

            return checked ? "inactiveRow" : "";
          }}
        >
          <Table.Column
            dataIndex="alias"
            title="Miner"
            sorter
            defaultSortOrder={getDefaultSortOrder("alias", dataTable.sorters)}
            fixed="left"
          />
          <Table.Column
            dataIndex="solutions_found"
            title="Solution"
            sorter
            defaultSortOrder={getDefaultSortOrder(
              "solutions_found",
              dataTable.sorters
            )}
          />
          <Table.Column
            dataIndex="current_its"
            title="Current It/s"
            sorter
            defaultSortOrder={getDefaultSortOrder(
              "current_its",
              dataTable.sorters
            )}
          />
            <Table.Column
            dataIndex="lastActive"
            title="Last Active"
            sorter
            defaultSortOrder={getDefaultSortOrder(
              "lastActive",
              dataTable.sorters
            )}
            render={(value: string) =>
              moment(value).format("DD/MMM/YYYY hh:mm A")
            }
            responsive={["md"]}
          />
          {/* <Table.Column
            dataIndex="version"
            title="Version"
            sorter
            defaultSortOrder={getDefaultSortOrder("version", dataTable.sorters)}
            responsive={["md"]}
          /> */}
          {/* <Table.Column
            dataIndex="lastActive"
            title="Last Active"
            sorter
            defaultSortOrder={getDefaultSortOrder(
              "lastActive",
              dataTable.sorters
            )}
            render={(value: string) =>
              moment(value).format("DD/MMM/YYYY hh:mm A")
            }
            responsive={["md"]}
          /> */}
          {/* <Table.Column
            dataIndex="isActive"
            title="Is Active"
            sorter
            defaultSortOrder={getDefaultSortOrder(
              "isActive",
              dataTable.sorters
            )}
            render={(value: boolean) => (value ? <CheckIcon /> : <CloseIcon />)}
            responsive={["md"]}
          /> */}
        </Table>
      }
    </List>
  );
};
