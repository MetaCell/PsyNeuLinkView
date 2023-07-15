import * as React from 'react';
import Box from '@mui/material/Box';
import { handleOptionChange, handleValueChange } from '../../../utils';
import FunctionInput, {
  CustomCheckInput,
  CustomValueInput,
} from '../FunctionInput';
import AddToVisualMenu from '../../../shared/AddToVisualMenu';
import { PNLLoggables } from '../../../../../../../constants';

function RecurrentTransferMechForm(props) {
  const { optionKeys, optionsValue, updateOptions, updateModelOption, updateModelLoggable } = props;

  return (
    <Box className="block-wrapper">
      <CustomValueInput
        label={optionKeys.matrix}
        value={optionsValue.matrix}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.matrix,
              value: e.target.value,
            },
            updateOptions
          )
        }
      />
      <CustomValueInput
        label={optionKeys.auto}
        value={optionsValue.auto}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.auto,
              value: e.target.value,
            },
            updateOptions
          )
        }
      />
      <CustomValueInput
        label={optionKeys.hetero}
        value={optionsValue.hetero}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.hetero,
              value: e.target.value,
            },
            updateOptions
          )
        }
      />
      <CustomCheckInput
        label={optionKeys.has_recurrent_input_port}
        checked={optionsValue.has_recurrent_input_port}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.has_recurrent_input_port,
              value: e.target.checked,
            },
            updateOptions
          )
        }
      />
      <FunctionInput
        label={optionKeys.combination_function}
        value={optionsValue.combination_function}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.combination_function,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
        updateModelOption={updateModelOption}
      />
      <CustomCheckInput
        label={optionKeys.enable_learning}
        checked={optionsValue.enable_learning}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.enable_learning,
              value: e.target.checked,
            },
            updateOptions
          )
        }
      />
      <CustomCheckInput
        label={optionKeys.learning_rate}
        checked={optionsValue.learning_rate}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.learning_rate,
              value: e.target.checked,
            },
            updateOptions
          )
        }
      />
      <FunctionInput
        label={optionKeys.learning_function}
        value={optionsValue.learning_function}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.learning_function,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
        updateModelOption={updateModelOption}
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
      <CustomValueInput
        label={optionKeys.integration_rate}
        value={optionsValue.integration_rate}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.integration_rate,
              value: e.target.value,
            },
            updateOptions
          )
        }
      />
      <CustomValueInput
        label={optionKeys.noise}
        value={optionsValue.noise}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.noise,
              value: e.target.value,
            },
            updateOptions
          )
        }
      />
      <CustomValueInput
        label={optionKeys.smoothing_factor}
        value={optionsValue.smoothing_factor}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.smoothing_factor,
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
        onChange={updateModelLoggable}
        options={optionsValue[PNLLoggables]}
      />{' '}
    </Box>
  );
}

export default RecurrentTransferMechForm;
