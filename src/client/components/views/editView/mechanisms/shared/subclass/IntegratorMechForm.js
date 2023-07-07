import * as React from 'react';
import Box from '@mui/material/Box';
import {
  defaultFilters,
  handleOptionChange,
  handleValueChange,
} from '../../../utils';
import FunctionInput, { CustomValueInput, ListSelect } from '../FunctionInput';
import AddToVisualMenu from '../../../shared/AddToVisualMenu';

function ObjMechForm(props) {
  const { optionKeys, optionsValue, updateOptions, value, updateValue, updateModelOption } = props;

  return (
    <Box className="block-wrapper">
      <ListSelect
        options={defaultFilters}
        label={optionKeys.monitor}
        value={optionsValue.monitor}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.monitor,
              value: e.target.value,
            },
            updateOptions
          )
        }
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
      <ListSelect
        options={defaultFilters}
        label={optionKeys.monitor_weights_and_exponents}
        value={optionsValue.monitor_weights_and_exponents}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.monitor_weights_and_exponents,
              value: e.target.value,
            },
            updateOptions
          )
        }
      />
      <CustomValueInput
        label={optionKeys.modulatory_mechanism}
        value={optionsValue.modulatory_mechanism}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.modulatory_mechanism,
              value: e.target.value,
            },
            updateOptions
          )
        }
        minWidth="100%"
      />
      <AddToVisualMenu
        value={value}
        onChange={(id) => handleValueChange(id, value, updateValue)}
      />{' '}
    </Box>
  );
}

export default ObjMechForm;
