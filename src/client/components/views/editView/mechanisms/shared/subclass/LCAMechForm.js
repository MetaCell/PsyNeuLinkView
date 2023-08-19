import * as React from 'react';
import Box from '@mui/material/Box';
import { handleOptionChange } from '../../../utils';
import FunctionInput, {
  CustomCheckInput,
  CustomValueInput,
} from '../FunctionInput';
import AddToVisualMenu from '../../../shared/AddToVisualMenu';
import { PNLLoggables } from '../../../../../../../constants';

function LCAMechForm(props) {
  const { optionKeys, optionsValue, updateOptions, updateModelOption, updateModelLoggable, model } = props;

  return (
    <Box className="block-wrapper">
      <CustomValueInput
        model={model}
        label={optionKeys.leak}
        value={optionsValue.leak}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.leak,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
      />
      <CustomValueInput
        model={model}
        label={optionKeys.competition}
        value={optionsValue.competition}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.competition,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
      />
      <CustomValueInput
        model={model}
        label={optionKeys.self_excitation}
        value={optionsValue.self_excitation}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.self_excitation,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
      />
      <CustomValueInput
        model={model}
        label={optionKeys.time_step_size}
        value={optionsValue.time_step_size}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.time_step_size,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
      />
      <CustomValueInput
        model={model}
        label={optionKeys.threshold}
        value={optionsValue.threshold}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.threshold,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
      />
      <CustomValueInput
        model={model}
        label={optionKeys.threshold_criterion}
        value={optionsValue.threshold_criterion}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.threshold_criterion,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
      />
      <FunctionInput
        model={model}
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
      <CustomValueInput
        model={model}
        label={optionKeys.matrix}
        value={optionsValue.matrix}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.matrix,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
      />
      <CustomValueInput
        model={model}
        label={optionKeys.auto}
        value={optionsValue.auto}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.auto,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
      />
      <CustomValueInput
        model={model}
        label={optionKeys.hetero}
        value={optionsValue.hetero}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.hetero,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
      />
      <FunctionInput
        model={model}
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
        model={model}
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
        onChange={updateModelLoggable}
        options={optionsValue[PNLLoggables]}
      />{' '}
    </Box>
  );
}

export default LCAMechForm;
