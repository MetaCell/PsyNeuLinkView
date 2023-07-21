import * as React from 'react';
import Box from '@mui/material/Box';
import { handleOptionChange, handleValueChange } from '../../../utils';
import FunctionInput, {
  CustomCheckInput,
  CustomValueInput,
} from '../FunctionInput';
import AddToVisualMenu from '../../../shared/AddToVisualMenu';

function LCAMechForm(props) {
  const { optionKeys, optionsValue, updateOptions, value, updateValue } = props;

  return (
    <Box className="block-wrapper">
      <CustomValueInput
        label={optionKeys.leak}
        value={optionsValue.leak}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.leak,
              value: e.target.value,
            },
            updateOptions
          )
        }
      />
      <CustomValueInput
        label={optionKeys.competition}
        value={optionsValue.competition}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.competition,
              value: e.target.value,
            },
            updateOptions
          )
        }
      />
      <CustomValueInput
        label={optionKeys.self_excitation}
        value={optionsValue.self_excitation}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.self_excitation,
              value: e.target.value,
            },
            updateOptions
          )
        }
      />
      <CustomValueInput
        label={optionKeys.time_step_size}
        value={optionsValue.time_step_size}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.time_step_size,
              value: e.target.value,
            },
            updateOptions
          )
        }
      />
      <CustomValueInput
        label={optionKeys.threshold}
        value={optionsValue.threshold}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.threshold,
              value: e.target.value,
            },
            updateOptions
          )
        }
      />
      <CustomValueInput
        label={optionKeys.threshold_criterion}
        value={optionsValue.threshold_criterion}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.threshold_criterion,
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
      <FunctionInput
        label={optionKeys.integrator_function}
        value={optionsValue.integrator_function}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.integrator_function,
              value: e.target.value,
            },
            updateOptions
          )
        }
      />
      <CustomCheckInput
        label={optionKeys.integrator_mode}
        checked={optionsValue.integrator_mode}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.integrator_mode,
              value: e.target.checked,
            },
            updateOptions
          )
        }
      />
      <FunctionInput
        label={optionKeys.termination_measure}
        value={optionsValue.termination_measure}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.termination_measure,
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

export default LCAMechForm;
