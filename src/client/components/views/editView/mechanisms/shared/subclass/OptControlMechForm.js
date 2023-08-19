import * as React from 'react';
import Box from '@mui/material/Box';
import {
  defaultFilters,
  handleOptionChange
} from '../../../utils';
import FunctionInput, {
  CustomCheckInput,
  CustomValueInput,
  ListSelect,
} from '../FunctionInput';
import AddToVisualMenu from '../../../shared/AddToVisualMenu';
import { PNLLoggables } from '../../../../../../../constants';

function OptControlMechForm(props) {
  const { optionKeys, optionsValue, updateOptions, updateModelOption, updateModelLoggable, model } = props;

  return (
    <Box className="block-wrapper">
      <CustomValueInput
        model={model}
        label={optionKeys.state_features}
        value={optionsValue.state_features}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.state_features,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
      />
      <CustomValueInput
        model={model}
        label={optionKeys.state_feature_default}
        value={optionsValue.state_feature_default}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.state_feature_default,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
      />
      <CustomValueInput
        model={model}
        label={optionKeys.agent_rep}
        value={optionsValue.agent_rep}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.agent_rep,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
      />
      <CustomValueInput
        model={model}
        label={optionKeys.num_estimates}
        value={optionsValue.num_estimates}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.num_estimates,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
      />
      <CustomValueInput
        model={model}
        label={optionKeys.num_trials_per_estimate}
        value={optionsValue.num_trials_per_estimate}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.num_trials_per_estimate,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
      />
      <CustomValueInput
        model={model}
        label={optionKeys.initial_seed}
        value={optionsValue.initial_seed}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.initial_seed,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
      />
      <FunctionInput
        model={model}
        label={optionKeys.state_feature_function}
        value={optionsValue.state_feature_function}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.state_feature_function,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
        updateModelOption={updateModelOption}
      />
      <CustomCheckInput
        label={optionKeys.same_seed_for_all_parameter_combinations}
        checked={optionsValue.same_seed_for_all_parameter_combinations}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.same_seed_for_all_parameter_combinations,
              value: e.target.checked,
            },
            updateOptions,
            updateModelOption
          )
        }
      />
      <ListSelect
        options={defaultFilters}
        label={optionKeys.random_variables}
        value={optionsValue.random_variables}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.random_variables,
              value: e.target.value,
            },
            updateOptions,
            updateModelOption
          )
        }
      />
      <FunctionInput
        model={model}
        label={optionKeys.search_function}
        value={optionsValue.search_function}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.search_function,
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
        label={optionKeys.search_termination_function}
        value={optionsValue.search_termination_function}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.search_termination_function,
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
        label={optionKeys.search_space}
        value={optionsValue.search_space}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.search_space,
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
      <CustomCheckInput
        label={optionKeys.search_statefulness}
        checked={optionsValue.search_statefulness}
        onChange={(e) =>
          handleOptionChange(
            {
              key: optionKeys.search_statefulness,
              value: e.target.checked,
            },
            updateOptions,
            updateModelOption
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

export default OptControlMechForm;
