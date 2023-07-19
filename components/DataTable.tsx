import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import * as agGrid from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Input } from "@chakra-ui/react";
import IDataTableInterface from "@/interfaces/DataTableInterfaces";

type Props = {
  sortable?: boolean;
  pagination?: boolean;
  rows: IDataTableInterface[];
  headers: agGrid.ColDef[];
};

const Grid = (props: Props) => {
  const [gridApi, setGridApi] = useState<agGrid.GridApi | null>(null);
  const [gridColumnApi, setGridColumnApi] = useState<agGrid.ColumnApi | null>(
    null
  );

  const defaultColDef: agGrid.ColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
    sortable: props.sortable,
  };
  const onGridReady = (params: agGrid.GridReadyEvent) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const onPaginationChanged = () => {
    console.log("onPaginationChanged");
  };

  const clearFilters = () => {
    if (gridApi) {
      gridApi.setFilterModel(null);
    }
  };

  const onFilterTextChange = (e: any) => {
    gridApi?.setQuickFilter(e.target.value);
  };

  return (
    <div className="ag-theme-alpine grid-container">
      <div className="flex justify-between align-middle mb-4 text-lg text-[#4b5563] ">
        <button
          className="rounded bg-gray-200 px-3 py-1"
          onClick={clearFilters}
        >
          Clear Filters
        </button>
        <Input
          type="blackAlpha"
          onChange={onFilterTextChange}
          placeholder=" Search box..."
          isRequired={true}
        />
      </div>
      <AgGridReact
        className="ag-grid"
        columnDefs={props.headers}
        rowData={props.rows}
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
        pagination={props.pagination}
        paginationPageSize={50}
        onPaginationChanged={onPaginationChanged}
      ></AgGridReact>
      <style jsx global>{`
        .grid-container {
          height: 800px;
          width: 100%;
        }
        .ag-grid .ag-cell {
          padding: 0.5rem;
          font-size: 1.2rem;
          color: #4b5563;
          border-color: #e5e7eb;
          line-height: 1.5;
        }
        .ag-grid .ag-header-cell {
          font-weight: 600;
          font-size: 1.2rem;
          color: #374151;
          background-color: #f9fafb;
          border-color: #e5e7eb;
        }
      `}</style>
    </div>
  );
};

export default Grid;
