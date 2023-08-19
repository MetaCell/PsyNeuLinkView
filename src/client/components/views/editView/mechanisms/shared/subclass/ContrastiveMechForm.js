import * as React from 'react';
import Box from '@mui/material/Box';
import { handleOptionChange } from '../../../utils';
import FunctionInput, {
  CustomCheckInput,
  CustomValueInput,
} from '../FunctionInput';
import AddToVisualMenu from '../../../shared/AddToVisualMenu';
import { PNLLoggables } from '../../../../../../../constants';

function ContrastiveMechForm(props) {
  const { optionKeys, optionsValue, updateOptions, updateModelOption, updateModelLoggable, model } = props;

  return (
    <Box className="block-wrapper">
      <CustomValueInput
        model={model}
        label={optionKeys.variable}
        value={optionsValue.variable}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.variable,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
      />
      <CustomValueInput
        model={model}
        label={optionKeys.input_size}
        value={optionsValue.input_size}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.input_size,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
      />
      <CustomValueInput
        model={model}
        label={optionKeys.hidden_size}
        value={optionsValue.hidden_size}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.hidden_size,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
      />
      <CustomValueInput
        model={model}
        label={optionKeys.target_size}
        value={optionsValue.target_size}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.target_size,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
      />
      <CustomValueInput
        model={model}
        label={optionKeys.mode}
        value={optionsValue.mode}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.mode,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
      />
      <CustomValueInput
        model={model}
        label={optionKeys.clamp}
        value={optionsValue.clamp}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.clamp,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
      />
      <CustomCheckInput
        label={optionKeys.separated}
        checked={optionsValue.separated}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.separated,
              value: e.target.checked,
            },
            updateOptions,
            updateModelOption
          )
        }
      />
      <FunctionInput
        model={model}
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
      />
      <CustomCheckInput
        label={optionKeys.continuous}
        checked={optionsValue.continuous}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.continuous,
              value: e.target.checked,
            },
            updateOptions,
            updateModelOption
          )
        }
      />
      <CustomValueInput
        model={model}
        label={optionKeys.minus_phase_termination_condition}
        value={optionsValue.minus_phase_termination_condition}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.minus_phase_termination_condition,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
      />
      <CustomValueInput
        model={model}
        label={optionKeys.minus_phase_termination_threshold}
        value={optionsValue.minus_phase_termination_threshold}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.minus_phase_termination_threshold,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
      />
      <CustomValueInput
        model={model}
        label={optionKeys.plus_phase_termination_condition}
        value={optionsValue.plus_phase_termination_condition}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.plus_phase_termination_condition,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
      />
      <CustomValueInput
        model={model}
        label={optionKeys.plus_phase_termination_threshold}
        value={optionsValue.plus_phase_termination_threshold}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.plus_phase_termination_threshold,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
        minWidth="100%"
      />
      <CustomValueInput
        model={model}
        label={optionKeys.max_passes}
        value={optionsValue.max_passes}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.max_passes,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
        minWidth="100%"
      />
      <FunctionInput
        model={model}
        label={optionKeys.phase_convergence_function}
        value={optionsValue.phase_convergence_function}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.phase_convergence_function,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
        updateModelOption={updateModelOption}
      />
      <FunctionInput
        model={model}
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
      <AddToVisualMenu
        onChange={updateModelLoggable}
        options={optionsValue[PNLLoggables]}
      />{' '}
    </Box>
  );
}

export default ContrastiveMechForm;
