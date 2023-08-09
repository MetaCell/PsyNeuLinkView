import * as React from 'react';
import Box from '@mui/material/Box';
import {
  defaultFilters,
  handleOptionChange
} from '../../../utils';
import FunctionInput, { CustomValueInput, ListSelect } from '../FunctionInput';
import AddToVisualMenu from '../../../shared/AddToVisualMenu';
import { PNLLoggables } from '../../../../../../../constants';

function LCControlMechForm(props) {
  const { optionKeys, optionsValue, updateOptions, updateModelOption, updateModelLoggable } = props;

  return (
    <Box className="block-wrapper">
      <ListSelect
        options={defaultFilters}
        label={optionKeys.modulated_mechanisms}
        value={optionsValue.modulated_mechanisms}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.modulated_mechanisms,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
      />
      <CustomValueInput
        label={optionKeys.initial_w_FitzHughNagumo}
        value={optionsValue.initial_w_FitzHughNagumo}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.initial_w_FitzHughNagumo,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
      />
      <CustomValueInput
        label={optionKeys.initial_v_FitzHughNagumo}
        value={optionsValue.initial_v_FitzHughNagumo}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.initial_v_FitzHughNagumo,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
      />
      <CustomValueInput
        label={optionKeys.time_step_size_FitzHughNagumo}
        value={optionsValue.time_step_size_FitzHughNagumo}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.time_step_size_FitzHughNagumo,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
      />
      <CustomValueInput
        label={optionKeys.t_0_FitzHughNagumo}
        value={optionsValue.t_0_FitzHughNagumo}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.t_0_FitzHughNagumo,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
      />
      <CustomValueInput
        label={optionKeys.a_v_FitzHughNagumo}
        value={optionsValue.a_v_FitzHughNagumo}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.a_v_FitzHughNagumo,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
      />
      <CustomValueInput
        label={optionKeys.b_v_FitzHughNagumo}
        value={optionsValue.b_v_FitzHughNagumo}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.b_v_FitzHughNagumo,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
      />
      <CustomValueInput
        label={optionKeys.c_v_FitzHughNagumo}
        value={optionsValue.c_v_FitzHughNagumo}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.c_v_FitzHughNagumo,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
      />
      <CustomValueInput
        label={optionKeys.d_v_FitzHughNagumo}
        value={optionsValue.d_v_FitzHughNagumo}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.d_v_FitzHughNagumo,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
      />
      <CustomValueInput
        label={optionKeys.e_v_FitzHughNagumo}
        value={optionsValue.e_v_FitzHughNagumo}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.e_v_FitzHughNagumo,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
      />
      <CustomValueInput
        label={optionKeys.f_v_FitzHughNagumo}
        value={optionsValue.f_v_FitzHughNagumo}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.f_v_FitzHughNagumo,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
      />
      <CustomValueInput
        label={optionKeys.threshold_FitzHughNagumo}
        value={optionsValue.threshold_FitzHughNagumo}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.threshold_FitzHughNagumo,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
      />
      <CustomValueInput
        label={optionKeys.time_constant_v_FitzHughNagumo}
        value={optionsValue.time_constant_v_FitzHughNagumo}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.time_constant_v_FitzHughNagumo,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
      />
      <CustomValueInput
        label={optionKeys.a_w_FitzHughNagumo}
        value={optionsValue.a_w_FitzHughNagumo}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.a_w_FitzHughNagumo,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
      />
      <CustomValueInput
        label={optionKeys.b_w_FitzHughNagumo}
        value={optionsValue.b_w_FitzHughNagumo}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.b_w_FitzHughNagumo,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
      />
      <CustomValueInput
        label={optionKeys.c_w_FitzHughNagumo}
        value={optionsValue.c_w_FitzHughNagumo}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.c_w_FitzHughNagumo,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
      />
      <CustomValueInput
        label={optionKeys.mode_FitzHughNagumo}
        value={optionsValue.mode_FitzHughNagumo}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.mode_FitzHughNagumo,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
      />
      <CustomValueInput
        label={optionKeys.uncorrelated_activity_FitzHughNagumo}
        value={optionsValue.uncorrelated_activity_FitzHughNagumo}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.uncorrelated_activity_FitzHughNagumo,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
      />
      <CustomValueInput
        label={optionKeys.time_constant_w_FitzHughNagumo}
        value={optionsValue.time_constant_w_FitzHughNagumo}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.time_constant_w_FitzHughNagumo,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
      />
      <CustomValueInput
        label={optionKeys.integration_method}
        value={optionsValue.integration_method}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.integration_method,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
      />
      <CustomValueInput
        label={optionKeys.base_level_gain}
        value={optionsValue.base_level_gain}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.base_level_gain,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
      />
      <CustomValueInput
        label={optionKeys.scaling_factor_gain}
        value={optionsValue.scaling_factor_gain}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.scaling_factor_gain,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
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
        minWidth="100%"
      />
      <AddToVisualMenu
        onChange={updateModelLoggable}
        options={optionsValue[PNLLoggables]}
      />{' '}
    </Box>
  );
}

export default LCControlMechForm;
