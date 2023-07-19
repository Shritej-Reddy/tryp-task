import React, { useState, useEffect, useRef, useMemo } from "react";

type Props = {};

type PaymentsData = {
  timestamp: string;
  purchaseId: number;
  mail: string;
  name: string;
  source: string;
  status: string;
  select: string;
};

const AgGridTable = (props: Props) => {
  const gridRef = useRef();
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { field: "timestamp" },
    { field: "purchaseId" },
    { field: "mail" },
    { field: "name" },
    { field: "source" },
    { field: "status" },
    { field: "select" },
  ]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
    }),
    []
  );

  useEffect(() => {
    fetch(
      "https://www.ag-grid.com/example-assets/olympic-winners.json",
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "https://localhost:3000",
          "Access-Control-Allow-Methods": "POST, GET, PUT",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    )
      .then((result) => result.json())
      .then((rowData) => {
        setRowData(rowData);
        console.log("ROWDATA: ", rowData);
      })
      .catch((error) => console.log("Error", error));
  }, []);

  return (
    <>
      <h1></h1>
    </>
  );
};

export default AgGridTable;
