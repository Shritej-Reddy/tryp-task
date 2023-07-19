import React, { useState, useEffect, useMemo } from "react";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel
} from "@tanstack/react-table";
import {
  IPaymentsDataInterface,
  IPaymentsColumnsInterface,
} from "../interfaces/interfaces";

type PaymentsData = {
  timestamp: string;
  purchaseId: number;
  mail: string;
  name: string;
  source: string;
  status: string;
  select: string;
};

const defaultData: PaymentsData[] = [
  {
    timestamp: "35 minutes ago",
    purchaseId: 1387461387,
    mail: "abc@gmail.com",
    name: "ab",
    source: "def",
    status: "Paid",
    select: "Select",
  },
  {
    timestamp: "35 minutes ago",
    purchaseId: 1387461387,
    mail: "abc@gmail.com",
    name: "ab",
    source: "def",
    status: "Paid",
    select: "Select",
  },
  {
    timestamp: "35 minutes ago",
    purchaseId: 1387461387,
    mail: "abc@gmail.com",
    name: "ab",
    source: "def",
    status: "Paid",
    select: "Select",
  },
];

const defaultColumns: ColumnDef<PaymentsData>[] = [
  {
    header: "Timestamp",
    accessorKey: "timestamp",
  },
  {
    header: "Purchase Id",
    accessorKey: "purchaseId",
  },
  {
    header: "Mail",
    accessorKey: "mail",
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Source",
    accessorKey: "source",
  },
  {
    header: "Status",
    accessorKey: "status",
  },
  {
    header: "Select",
    accessorKey: "select",
  },
];

type Props = {
  data: IPaymentsDataInterface[];
  columns: IPaymentsColumnsInterface[];
};
const Table = (props: Props) => {
  const [data, setData] = useState(() => [...defaultData]);
  const [columns] = React.useState<typeof defaultColumns>(() => [
    ...defaultColumns,
  ]);
  const [columnVisibility, setColumnVisibility] = React.useState({})

  const rerender = React.useReducer(() => ({}), {})[1]

  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,

    // getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    // state: {
    //   sorting: sorting,
    //   globalFilter: filtering,
    // },
    // onSortingChange: setSorting,
    // onGlobalFilterChange: setFiltering,
  })
  
  
  //return
  return (
    <div className="p-2">
      <div className="inline-block border border-black shadow rounded">
        <div className="px-1 border-b border-black">
          <label>
            <input
              {...{
                type: 'checkbox',
                checked: table.getIsAllColumnsVisible(),
                onChange: table.getToggleAllColumnsVisibilityHandler(),
              }}
            />{' '}
            Toggle All
          </label>
        </div>
        {table.getAllLeafColumns().map(column => {
          return (
            <div key={column.id} className="px-1">
              <label>
                <input
                  {...{
                    type: 'checkbox',
                    checked: column.getIsVisible(),
                    onChange: column.getToggleVisibilityHandler(),
                  }}
                />{' '}
                {column.id}
              </label>
            </div>
          )
        })}
      </div>
      <div className="h-4" />
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map(footerGroup => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map(header => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div className="h-4" />
      <button onClick={() => rerender()} className="border p-2">
        Rerender
      </button>
      <div className="h-4" />
      <pre>{JSON.stringify(table.getState().columnVisibility, null, 2)}</pre>
    </div>
  )
  //end of return
};

export default Table;
