import * as React from 'react';
import Box from '@mui/material/Box';
import { handleOptionChange, handleValueChange } from '../../../utils';
import FunctionInput from '../FunctionInput';
import AddToVisualMenu from '../../../shared/AddToVisualMenu';

function ProcessingMechForm(props) {
  const { optionKeys, optionsValue, updateOptions, value, updateValue } = props;

  return (
    <Box className="block-wrapper">
      <FunctionInput
        label={optionKeys.function}
        value={optionsValue.function}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.function,
              value: e.target.value,
            },
            updateOptions
          )
        }
      />
      <AddToVisualMenu
        value={value}
        onChange={(id) => handleValueChange(id, value, updateValue)}
      />{' '}
    </Box>
  );
}

export default ProcessingMechForm;
