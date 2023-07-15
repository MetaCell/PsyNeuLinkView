import * as React from 'react';
import Box from '@mui/material/Box';
import {
  defaultFilters,
  handleOptionChange,
  handleValueChange,
} from '../../../utils';
import FunctionInput, { CustomValueInput, ListSelect } from '../FunctionInput';
import AddToVisualMenu from '../../../shared/AddToVisualMenu';
import { PNLLoggables } from '../../../../../../../constants';

function DDMForm(props) {
  const { optionKeys, optionsValue, updateOptions, updateModelOption, updateModelLoggable } = props;

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
            updateOptions,
            updateModelOption
          )
        }
        updateModelOption={updateModelOption}
      />
      <ListSelect
        options={defaultFilters}
        label={optionKeys.standard_output_ports}
        value={optionsValue.standard_output_ports}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.standard_output_ports,
              value: e.target.value,
            },
            updateOptions
          )
        }
      />
      <CustomValueInput
        label={optionKeys.initializer}
        value={optionsValue.initializer}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.initializer,
              value: e.target.value,
            },
            updateOptions
          )
        }
      />
      <CustomValueInput
        label={optionKeys.input_format}
        value={optionsValue.input_format}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.input_format,
              value: e.target.value,
            },
            updateOptions
          )
        }
      />
      <CustomValueInput
        label={optionKeys.stimulus}
        value={optionsValue.stimulus}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.stimulus,
              value: e.target.value,
            },
            updateOptions
          )
        }
      />
      <AddToVisualMenu
        onChange={updateModelLoggable}
        options={optionsValue[PNLLoggables]}
      />{' '}
    </Box>
  );
}

export default DDMForm;
