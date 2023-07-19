import Table from "./components/Table";
import { useMemo } from "react";
import paymentsData from "./MOCK_DATA.json";

export default function Home() {
  /** @type import('@tanstack/react-table).ColumnDef<any> */
  const data = useMemo(() => paymentsData, []);

  /** @type import('@tanstack/react-table).ColumnDef<any> */
  const paymentsTableColumns = [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "Timestamp",
      accessorKey: "timestamp",
    },
  ];

  return (
    <>
      <h1>DataTable</h1>
      <Table data={paymentsData} columns={paymentsTableColumns} />
    </>
  );
}
