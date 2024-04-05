import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const options = ['Option1', 'Option2', 'Option3', 'Option4', 'Option5', 'Option6','Option7'];
export function EditAutocomplete({row, table}){
  
    const [value, setValue] = React.useState(row.original.value);
    const [inputValue, setInputValue] = React.useState('');

    const {setEditingRow} =table;

   return (<Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          row.original.value = newValue;
          row._valuesCache.value = newValue;

          setEditingRow(row);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={options}
        // sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Controllable" />}
      />)
}