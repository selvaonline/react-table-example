import data from './data.json'
import {useState,useMemo, useEffect} from 'react';
import axios from 'axios';
import {MaterialReactTable}from 'material-react-table';
import {EditAutocomplete} from './EditAutocomplete'


export function Example(){

    const [tableData, setTableData] = useState([]);

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
          {
            accessorKey: 'value', 
            header: 'Value',
            Edit: (props)=>{
              console.log('props', props)
              return <EditAutocomplete {...props} />
            }
          },
        ],
        [],
      );

      
      useEffect(() => {
        const fetchData = async () => {
            try {


              /** Actual API call goes here */

                // Simulate fetching data with setTimeout
                setTimeout(() => {
                    // Simulated response data
                    
                    setTableData(data);
                }, 1000); // Simulate a delay of 1 second (1000 milliseconds)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData(); // Call the async function immediately inside useEffect
    
        // Since there's no cleanup needed, return an empty function
        return () => {};
    }, []); 

      const onRowUpdate = async ( {row,values, table}) =>{

        console.log('row', row, 'values', values)

        // setTableData(tableData.map((d, i) => row.index === i ? {...values}: d))

        // table.setEditingRow(null); 

        /** API call for updating the data */
        try {
          const response = await axios.put(`your_api_endpoint/${row.id}`, values);
          setTableData(tableData.map((d) => (d.id === row.id ? { ...response.data } : d)));
          table.setEditingRow(null);
          } catch (error) {
          console.error('Error updating row:', error);
          }
      }

   

      return <MaterialReactTable 
      columns={columns} 
      data={tableData}  
      getRowId={(row) => row.id}
      enableEditing
      onEditingRowSave={onRowUpdate}
      autoResetAll={false}
      editDisplayMode='row'
       />;
}