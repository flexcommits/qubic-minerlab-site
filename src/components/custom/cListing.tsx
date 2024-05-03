import { Typography } from "@mui/material";
import { IResourceComponentsProps } from "@refinedev/core";
import PropTypes from "prop-types";
import { numberWithCommas } from "../../helper/help";

export const CListing: React.FC<CListingProps> = (props) => {  
  return (
    <>
      {props.listing.map((item: any, index: number) => {
        return (
          <Typography
            variant={item.key == undefined ? "fontL" : "fontM"}
            component={'p'}
            gutterBottom={index !== props.listing.length - 1}
            key={index}
            className="primary"
          >
            {item.label}
            <Typography className="text-white" component={"span"} variant="fontM">
              {item.key && props?.data && props.data[item.key] !== undefined
                ? (item.ceil == undefined) ? numberWithCommas(props.data[item.key]) : numberWithCommas(Math.ceil(props.data[item.key]))
                : ""}
            </Typography>
          </Typography>
        );
      })}
      {props.children}
    </>
  );
};

CListing.propTypes = {
  listing: PropTypes.array.isRequired,
  children: PropTypes.node,
  data: PropTypes.object,
};

export interface CListingProps extends Omit<IResourceComponentsProps, "title"> {
  listing: any[];
  children?: React.ReactNode;
  data: any;
}
