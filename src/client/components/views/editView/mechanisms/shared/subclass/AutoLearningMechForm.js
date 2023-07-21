import * as React from 'react';
import Box from '@mui/material/Box';
import {
  defaultFilters,
  handleOptionChange,
  handleValueChange,
} from '../../../utils';
import FunctionInput, { CustomValueInput, ListSelect } from '../FunctionInput';
import AddToVisualMenu from '../../../shared/AddToVisualMenu';

function AutoLearningMechForm(props) {
  const { optionKeys, optionsValue, updateOptions, value, updateValue } = props;

  return (
    <Box className="block-wrapper">
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
        label={optionKeys.primary_learned_projection}
        value={optionsValue.primary_learned_projection}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.primary_learned_projection,
              value: e.target.value,
            },
            updateOptions
          )
        }
      />
      <ListSelect
        label={optionKeys.learning_projections}
        options={defaultFilters}
        value={optionsValue.learning_projections}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.error_matrices,
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

export default AutoLearningMechForm;
