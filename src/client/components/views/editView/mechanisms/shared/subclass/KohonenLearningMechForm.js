import * as React from 'react';
import Box from '@mui/material/Box';
import { handleOptionChange, handleValueChange } from '../../../utils';
import FunctionInput, { CustomValueInput } from '../FunctionInput';
import AddToVisualMenu from '../../../shared/AddToVisualMenu';

function KohonenLearningMechForm(props) {
  const { optionKeys, optionsValue, updateOptions, value, updateValue, updateModelOption } = props;

  return (
    <Box className="block-wrapper">
      <CustomValueInput
        label={optionKeys.modulation}
        value={optionsValue.modulation}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.modulation,
              value: e.target.value,
            },
            updateOptions
          )
        }
      />
      <CustomValueInput
        label={optionKeys.activity_source}
        value={optionsValue.activity_source}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.activity_source,
              value: e.target.value,
            },
            updateOptions
          )
        }
      />
      <CustomValueInput
        label={optionKeys.learning_rate}
        value={optionsValue.learning_rate}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.learning_rate,
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
      <AddToVisualMenu
        value={value}
        onChange={(id) => handleValueChange(id, value, updateValue)}
      />{' '}
    </Box>
  );
}

export default KohonenLearningMechForm;
