import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { red, green } from "@mui/material/colors";
import Tooltip from "@mui/material/Tooltip";

const StatusFixIcon = (params) => {
  if (params.value === false) {
    return (
      <Tooltip title={"Dois click para editar"}>
        <CancelIcon style={{ fill: red[500] }} />
      </Tooltip>
    );
  } else {
    return (
      <Tooltip title={"Dois click para editar"}>
        <CheckCircleIcon style={{ fill: green[500] }} />
      </Tooltip>
    );
  }
};

export default StatusFixIcon;
