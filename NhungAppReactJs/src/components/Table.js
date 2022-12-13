import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import Pagination from "@mui/material/Pagination";
import React, { useEffect, useState } from "react";
import { createTheme } from "@mui/system";
import { useSubscription } from "mqtt-react-hooks";
import { Box } from "@mui/material";
import { saveAs } from "file-saver";
import XlsxPopulate from "xlsx-populate";

const theme = createTheme();

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="primary"
      count={pageCount}
      page={page + 1}
      onChange={(_, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

function Table({ mobile }) {
  const { message } = useSubscription(["gas/general"]);
  const [id, setId] = useState(1);
  const [dataShow, setDataShow] = useState([
    {
      id: id,
      time: 0,
      ppm: new Date().toLocaleString("vi-VN"),
      PPMThresold: 0,
    },
  ]);

  function getSheetData(data, header) {
    var fields = Object.keys(data[0]);
    var sheetData = data.map(function (row) {
      return fields.map(function (fieldName) {
        return row[fieldName] ? row[fieldName] : "";
      });
    });
    sheetData.unshift(header);
    return sheetData;
  }

  async function saveAsExcel() {
    let header = ["SST", "Time", "PPM", "PPMThresold"];

    XlsxPopulate.fromBlankAsync().then(async (workbook) => {
      const sheet1 = workbook.sheet(0);
      const sheetData = getSheetData(dataShow, header);
      const totalColumns = sheetData[0].length;

      sheet1.cell("A1").value(sheetData);
      const range = sheet1.usedRange();
      const endColumn = String.fromCharCode(64 + totalColumns);
      sheet1.row(1).style("bold", true);
      sheet1.range("A1:" + endColumn + "1").style("fill", "BFBFBF");
      range.style("border", true);
      return workbook.outputAsync().then((res) => {
        saveAs(res, "__NHOM11__HE_THONG_NHUNG.xlsx");
      });
    });
  }

  function CustomToolbar() {
    return (
      <GridToolbarContainer style={{ marginLeft: theme.spacing(2) }}>
        <button
          type="button"
          className="btn-download"
          style={{ marginLeft: theme.spacing(5) }}
          onClick={saveAsExcel}
        >
          Export to Excel
        </button>
      </GridToolbarContainer>
    );
  }

  const columns = [
    {
      field: "time",
      headerName: "Time",
      width: 180,

      align: "center",
      headerAlign: "center",
    },
    {
      field: "ppm",
      headerName: "PPM",
      align: "center",
      headerAlign: "center",
      width: 150,

      renderCell: (params) => (
        <h3
          style={{
            fontWeight: "700",
            color:
              params.row.ppm > params.row.PPMThresold ? "#b30000" : "#364cf4",
          }}
        >
          {params.row.ppm}
        </h3>
      ),
    },
    {
      align: "center",
      headerAlign: "center",
      field: "PPMThresold",
      headerName: "PPM Thresold",
      width: 150,
    },
  ];

  useEffect(() => {
    if (message) {
      const d = new Date().toLocaleString("vi-VN");
      const json = JSON.parse(message.message);
      setId((id) => id + 1);
      if (id === 1)
        setDataShow([
          { id: id, time: d, ppm: json.PPMval, PPMThresold: json.PPMThresold },
        ]);
      else
        setDataShow((dataShow) => [
          ...dataShow,
          { id: id, time: d, ppm: json.PPMval, PPMThresold: json.PPMThresold },
        ]);
    }
  }, [message]);
  return (
    <div className={mobile ? "content-mobile" : "content"}>
      <h3>Bảng liệt kê giá trị đo được</h3>
      <Box
        sx={{
          height: mobile ? 500 : 480,
          width: "100%",
          "& .normal": {
            backgroundColor: "#b9d5ff91",
            color: "#1a3e72",
          },
          "& .cross-the-threshold": {
            backgroundColor: "#ff943975",
            color: "#1a3e72",
          },
        }}
      >
        <DataGrid
          disableColumnMenu
          rows={dataShow}
          columns={columns}
          pageSize={60}
          density="compact"
          sx={{ width: 500 }}
          rowsPerPageOptions={[10]}
          components={{
            Pagination: CustomPagination,
            Toolbar: CustomToolbar,
          }}
          pagination
          getCellClassName={(params) => {
            return params.row.ppm > params.row.PPMThresold
              ? "cross-the-threshold"
              : "normal";
          }}
        />
      </Box>
    </div>
  );
}

export default Table;
