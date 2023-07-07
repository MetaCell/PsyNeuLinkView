import * as React from 'react';
import Box from '@mui/material/Box';
import { handleOptionChange, handleValueChange } from '../../../utils';
import FunctionInput, {
  CustomCheckInput,
  CustomValueInput,
} from '../FunctionInput';
import AddToVisualMenu from '../../../shared/AddToVisualMenu';

function TransferMechForm(props) {
  const { optionKeys, optionsValue, updateOptions, value, updateValue, updateModelOption } = props;

  return (
    <Box className="block-wrapper">
      <CustomValueInput
        label={optionKeys.noise}
        value={optionsValue.noise}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.noise,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
      />
      <CustomValueInput
        label={optionKeys.clip}
        value={optionsValue.clip}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.clip,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
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
            updateOptions,
            updateModelOption
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
            updateOptions,
            updateModelOption
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
            updateOptions,
            updateModelOption
          )
        }
        updateModelOption={updateModelOption}
      />
      <CustomValueInput
        label={optionKeys.on_resume_integrator_mode}
        value={optionsValue.on_resume_integrator_mode}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.on_resume_integrator_mode,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
      />
      <CustomValueInput
        label={optionKeys.termination_threshold}
        value={optionsValue.termination_threshold}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.termination_threshold,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
      />
      <CustomValueInput
        label={optionKeys.termination_comparison_op}
        value={optionsValue.termination_comparison_op}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.termination_comparison_op,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
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

export default TransferMechForm;
