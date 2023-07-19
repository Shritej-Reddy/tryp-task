import React, { useState, useEffect } from "react";
import DataTable from "../components/DataTable";
import IRowDataInterface from "@/interfaces/DataTableInterfaces";
import * as agGrid from "ag-grid-community";

const Home = () => {
  const [rowData, setRowData] = useState<IRowDataInterface[]>([]);
  const columnDefs: agGrid.ColDef[] = [
    { field: "athlete", filter: "agTextColumnFilter" },
    { field: "age", filter: "agNumberColumnFilter" },
    { field: "country", filter: "agSetColumnFilter" },
    { field: "year", filter: "agNumberColumnFilter" },
    { field: "date", filter: "agDateColumnFilter" },
    { field: "sport", filter: "agTextColumnFilter" },
    { field: "gold", filter: "agNumberColumnFilter" },
    { field: "silver", filter: "agNumberColumnFilter" },
    { field: "bronze", filter: "agNumberColumnFilter" },
    { field: "total", filter: "agNumberColumnFilter" },
  ];
  const [sortable, setSortable] = useState(true);
  const [pagination, setPagination] = useState(true);

  useEffect(() => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((response) => response.json())
      .then((data) => setRowData(data));
  }, []);

  return (
    <div className="p-10">
      <DataTable sortable pagination rows={rowData} headers={columnDefs} />
    </div>
  );
};

export default Home;
