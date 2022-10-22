import React, { useEffect, useState } from "react";
import PaginationTable from "./PaginationTable";

export default function TableWithAPI() {
  const [cells, setCells] = useState([]);

  const getData = async () => {

    const resp = await fetch("https://firestore.googleapis.com/v1/projects/flowerpos-1dec4/databases/(default)/documents/Orders/");
    const data = await resp.json();
    setCells(data);
    console.log(resp.json());
  };
  const columns = React.useMemo(
    () => [
      {
        id:'cust',
        Header: "Customer",
        accessor: "Customer"
      },
      {
        Header: "Delivery Date",
        accessor: "DeliveryDate"
      },
      {
        Header: "Product",
        accessor: "Product"
      },
      {
        Header: "Recipient Address",
        accessor:"RecipientAddress"
      },
      {
        Header:"Recipient City" ,
        accessor:"RecipientCity"
      },
      {
        Header: "Recipient Name",
        accessor:"RecipientName"
      },
      {
        Header: "Recipient Phone",
        accessor:"RecipientPhone"
      },
      {
        Header: "Recipient State",
        accessor:"RecipientState"
      },
      {
              Header: "Recipient State",
              accessor:"documents"
            },
      {
        Header: "Recipient Zip",
        accessor:"RecipientZip"
      }

    ],
    []
  );

  useEffect(() => {
    getData();
  }, []);
  const data = React.useMemo(() => cells, []);

  return <>{cells && <PaginationTable columns={columns} data={data} />}</>;

}