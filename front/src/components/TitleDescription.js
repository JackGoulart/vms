import Tooltip from "@mui/material/Tooltip";
import { Typography } from "@mui/material";

export const TitleDescription = (params) => {
  return (
    <>
     <Tooltip title={params.value}>
      <Typography> {params.value.substr(0,28)}... </Typography>
      </Tooltip>
    </>
  );
};
