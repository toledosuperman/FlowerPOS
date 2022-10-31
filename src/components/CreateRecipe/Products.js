import React, { useCallback, useState, useMemo, useEffect } from "react";
import { useFormikContext, getIn } from "formik";
import Input from "../components/CreateRecipe/Input.js";
import Table from "../components/CreateRecipe/Table.js";

const EMPTY_ARR = [];

function Products({ name, handleAdd, handleRemove }) {
  const { values } = useFormikContext();

  // from all the form values we only need the "friends" part.
  // we use getIn and not values[name] for the case when name is a path like `social.facebook`
  const formikSlice = getIn(values, name) || EMPTY_ARR;
  const [tableRows, setTableRows] = useState(formikSlice);

  // we need this so the table updates after the timeout expires
  useEffect(() => {
    setTableRows(formikSlice);
  }, [formikSlice]);

  const onAdd = useCallback(() => {
    const newState = [...tableRows];
    const item = {
      id: Math.floor(Math.random() * 100) / 10,
      firstName: "",
      lastName: ""
    };

    newState.push(item);
    setTableRows(newState);
    handleAdd(item);
  }, [handleAdd, tableRows]);

  const onRemove = useCallback(
    index => {
      const newState = [...tableRows];

      newState.splice(index, 1);
      setTableRows(newState);
      handleRemove(index);
    },
    [handleRemove, tableRows]
  );

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id"
      },
      {
        Header: "Product Name",
        id: "Name",
        Cell: ({ row: { index } }) => (
          <Input name={`${name}[${index}].Name`} />
        )
      },
      {
        Header: "Price",
        id: "Price",
        Cell: ({ row: { index } }) => (
          <Input name={`${name}[${index}].Price}`} />
        )
      },
      {
        Header: "Actions",
        id: "actions",
        Cell: ({ row: { index } }) => (
          <button type="button" onClick={() => onRemove(index)}>
            delete
          </button>
        )
      }
    ],
    [name, onRemove]
  );

  return (
    <div className="field">
      <div>
        Friends:{" "}
        <button type="button" onClick={onAdd}>
          add
        </button>
      </div>
      <Table data={tableRows} columns={columns} rowKey="id" />
    </div>
  );
}

export default Products;