import * as React from 'react';
import Box from '@mui/material/Box';
import { handleOptionChange, handleValueChange } from '../../../utils';
import FunctionInput, { CustomValueInput } from '../FunctionInput';
import AddToVisualMenu from '../../../shared/AddToVisualMenu';

function AGTControlMechForm(props) {
  const { optionKeys, optionsValue, updateOptions, value, updateValue, updateModelOption } = props;

  return (
    <Box className="block-wrapper">
      <CustomValueInput
        label={optionKeys.objective_mechanism}
        value={optionsValue.objective_mechanism}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.objective_mechanism,
              value: e.target.value,
            },
            updateOptions
          )
        }
        minWidth="100%"
      />
      <FunctionInput
        label={optionKeys.function}
        value={optionsValue.function}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.function,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
            )
          }
        updateModelOption={updateModelOption}
      />
      <AddToVisualMenu
        value={value}
        onChange={(id) => handleValueChange(id, value, updateValue)}
      />
    </Box>
  );
}

export default AGTControlMechForm;
