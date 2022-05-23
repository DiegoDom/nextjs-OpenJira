import { ChangeEvent, useState, useContext } from 'react';
import { Button, Box, TextField } from '@mui/material';

import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

export const NewEntry = () => {
  const { addNewEntry } = useContext(EntriesContext);
  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);

  const [inputValue, setInputValue] = useState('');
  const [touched, setTouched] = useState(false);

  const onTextFildChanges = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onSave = () => {
    if (inputValue.length === 0) return;

    addNewEntry(inputValue);
    reset();
  };

  const reset = () => {
    setInputValue('');
    setTouched(false);
    setIsAddingEntry(false);
  };

  return (
    <Box sx={{ marginBottom: 2, paddingX: 2 }}>
      {isAddingEntry ? (
        <>
          <TextField
            fullWidth
            sx={{ marginTop: 2, marginBottom: 1 }}
            placeholder="Agregar una nueva entrada"
            autoFocus
            multiline
            label="Nueva entrada"
            helperText={inputValue.length <= 0 && touched && 'Ingrese un valor'}
            error={inputValue.length <= 0 && touched}
            value={inputValue}
            onChange={onTextFildChanges}
            onBlur={() => setTouched(true)}
          />
          <Box display="flex" justifyContent="space-between">
            <Button variant="text" onClick={reset}>
              Cancelar
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              endIcon={<SaveOutlinedIcon />}
              onClick={onSave}
            >
              Guardar
            </Button>
          </Box>
        </>
      ) : (
        <Button
          startIcon={<AddCircleOutlineOutlinedIcon />}
          fullWidth
          variant="outlined"
          onClick={() => setIsAddingEntry(true)}
        >
          Agregar tarea
        </Button>
      )}
    </Box>
  );
};
