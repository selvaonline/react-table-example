import data from './data.json'
import {useState,useMemo} from 'react';
import {useMaterialReactTable,MaterialReactTable}from 'material-react-table';

export function Example(){

    const [tableData, setTableData] = useState(data);

    const columns = useMemo(
        () => [
            {
                accessorKey: 'id', 
                header: 'Id',
              },
          {
            accessorKey: 'name', 
            header: 'Name',
          },
          {
            accessorKey: 'age', 
            header: 'Age',
          },
        ],
        [],
      );

      const onRowUpdate = ({row,values, table}) =>{


        setTableData(tableData.map((d, i) => row.index === i ? {...values}: d))

        table.setEditingRow(null); 
      }

    const table = useMaterialReactTable({
        columns,
        data: tableData, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        enableRowSelection: false, 
        enableColumnOrdering: true, //enable a feature for all columns
        enableGlobalFilter: false, 
        getRowId: (row) => row.id,
        editDisplayMode: 'row', 
        enableEditing: true,
        onEditingRowSave: onRowUpdate,
        autoResetAll: false
        
      });    

      return <MaterialReactTable table={table}  />;
}