import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DataService from "../services/data";
import Chip from "@mui/material/Chip";
import BulletCell from "./BulletChart";
import CvsBgColor from "./CvsBgColor";
import StatusFixIcon from "./StatusFixIcon";
import { TitleDescription } from "./TitleDescription";
import { useNavigate } from "react-router-dom";
import paramsHandler from "../utils/paramsHandler";
import SearchToolbar from "./SearchToolBar";
import Tooltip from "@mui/material/Tooltip";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "asset_hostname", headerName: "Hostname", width: 150 },
  { field: "asset_ip_address", headerName: "IP Address", width: 90 },
  {
    field: "vulnerability_title",
    headerName: "Title",
    width: 290,
    renderCell: TitleDescription,
  },
  {
    field: "vulnerability_severity",
    headerName: "Severity",
    width: 170,
    renderCell: (params) => {
      return <BulletCell data={params.row.vulnerability_cvss} />
            
    },
  },
  {
    field: "vulnerability_cvss",
    headerName: "CVSS",
    type: "number",
    width: 80,
    renderCell: (params) => {
              
      return (<Tooltip title={params.row.vulnerability_severity}><Chip variant="outlined" {...CvsBgColor(params)} /></Tooltip>)
    },
  },
  {
    field: "publication_date",
    headerName: "Publication",
    type: "date",
    width: 100,
  },

  {
    field: "fix",
    headerName: "Status",
    description: "Status se vulnerabilidade foi corrigida",
    type: "boolean",
    width: 90,
    renderCell: StatusFixIcon,
  },
];

const DataTable = () => {
  const [rows, setRows] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState();
  const [loading, setLoanding] = useState(false);
  const [filter, setFilter] = useState([]);
  const [ordering, setOrdering] = useState("");
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();

  const searchHandler = (value) => {
        setSearchQuery( value)
      
  }
  
  useEffect(() => {
    (async () => {
      setLoanding(true);
      const response = await DataService.getCsvRows(paramsHandler(filter, ordering, searchQuery, page));
      setCount(response.data["count"]);
      setRows(response.data["results"]);
      setLoanding(false);
    })();
  }, [page, searchQuery, filter, ordering]);
  


  return (
    <div style={{ height: 450, width: "100%" }}>
      <DataGrid
        components={{ Toolbar: SearchToolbar }}
        rows={rows}
        columns={columns}
        pageSize={50}
        rowsPerPageOptions={[50]}
        pagination
        rowCount={count}
        paginationMode="server"
        onPageChange={(newPage) => {
          setPage(newPage+1);
        }}
        onCellDoubleClick={(params) => {
          navigate("/fix", { state: { row: params.row } });
        }}
        componentsProps={{
          toolbar:  {
            value: searchQuery,
            onChange: (e) => searchHandler(e.target.value),
            clearSearch: () => searchHandler(''),
          },
        }}
        loading={loading}
      />
    </div>
  );
};

export default DataTable;
