import * as React from 'react';
import Box from '@mui/material/Box';
import {
  defaultFilters,
  handleOptionChange,
  handleValueChange,
} from '../../../utils';
import FunctionInput, {
  CustomCheckInput,
  CustomValueInput,
  ListSelect,
  MatrixInput,
} from '../FunctionInput';
import AddToVisualMenu from '../../../shared/AddToVisualMenu';
import { PNLLoggables } from '../../../../../../../constants';

function LearningMechForm(props) {
  const { optionKeys, optionsValue, updateOptions, updateModelOption, updateModelLoggable } = props;

  return (
    <Box className="block-wrapper">
      <CustomValueInput
        label={optionKeys.error_sources}
        value={optionsValue.error_sources}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.error_sources,
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
      <CustomCheckInput
        label={optionKeys.learning_enabled}
        checked={optionsValue.learning_enabled}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.learning_enabled,
              value: e.target.checked,
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
        label="error_matrices"
        options={defaultFilters}
        value={optionsValue.error_matrices}
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
      <MatrixInput
        label={optionKeys.error_matrix}
        value={optionsValue.error_matrix}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.error_matrix,
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

export default LearningMechForm;
